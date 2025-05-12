import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    emailPhone: '',
    password: '',
    confirmPassword: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmailPhone = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emailPhone, password, confirmPassword } = formData;

    if (!validateEmailPhone(emailPhone)) {
      toast.error('Please enter a valid email or 10-digit phone number');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://coupon-swap-backend.onrender.com/api/auth/signin', {
        emailPhone,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        toast.success('Account created successfully!');
        setShowSuccess(true);
        setFormData({
          emailPhone: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-orange-100 via-white to-orange-50">
      {/* Left Side - Animated Coupon and Money Elements */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 relative overflow-hidden">
        <div className="relative w-full h-full max-w-lg">
          {/* Coupon Element 1 - Animated Coupon Ticket */}
          <div className="absolute top-16 left-20 w-48 h-32 bg-yellow-300 rounded-lg shadow-xl transform rotate-6 animate-coupon-flip hover:scale-110 transition-all duration-300 flex items-center justify-center text-white font-bold text-lg">
            20% OFF
            <div className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full -translate-x-3 -translate-y-3"></div>
            <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full translate-x-3 -translate-y-3"></div>
          </div>

          {/* Coupon Element 2 - Animated Money Symbol */}
          <div className="absolute top-40 left-48 w-36 h-36 bg-green-400 rounded-full shadow-xl transform -rotate-12 animate-money-spin hover:scale-110 transition-all duration-300 flex items-center justify-center text-white font-extrabold text-4xl">
            $
            <div className="absolute inset-0 border-4 border-dashed border-white rounded-full animate-spin-slow"></div>
          </div>

          {/* Coupon Element 3 - Animated Discount Badge */}
          <div className="absolute top-64 left-16 w-40 h-40 bg-red-400 rounded-full shadow-xl transform rotate-4 animate-badge-pulse hover:scale-110 transition-all duration-300 flex items-center justify-center text-white font-bold text-xl">
            SAVE BIG
            <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse-slow opacity-50"></div>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute inset-0 bg-orange-200 opacity-20 rounded-full transform scale-150 -translate-x-1/4 -translate-y-1/4 animate-bg-float"></div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-5 md:p-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
          <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-3 tracking-tight">
            Welcome to CouponSwap!
          </h1>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Sign up to trade coupons and unlock amazing deals.
          </p>

          {!showSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="emailPhone" className="block text-gray-700 font-medium mb-1.5">
                  Email or Phone
                </label>
                <input
                  type="text"
                  id="emailPhone"
                  name="emailPhone"
                  placeholder="Email or 10-digit phone"
                  value={formData.emailPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>
          ) : (
            <div className="bg-orange-50 text-orange-600 p-5 rounded-lg text-center font-medium animate-fade-in">
              <p className="text-2xl font-semibold">Success!</p>
              <p className="mt-2">Account created! Please check your email to verify.</p>
            </div>
          )}

          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/Login" className="text-orange-500 font-medium hover:underline hover:text-orange-600 transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignUp;