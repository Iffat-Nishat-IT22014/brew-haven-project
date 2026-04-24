import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import bgImage from '../assets/bg_pattern.jpg';
import { FaMagnifyingGlass, FaChevronDown } from 'react-icons/fa6';
import { RiMenu2Line } from 'react-icons/ri';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const publicLinks = [
    { path: "/", name: "Home" },
    { path: "/menu", name: "Menu" },
    { path: "/about", name: "About" }
  ];

  return (
    <nav className="relative z-50" style={{ fontFamily: 'Rancho, cursive' }}>
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-[#2a1f1a]"
        style={{
          backgroundColor: '#1c1410',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'contain',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-12" />
          <h1 className="hidden md:block text-[#f5e9dc] text-3xl font-bold">
            Brew Haven
          </h1>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">

          {/* Links */}
          <div className="flex gap-4 text-[#f5e9dc] font-semibold">
            {publicLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? 'text-[#c69c6d]' : 'hover:text-[#c69c6d]'
                }
              >
                {link.name}
              </NavLink>
            ))}

            {user?.role === 'admin' && (
              <NavLink to="/add-coffee" className="hover:text-[#c69c6d]">
                Add Coffee
              </NavLink>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <FaMagnifyingGlass className="absolute left-3 top-2.5 text-[#c69c6d]/70" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-9 pr-3 py-1.5 rounded-full bg-[#2a1f1a] border border-[#3b2a23] text-white placeholder:text-[#c69c6d]/50 focus:outline-none"
            />
          </div>

          {/* Cart */}
          {user && (
            <Link to="/cart" className="relative text-[#f5e9dc]">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c69c6d] text-black text-xs px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Profile / Join Us */}
          <div className="relative z-50" ref={dropdownRef}>
            {user ? (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-[#2a1f1a] px-3 py-1.5 rounded-full"
              >
                <img
                  src={user?.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-8 h-8 rounded-full border border-[#c69c6d]"
                  alt="profile"
                />
                <span className="text-white hidden lg:block">
                  {user.name}
                </span>
                <FaChevronDown className={`text-white transition ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#6f4e37] text-white"
              >
                Join Us <FaChevronDown />
              </button>
            )}

            {/* Dropdown FIXED */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#2a1f1a] border border-[#3b2a23] rounded-xl shadow-xl z-[999] overflow-hidden">

                {user ? (
                  <>
                    <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-[#3b2a23] text-white">
                      Dashboard
                    </NavLink>
                    <NavLink to="/profile" className="block px-4 py-2 hover:bg-[#3b2a23] text-white">
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#3b2a23]"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="flex gap-2 px-4 py-2 hover:bg-[#3b2a23] text-white">
                      <FaSignInAlt /> Login
                    </NavLink>
                    <NavLink to="/register" className="flex gap-2 px-4 py-2 hover:bg-[#3b2a23] text-white">
                      <FaUserPlus /> Register
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <RiMenu2Line size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU FIXED */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1c1410] text-white px-4 py-4 space-y-3">

          {publicLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              {link.name}
            </NavLink>
          ))}

          {/* Cart */}
          {user && (
            <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)}>
              Cart ({cartCount})
            </NavLink>
          )}

          <hr className="border-[#3b2a23]" />

          {/* AUTH FIXED (VERTICAL) */}
          {user ? (
            <div className="flex flex-col gap-2">
              <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </NavLink>
              <button onClick={handleLogout} className="text-red-400 text-left">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={() => setMobileMenuOpen(false)}>
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;