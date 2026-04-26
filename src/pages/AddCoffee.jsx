import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddCoffee = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // 🔒 admin ছাড়া access নাই
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      Swal.fire({
        icon: "error",
        title: "Admin access only!"
      });
      navigate('/');
    }
  }, [user]);

  const handleAddCoffee = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      name: data.name,
      category: data.category,
      price: Number(data.price),
      image: data.photo,
      description: data.details
    };

    if (!payload.name || !data.price || !payload.image) {
      return Swal.fire({
        icon: "warning",
        title: "Fill all required fields!"
      });
    }

    try {
      setLoading(true);

      await axios.post(
        'https://brew-haven-jo83.onrender.com/api/products',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire({
        icon: "success",
        title: "Coffee added successfully ☕"
      });

      form.reset();
      setTimeout(() => navigate('/menu'), 1500);

    } catch (error) {
      console.error(error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Failed to add coffee!"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white max-w-7xl mx-auto py-10 flex items-center justify-center">

      <div className="w-full max-w-6xl">

        <Link to="/dashboard" className="btn btn-ghost mb-4">
          ← Back to Dashboard
        </Link>

        <div className="bg-[#F4F3F0] w-full rounded-sm p-8 md:p-12 lg:px-24 shadow-sm">

          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#374151] mb-4 tracking-tight" style={{ fontFamily: 'cursive' }}>
              Add New Coffee
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
              Expand your coffee menu with new delicious items ☕
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleAddCoffee}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

              <div>
                <label className="font-semibold text-gray-700">Name</label>
                <input name="name" type="text" className="w-full p-2.5 rounded-sm bg-white" required />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Price</label>
                <input name="price" type="number" step="0.01" className="w-full p-2.5 rounded-sm bg-white" required />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Category</label>
                <input name="category" type="text" className="w-full p-2.5 rounded-sm bg-white" required />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Details</label>
                <input name="details" type="text" className="w-full p-2.5 rounded-sm bg-white" required />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Photo URL</label>
              <input name="photo" type="text" className="w-full p-2.5 rounded-sm bg-white" required />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 bg-[#D2B48C] hover:bg-[#c4a47c] text-[#331A15] font-semibold py-2.5 rounded-md border border-[#331A15] ${loading && 'opacity-60'}`}
            >
              {loading ? 'Adding...' : 'Add Coffee'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddCoffee;