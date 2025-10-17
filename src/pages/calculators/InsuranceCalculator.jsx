// src/pages/calculators/InsuranceCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUmbrella, 
  FaRupeeSign, 
  FaUser, 
  FaPercentage,
  FaHome,
  FaGraduationCap,
  FaChartLine,
  FaInfoCircle,
  FaUsers,
  FaShieldAlt,
  FaExclamationTriangle,
  FaHeartbeat
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

const InsuranceCalculator = () => {
  const [age, setAge] = useState(30);
  const [annualIncome, setAnnualIncome] = useState(600000);
  const [existingLoans, setExistingLoans] = useState(2000000);
  const [dependents, setDependents] = useState(2);
  const [yearsOfSupport, setYearsOfSupport] = useState(20);
  const [inflationRate, setInflationRate] = useState(6);
  const [returnRate, setReturnRate] = useState(8);
  const [activeTab, setActiveTab] = useState('breakdown');

  // Calculate Insurance Requirement
  const calculateInsurance = () => {
    // Income replacement method
    const incomeMultiplier = 15; // Standard 10-15 times annual income
    const incomeReplacement = annualIncome * incomeMultiplier;
    
    // Human Life Value Method
    const futureIncomeNeeds = calculateFutureNeeds();
    
    // Final expenses and emergency fund
    const finalExpenses = 500000; // Funeral, medical, etc.
    const emergencyFund = annualIncome * 0.5; // 6 months income
    
    // Children's education (if dependents)
    const educationCost = dependents > 0 ? dependents * 2000000 : 0;
    
    // Total required cover
    const totalCover = incomeReplacement + existingLoans + finalExpenses + emergencyFund + educationCost;
    
    // Minimum & maximum cover
    const minCover = annualIncome * 10;
    const maxCover = annualIncome * 20;
    
    // Monthly premium estimation (term insurance)
    const premiumPerLakh = age < 30 ? 400 : age < 40 ? 600 : age < 50 ? 1000 : 1500;
    const estimatedPremium = (totalCover / 100000) * (premiumPerLakh / 12);
    
    return {
      totalCover: Math.round(totalCover),
      incomeReplacement: Math.round(incomeReplacement),
      loans: existingLoans,
      finalExpenses: Math.round(finalExpenses + emergencyFund),
      educationCost,
      minCover: Math.round(minCover),
      maxCover: Math.round(maxCover),
      monthlyPremium: Math.round(estimatedPremium),
      annualPremium: Math.round(estimatedPremium * 12),
      coverageMultiplier: (totalCover / annualIncome).toFixed(1)
    };
  };

  const calculateFutureNeeds = () => {
    let totalNeeds = 0;
    const monthlyExpense = annualIncome * 0.7 / 12; // 70% of income for expenses
    
    for (let i = 0; i < yearsOfSupport; i++) {
      const inflatedExpense = monthlyExpense * Math.pow(1 + inflationRate / 100, i);
      const presentValue = (inflatedExpense * 12) / Math.pow(1 + returnRate / 100, i);
      totalNeeds += presentValue;
    }
    
    return totalNeeds;
  };

  const results = calculateInsurance();

  // Coverage Breakdown Bar Chart
  const breakdownBarData = {
    labels: ['Income\nReplacement', 'Loans', 'Final\nExpenses', 'Education'],
    datasets: [{
      label: 'Coverage Components',
      data: [
        results.incomeReplacement,
        results.loans,
        results.finalExpenses,
        results.educationCost
      ],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(16, 185, 129, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(239, 68, 68)',
        'rgb(251, 146, 60)',
        'rgb(16, 185, 129)'
      ],
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  const breakdownBarOptions = {
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
            return 'Amount: ₹' + (context.parsed.y / 10000000).toFixed(2) + 'Cr';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(59, 130, 246, 0.1)' },
        ticks: {
          callback: function(value) {
            return '₹' + (value / 10000000).toFixed(1) + 'Cr';
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

  // Coverage Distribution Doughnut
  const doughnutData = {
    labels: ['Income Replacement', 'Loans', 'Final Expenses', 'Education'],
    datasets: [{
      data: [
        results.incomeReplacement,
        results.loans,
        results.finalExpenses,
        results.educationCost
      ],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(16, 185, 129, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(239, 68, 68)',
        'rgb(251, 146, 60)',
        'rgb(16, 185, 129)'
      ],
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
          font: { size: 11, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context) {
            const percentage = ((context.parsed / results.totalCover) * 100).toFixed(1);
            return context.label + ': ₹' + (context.parsed / 10000000).toFixed(2) + 'Cr (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Age vs Premium Line Chart
  const ageVsPremiumData = {
    labels: Array.from({ length: 11 }, (_, i) => `${age + (i * 5)} yrs`),
    datasets: [{
      label: 'Monthly Premium',
      data: Array.from({ length: 11 }, (_, i) => {
        const futureAge = age + (i * 5);
        const premiumPerLakh = futureAge < 30 ? 400 : futureAge < 40 ? 600 : futureAge < 50 ? 1000 : futureAge < 60 ? 1500 : 2000;
        return Math.round((results.totalCover / 100000) * (premiumPerLakh / 12));
      }),
      borderColor: 'rgb(139, 92, 246)',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: 'rgb(139, 92, 246)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  };

  const ageVsPremiumOptions = {
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
            return 'Premium: ₹' + context.parsed.y.toLocaleString() + '/month';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(139, 92, 246, 0.1)' },
        ticks: {
          callback: function(value) {
            return '₹' + (value / 1000).toFixed(0) + 'K';
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
    <div className="insurance-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Age */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
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
              max="65"
              step="1"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">18 Years</span>
              <span className="text-2xl font-bold text-blue-600">{age} Years</span>
              <span className="text-xs text-gray-600 font-semibold">65 Years</span>
            </div>
          </motion.div>

          {/* Annual Income */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
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
              max="10000000"
              step="100000"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹3L</span>
              <span className="text-2xl font-bold text-green-600">₹{(annualIncome / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">₹1Cr</span>
            </div>
          </motion.div>

          {/* Existing Loans */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaHome className="text-white" />
              </div>
              Existing Loans
            </label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={existingLoans}
              onChange={(e) => setExistingLoans(Number(e.target.value))}
              className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-red-600">₹{(existingLoans / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">₹1Cr</span>
            </div>
          </motion.div>

          {/* Dependents */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaUsers className="text-white" />
              </div>
              Number of Dependents
            </label>
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              value={dependents}
              onChange={(e) => setDependents(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">0</span>
              <span className="text-2xl font-bold text-purple-600">{dependents}</span>
              <span className="text-xs text-gray-600 font-semibold">6</span>
            </div>
          </motion.div>

          {/* Years of Support */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaGraduationCap className="text-white" />
              </div>
              Years of Support Needed
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={yearsOfSupport}
              onChange={(e) => setYearsOfSupport(Number(e.target.value))}
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">5 Years</span>
              <span className="text-2xl font-bold text-orange-600">{yearsOfSupport} Years</span>
              <span className="text-xs text-gray-600 font-semibold">40 Years</span>
            </div>
          </motion.div>

          {/* Rates */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 shadow-warm"
            >
              <label className="flex items-center text-gray-700 font-bold mb-4">
                <FaPercentage className="text-cyan-600 mr-2" />
                Inflation
              </label>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <p className="text-center text-xl font-bold text-cyan-600 mt-2">{inflationRate}%</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border-2 border-teal-200 shadow-warm"
            >
              <label className="flex items-center text-gray-700 font-bold mb-4">
                <FaChartLine className="text-teal-600 mr-2" />
                Returns
              </label>
              <input
                type="range"
                min="6"
                max="15"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <p className="text-center text-xl font-bold text-teal-600 mt-2">{returnRate}%</p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Results & Charts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaShieldAlt className="text-3xl" />
                <span className="text-xs font-bold uppercase">Recommended</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.totalCover / 10000000).toFixed(2)}Cr</p>
              <p className="text-sm opacity-90 mt-1">{results.coverageMultiplier}x your annual income</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaRupeeSign className="text-3xl" />
                <span className="text-xs font-bold uppercase">Premium</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.monthlyPremium / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-90 mt-1">₹{(results.annualPremium / 100000).toFixed(2)}L per year</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border-2 border-blue-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaHeartbeat className="text-3xl text-blue-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Min Cover</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">₹{(results.minCover / 10000000).toFixed(2)}Cr</p>
              <p className="text-xs text-gray-600 mt-1">10x annual income</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaUmbrella className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Max Cover</span>
              </div>
              <p className="text-2xl font-bold text-green-600">₹{(results.maxCover / 10000000).toFixed(2)}Cr</p>
              <p className="text-xs text-gray-600 mt-1">20x annual income</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-blue-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'breakdown'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Coverage Breakdown
              </button>
              <button
                onClick={() => setActiveTab('distribution')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'distribution'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Distribution
              </button>
              <button
                onClick={() => setActiveTab('premium')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'premium'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Age vs Premium
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
                {activeTab === 'breakdown' && (
                  <Bar data={breakdownBarData} options={breakdownBarOptions} />
                )}
                {activeTab === 'distribution' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-80">
                      <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                  </div>
                )}
                {activeTab === 'premium' && (
                  <Line data={ageVsPremiumData} options={ageVsPremiumOptions} />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Box */}
      {results.totalCover < results.minCover && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-300 shadow-warm"
        >
          <div className="flex items-center">
            <FaExclamationTriangle className="text-3xl text-yellow-600 mr-4" />
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Coverage Alert</h4>
              <p className="text-sm text-gray-600">
                Your recommended coverage is below the minimum suggested amount. Consider increasing your coverage for better financial protection.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">How We Calculate Your Insurance Need</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We use a comprehensive approach combining multiple methods:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Income Replacement:</strong> 15x your annual income to support your family
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Debt Coverage:</strong> All existing loans should be covered
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Future Needs:</strong> Children's education, inflation-adjusted expenses
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Emergency Fund:</strong> Final expenses and 6 months income buffer
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsuranceCalculator;
