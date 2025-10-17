// src/pages/calculators/VacationCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlane, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaHotel,
  FaUtensils,
  FaShoppingBag,
  FaTaxi,
  FaChartLine,
  FaInfoCircle,
  FaPiggyBank,
  FaMapMarkedAlt,
  FaUmbrellaBeach
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

const VacationCalculator = () => {
  const [destination, setDestination] = useState('domestic'); // domestic, international
  const [tripType, setTripType] = useState('budget'); // budget, standard, luxury
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [tripDuration, setTripDuration] = useState(7);
  const [monthsToTrip, setMonthsToTrip] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [activeTab, setActiveTab] = useState('breakdown');

  // Trip cost estimates (per person per day)
  const tripCosts = {
    domestic: {
      budget: { flight: 8000, hotel: 2000, food: 1000, activities: 1500, transport: 500, shopping: 1000 },
      standard: { flight: 15000, hotel: 4000, food: 2000, activities: 3000, transport: 1000, shopping: 2000 },
      luxury: { flight: 30000, hotel: 8000, food: 4000, activities: 5000, transport: 2000, shopping: 4000 }
    },
    international: {
      budget: { flight: 35000, hotel: 5000, food: 2500, activities: 3000, transport: 1500, shopping: 2000 },
      standard: { flight: 60000, hotel: 10000, food: 5000, activities: 6000, transport: 3000, shopping: 4000 },
      luxury: { flight: 120000, hotel: 20000, food: 10000, activities: 12000, transport: 6000, shopping: 8000 }
    }
  };

  // Calculate Vacation Cost
  const calculateVacation = () => {
    const costs = tripCosts[destination][tripType];
    
    // Flight is one-time, others are per day
    const flightCost = costs.flight * numberOfPeople;
    const hotelCost = costs.hotel * tripDuration * numberOfPeople;
    const foodCost = costs.food * tripDuration * numberOfPeople;
    const activitiesCost = costs.activities * tripDuration * numberOfPeople;
    const transportCost = costs.transport * tripDuration * numberOfPeople;
    const shoppingCost = costs.shopping * numberOfPeople;
    
    // Contingency (10%)
    const subtotal = flightCost + hotelCost + foodCost + activitiesCost + transportCost + shoppingCost;
    const contingency = subtotal * 0.10;
    const totalCost = subtotal + contingency;
    
    // Savings calculation
    const futureValueOfSavings = currentSavings * Math.pow(1 + expectedReturn / 100 / 12, monthsToTrip);
    const savingsGap = Math.max(0, totalCost - futureValueOfSavings);
    
    // Monthly SIP needed
    const monthlyRate = expectedReturn / 12 / 100;
    const monthlySIP = savingsGap > 0 && monthsToTrip > 0
      ? (savingsGap * monthlyRate) / (Math.pow(1 + monthlyRate, monthsToTrip) - 1)
      : 0;
    
    return {
      breakdown: {
        flight: Math.round(flightCost),
        hotel: Math.round(hotelCost),
        food: Math.round(foodCost),
        activities: Math.round(activitiesCost),
        transport: Math.round(transportCost),
        shopping: Math.round(shoppingCost),
        contingency: Math.round(contingency)
      },
      totalCost: Math.round(totalCost),
      costPerPerson: Math.round(totalCost / numberOfPeople),
      costPerDay: Math.round(totalCost / tripDuration),
      futureValueOfSavings: Math.round(futureValueOfSavings),
      savingsGap: Math.round(savingsGap),
      monthlySIP: Math.round(monthlySIP),
      totalInvestmentNeeded: Math.round(monthlySIP * monthsToTrip)
    };
  };

  const results = calculateVacation();

  // Cost Breakdown Bar Chart
  const breakdownBarData = {
    labels: ['Flights', 'Hotels', 'Food', 'Activities', 'Transport', 'Shopping', 'Buffer'],
    datasets: [{
      label: 'Vacation Expenses',
      data: [
        results.breakdown.flight,
        results.breakdown.hotel,
        results.breakdown.food,
        results.breakdown.activities,
        results.breakdown.transport,
        results.breakdown.shopping,
        results.breakdown.contingency
      ],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(156, 163, 175, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(236, 72, 153)',
        'rgb(251, 146, 60)',
        'rgb(168, 85, 247)',
        'rgb(34, 197, 94)',
        'rgb(234, 179, 8)',
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
            const percentage = ((context.parsed.y / results.totalCost) * 100).toFixed(1);
            return 'Cost: ₹' + (context.parsed.y / 1000).toFixed(0) + 'K (' + percentage + '%)';
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
            return '₹' + (value / 1000).toFixed(0) + 'K';
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

  // Savings Distribution Doughnut
  const doughnutData = {
    labels: ['Current Savings', 'SIP Needed', 'Remaining Gap'],
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
            const percentage = ((context.parsed / results.totalCost) * 100).toFixed(1);
            return context.label + ': ₹' + (context.parsed / 1000).toFixed(0) + 'K (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Savings Growth Line Chart
  const growthChartData = {
    labels: Array.from({ length: monthsToTrip + 1 }, (_, i) => `Month ${i}`),
    datasets: [
      {
        label: 'Trip Cost',
        data: Array.from({ length: monthsToTrip + 1 }, () => results.totalCost),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        tension: 0,
        borderDash: [10, 5],
        pointRadius: 0
      },
      {
        label: 'Your Savings',
        data: Array.from({ length: monthsToTrip + 1 }, (_, i) => {
          const monthlyRate = expectedReturn / 12 / 100;
          const savingsGrowth = currentSavings * Math.pow(1 + monthlyRate, i);
          const sipGrowth = results.monthlySIP > 0 && i > 0
            ? results.monthlySIP * ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate) * (1 + monthlyRate)
            : 0;
          return Math.round(savingsGrowth + sipGrowth);
        }),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
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
            return context.dataset.label + ': ₹' + (context.parsed.y / 1000).toFixed(0) + 'K';
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
            return '₹' + (value / 1000).toFixed(0) + 'K';
          },
          font: { size: 11 }
        }
      },
      x: {
        grid: { display: false },
        ticks: { 
          font: { size: 9 },
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <div className="vacation-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Destination */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaMapMarkedAlt className="text-white" />
              </div>
              Destination
            </label>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => setDestination('domestic')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  destination === 'domestic'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                Domestic
              </button>
              <button
                onClick={() => setDestination('international')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  destination === 'international'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                International
              </button>
            </div>
          </motion.div>

          {/* Trip Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaUmbrellaBeach className="text-white" />
              </div>
              Trip Type
            </label>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <button
                onClick={() => setTripType('budget')}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  tripType === 'budget'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                Budget
              </button>
              <button
                onClick={() => setTripType('standard')}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  tripType === 'standard'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setTripType('luxury')}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  tripType === 'luxury'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-warm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                Luxury
              </button>
            </div>
          </motion.div>

          {/* Number of People */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaPlane className="text-white" />
              </div>
              Number of Travelers
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Person</span>
              <span className="text-2xl font-bold text-green-600">{numberOfPeople} {numberOfPeople === 1 ? 'Person' : 'People'}</span>
              <span className="text-xs text-gray-600 font-semibold">10 People</span>
            </div>
          </motion.div>

          {/* Trip Duration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaCalendarAlt className="text-white" />
              </div>
              Trip Duration
            </label>
            <input
              type="range"
              min="3"
              max="30"
              step="1"
              value={tripDuration}
              onChange={(e) => setTripDuration(Number(e.target.value))}
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">3 Days</span>
              <span className="text-2xl font-bold text-orange-600">{tripDuration} Days</span>
              <span className="text-xs text-gray-600 font-semibold">30 Days</span>
            </div>
          </motion.div>

          {/* Months to Trip */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaCalendarAlt className="text-white" />
              </div>
              Months Until Trip
            </label>
            <input
              type="range"
              min="1"
              max="36"
              step="1"
              value={monthsToTrip}
              onChange={(e) => setMonthsToTrip(Number(e.target.value))}
              className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Month</span>
              <span className="text-2xl font-bold text-red-600">{monthsToTrip} Months</span>
              <span className="text-xs text-gray-600 font-semibold">3 Years</span>
            </div>
          </motion.div>

          {/* Current Savings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaPiggyBank className="text-white" />
              </div>
              Current Vacation Savings
            </label>
            <input
              type="range"
              min="0"
              max="500000"
              step="10000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-indigo-600">₹{(currentSavings / 1000).toFixed(0)}K</span>
              <span className="text-xs text-gray-600 font-semibold">₹5L</span>
            </div>
          </motion.div>

          {/* Expected Return */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <FaChartLine className="text-cyan-600 mr-2" />
              Expected Returns
            </label>
            <input
              type="range"
              min="6"
              max="15"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <p className="text-center text-xl font-bold text-cyan-600 mt-2">{expectedReturn}%</p>
          </motion.div>
        </div>

        {/* Right Side - Results & Charts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaPlane className="text-3xl" />
                <span className="text-xs font-bold uppercase">Total Cost</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.totalCost / 1000).toFixed(0)}K</p>
              <p className="text-sm opacity-90 mt-1">Complete trip for {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}</p>
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
              className="bg-white rounded-xl p-6 border-2 border-orange-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaUtensils className="text-3xl text-orange-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Per Person</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">₹{(results.costPerPerson / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-600 mt-1">Cost per traveler</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaCalendarAlt className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Per Day</span>
              </div>
              <p className="text-2xl font-bold text-green-600">₹{(results.costPerDay / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-600 mt-1">Daily budget</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-blue-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'breakdown'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Cost Breakdown
              </button>
              <button
                onClick={() => setActiveTab('savings')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'savings'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Savings Plan
              </button>
              <button
                onClick={() => setActiveTab('growth')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'growth'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Savings Growth
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
        className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Vacation Planning Tips</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Smart tips to make your dream vacation affordable:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Book Early:</strong> Flights and hotels are cheaper 3-6 months in advance
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Off-Season Travel:</strong> Save 30-50% by traveling during off-peak times
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>SIP Planning:</strong> Start saving monthly to avoid last-minute loans
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>10% Buffer:</strong> Always keep contingency for unexpected expenses
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VacationCalculator;
