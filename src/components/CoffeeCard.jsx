import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

const CoffeeCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden bg-[#1c1410] text-[#f5e9dc] shadow-lg hover:shadow-2xl transition-all duration-300 group border border-[#3b2a23]"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-[#6f4e37] text-white text-xs px-3 py-1 rounded-full shadow-md">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold tracking-wide">
            {product.name}
          </h2>
          <span className="text-[#c69c6d] font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-[#d6c4b2]/80 line-clamp-2">
          {product.description}
        </p>

        {/* Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-[#6f4e37] hover:bg-[#8b5e3c] text-white font-semibold py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default CoffeeCard;