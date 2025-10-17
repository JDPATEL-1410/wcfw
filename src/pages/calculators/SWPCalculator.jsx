// src/pages/calculators/SWPCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaExchangeAlt, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaMoneyBillWave,
  FaChartLine,
  FaInfoCircle,
  FaWallet,
  FaArrowDown,
  FaClock
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

const SWPCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState(1000000);
  const [withdrawalAmount, setWithdrawalAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [activeTab, setActiveTab] = useState('balance');

  // Calculate SWP
  const calculateSWP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    let balance = totalInvestment;
    
    const monthlyData = [];
    let totalWithdrawn = 0;
    let finalBalance = totalInvestment;

    for (let i = 0; i < months; i++) {
      // Add returns
      balance = balance * (1 + monthlyRate);
      // Withdraw
      balance = balance - withdrawalAmount;
      totalWithdrawn += withdrawalAmount;
      
      if (balance < 0) {
        balance = 0;
        finalBalance = 0;
        break;
      }
      
      monthlyData.push({
        month: i + 1,
        balance: Math.round(balance),
        withdrawn: withdrawalAmount
      });
      
      finalBalance = balance;
    }

    const totalReturns = totalWithdrawn + finalBalance - totalInvestment;
    
    return {
      finalBalance: Math.round(finalBalance),
      totalWithdrawn: Math.round(totalWithdrawn),
      totalReturns: Math.round(totalReturns),
      monthlyData: monthlyData,
      exhausted: finalBalance <= 0,
      exhaustionPeriod: monthlyData.length
    };
  };

  const results = calculateSWP();

  // Balance Depletion Chart
  const balanceChartData = {
    labels: Array.from({ length: Math.min(results.monthlyData.length, timePeriod * 12) }, (_, i) => 
      i % 12 === 0 ? `Year ${i / 12}` : ''
    ),
    datasets: [
      {
        label: 'Remaining Balance',
        data: results.monthlyData.map(d => d.balance),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  const balanceChartOptions = {
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
            return 'Balance: ₹' + context.parsed.y.toLocaleString();
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
        ticks: { font: { size: 9 } }
      }
    }
  };

  // Doughnut Chart
  const doughnutChartData = {
    labels: ['Total Withdrawn', 'Final Balance'],
    datasets: [{
      data: [results.totalWithdrawn, Math.max(0, results.finalBalance)],
      backgroundColor: ['rgba(239, 68, 68, 0.8)', 'rgba(99, 102, 241, 0.8)'],
      borderColor: ['rgb(239, 68, 68)', 'rgb(99, 102, 241)'],
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
            const total = results.totalWithdrawn + results.finalBalance;
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return context.label + ': ₹' + context.parsed.toLocaleString() + ' (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Yearly Withdrawal Chart
  const yearlyBarData = {
    labels: Array.from({ length: timePeriod }, (_, i) => `Year ${i + 1}`),
    datasets: [{
      label: 'Annual Withdrawal',
      data: Array.from({ length: timePeriod }, () => withdrawalAmount * 12),
      backgroundColor: 'rgba(239, 68, 68, 0.8)',
      borderColor: 'rgb(239, 68, 68)',
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  const yearlyBarOptions = {
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
            return 'Withdrawn: ₹' + context.parsed.y.toLocaleString();
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
            return '₹' + (value / 100000).toFixed(1) + 'L';
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
    <div className="swp-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Total Investment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaWallet className="text-white" />
              </div>
              Total Investment
            </label>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(Number(e.target.value))}
              className="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹1L</span>
              <span className="text-2xl font-bold text-indigo-600">
                ₹{(totalInvestment / 100000).toFixed(2)}L
              </span>
              <span className="text-xs text-gray-600 font-semibold">₹1Cr</span>
            </div>
          </motion.div>

          {/* Monthly Withdrawal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaArrowDown className="text-white" />
              </div>
              Monthly Withdrawal
            </label>
            <input
              type="range"
              min="5000"
              max="200000"
              step="1000"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
              className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹5K</span>
              <span className="text-2xl font-bold text-red-600">
                ₹{withdrawalAmount.toLocaleString()}
              </span>
              <span className="text-xs text-gray-600 font-semibold">₹2L</span>
            </div>
          </motion.div>

          {/* Expected Return */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaPercentage className="text-white" />
              </div>
              Expected Annual Return
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1%</span>
              <span className="text-2xl font-bold text-green-600">{expectedReturn}%</span>
              <span className="text-xs text-gray-600 font-semibold">30%</span>
            </div>
          </motion.div>

          {/* Time Period */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaClock className="text-white" />
              </div>
              Withdrawal Period
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Year</span>
              <span className="text-2xl font-bold text-orange-600">{timePeriod} Years</span>
              <span className="text-xs text-gray-600 font-semibold">40 Years</span>
            </div>
          </motion.div>

          {/* Warning/Info Box */}
          {results.exhausted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center mb-3">
                <FaInfoCircle className="text-2xl mr-3" />
                <span className="font-bold text-lg">Fund Exhaustion Warning</span>
              </div>
              <p className="text-sm">
                Your investment will be exhausted in approximately <strong>{Math.floor(results.exhaustionPeriod / 12)} years and {results.exhaustionPeriod % 12} months</strong>. 
                Consider reducing monthly withdrawal or increasing initial investment.
              </p>
            </motion.div>
          )}

          {!results.exhausted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-2xl mr-3" />
                  <span className="font-bold">Sustainable Withdrawal</span>
                </div>
                <span className="text-2xl font-bold">✓</span>
              </div>
              <p className="text-sm">
                Your withdrawal plan is sustainable for {timePeriod} years with a remaining balance of ₹{(results.finalBalance / 100000).toFixed(2)}L
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Side - Results & Charts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 border-2 border-red-100 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <FaMoneyBillWave className="text-3xl text-red-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Withdrawn</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                ₹{(results.totalWithdrawn / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">Total Withdrawn</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border-2 border-indigo-100 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <FaWallet className="text-3xl text-indigo-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Balance</span>
              </div>
              <p className="text-2xl font-bold text-indigo-600">
                ₹{(results.finalBalance / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">Final Balance</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 shadow-warm-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <FaChartLine className="text-3xl text-white" />
                <span className="text-xs font-bold text-white uppercase">Returns</span>
              </div>
              <p className="text-2xl font-bold text-white">
                ₹{(results.totalReturns / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-white/90 mt-1">Net Returns</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-indigo-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <button
                onClick={() => setActiveTab('balance')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'balance'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100'
                }`}
              >
                Balance Chart
              </button>
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'breakdown'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100'
                }`}
              >
                Breakdown
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'yearly'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-gray-600 hover:bg-indigo-100'
                }`}
              >
                Yearly Withdrawal
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
                {activeTab === 'balance' && (
                  <Line data={balanceChartData} options={balanceChartOptions} />
                )}
                {activeTab === 'breakdown' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-80">
                      <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                    </div>
                  </div>
                )}
                {activeTab === 'yearly' && (
                  <Bar data={yearlyBarData} options={yearlyBarOptions} />
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
        className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">About SWP (Systematic Withdrawal Plan)</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              SWP allows you to withdraw a fixed amount at regular intervals from your mutual fund investment. This is ideal for:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong>Regular Income:</strong> Generate steady monthly income from your investments
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong>Retirement Planning:</strong> Perfect for creating a pension-like income stream
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                <strong>Tax Efficiency:</strong> Only capital gains are taxed, not the entire withdrawal
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SWPCalculator;
