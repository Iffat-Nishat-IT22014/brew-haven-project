/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import AddCoffee from './pages/AddCoffee';
import About from './pages/About';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PrivateRoute, AdminRoute } from './components/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-base-100 selection:bg-primary selection:text-white">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />

                {/* Protected Routes */}
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/add-coffee" element={
                  <AdminRoute>
                    <AddCoffee />
                  </AdminRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
