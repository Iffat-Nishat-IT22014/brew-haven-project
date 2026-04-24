import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto border border-amber-950/30 bg-[#F4F3F0] rounded-2xl max-w-md w-full p-10 m-16">

      <h1
        className="text-5xl text-center font-bold text-amber-950/90 mb-10 tracking-wider"
        style={{ fontFamily: "Rancho, cursive" }}
      >
        Register Now!
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-6"
        style={{ fontFamily: "Rancho, cursive" }}>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-transparent border-b border-amber-950/50 focus:border-amber-950/90 outline-none text-amber-950/90 py-2 text-[16px] placeholder-amber-950/60"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-transparent border-b border-amber-950/50 focus:border-amber-950/90 outline-none text-amber-950/90 py-2 text-[16px] placeholder-amber-950/60"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-transparent border-b border-amber-950/50 focus:border-amber-950/90 outline-none text-amber-950/90 py-2 text-[16px] placeholder-amber-950/60"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full bg-transparent border-b border-amber-950/50 focus:border-amber-950/90 outline-none text-amber-950/90 py-2 text-[16px] placeholder-amber-950/60"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-950/90 border border-amber-950/60 text-white hover:bg-white hover:text-[#372727] font-bold text-[18px] rounded-xl py-3 transition-all duration-500 mt-4 active:scale-95 shadow-lg"
        >
          {loading ? "Creating..." : "Create an account"}
        </button>
      </form>

      {/* Social login */}
      <div className="mt-5">
     
      </div>

      {/* Login link */}
      <div className="text-center mt-10 border-t border-amber-950/10 pt-6">
        <p
          className="text-sm text-amber-950/40"
          style={{ fontFamily: "Rancho, cursive" }}
        >
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-amber-950/60 font-bold hover:text-amber-950/90 transition-all ml-1 hover:underline underline-offset-4"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;