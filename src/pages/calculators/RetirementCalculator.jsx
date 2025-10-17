// src/pages/calculators/RetirementCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPiggyBank, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaUmbrella,
  FaChartLine,
  FaInfoCircle,
  FaUser,
  FaClock,
  FaHome,
  FaHospital
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

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const [currentMonthlyExpense, setCurrentMonthlyExpense] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [activeTab, setActiveTab] = useState('accumulation');

  // Calculate Retirement
  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    // Future monthly expense at retirement (adjusted for inflation)
    const futureMonthlyExpense = currentMonthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const futureYearlyExpense = futureMonthlyExpense * 12;
    
    // Corpus needed at retirement (considering inflation during retirement)
    let corpusNeeded = 0;
    for (let i = 0; i < yearsInRetirement; i++) {
      const yearExpense = futureYearlyExpense * Math.pow(1 + inflationRate / 100, i);
      const presentValue = yearExpense / Math.pow(1 + expectedReturn / 100, i);
      corpusNeeded += presentValue;
    }
    
    // Future value of current savings
    const futureValueOfSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    
    // Gap in corpus
    const corpusGap = corpusNeeded - futureValueOfSavings;
    
    // Monthly SIP needed to fill the gap
    const monthlyRate = expectedReturn / 12 / 100;
    const months = yearsToRetirement * 12;
    const monthlySIPNeeded = corpusGap > 0 
      ? (corpusGap * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
      : 0;
    
    return {
      corpusNeeded: Math.round(corpusNeeded),
      futureValueOfSavings: Math.round(futureValueOfSavings),
      corpusGap: Math.round(corpusGap),
      monthlySIPNeeded: Math.round(monthlySIPNeeded),
      futureMonthlyExpense: Math.round(futureMonthlyExpense),
      yearsToRetirement,
      yearsInRetirement,
      totalInvestmentNeeded: Math.round(monthlySIPNeeded * months)
    };
  };

  const results = calculateRetirement();

  // Accumulation Chart
  const accumulationChartData = {
    labels: Array.from({ length: results.yearsToRetirement + 1 }, (_, i) => 
      currentAge + i <= retirementAge ? `Age ${currentAge + i}` : ''
    ),
    datasets: [
      {
        label: 'Corpus Accumulation',
        data: Array.from({ length: results.yearsToRetirement + 1 }, (_, i) => {
          const monthlyRate = expectedReturn / 12 / 100;
          const months = i * 12;
          
          // Future value of current savings
          const savingsValue = currentSavings * Math.pow(1 + expectedReturn / 100, i);
          
          // Future value of SIP
          const sipValue = results.monthlySIPNeeded > 0 && months > 0
            ? results.monthlySIPNeeded * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
            : 0;
          
          return Math.round(savingsValue + sipValue);
        }),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Target Corpus',
        data: Array.from({ length: results.yearsToRetirement + 1 }, () => results.corpusNeeded),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        tension: 0,
        borderDash: [10, 5],
        pointRadius: 0
      }
    ]
  };

  const accumulationChartOptions = {
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
            return context.dataset.label + ': ₹' + (context.parsed.y / 10000000).toFixed(2) + 'Cr';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(16, 185, 129, 0.1)' },
        ticks: {
          callback: function(value) {
            return '₹' + (value / 10000000).toFixed(1) + 'Cr';
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

  // Corpus Breakdown Doughnut
  const doughnutChartData = {
    labels: ['Current Savings', 'SIP Investment'],
    datasets: [{
      data: [results.futureValueOfSavings, Math.max(0, results.corpusNeeded - results.futureValueOfSavings)],
      backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(16, 185, 129, 0.8)'],
      borderColor: ['rgb(99, 102, 241)', 'rgb(16, 185, 129)'],
      borderWidth: 3,
      hoverOffset: 10
    }]
  };

  const doughnutChartOptions = {
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
            const percentage = ((context.parsed / results.corpusNeeded) * 100).toFixed(1);
            return context.label + ': ₹' + (context.parsed / 10000000).toFixed(2) + 'Cr (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Expense Projection Bar Chart
  const expenseBarData = {
    labels: Array.from({ length: Math.min(10, results.yearsInRetirement) }, (_, i) => `Year ${i + 1}`),
    datasets: [{
      label: 'Annual Expenses in Retirement',
      data: Array.from({ length: Math.min(10, results.yearsInRetirement) }, (_, i) => {
        const yearExpense = results.futureMonthlyExpense * 12 * Math.pow(1 + inflationRate / 100, i);
        return Math.round(yearExpense);
      }),
      backgroundColor: 'rgba(251, 146, 60, 0.8)',
      borderColor: 'rgb(251, 146, 60)',
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  const expenseBarOptions = {
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
            return 'Expenses: ₹' + (context.parsed.y / 100000).toFixed(2) + 'L';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(251, 146, 60, 0.1)' },
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

  return (
    <div className="retirement-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Age */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaUser className="text-white" />
              </div>
              Current Age
            </label>
            <input
              type="range"
              min="20"
              max="60"
              step="1"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">20 Years</span>
              <span className="text-2xl font-bold text-blue-600">{currentAge} Years</span>
              <span className="text-xs text-gray-600 font-semibold">60 Years</span>
            </div>
          </motion.div>

          {/* Retirement Age */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaUmbrella className="text-white" />
              </div>
              Retirement Age
            </label>
            <input
              type="range"
              min="45"
              max="70"
              step="1"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">45 Years</span>
              <span className="text-2xl font-bold text-green-600">{retirementAge} Years</span>
              <span className="text-xs text-gray-600 font-semibold">70 Years</span>
            </div>
          </motion.div>

          {/* Life Expectancy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaClock className="text-white" />
              </div>
              Life Expectancy
            </label>
            <input
              type="range"
              min="60"
              max="100"
              step="1"
              value={lifeExpectancy}
              onChange={(e) => setLifeExpectancy(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">60 Years</span>
              <span className="text-2xl font-bold text-purple-600">{lifeExpectancy} Years</span>
              <span className="text-xs text-gray-600 font-semibold">100 Years</span>
            </div>
          </motion.div>

          {/* Current Monthly Expense */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaHome className="text-white" />
              </div>
              Current Monthly Expense
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={currentMonthlyExpense}
              onChange={(e) => setCurrentMonthlyExpense(Number(e.target.value))}
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹10K</span>
              <span className="text-2xl font-bold text-orange-600">₹{(currentMonthlyExpense / 1000).toFixed(0)}K</span>
              <span className="text-xs text-gray-600 font-semibold">₹5L</span>
            </div>
          </motion.div>

          {/* Current Savings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaPiggyBank className="text-white" />
              </div>
              Current Retirement Savings
            </label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-indigo-600">₹{(currentSavings / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">₹1Cr</span>
            </div>
          </motion.div>

          {/* Inflation & Return */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200 shadow-warm"
            >
              <label className="flex items-center text-gray-700 font-bold mb-4">
                <FaPercentage className="text-yellow-600 mr-2" />
                Inflation
              </label>
              <input
                type="range"
                min="3"
                max="15"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <p className="text-center text-xl font-bold text-yellow-600 mt-2">{inflationRate}%</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
            >
              <label className="flex items-center text-gray-700 font-bold mb-4">
                <FaChartLine className="text-green-600 mr-2" />
                Returns
              </label>
              <input
                type="range"
                min="8"
                max="20"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <p className="text-center text-xl font-bold text-green-600 mt-2">{expectedReturn}%</p>
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
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaPiggyBank className="text-3xl" />
                <span className="text-xs font-bold uppercase">Target Corpus</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.corpusNeeded / 10000000).toFixed(2)}Cr</p>
              <p className="text-sm opacity-90 mt-1">Required at retirement</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaRupeeSign className="text-3xl" />
                <span className="text-xs font-bold uppercase">Monthly SIP</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.monthlySIPNeeded / 1000).toFixed(0)}K</p>
              <p className="text-sm opacity-90 mt-1">Investment needed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border-2 border-blue-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaClock className="text-3xl text-blue-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Time Horizon</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{results.yearsToRetirement} Years</p>
              <p className="text-xs text-gray-600 mt-1">Until retirement</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border-2 border-orange-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaHome className="text-3xl text-orange-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Future Expense</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">₹{(results.futureMonthlyExpense / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-600 mt-1">Monthly at retirement</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-green-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <button
                onClick={() => setActiveTab('accumulation')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'accumulation'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                Corpus Growth
              </button>
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'breakdown'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                Breakdown
              </button>
              <button
                onClick={() => setActiveTab('expenses')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'expenses'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                Future Expenses
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
                {activeTab === 'accumulation' && (
                  <Line data={accumulationChartData} options={accumulationChartOptions} />
                )}
                {activeTab === 'breakdown' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-80">
                      <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                    </div>
                  </div>
                )}
                {activeTab === 'expenses' && (
                  <Bar data={expenseBarData} options={expenseBarOptions} />
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
        className="mt-8 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6 border-2 border-teal-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Retirement Planning Tips</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Build a secure retirement with these essential strategies:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>Start Early:</strong> The power of compounding works best over long periods
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>Account for Inflation:</strong> Your expenses will grow over time, plan accordingly
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>Healthcare Costs:</strong> Factor in higher medical expenses in retirement
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>Regular Review:</strong> Adjust your plan as life circumstances change
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RetirementCalculator;
