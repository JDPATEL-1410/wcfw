// src/pages/calculators/MarriageCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaRing, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaUsers,
  FaCamera,
  FaHotel,
  FaMusic,
  FaGem,
  FaChartLine,
  FaInfoCircle,
  FaPiggyBank,
  FaUtensils,
  FaCar
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

const MarriageCalculator = () => {
  const [yearsToMarriage, setYearsToMarriage] = useState(3);
  const [numberOfGuests, setNumberOfGuests] = useState(300);
  const [venueType, setVenueType] = useState('luxury'); // budget, standard, luxury
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [activeTab, setActiveTab] = useState('breakdown');

  // Calculate wedding costs
  const calculateWeddingCost = () => {
    const guests = numberOfGuests;
    
    // Per guest costs based on venue type
    const perGuestCost = {
      budget: 1500,
      standard: 2500,
      luxury: 4000
    };
    
    const foodCost = guests * perGuestCost[venueType];
    
    // Fixed costs
    const venueCosts = {
      budget: 200000,
      standard: 500000,
      luxury: 1000000
    };
    
    const photographyCosts = {
      budget: 50000,
      standard: 150000,
      luxury: 300000
    };
    
    const decorationCosts = {
      budget: 100000,
      standard: 300000,
      luxury: 600000
    };
    
    const jewelryCosts = {
      budget: 300000,
      standard: 600000,
      luxury: 1000000
    };
    
    const clothingCosts = {
      budget: 100000,
      standard: 200000,
      luxury: 400000
    };
    
    const entertainmentCosts = {
      budget: 50000,
      standard: 150000,
      luxury: 300000
    };
    
    const cardsCosts = {
      budget: 20000,
      standard: 40000,
      luxury: 80000
    };
    
    const transportCosts = {
      budget: 50000,
      standard: 100000,
      luxury: 200000
    };
    
    const miscellaneous = {
      budget: 50000,
      standard: 100000,
      luxury: 200000
    };
    
    const currentCost = 
      foodCost +
      venueCosts[venueType] +
      photographyCosts[venueType] +
      decorationCosts[venueType] +
      jewelryCosts[venueType] +
      clothingCosts[venueType] +
      entertainmentCosts[venueType] +
      cardsCosts[venueType] +
      transportCosts[venueType] +
      miscellaneous[venueType];
    
    // Future cost with inflation
    const futureCost = currentCost * Math.pow(1 + inflationRate / 100, yearsToMarriage);
    
    // Future value of current savings
    const futureValueOfSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToMarriage);
    
    // Gap
    const savingsGap = Math.max(0, futureCost - futureValueOfSavings);
    
    // Monthly SIP needed
    const monthlyRate = expectedReturn / 12 / 100;
    const months = yearsToMarriage * 12;
    const monthlySIP = savingsGap > 0 
      ? (savingsGap * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
      : 0;
    
    return {
      currentCost: Math.round(currentCost),
      futureCost: Math.round(futureCost),
      futureValueOfSavings: Math.round(futureValueOfSavings),
      savingsGap: Math.round(savingsGap),
      monthlySIP: Math.round(monthlySIP),
      totalInvestmentNeeded: Math.round(monthlySIP * months),
      breakdown: {
        food: Math.round(foodCost * Math.pow(1 + inflationRate / 100, yearsToMarriage)),
        venue: Math.round(venueCosts[venueType] * Math.pow(1 + inflationRate / 100, yearsToMarriage)),
        photography: Math.round(photographyCosts[venueType] * Math.pow(1 + inflationRate / 100, yearsToMarriage)),
        decoration: Math.round(decorationCosts[venueType] * Math.pow(1 + inflationRate / 100, yearsToMarriage)),
        jewelry: Math.round(jewelryCosts[venueType] * Math.pow(1 + inflationRate / 100, yearsToMarriage)),
        clothing: Math.round(clothingCosts[venueType] * Math.pow(1 + inflationRate / 100, yearsToMarriage)),
        entertainment: Math.round(entertainmentCosts[venueType] * Math.pow(1 + inflationRate / 100, yearsToMarriage)),
        cards: Math.round(cardsCosts[venueType] * Math.pow(1 + inflationRate / 100, yearsToMarriage)),
        transport: Math.round(transportCosts[venueType] * Math.pow(1 + inflationRate / 100, yearsToMarriage)),
        misc: Math.round(miscellaneous[venueType] * Math.pow(1 + inflationRate / 100, yearsToMarriage))
      }
    };
  };

  const results = calculateWeddingCost();

  // Cost Breakdown Bar Chart
  const breakdownBarData = {
    labels: ['Food', 'Venue', 'Photography', 'Decoration', 'Jewelry', 'Clothing', 'Entertainment', 'Other'],
    datasets: [{
      label: 'Wedding Expenses',
      data: [
        results.breakdown.food,
        results.breakdown.venue,
        results.breakdown.photography,
        results.breakdown.decoration,
        results.breakdown.jewelry,
        results.breakdown.clothing,
        results.breakdown.entertainment,
        results.breakdown.cards + results.breakdown.transport + results.breakdown.misc
      ],
      backgroundColor: [
        'rgba(251, 146, 60, 0.8)',
        'rgba(244, 63, 94, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(156, 163, 175, 0.8)'
      ],
      borderColor: [
        'rgb(251, 146, 60)',
        'rgb(244, 63, 94)',
        'rgb(139, 92, 246)',
        'rgb(236, 72, 153)',
        'rgb(234, 179, 8)',
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(156, 163, 175)'
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
        grid: { color: 'rgba(244, 63, 94, 0.1)' },
        ticks: {
          callback: function(value) {
            return '₹' + (value / 100000).toFixed(0) + 'L';
          },
          font: { size: 11 }
        }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 9 } }
      }
    }
  };

  // Savings vs Goal Doughnut
  const doughnutData = {
    labels: ['Current Savings', 'SIP Needed', 'Gap'],
    datasets: [{
      data: [results.futureValueOfSavings, results.totalInvestmentNeeded, Math.max(0, results.savingsGap - results.totalInvestmentNeeded)],
      backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(239, 68, 68, 0.8)'],
      borderColor: ['rgb(34, 197, 94)', 'rgb(59, 130, 246)', 'rgb(239, 68, 68)'],
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
            return context.label + ': ₹' + (context.parsed / 100000).toFixed(2) + 'L';
          }
        }
      }
    }
  };

  // Growth Chart
  const growthChartData = {
    labels: Array.from({ length: yearsToMarriage + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Wedding Cost (With Inflation)',
        data: Array.from({ length: yearsToMarriage + 1 }, (_, i) => 
          Math.round(results.currentCost * Math.pow(1 + inflationRate / 100, i))
        ),
        borderColor: 'rgb(244, 63, 94)',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Your Savings',
        data: Array.from({ length: yearsToMarriage + 1 }, (_, i) => {
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
        grid: { color: 'rgba(244, 63, 94, 0.1)' },
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
    <div className="marriage-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Years to Marriage */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaRing className="text-white" />
              </div>
              Years Until Wedding
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={yearsToMarriage}
              onChange={(e) => setYearsToMarriage(Number(e.target.value))}
              className="w-full h-3 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Year</span>
              <span className="text-2xl font-bold text-pink-600">{yearsToMarriage} Years</span>
              <span className="text-xs text-gray-600 font-semibold">15 Years</span>
            </div>
          </motion.div>

          {/* Number of Guests */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaUsers className="text-white" />
              </div>
              Number of Guests
            </label>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">50</span>
              <span className="text-2xl font-bold text-purple-600">{numberOfGuests}</span>
              <span className="text-xs text-gray-600 font-semibold">1000</span>
            </div>
          </motion.div>

          {/* Venue Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaHotel className="text-white" />
              </div>
              Wedding Type
            </label>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <button
                onClick={() => setVenueType('budget')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  venueType === 'budget'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-300'
                }`}
              >
                Budget
              </button>
              <button
                onClick={() => setVenueType('standard')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  venueType === 'standard'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-300'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setVenueType('luxury')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  venueType === 'luxury'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-300'
                }`}
              >
                Luxury
              </button>
            </div>
          </motion.div>

          {/* Current Savings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaPiggyBank className="text-white" />
              </div>
              Current Savings
            </label>
            <input
              type="range"
              min="0"
              max="5000000"
              step="50000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-green-600">₹{(currentSavings / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">₹50L</span>
            </div>
          </motion.div>

          {/* Rates */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200 shadow-warm"
            >
              <label className="flex items-center text-gray-700 font-bold mb-4">
                <FaPercentage className="text-red-600 mr-2" />
                Inflation
              </label>
              <input
                type="range"
                min="4"
                max="12"
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
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
            >
              <label className="flex items-center text-gray-700 font-bold mb-4">
                <FaChartLine className="text-blue-600 mr-2" />
                Returns
              </label>
              <input
                type="range"
                min="8"
                max="18"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-center text-xl font-bold text-blue-600 mt-2">{expectedReturn}%</p>
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
              className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaRing className="text-3xl" />
                <span className="text-xs font-bold uppercase">Wedding Cost</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.futureCost / 100000).toFixed(2)}L</p>
              <p className="text-sm opacity-90 mt-1">After {yearsToMarriage} years (with inflation)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaRupeeSign className="text-3xl" />
                <span className="text-xs font-bold uppercase">Monthly SIP</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.monthlySIP / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-90 mt-1">Investment needed per month</p>
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
              className="bg-white rounded-xl p-6 border-2 border-red-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaGem className="text-3xl text-red-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Gap</span>
              </div>
              <p className="text-2xl font-bold text-red-600">₹{(results.savingsGap / 100000).toFixed(2)}L</p>
              <p className="text-xs text-gray-600 mt-1">Amount needed</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-pink-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50">
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'breakdown'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'text-gray-600 hover:bg-pink-100'
                }`}
              >
                Cost Breakdown
              </button>
              <button
                onClick={() => setActiveTab('savings')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'savings'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'text-gray-600 hover:bg-pink-100'
                }`}
              >
                Savings Plan
              </button>
              <button
                onClick={() => setActiveTab('growth')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'growth'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'text-gray-600 hover:bg-pink-100'
                }`}
              >
                Growth Projection
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
        className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Wedding Planning Tips</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Start planning and saving early for your dream wedding:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                <strong>Start Early:</strong> Begin saving at least 2-3 years before the wedding
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                <strong>Budget Wisely:</strong> Prioritize expenses and avoid unnecessary splurging
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                <strong>Invest Smartly:</strong> Use SIP in equity mutual funds for better returns
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                <strong>Track Inflation:</strong> Wedding costs typically inflate 6-8% annually
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarriageCalculator;
