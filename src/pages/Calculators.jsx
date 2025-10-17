// src/pages/Calculators.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalculator, 
  FaChartLine, 
  FaPiggyBank, 
  FaGraduationCap, 
  FaRing, 
  FaUmbrella, 
  FaHome, 
  FaCar, 
  FaPlane, 
  FaExchangeAlt, 
  FaFileInvoiceDollar,
  FaClock,
  FaWhatsapp
} from 'react-icons/fa';

const Calculators = () => {
  const calculators = [
    { 
      name: "SIP Calculator", 
      path: "/calculator/sip",
      icon: FaChartLine,
      description: "Calculate your SIP returns and plan systematic investments",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Lumpsum Calculator", 
      path: "/calculator/lumpsum",
      icon: FaPiggyBank,
      description: "Calculate returns on one-time lump sum investments",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "SWP Calculator", 
      path: "/calculator/swp",
      icon: FaExchangeAlt,
      description: "Systematic Withdrawal Plan calculator for regular income",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "STP Calculator", 
      path: "/calculator/stp",
      icon: FaExchangeAlt,
      description: "Systematic Transfer Plan calculator for fund transfers",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Retirement Calculator", 
      path: "/calculator/retirement",
      icon: FaPiggyBank,
      description: "Plan your retirement corpus and secure your future",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Delay Calculator", 
      path: "/calculator/delay",
      icon: FaClock,
      description: "See the impact of delaying your investments",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Insurance Calculator", 
      path: "/calculator/insurance",
      icon: FaUmbrella,
      description: "Calculate your ideal life insurance coverage",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "EMI Calculator", 
      path: "/calculator/emi",
      icon: FaCalculator,
      description: "Calculate your loan EMI payments",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Tax Calculator", 
      path: "/calculator/tax",
      icon: FaFileInvoiceDollar,
      description: "Calculate your income tax and plan savings",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Marriage Calculator", 
      path: "/calculator/marriage",
      icon: FaRing,
      description: "Plan and save for your dream wedding",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Education Calculator", 
      path: "/calculator/education",
      icon: FaGraduationCap,
      description: "Plan for your child's education expenses",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Home Loan Calculator", 
      path: "/calculator/home-loan",
      icon: FaHome,
      description: "Calculate home loan EMI and interest",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Car Loan Calculator", 
      path: "/calculator/car-loan",
      icon: FaCar,
      description: "Calculate car loan EMI and total cost",
      color: "from-orange-500 to-yellow-500"
    },
    { 
      name: "Vacation Calculator", 
      path: "/calculator/vacation",
      icon: FaPlane,
      description: "Plan and save for your dream vacation",
      color: "from-orange-500 to-yellow-500"
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-white to-yellow-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl mb-4 shadow-warm">
            <FaCalculator className="text-white text-2xl" />
          </div>

          {/* ✅ UPDATED: Title with gradient on "Calculators" */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Financial Calculators
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Choose from our comprehensive suite of {calculators.length} calculators to plan your financial future
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-orange-500 rounded"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded mx-2"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-transparent rounded"></div>
          </div>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {calculators.map((calc, index) => (
            <motion.div
              key={calc.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={calc.path}
                className="block bg-white rounded-2xl p-6 shadow-warm border-2 border-orange-100 hover:border-orange-300 hover:shadow-warm-lg transition-all duration-300 group h-full"
              >
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${calc.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                  <calc.icon className="text-white text-2xl" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {calc.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {calc.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-orange-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Calculate Now</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-warm-lg border-2 border-orange-100"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Why Use Our Calculators?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Make informed financial decisions with our accurate and easy-to-use calculators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                <span className="text-white text-xl font-bold">✓</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Accurate Results</h3>
              <p className="text-gray-600 text-sm">Based on current market standards and regulations</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                <span className="text-white text-xl font-bold">⚡</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Instant Calculations</h3>
              <p className="text-gray-600 text-sm">Get real-time results for quick decisions</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                <span className="text-white text-xl font-bold">📊</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Visual Insights</h3>
              <p className="text-gray-600 text-sm">Charts and graphs for better understanding</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-center shadow-warm-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Expert Guidance?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
            Our financial advisors are here to help you make the best investment decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              Book Free Consultation
            </Link>
            <a
              href="https://wa.me/919377277793"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2" />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Calculators;

