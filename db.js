import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export async function initDb() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Users Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    )
  `);

  // Products Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `);

  // Orders Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_price REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Order Items Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `);

  // Seed Admin if not exists
  const admin = await db.get('SELECT * FROM users WHERE email = ?', ['admin@brewhaven.com']);
  if (!admin) {
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
      'Admin', 'admin@brewhaven.com', hashedPassword, 'admin'
    ]);
    console.log('Seed: Admin user created (admin@brewhaven.com / admin123)');
  }

  // Seed some products if empty
  const productCount = await db.get('SELECT COUNT(*) as count FROM products');
  if (productCount.count === 0) {
    const defaultProducts = [
      ['Espresso', 'Hot Coffee', 3.50, 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400', 'Bold and rich signature espresso.'],
      ['Cappuccino', 'Hot Coffee', 4.50, 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400', 'Perfectly balanced espresso and steamed milk.'],
      ['Iced Latte', 'Cold Coffee', 5.00, 'https://images.unsplash.com/photo-1517701604599-bb2101df486e?auto=format&fit=crop&q=80&w=400', 'Chilled espresso over creamy milk and ice.'],
      ['Cold Brew', 'Cold Coffee', 4.00, 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400', 'Smooth, 12-hour steeped cold brew coffee.'],
      ['Blueberry Muffin', 'Bakery', 3.00, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=400', 'Freshly baked with real blueberries.'],
      ['Croissant', 'Bakery', 3.50, 'https://images.unsplash.com/photo-1555507036-719db8982d7b?auto=format&fit=crop&q=80&w=400', 'Buttery and flaky classic French pastry.']
    ];
    for (const p of defaultProducts) {
      await db.run('INSERT INTO products (name, category, price, image, description) VALUES (?, ?, ?, ?, ?)', p);
    }
    console.log('Seed: Default products added.');
  }

  return db;
}
