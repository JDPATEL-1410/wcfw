import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaLock, 
  FaUser,
  FaChartLine,
  FaSmile
} from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', data);
      // Handle login/signup logic here
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  const benefits = [
    "Track your SIP investments",
    "Portfolio performance analytics",
    "Personalized recommendations",
    "Goal-based planning tools",
    "Expert advisor support",
    "Secure document storage"
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
      <div className="min-h-screen flex">
        {/* Left Side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-12 flex-col justify-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 hero-bg opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/5"></div>
          
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 relative z-10">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-warm">
                <FaChartLine className="text-white text-xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center">
                <FaSmile className="text-white text-xs" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">The Happyness Culture</h2>
              <p className="text-sm text-gray-400">Knowledge Is The New Happy Rich</p>
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Welcome to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Financial Journey</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Access your personalized dashboard to track investments, monitor portfolio performance, and achieve your financial goals.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-4">What you'll get:</h3>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-lg text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
        </motion.div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-warm">
                  <FaChartLine className="text-white text-xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center">
                  <FaSmile className="text-white text-xs" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">The Happyness Culture</h2>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-warm-lg p-8 border-2 border-orange-100">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {isLogin ? 'Welcome Back!' : 'Create Account'}
                </h1>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Sign in to access your investment dashboard' 
                    : 'Join thousands of successful investors'
                  }
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
                      <input
                        type="text"
                        {...register('fullName', { required: !isLogin ? 'Full name is required' : false })}
                        className={`w-full py-3 pl-10 pr-4 border-2 ${errors.fullName ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`w-full py-3 pl-10 pr-4 border-2 ${errors.email ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      className={`w-full py-3 pl-10 pr-10 border-2 ${errors.password ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      {...register('phone', { 
                        required: !isLogin ? 'Phone number is required' : false,
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Please enter a valid 10-digit phone number'
                        }
                      })}
                      className={`w-full py-3 px-4 border-2 ${errors.phone ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('remember')}
                        className="rounded border-orange-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-warm"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-2"></div>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </div>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-orange-200"></div>
                <span className="px-4 text-sm text-gray-500">Or continue with</span>
                <div className="flex-1 border-t border-orange-200"></div>
              </div>

              {/* Google Sign In */}
              <button className="w-full bg-white border-2 border-orange-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-orange-50 transition-all duration-300 flex items-center justify-center">
                <FaGoogle className="text-red-500 mr-3" />
                Continue with Google
              </button>

              {/* Toggle Form */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="ml-2 text-orange-600 font-bold hover:text-orange-700"
                  >
                    {isLogin ? 'Create one' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
