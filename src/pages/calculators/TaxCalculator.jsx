// src/pages/calculators/TaxCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileInvoiceDollar, 
  FaRupeeSign, 
  FaUser, 
  FaHome,
  FaUniversity,
  FaHeartbeat,
  FaChartBar,
  FaInfoCircle,
  FaPiggyBank,
  FaExchangeAlt,
  FaCalculator,
  FaCheckCircle
} from 'react-icons/fa';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TaxCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [age, setAge] = useState(30);
  const [section80C, setSection80C] = useState(150000);
  const [section80D, setSection80D] = useState(25000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(200000);
  const [otherDeductions, setOtherDeductions] = useState(50000);
  const [activeTab, setActiveTab] = useState('comparison');

  // Old Tax Regime Calculation
  const calculateOldRegime = () => {
    const income = annualIncome;
    const deductions = Math.min(section80C, 150000) + section80D + Math.min(homeLoanInterest, 200000) + otherDeductions;
    const taxableIncome = Math.max(0, income - deductions);
    
    let tax = 0;
    
    // Tax slabs based on age
    if (age < 60) {
      // Below 60
      if (taxableIncome > 250000) tax += Math.min(250000, taxableIncome - 250000) * 0.05;
      if (taxableIncome > 500000) tax += Math.min(250000, taxableIncome - 500000) * 0.20;
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
    } else if (age >= 60 && age < 80) {
      // Senior citizen (60-80)
      if (taxableIncome > 300000) tax += Math.min(200000, taxableIncome - 300000) * 0.05;
      if (taxableIncome > 500000) tax += Math.min(500000, taxableIncome - 500000) * 0.20;
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
    } else {
      // Super senior citizen (80+)
      if (taxableIncome > 500000) tax += Math.min(500000, taxableIncome - 500000) * 0.20;
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
    }
    
    // Add cess
    tax = tax + (tax * 0.04);
    
    return {
      taxableIncome: Math.round(taxableIncome),
      totalDeductions: Math.round(deductions),
      taxPayable: Math.round(tax),
      netIncome: Math.round(income - tax)
    };
  };

  // New Tax Regime Calculation
  const calculateNewRegime = () => {
    const income = annualIncome;
    const taxableIncome = income; // No deductions in new regime
    
    let tax = 0;
    
    // New regime slabs (FY 2023-24)
    if (taxableIncome > 300000) tax += Math.min(300000, taxableIncome - 300000) * 0.05;
    if (taxableIncome > 600000) tax += Math.min(300000, taxableIncome - 600000) * 0.10;
    if (taxableIncome > 900000) tax += Math.min(300000, taxableIncome - 900000) * 0.15;
    if (taxableIncome > 1200000) tax += Math.min(300000, taxableIncome - 1200000) * 0.20;
    if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
    
    // Rebate under section 87A
    if (taxableIncome <= 700000) {
      tax = 0;
    }
    
    // Add cess
    tax = tax + (tax * 0.04);
    
    return {
      taxableIncome: Math.round(taxableIncome),
      totalDeductions: 0,
      taxPayable: Math.round(tax),
      netIncome: Math.round(income - tax)
    };
  };

  const oldRegime = calculateOldRegime();
  const newRegime = calculateNewRegime();
  const savings = oldRegime.taxPayable - newRegime.taxPayable;
  const betterRegime = savings > 0 ? 'New Regime' : 'Old Regime';

  // Comparison Bar Chart
  const comparisonBarData = {
    labels: ['Old Regime', 'New Regime'],
    datasets: [
      {
        label: 'Tax Payable',
        data: [oldRegime.taxPayable, newRegime.taxPayable],
        backgroundColor: ['rgba(239, 68, 68, 0.8)', 'rgba(34, 197, 94, 0.8)'],
        borderColor: ['rgb(239, 68, 68)', 'rgb(34, 197, 94)'],
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const comparisonBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context) {
            return 'Tax: ₹' + context.parsed.y.toLocaleString();
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(239, 68, 68, 0.1)' },
        ticks: {
          callback: function(value) {
            return '₹' + (value / 1000).toFixed(0) + 'K';
          },
          font: { size: 11 }
        }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, weight: 'bold' } }
      }
    }
  };

  // Income Breakdown Doughnut
  const doughnutData = {
    labels: ['Tax (Old)', 'Net Income (Old)'],
    datasets: [{
      data: [oldRegime.taxPayable, oldRegime.netIncome],
      backgroundColor: ['rgba(239, 68, 68, 0.8)', 'rgba(34, 197, 94, 0.8)'],
      borderColor: ['rgb(239, 68, 68)', 'rgb(34, 197, 94)'],
      borderWidth: 3,
      hoverOffset: 10
    }]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context) {
            const percentage = ((context.parsed / annualIncome) * 100).toFixed(1);
            return context.label + ': ₹' + (context.parsed / 100000).toFixed(2) + 'L (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Tax Slab Chart
  const slabBarData = {
    labels: ['0-3L', '3-6L', '6-9L', '9-12L', '12-15L', '>15L'],
    datasets: [
      {
        label: 'Old Regime Rate',
        data: [0, 5, 20, 20, 30, 30],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        borderRadius: 6
      },
      {
        label: 'New Regime Rate',
        data: [0, 5, 10, 15, 20, 30],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 6
      }
    ]
  };

  const slabBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + '%';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
        grid: { color: 'rgba(239, 68, 68, 0.1)' },
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          font: { size: 11 }
        }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } }
      }
    }
  };

  return (
    <div className="tax-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Annual Income */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaRupeeSign className="text-white" />
              </div>
              Annual Income
            </label>
            <input
              type="range"
              min="300000"
              max="5000000"
              step="50000"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹3L</span>
              <span className="text-2xl font-bold text-green-600">₹{(annualIncome / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">₹50L</span>
            </div>
          </motion.div>

          {/* Age */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaUser className="text-white" />
              </div>
              Your Age
            </label>
            <input
              type="range"
              min="18"
              max="85"
              step="1"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">18 Years</span>
              <span className="text-2xl font-bold text-blue-600">{age} Years</span>
              <span className="text-xs text-gray-600 font-semibold">85 Years</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {age < 60 ? 'Below 60' : age < 80 ? 'Senior Citizen (60-80)' : 'Super Senior (80+)'}
            </p>
          </motion.div>

          {/* Section 80C */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaPiggyBank className="text-white" />
              </div>
              Section 80C Investments
            </label>
            <input
              type="range"
              min="0"
              max="150000"
              step="10000"
              value={section80C}
              onChange={(e) => setSection80C(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-purple-600">₹{(section80C / 1000).toFixed(0)}K</span>
              <span className="text-xs text-gray-600 font-semibold">₹1.5L</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">PPF, EPF, ELSS, Life Insurance</p>
          </motion.div>

          {/* Section 80D */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaHeartbeat className="text-white" />
              </div>
              Section 80D (Health Insurance)
            </label>
            <input
              type="range"
              min="0"
              max="100000"
              step="5000"
              value={section80D}
              onChange={(e) => setSection80D(Number(e.target.value))}
              className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-red-600">₹{(section80D / 1000).toFixed(0)}K</span>
              <span className="text-xs text-gray-600 font-semibold">₹1L</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Medical Insurance Premium</p>
          </motion.div>

          {/* Home Loan Interest */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaHome className="text-white" />
              </div>
              Home Loan Interest
            </label>
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={homeLoanInterest}
              onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-orange-600">₹{(homeLoanInterest / 1000).toFixed(0)}K</span>
              <span className="text-xs text-gray-600 font-semibold">₹2L</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Section 24(b) - Max ₹2L</p>
          </motion.div>

          {/* Other Deductions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaUniversity className="text-white" />
              </div>
              Other Deductions
            </label>
            <input
              type="range"
              min="0"
              max="150000"
              step="10000"
              value={otherDeductions}
              onChange={(e) => setOtherDeductions(Number(e.target.value))}
              className="w-full h-3 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-cyan-600">₹{(otherDeductions / 1000).toFixed(0)}K</span>
              <span className="text-xs text-gray-600 font-semibold">₹1.5L</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">80E, 80G, NPS, etc.</p>
          </motion.div>
        </div>

        {/* Right Side - Results & Charts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 shadow-warm-lg text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <FaCheckCircle className="text-2xl mr-3" />
                  <h3 className="text-2xl font-bold">Best Option: {betterRegime}</h3>
                </div>
                <p className="text-lg">
                  Save ₹{Math.abs(savings).toLocaleString()} with {betterRegime}
                </p>
              </div>
              <FaExchangeAlt className="text-5xl opacity-50" />
            </div>
          </motion.div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Old Regime */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border-2 border-red-200 shadow-warm"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FaCalculator className="text-red-500 mr-2" />
                Old Tax Regime
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Income:</span>
                  <span className="font-bold">₹{(annualIncome / 100000).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deductions:</span>
                  <span className="font-bold text-green-600">-₹{(oldRegime.totalDeductions / 100000).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Taxable Income:</span>
                  <span className="font-bold">₹{(oldRegime.taxableIncome / 100000).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between bg-red-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-800">Tax Payable:</span>
                  <span className="font-bold text-red-600 text-xl">₹{(oldRegime.taxPayable / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Income:</span>
                  <span className="font-bold text-green-600">₹{(oldRegime.netIncome / 100000).toFixed(2)}L</span>
                </div>
              </div>
            </motion.div>

            {/* New Regime */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-warm"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FaChartBar className="text-green-500 mr-2" />
                New Tax Regime
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Income:</span>
                  <span className="font-bold">₹{(annualIncome / 100000).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deductions:</span>
                  <span className="font-bold text-gray-400">₹0</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Taxable Income:</span>
                  <span className="font-bold">₹{(newRegime.taxableIncome / 100000).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between bg-green-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-800">Tax Payable:</span>
                  <span className="font-bold text-green-600 text-xl">₹{(newRegime.taxPayable / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Income:</span>
                  <span className="font-bold text-green-600">₹{(newRegime.netIncome / 100000).toFixed(2)}L</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-green-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <button
                onClick={() => setActiveTab('comparison')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'comparison'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                Tax Comparison
              </button>
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'breakdown'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                Income Split
              </button>
              <button
                onClick={() => setActiveTab('slabs')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'slabs'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                Tax Slabs
              </button>
            </div>

            <div className="p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-80"
              >
                {activeTab === 'comparison' && (
                  <Bar data={comparisonBarData} options={comparisonBarOptions} />
                )}
                {activeTab === 'breakdown' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-80">
                      <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                  </div>
                )}
                {activeTab === 'slabs' && (
                  <Bar data={slabBarData} options={slabBarOptions} />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Tax Regime Comparison</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-bold text-gray-800 mb-2">Old Tax Regime:</p>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Allows all deductions (80C, 80D, etc.)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Higher tax rates on slabs
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Good if you have investments
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-2">New Tax Regime:</p>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    No deductions allowed
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Lower tax rates
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Better for those without investments
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaxCalculator;
