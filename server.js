import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { initDb } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'coffee-secret-key-123';

// ---------------- MIDDLEWARE ----------------
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);

// ---------------- DB INIT ----------------
let db;
try {
  db = await initDb();
  console.log('✅ Database connected');
} catch (err) {
  console.error('❌ DB connection failed:', err);
}

// ---------------- AUTH MIDDLEWARE ----------------
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
};

// ---------------- AUTH ROUTES ----------------
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({
      id: result.lastID,
      name,
      email,
    });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------------- PRODUCTS ----------------
app.get('/api/products', async (req, res) => {
  const products = await db.all('SELECT * FROM products');
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  const product = await db.get(
    'SELECT * FROM products WHERE id = ?',
    [req.params.id]
  );

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.json(product);
});

app.post('/api/products', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, category, price, image, description } = req.body;

  try {
    const result = await db.run(
      'INSERT INTO products (name, category, price, image, description) VALUES (?, ?, ?, ?, ?)',
      [name, category, price, image, description]
    );

    res.status(201).json({ id: result.lastID, ...req.body });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, category, price, image, description } = req.body;

  try {
    await db.run(
      'UPDATE products SET name=?, category=?, price=?, image=?, description=? WHERE id=?',
      [name, category, price, image, description, req.params.id]
    );

    res.json({ message: 'Product updated' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await db.run('DELETE FROM products WHERE id=?', [req.params.id]);
  res.json({ message: 'Product deleted' });
});

// ---------------- ORDERS ----------------

// CREATE ORDER
app.post('/api/orders', authMiddleware, async (req, res) => {
  const { total_price, items } = req.body;

  try {
    await db.run('BEGIN TRANSACTION');

    const orderResult = await db.run(
      'INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)',
      [req.user.id, total_price, 'pending']
    );

    const orderId = orderResult.lastID;

    for (const item of items) {
      await db.run(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)',
        [orderId, item.product_id, item.quantity]
      );
    }

    await db.run('COMMIT');

    res.status(201).json({ orderId, message: 'Order placed successfully' });
  } catch (err) {
    await db.run('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Order failed' });
  }
});

// GET ORDERS
app.get('/api/orders', authMiddleware, async (req, res) => {
  try {
    let orders;

    if (req.user.role === 'admin') {
      orders = await db.all(`
        SELECT o.*, u.name as user_name
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.id DESC
      `);
    } else {
      orders = await db.all(
        `SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC`,
        [req.user.id]
      );
    }

    for (let order of orders) {
      const items = await db.all(
        `SELECT oi.*, p.name, p.price
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [order.id]
      );

      order.items = items;
    }

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// 🔥 UPDATE ORDER STATUS (ADMIN)
app.patch('/api/orders/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  const { status } = req.body;

  try {
    await db.run(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    res.json({ message: 'Order status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

// ---------------- FRONTEND ----------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);
}

// ---------------- START ----------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});