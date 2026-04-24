import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password
      });

      login(res.data.token, res.data.user);
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md w-full p-10 m-16 bg-[#F4F3F0] rounded-sm shadow-sm border border-amber-950/20">

      {/* Title */}
      <h1
        className="text-4xl text-center font-bold text-amber-950/90 mb-8"
        style={{ fontFamily: 'Rancho, cursive' }}
      >
        Login Now!
      </h1>

      {/* Error */}
      {error && (
        <div className="mb-4 text-red-600 text-sm text-center font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold text-amber-950/70">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-amber-950/40" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full pl-10 p-2.5 bg-white border-none outline-none rounded-sm text-amber-950/90 focus:ring-1 focus:ring-[#D2B48C]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-semibold text-amber-950/70">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-amber-950/40" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="w-full pl-10 p-2.5 bg-white border-none outline-none rounded-sm text-amber-950/90 focus:ring-1 focus:ring-[#D2B48C]"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#D2B48C] hover:bg-[#c4a47c] text-[#331A15] font-bold py-2.5 rounded-sm border border-[#331A15] transition flex items-center justify-center gap-2"
          style={{ fontFamily: 'cursive' }}
        >
          <LogIn size={18} />
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Register link */}
      <p className="text-center mt-8 text-amber-950/60 text-sm">
        Don’t have an account?{' '}
        <Link
          to="/register"
          className="font-bold text-amber-950 hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;