// src/pages/calculators/EducationCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaChild,
  FaBook,
  FaUniversity,
  FaGlobe,
  FaChartLine,
  FaInfoCircle,
  FaPiggyBank,
  FaUserGraduate,
  FaLaptop
} from 'react-icons/fa';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
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

const EducationCalculator = () => {
  const [childAge, setChildAge] = useState(5);
  const [educationType, setEducationType] = useState('engineering'); // engineering, medical, mba, abroad
  const [educationLocation, setEducationLocation] = useState('india'); // india, abroad
  const [inflationRate, setInflationRate] = useState(8);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(200000);
  const [activeTab, setActiveTab] = useState('breakdown');

  // Education costs (current)
  const educationCosts = {
    engineering: {
      india: { tuition: 800000, hostel: 300000, books: 100000, misc: 200000 },
      abroad: { tuition: 5000000, hostel: 2000000, books: 300000, misc: 500000 }
    },
    medical: {
      india: { tuition: 1500000, hostel: 400000, books: 200000, misc: 300000 },
      abroad: { tuition: 8000000, hostel: 3000000, books: 400000, misc: 800000 }
    },
    mba: {
      india: { tuition: 1200000, hostel: 300000, books: 150000, misc: 250000 },
      abroad: { tuition: 6000000, hostel: 2500000, books: 350000, misc: 600000 }
    },
    abroad: {
      india: { tuition: 1000000, hostel: 350000, books: 150000, misc: 250000 },
      abroad: { tuition: 7000000, hostel: 2800000, books: 380000, misc: 700000 }
    }
  };

  // Calculate education planning
  const calculateEducation = () => {
    // Age when education starts
    const educationStartAge = {
      engineering: 18,
      medical: 18,
      mba: 23,
      abroad: 18
    };

    const yearsToEducation = educationStartAge[educationType] - childAge;
    
    if (yearsToEducation <= 0) {
      return {
        yearsToEducation: 0,
        currentCost: 0,
        futureCost: 0,
        futureValueOfSavings: 0,
        savingsGap: 0,
        monthlySIP: 0,
        totalInvestmentNeeded: 0,
        breakdown: { tuition: 0, hostel: 0, books: 0, misc: 0 }
      };
    }

    const costs = educationCosts[educationType][educationLocation];
    const currentTotalCost = costs.tuition + costs.hostel + costs.books + costs.misc;
    
    // Future cost with inflation
    const futureCost = currentTotalCost * Math.pow(1 + inflationRate / 100, yearsToEducation);
    
    // Future value of current savings
    const futureValueOfSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToEducation);
    
    // Gap
    const savingsGap = Math.max(0, futureCost - futureValueOfSavings);
    
    // Monthly SIP needed
    const monthlyRate = expectedReturn / 12 / 100;
    const months = yearsToEducation * 12;
    const monthlySIP = savingsGap > 0 && months > 0
      ? (savingsGap * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
      : 0;
    
    return {
      yearsToEducation,
      currentCost: Math.round(currentTotalCost),
      futureCost: Math.round(futureCost),
      futureValueOfSavings: Math.round(futureValueOfSavings),
      savingsGap: Math.round(savingsGap),
      monthlySIP: Math.round(monthlySIP),
      totalInvestmentNeeded: Math.round(monthlySIP * months),
      breakdown: {
        tuition: Math.round(costs.tuition * Math.pow(1 + inflationRate / 100, yearsToEducation)),
        hostel: Math.round(costs.hostel * Math.pow(1 + inflationRate / 100, yearsToEducation)),
        books: Math.round(costs.books * Math.pow(1 + inflationRate / 100, yearsToEducation)),
        misc: Math.round(costs.misc * Math.pow(1 + inflationRate / 100, yearsToEducation))
      }
    };
  };

  const results = calculateEducation();

  // Cost Breakdown Bar Chart
  const breakdownBarData = {
    labels: ['Tuition Fees', 'Hostel/Living', 'Books/Material', 'Miscellaneous'],
    datasets: [{
      label: 'Education Expenses',
      data: [
        results.breakdown.tuition,
        results.breakdown.hostel,
        results.breakdown.books,
        results.breakdown.misc
      ],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(168, 85, 247)',
        'rgb(34, 197, 94)',
        'rgb(251, 146, 60)'
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
            const percentage = ((context.parsed.y / results.futureCost) * 100).toFixed(1);
            return 'Cost: ₹' + (context.parsed.y / 100000).toFixed(2) + 'L (' + percentage + '%)';
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
            return '₹' + (value / 100000).toFixed(0) + 'L';
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

  // Savings Distribution Doughnut
  const doughnutData = {
    labels: ['Current Savings', 'SIP Investment', 'Remaining Gap'],
    datasets: [{
      data: [
        results.futureValueOfSavings,
        results.totalInvestmentNeeded,
        Math.max(0, results.savingsGap - results.totalInvestmentNeeded)
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(59, 130, 246)',
        'rgb(239, 68, 68)'
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
            const percentage = ((context.parsed / results.futureCost) * 100).toFixed(1);
            return context.label + ': ₹' + (context.parsed / 100000).toFixed(2) + 'L (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Growth Projection Line Chart
  const growthChartData = {
    labels: Array.from({ length: results.yearsToEducation + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Education Cost (Inflated)',
        data: Array.from({ length: results.yearsToEducation + 1 }, (_, i) =>
          Math.round(results.currentCost * Math.pow(1 + inflationRate / 100, i))
        ),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Your Savings',
        data: Array.from({ length: results.yearsToEducation + 1 }, (_, i) => {
          const monthlyRate = expectedReturn / 12 / 100;
          const months = i * 12;
          const savingsGrowth = currentSavings * Math.pow(1 + expectedReturn / 100, i);
          const sipGrowth = results.monthlySIP > 0 && months > 0
            ? results.monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
            : 0;
          return Math.round(savingsGrowth + sipGrowth);
        }),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const growthChartOptions = {
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
            return context.dataset.label + ': ₹' + (context.parsed.y / 100000).toFixed(2) + 'L';
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
            return '₹' + (value / 100000).toFixed(0) + 'L';
          },
          font: { size: 11 }
        }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } }
      }
    }
  };

  return (
    <div className="education-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Child Age */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaChild className="text-white" />
              </div>
              Child's Current Age
            </label>
            <input
              type="range"
              min="0"
              max="18"
              step="1"
              value={childAge}
              onChange={(e) => setChildAge(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">0 Years</span>
              <span className="text-2xl font-bold text-blue-600">{childAge} Years</span>
              <span className="text-xs text-gray-600 font-semibold">18 Years</span>
            </div>
          </motion.div>

          {/* Education Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaGraduationCap className="text-white" />
              </div>
              Course Type
            </label>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => setEducationType('engineering')}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  educationType === 'engineering'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                Engineering
              </button>
              <button
                onClick={() => setEducationType('medical')}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  educationType === 'medical'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                Medical
              </button>
              <button
                onClick={() => setEducationType('mba')}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  educationType === 'mba'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                MBA
              </button>
              <button
                onClick={() => setEducationType('abroad')}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  educationType === 'abroad'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                General
              </button>
            </div>
          </motion.div>

          {/* Education Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaGlobe className="text-white" />
              </div>
              Education Location
            </label>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => setEducationLocation('india')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  educationLocation === 'india'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300'
                }`}
              >
                India
              </button>
              <button
                onClick={() => setEducationLocation('abroad')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  educationLocation === 'abroad'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300'
                }`}
              >
                Abroad
              </button>
            </div>
          </motion.div>

          {/* Current Savings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaPiggyBank className="text-white" />
              </div>
              Current Education Savings
            </label>
            <input
              type="range"
              min="0"
              max="3000000"
              step="50000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full h-3 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-yellow-600">₹{(currentSavings / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">₹30L</span>
            </div>
          </motion.div>

          {/* Rates */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200 shadow-warm"
            >
              <label className="flex items-center text-gray-700 font-bold mb-4">
                <FaPercentage className="text-red-600 mr-2" />
                Inflation
              </label>
              <input
                type="range"
                min="6"
                max="15"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <p className="text-center text-xl font-bold text-red-600 mt-2">{inflationRate}%</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 shadow-warm"
            >
              <label className="flex items-center text-gray-700 font-bold mb-4">
                <FaChartLine className="text-cyan-600 mr-2" />
                Returns
              </label>
              <input
                type="range"
                min="8"
                max="18"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <p className="text-center text-xl font-bold text-cyan-600 mt-2">{expectedReturn}%</p>
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
                <FaGraduationCap className="text-3xl" />
                <span className="text-xs font-bold uppercase">Total Cost</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.futureCost / 100000).toFixed(2)}L</p>
              <p className="text-sm opacity-90 mt-1">In {results.yearsToEducation} years</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaRupeeSign className="text-3xl" />
                <span className="text-xs font-bold uppercase">Monthly SIP</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.monthlySIP / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-90 mt-1">Investment needed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaPiggyBank className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Savings</span>
              </div>
              <p className="text-2xl font-bold text-green-600">₹{(results.futureValueOfSavings / 100000).toFixed(2)}L</p>
              <p className="text-xs text-gray-600 mt-1">Future value</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border-2 border-orange-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaCalendarAlt className="text-3xl text-orange-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Time Left</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">{results.yearsToEducation} Years</p>
              <p className="text-xs text-gray-600 mt-1">Until education starts</p>
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
                Cost Breakdown
              </button>
              <button
                onClick={() => setActiveTab('savings')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'savings'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Savings Plan
              </button>
              <button
                onClick={() => setActiveTab('growth')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'growth'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Growth Path
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
                {activeTab === 'savings' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-80">
                      <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                  </div>
                )}
                {activeTab === 'growth' && (
                  <Line data={growthChartData} options={growthChartOptions} />
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
        className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Child Education Planning Tips</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Start planning early for your child's bright future:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Start Early:</strong> Begin saving from birth to reduce monthly burden
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Equity Exposure:</strong> Higher allocation to equity for long-term goals
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Education Inflation:</strong> Education costs rise 8-10% annually
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Diversify:</strong> Use combination of mutual funds, PPF, and Sukanya Samriddhi
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EducationCalculator;
