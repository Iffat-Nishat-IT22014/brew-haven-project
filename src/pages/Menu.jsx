import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoffeeCard from '../components/CoffeeCard';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [error, setError] = useState(false); 

  const extractProducts = (res) => {
    const d = res.data;
    if (Array.isArray(d)) return d;
    if (Array.isArray(d?.products)) return d.products;
    if (Array.isArray(d?.data)) return d.data;
    if (Array.isArray(d?.result)) return d.result;
    return [];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000api/products',
          { timeout: 8000 }
        );

        const data = extractProducts(res);
        if (!data.length) throw new Error("No valid data");

        setProducts(data);
        setFiltered(data);
      } catch (err) {
        setError(true);

        const dummy = [
          { id: 1, name: "Cappuccino", description: "Hot creamy coffee", category: "Coffee", price: 3.5 },
          { id: 2, name: "Latte", description: "Smooth milk coffee", category: "Coffee", price: 4 }
        ];

        setProducts(dummy);
        setFiltered(dummy);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    if (search) {
      result = result.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, category, products]);

  const categories = [
    'All',
    ...new Set(products.map(p => p.category).filter(Boolean))
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1c1410]">
        <span className="loading loading-spinner loading-lg text-[#c69c6d]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c1410] text-[#f5e9dc]">

      <div className="container mx-auto px-4 md:px-8 py-12">

        {/* Error */}
        {error && (
          <div className="mb-6 text-center text-yellow-400">
            ⚠ API issue — showing demo items
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#c69c6d]">
            Coffee Menu
          </h1>
          <p className="text-[#d6c4b2]/70 mt-3 max-w-lg mx-auto">
            Crafted with passion, brewed to perfection.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c69c6d]/70" size={18} />
            <input
              type="text"
              placeholder="Search coffee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2 rounded-full bg-[#2a1f1a] border border-[#3b2a23] text-white placeholder:text-[#c69c6d]/50 focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${category === cat
                    ? 'bg-[#6f4e37] text-white shadow-md'
                    : 'bg-[#2a1f1a] text-[#c69c6d] hover:bg-[#3b2a23]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filtered.map((product) => (
                <motion.div
                  key={product._id || product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CoffeeCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-[#2a1f1a] rounded-2xl">
            <Search size={40} className="mx-auto text-[#c69c6d]/40 mb-3" />
            <p className="text-lg text-[#d6c4b2] font-semibold">
              No items found
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
              }}
              className="mt-2 text-[#c69c6d] underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;