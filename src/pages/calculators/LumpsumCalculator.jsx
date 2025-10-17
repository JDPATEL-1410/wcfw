// src/pages/calculators/LumpsumCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPiggyBank, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaChartLine,
  FaTrophy,
  FaInfoCircle,
  FaCoins,
  FaSeedling
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

const LumpsumCalculator = () => {
  const [investment, setInvestment] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [activeTab, setActiveTab] = useState('growth');

  // Calculate Lumpsum returns
  const calculateLumpsum = () => {
    const rate = expectedReturn / 100;
    const futureValue = investment * Math.pow((1 + rate), timePeriod);
    const estimatedReturns = futureValue - investment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: investment,
      estimatedReturns: Math.round(estimatedReturns),
      returnPercentage: ((estimatedReturns / investment) * 100).toFixed(2),
      cagrRate: expectedReturn
    };
  };

  const results = calculateLumpsum();

  // Growth Chart Data
  const growthChartData = {
    labels: Array.from({ length: timePeriod + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Investment Value',
        data: Array.from({ length: timePeriod + 1 }, (_, i) => {
          const rate = expectedReturn / 100;
          return Math.round(investment * Math.pow((1 + rate), i));
        }),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Initial Investment',
        data: Array.from({ length: timePeriod + 1 }, () => investment),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0,
        pointRadius: 0,
        borderDash: [5, 5]
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
            return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString();
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(34, 197, 94, 0.1)' },
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

  // Doughnut Chart
  const doughnutChartData = {
    labels: ['Principal Amount', 'Returns Earned'],
    datasets: [{
      data: [results.totalInvestment, results.estimatedReturns],
      backgroundColor: ['rgba(249, 115, 22, 0.8)', 'rgba(34, 197, 94, 0.8)'],
      borderColor: ['rgb(249, 115, 22)', 'rgb(34, 197, 94)'],
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
            const percentage = ((context.parsed / results.futureValue) * 100).toFixed(1);
            return context.label + ': ₹' + context.parsed.toLocaleString() + ' (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Yearly Bar Chart
  const yearlyBarData = {
    labels: Array.from({ length: timePeriod }, (_, i) => `Year ${i + 1}`),
    datasets: [{
      label: 'Yearly Growth',
      data: Array.from({ length: timePeriod }, (_, i) => {
        const rate = expectedReturn / 100;
        const currentValue = investment * Math.pow((1 + rate), i + 1);
        const previousValue = investment * Math.pow((1 + rate), i);
        return Math.round(currentValue - previousValue);
      }),
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgb(34, 197, 94)',
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
            return 'Growth: ₹' + context.parsed.y.toLocaleString();
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(34, 197, 94, 0.1)' },
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
    <div className="lumpsum-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment Amount */}
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
              Investment Amount
            </label>
            <input
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹10K</span>
              <span className="text-2xl font-bold text-green-600">
                ₹{(investment / 100000).toFixed(2)}L
              </span>
              <span className="text-xs text-gray-600 font-semibold">₹1Cr</span>
            </div>
          </motion.div>

          {/* Expected Return */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
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
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1%</span>
              <span className="text-2xl font-bold text-orange-600">{expectedReturn}%</span>
              <span className="text-xs text-gray-600 font-semibold">30%</span>
            </div>
          </motion.div>

          {/* Time Period */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaCalendarAlt className="text-white" />
              </div>
              Investment Period
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Year</span>
              <span className="text-2xl font-bold text-blue-600">{timePeriod} Years</span>
              <span className="text-xs text-gray-600 font-semibold">40 Years</span>
            </div>
          </motion.div>

          {/* CAGR Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 shadow-warm-lg"
          >
            <div className="flex items-center justify-between text-white mb-4">
              <div className="flex items-center">
                <FaSeedling className="text-2xl mr-3" />
                <span className="font-bold">CAGR Rate</span>
              </div>
              <span className="text-2xl font-bold">{results.cagrRate}%</span>
            </div>
            <div className="flex items-center justify-between text-white text-sm">
              <span>Compound Annual Growth Rate</span>
              <span className="font-bold">{results.returnPercentage}% Total</span>
            </div>
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
              className="bg-white rounded-xl p-6 border-2 border-orange-100 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <FaCoins className="text-3xl text-orange-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Principal</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                ₹{(results.totalInvestment / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">Investment Amount</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <FaChartLine className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Gains</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                ₹{(results.estimatedReturns / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">Total Returns</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 shadow-warm-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <FaTrophy className="text-3xl text-white" />
                <span className="text-xs font-bold text-white uppercase">Maturity</span>
              </div>
              <p className="text-2xl font-bold text-white">
                ₹{(results.futureValue / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-white/90 mt-1">Future Value</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-green-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <button
                onClick={() => setActiveTab('growth')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'growth'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                Growth Chart
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'comparison'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                Breakdown
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'yearly'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                Yearly Growth
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
                {activeTab === 'growth' && (
                  <Line data={growthChartData} options={growthChartOptions} />
                )}
                {activeTab === 'comparison' && (
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
        className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">About Lumpsum Investment</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Lumpsum investment means investing a large amount of money at once in mutual funds or other investment vehicles. This strategy is ideal when:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>Market is Low:</strong> Best time to invest when market valuations are attractive
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>Long-term Horizon:</strong> Gives maximum benefit of compounding over time
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>Immediate Deployment:</strong> Puts your entire capital to work immediately
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LumpsumCalculator;
