import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) return navigate('/login');
    setLoading(true);

    try {
      await axios.post('/api/orders',
        {
          total_price: cartTotal,
          items: cart.map(i => ({
            product_id: i.id,
            quantity: i.quantity
          }))
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
      clearCart();
    } catch {
      alert("Order failed!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c1410] text-[#f5e9dc]">
        <div className="bg-[#2a1f1a] p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-[#3b2a23]">
          <div className="w-20 h-20 bg-[#6f4e37]/20 text-[#c69c6d] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} />
          </div>

          <h2 className="text-3xl font-serif font-bold mb-3 text-[#c69c6d]">
            Order Confirmed ☕
          </h2>

          <p className="text-[#d6c4b2]/70 mb-8">
            Your coffee is being prepared. Sit back and relax!
          </p>

          <Link
            to="/dashboard"
            className="w-full block bg-[#6f4e37] hover:bg-[#8b5e3c] py-3 rounded-full font-bold transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c1410] text-[#f5e9dc] px-4 md:px-8 py-12">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-serif font-bold mb-10 text-[#c69c6d]">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-[#2a1f1a] rounded-3xl">
            <ShoppingCart size={60} className="mx-auto text-[#c69c6d]/30 mb-4" />
            <p className="text-lg text-[#d6c4b2] mb-6">
              Your cart is empty
            </p>
            <Link
              to="/menu"
              className="bg-[#6f4e37] hover:bg-[#8b5e3c] px-8 py-3 rounded-full font-semibold transition"
            >
              Browse Coffee
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* 🛒 ITEMS */}
            <div className="lg:col-span-2 space-y-5">
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col sm:flex-row items-center gap-5 bg-[#2a1f1a] p-5 rounded-2xl border border-[#3b2a23]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-[#c69c6d] font-bold mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-[#1c1410] px-3 py-1 rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* 💳 SUMMARY */}
            <div>
              <div className="bg-[#2a1f1a] p-6 rounded-3xl border border-[#3b2a23] sticky top-24">

                <h2 className="text-xl font-bold mb-5 text-[#c69c6d]">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-[#d6c4b2]/70">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-[#d6c4b2]/70">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>

                  <hr className="border-[#3b2a23]" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#c69c6d]">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-[#6f4e37] hover:bg-[#8b5e3c] py-3 rounded-full font-bold flex items-center justify-center gap-2 transition active:scale-95"
                >
                  {!loading && <CreditCard size={18} />}
                  {loading ? 'Processing...' : `Checkout $${cartTotal.toFixed(2)}`}
                </button>

                {!user && (
                  <p className="text-xs text-center mt-4 text-[#d6c4b2]/50">
                    Please <Link to="/login" className="underline text-[#c69c6d]">login</Link> first
                  </p>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;