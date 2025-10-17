import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaChartLine, 
  FaShieldAlt, 
  FaUsers,
  FaArrowRight,
  FaPlay
} from 'react-icons/fa';

const HeroSection = () => {
  const stats = [
    { icon: FaUsers, number: '10,000+', label: 'Happy Clients' },
    { icon: FaChartLine, number: '₹1,200Cr+', label: 'Assets Under Management' },
    { icon: FaRocket, number: '15%', label: 'Average Returns' },
    { icon: FaShieldAlt, number: '100%', label: 'Secure Investments' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 hero-bg opacity-20"></div>
      
      {/* Orange Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-bounce-slow"></div>
      <div className="absolute bottom-40 left-20 w-36 h-36 bg-gradient-to-br from-orange-600/15 to-yellow-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 right-40 w-28 h-28 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl animate-bounce-slow delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-orange-500/30"
            >
              <FaRocket className="mr-2 text-orange-400" />
              <span className="text-sm font-semibold">India's Trusted Financial Partner</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            >
              Transform Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600">
                Financial Dreams
              </span>{' '}
              Into Reality
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl font-semibold text-orange-300 mb-4"
            >
              We Care About Your Freedom & Wealth
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Start your wealth creation journey with our expert-guided mutual fund SIPs. 
              Get personalized investment strategies that grow with your dreams and secure your future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                to="/calculator"
                className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-warm-lg hover:shadow-warm group"
              >
                Start Calculator
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link to= "/videos" className="flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border border-orange-500/50 hover:border-orange-400">
                <FaPlay className="mr-2" />
                Watch Videos
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap items-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2"></div>
                AMFI Registered
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2"></div>
                ISO Certified
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2"></div>
                5-Star Rated
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 group overflow-hidden"
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center border border-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="text-2xl text-orange-400 group-hover:text-yellow-400 transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-gray-500 animate-bounce">
            <span className="text-sm mb-2 font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-orange-500/50 rounded-full p-1">
              <div className="w-1 h-3 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mx-auto animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
