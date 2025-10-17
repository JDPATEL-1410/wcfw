import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png"; // Ensure you have a logo image in the specified path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Calculators", path: "/calculators" },
    { name: "Blog", path: "/blog" }, // ✅ Already exists
    { name: "Videos", path: "/videos" }, // ✅ Added new
    { name: "Contact Us", path: "/contact" },
  ];

  const Logo = () => (
    <Link to="/" className="group">
      <img
        src={logo}
        alt="WeCare Freedom Wealth Logo"
        className="w-40 h-14 object-contain transform group-hover:scale-110 transition-transform duration-300"
      />
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-xl py-2 border-b-2 border-orange-100" 
          : "bg-white/95 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-orange-500 ${
                    location.pathname === item.path 
                      ? "text-orange-500" 
                      : "text-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://wa.me/919377277793"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
            >
              <FaWhatsapp className="text-lg" />
              <span className="text-sm">WhatsApp</span>
            </a>

            <Link
              to="https://login.wcfw.in/"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 right-0 h-full w-3/4 bg-gradient-to-br from-white to-orange-50 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-orange-100 transition"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="px-6 pb-6 space-y-6">
              {/* Logo in Mobile Menu */}
              <div className="flex justify-center mb-6">
                <img src={logo} alt="WeCare Logo" className="w-32 h-auto" />
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-semibold transition-colors duration-200 py-2 px-3 rounded-lg ${
                    location.pathname === item.path
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-800 hover:text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-6 space-y-3 border-t-2 border-orange-200">
                <a
                  href="https://wa.me/919377277793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-5 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md font-semibold"
                >
                  <FaWhatsapp className="text-xl" />
                  <span className="ml-2">Contact on WhatsApp</span>
                </a>
                <Link
                  to="https://login.wcfw.in/"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-5 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md font-semibold"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
