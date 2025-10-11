// src/components/Login.tsx
import React, { useState } from "react";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaUser, FaArrowLeft, FaSignInAlt } from "react-icons/fa";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    // 🔑 Authentication logic goes here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-md rounded-4xl bg-white p-11 shadow-5xl">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <FaArrowLeft className="text-gray-500 text-lg cursor-pointer" />
          <div className="flex items-center flex-1 justify-center -ml-6">
  <BsBriefcaseFill className="text-purple-700 text-2xl mr-2" />
  <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
    GragGig
  </h1>
</div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium text-gray-800">Welcome Back</p>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        {/* Top Login Button */}
        <button className="w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 py-2 text-white font-medium shadow-md mb-6">
          <FaUser className="mr-2" /> Login
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 py-2.5 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            <FaSignInAlt className="mr-2" /> Sign In
          </button>
        </form>

        {/* Sign up link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Create one here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm  ;

