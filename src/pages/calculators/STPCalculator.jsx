// src/pages/calculators/STPCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaExchangeAlt, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaArrowRight,
  FaChartLine,
  FaInfoCircle,
  FaWallet,
  FaArrowsAltH,
  FaSyncAlt
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

const STPCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [transferAmount, setTransferAmount] = useState(10000);
  const [sourceReturn, setSourceReturn] = useState(6); // Debt fund
  const [targetReturn, setTargetReturn] = useState(12); // Equity fund
  const [timePeriod, setTimePeriod] = useState(10);
  const [activeTab, setActiveTab] = useState('transfer');

  // Calculate STP
  const calculateSTP = () => {
    const months = timePeriod * 12;
    const sourceMonthlyRate = sourceReturn / 12 / 100;
    const targetMonthlyRate = targetReturn / 12 / 100;
    
    let sourceBalance = initialInvestment;
    let targetBalance = 0;
    const monthlyData = [];
    let totalTransferred = 0;

    for (let i = 0; i < months; i++) {
      // Add returns to source fund
      sourceBalance = sourceBalance * (1 + sourceMonthlyRate);
      
      // Transfer amount from source to target
      if (sourceBalance >= transferAmount) {
        sourceBalance -= transferAmount;
        totalTransferred += transferAmount;
        targetBalance += transferAmount;
      } else {
        // If source balance is less than transfer amount
        totalTransferred += sourceBalance;
        targetBalance += sourceBalance;
        sourceBalance = 0;
      }
      
      // Add returns to target fund
      targetBalance = targetBalance * (1 + targetMonthlyRate);
      
      monthlyData.push({
        month: i + 1,
        sourceBalance: Math.round(sourceBalance),
        targetBalance: Math.round(targetBalance),
        transferred: transferAmount
      });

      if (sourceBalance === 0) break;
    }

    const finalSourceBalance = Math.round(sourceBalance);
    const finalTargetBalance = Math.round(targetBalance);
    const totalValue = finalSourceBalance + finalTargetBalance;
    
    // Calculate what would happen with lumpsum in each fund
    const sourceOnlyValue = Math.round(initialInvestment * Math.pow(1 + sourceMonthlyRate, months));
    const targetOnlyValue = Math.round(initialInvestment * Math.pow(1 + targetMonthlyRate, months));
    
    return {
      finalSourceBalance,
      finalTargetBalance,
      totalValue,
      totalTransferred: Math.round(totalTransferred),
      monthlyData,
      sourceOnlyValue,
      targetOnlyValue,
      stpAdvantage: totalValue - sourceOnlyValue
    };
  };

  const results = calculateSTP();

  // Transfer Flow Chart
  const transferChartData = {
    labels: Array.from({ length: Math.min(results.monthlyData.length, timePeriod * 12) }, (_, i) => 
      i % 12 === 0 ? `Year ${i / 12}` : ''
    ),
    datasets: [
      {
        label: 'Source Fund (Debt)',
        data: results.monthlyData.map(d => d.sourceBalance),
        borderColor: 'rgb(251, 191, 36)',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: 'rgb(251, 191, 36)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Target Fund (Equity)',
        data: results.monthlyData.map(d => d.targetBalance),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  const transferChartOptions = {
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
            return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString();
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
            return '₹' + (value / 100000).toFixed(1) + 'L';
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

  // Distribution Doughnut
  const doughnutChartData = {
    labels: ['Source Fund', 'Target Fund'],
    datasets: [{
      data: [results.finalSourceBalance, results.finalTargetBalance],
      backgroundColor: ['rgba(251, 191, 36, 0.8)', 'rgba(16, 185, 129, 0.8)'],
      borderColor: ['rgb(251, 191, 36)', 'rgb(16, 185, 129)'],
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
            const percentage = ((context.parsed / results.totalValue) * 100).toFixed(1);
            return context.label + ': ₹' + context.parsed.toLocaleString() + ' (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Comparison Bar Chart
  const comparisonBarData = {
    labels: ['Source Only', 'STP Strategy', 'Target Only'],
    datasets: [{
      label: 'Final Value',
      data: [results.sourceOnlyValue, results.totalValue, results.targetOnlyValue],
      backgroundColor: [
        'rgba(251, 191, 36, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(16, 185, 129, 0.8)'
      ],
      borderColor: [
        'rgb(251, 191, 36)',
        'rgb(99, 102, 241)',
        'rgb(16, 185, 129)'
      ],
      borderWidth: 2,
      borderRadius: 8
    }]
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
            return 'Value: ₹' + context.parsed.y.toLocaleString();
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(99, 102, 241, 0.1)' },
        ticks: {
          callback: function(value) {
            return '₹' + (value / 100000).toFixed(1) + 'L';
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
    <div className="stp-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Initial Investment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaWallet className="text-white" />
              </div>
              Initial Investment
            </label>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full h-3 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹1L</span>
              <span className="text-2xl font-bold text-yellow-600">
                ₹{(initialInvestment / 100000).toFixed(2)}L
              </span>
              <span className="text-xs text-gray-600 font-semibold">₹1Cr</span>
            </div>
          </motion.div>

          {/* Transfer Amount */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaArrowsAltH className="text-white" />
              </div>
              Monthly Transfer Amount
            </label>
            <input
              type="range"
              min="5000"
              max="200000"
              step="1000"
              value={transferAmount}
              onChange={(e) => setTransferAmount(Number(e.target.value))}
              className="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹5K</span>
              <span className="text-2xl font-bold text-indigo-600">
                ₹{transferAmount.toLocaleString()}
              </span>
              <span className="text-xs text-gray-600 font-semibold">₹2L</span>
            </div>
          </motion.div>

          {/* Source Return (Debt) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaPercentage className="text-white" />
              </div>
              Source Fund Return (Debt)
            </label>
            <input
              type="range"
              min="3"
              max="15"
              step="0.5"
              value={sourceReturn}
              onChange={(e) => setSourceReturn(Number(e.target.value))}
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">3%</span>
              <span className="text-2xl font-bold text-orange-600">{sourceReturn}%</span>
              <span className="text-xs text-gray-600 font-semibold">15%</span>
            </div>
          </motion.div>

          {/* Target Return (Equity) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaChartLine className="text-white" />
              </div>
              Target Fund Return (Equity)
            </label>
            <input
              type="range"
              min="8"
              max="25"
              step="0.5"
              value={targetReturn}
              onChange={(e) => setTargetReturn(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">8%</span>
              <span className="text-2xl font-bold text-green-600">{targetReturn}%</span>
              <span className="text-xs text-gray-600 font-semibold">25%</span>
            </div>
          </motion.div>

          {/* Time Period */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaCalendarAlt className="text-white" />
              </div>
              Transfer Period
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Year</span>
              <span className="text-2xl font-bold text-blue-600">{timePeriod} Years</span>
              <span className="text-xs text-gray-600 font-semibold">20 Years</span>
            </div>
          </motion.div>

          {/* STP Advantage Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 shadow-warm-lg text-white"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <FaSyncAlt className="text-2xl mr-3" />
                <span className="font-bold">STP Advantage</span>
              </div>
              <span className="text-2xl font-bold">
                {results.stpAdvantage >= 0 ? '+' : ''}₹{(results.stpAdvantage / 1000).toFixed(0)}K
              </span>
            </div>
            <p className="text-sm">
              STP strategy vs keeping entire amount in source fund
            </p>
          </motion.div>
        </div>

        {/* Right Side - Results & Charts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 border-2 border-yellow-100 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <FaWallet className="text-3xl text-yellow-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Source</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">
                ₹{(results.finalSourceBalance / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">Remaining in Debt Fund</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <FaChartLine className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Target</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                ₹{(results.finalTargetBalance / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">Accumulated in Equity Fund</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 shadow-warm-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <FaSyncAlt className="text-3xl text-white" />
                <span className="text-xs font-bold text-white uppercase">Total</span>
              </div>
              <p className="text-2xl font-bold text-white">
                ₹{(results.totalValue / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-white/90 mt-1">Combined Value</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-indigo-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <button
                onClick={() => setActiveTab('transfer')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'transfer'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100'
                }`}
              >
                Transfer Flow
              </button>
              <button
                onClick={() => setActiveTab('distribution')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'distribution'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100'
                }`}
              >
                Distribution
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'comparison'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100'
                }`}
              >
                Strategy Comparison
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
                {activeTab === 'transfer' && (
                  <Line data={transferChartData} options={transferChartOptions} />
                )}
                {activeTab === 'distribution' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-80">
                      <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                    </div>
                  </div>
                )}
                {activeTab === 'comparison' && (
                  <Bar data={comparisonBarData} options={comparisonBarOptions} />
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
        className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">About STP (Systematic Transfer Plan)</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              STP allows you to transfer a fixed amount from one mutual fund scheme to another at regular intervals. This strategy helps in:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong>Rupee Cost Averaging:</strong> Transfer from debt to equity gradually to reduce market timing risk
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong>Risk Management:</strong> Keep funds safe in debt while slowly moving to high-return equity
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong>Optimal Allocation:</strong> Balance between safety and growth automatically
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default STPCalculator;
