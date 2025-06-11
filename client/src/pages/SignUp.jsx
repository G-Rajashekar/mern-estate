import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Oauth from "../components/Oauth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",   // 🔥 added role field here
  });

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    const validity = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    };
    setPasswordValidity(validity);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    if (id === "password") {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords are not matching");
      setLoading(false);
      return;
    }

    if (!formData.role) {
      setError("Please select a role");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = "/api/auth/signup";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const res = await fetch(apiUrl, options);
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      } else {
        setError("");
        setLoading(false);
        navigate("/sign-in");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* 🔥 Role dropdown */}
          <select
            id="role"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </div>
          </div>

          {/* Password Strength */}
          <div className="space-y-1 text-sm mt-2">
            <p
              className={`flex items-center ${
                passwordValidity.length ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordValidity.length ? "✔️" : "❌"} Minimum 8 characters
            </p>
            <p
              className={`flex items-center ${
                passwordValidity.uppercase ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordValidity.uppercase ? "✔️" : "❌"} At least one uppercase
              letter
            </p>
            <p
              className={`flex items-center ${
                passwordValidity.lowercase ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordValidity.lowercase ? "✔️" : "❌"} At least one lowercase
              letter
            </p>
            <p
              className={`flex items-center ${
                passwordValidity.number ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordValidity.number ? "✔️" : "❌"} At least one number
            </p>
            <p
              className={`flex items-center ${
                passwordValidity.specialChar ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordValidity.specialChar ? "✔️" : "❌"} At least one special
              character
            </p>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showCPassword ? "text" : "password"}
              placeholder="Confirm Password"
              id="confirmPassword"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowCPassword(!showCPassword)}
            >
              {showCPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </div>
          </div>

          <button
            disabled={
              loading ||
              Object.values(passwordValidity).includes(false)
            }
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <Oauth pageType="signUp" />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </form>

        <p className="text-center mt-4">
          Have an account?
          <Link
            to="/sign-in"
            className="text-blue-500 hover:underline ml-1"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
