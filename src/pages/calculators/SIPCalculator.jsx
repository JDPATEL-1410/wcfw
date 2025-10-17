// src/pages/calculators/SIPCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaPiggyBank,
  FaTrophy,
  FaInfoCircle
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

// Register ChartJS components
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

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [activeTab, setActiveTab] = useState('growth');

  // Calculate SIP returns
  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    
    const futureValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const totalInvestment = monthlyInvestment * months;
    const estimatedReturns = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      returnPercentage: ((estimatedReturns / totalInvestment) * 100).toFixed(2)
    };
  };

  const results = calculateSIP();

  // Growth Chart Data (Line Chart)
  const growthChartData = {
    labels: Array.from({ length: timePeriod + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Future Value',
        data: Array.from({ length: timePeriod + 1 }, (_, i) => {
          const months = i * 12;
          const monthlyRate = expectedReturn / 12 / 100;
          if (months === 0) return 0;
          return Math.round(monthlyInvestment * 
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
            (1 + monthlyRate));
        }),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(249, 115, 22)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Total Investment',
        data: Array.from({ length: timePeriod + 1 }, (_, i) => monthlyInvestment * i * 12),
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(234, 179, 8)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
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
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
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
        grid: {
          color: 'rgba(249, 115, 22, 0.1)'
        },
        ticks: {
          callback: function(value) {
            return '₹' + (value / 100000).toFixed(1) + 'L';
          },
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  // Doughnut Chart Data
  const doughnutChartData = {
    labels: ['Total Investment', 'Estimated Returns'],
    datasets: [
      {
        data: [results.totalInvestment, results.estimatedReturns],
        backgroundColor: [
          'rgba(234, 179, 8, 0.8)',
          'rgba(249, 115, 22, 0.8)'
        ],
        borderColor: [
          'rgb(234, 179, 8)',
          'rgb(249, 115, 22)'
        ],
        borderWidth: 3,
        hoverOffset: 10
      }
    ]
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
          font: {
            size: 12,
            weight: 'bold'
          }
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

  // Yearly Bar Chart Data
  const yearlyBarData = {
    labels: Array.from({ length: timePeriod }, (_, i) => `Year ${i + 1}`),
    datasets: [
      {
        label: 'Yearly Investment',
        data: Array.from({ length: timePeriod }, () => monthlyInvestment * 12),
        backgroundColor: 'rgba(234, 179, 8, 0.8)',
        borderColor: 'rgb(234, 179, 8)',
        borderWidth: 2,
        borderRadius: 8
      },
      {
        label: 'Yearly Returns',
        data: Array.from({ length: timePeriod }, (_, i) => {
          const year = i + 1;
          const prevMonths = (year - 1) * 12;
          const currMonths = year * 12;
          const monthlyRate = expectedReturn / 12 / 100;
          
          const prevValue = prevMonths === 0 ? 0 : monthlyInvestment * 
            ((Math.pow(1 + monthlyRate, prevMonths) - 1) / monthlyRate) * 
            (1 + monthlyRate);
          
          const currValue = monthlyInvestment * 
            ((Math.pow(1 + monthlyRate, currMonths) - 1) / monthlyRate) * 
            (1 + monthlyRate);
          
          return Math.round(currValue - prevValue - (monthlyInvestment * 12));
        }),
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderColor: 'rgb(249, 115, 22)',
        borderWidth: 2,
        borderRadius: 8
      }
    ]
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
          font: {
            size: 12,
            weight: 'bold'
          }
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
        grid: {
          color: 'rgba(249, 115, 22, 0.1)'
        },
        ticks: {
          callback: function(value) {
            return '₹' + (value / 1000).toFixed(0) + 'K';
          },
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  return (
    <div className="sip-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly Investment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaRupeeSign className="text-white" />
              </div>
              Monthly Investment
            </label>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹500</span>
              <span className="text-2xl font-bold text-orange-600">
                ₹{monthlyInvestment.toLocaleString()}
              </span>
              <span className="text-xs text-gray-600 font-semibold">₹1,00,000</span>
            </div>
          </motion.div>

          {/* Expected Return */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
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
              className="w-full h-3 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
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
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
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
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Year</span>
              <span className="text-2xl font-bold text-orange-600">{timePeriod} Years</span>
              <span className="text-xs text-gray-600 font-semibold">40 Years</span>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-6 shadow-warm-lg"
          >
            <div className="flex items-center justify-between text-white mb-4">
              <div className="flex items-center">
                <FaTrophy className="text-2xl mr-3" />
                <span className="font-bold">Return Rate</span>
              </div>
              <span className="text-2xl font-bold">{results.returnPercentage}%</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(results.returnPercentage, 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-white rounded-full"
              />
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
                <FaPiggyBank className="text-3xl text-yellow-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Invested</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                ₹{(results.totalInvestment / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">Total Investment</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <FaChartLine className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Returns</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                ₹{(results.estimatedReturns / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">Estimated Returns</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-6 shadow-warm-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <FaTrophy className="text-3xl text-white" />
                <span className="text-xs font-bold text-white uppercase">Total</span>
              </div>
              <p className="text-2xl font-bold text-white">
                ₹{(results.futureValue / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-white/90 mt-1">Future Value</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-orange-100 shadow-warm overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b-2 border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50">
              <button
                onClick={() => setActiveTab('growth')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'growth'
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                    : 'text-gray-600 hover:bg-orange-100'
                }`}
              >
                Growth Chart
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'comparison'
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                    : 'text-gray-600 hover:bg-orange-100'
                }`}
              >
                Comparison
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'yearly'
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                    : 'text-gray-600 hover:bg-orange-100'
                }`}
              >
                Yearly Breakdown
              </button>
            </div>

            {/* Chart Content */}
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
        className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">About SIP (Systematic Investment Plan)</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              SIP allows you to invest a fixed amount regularly in mutual funds. This disciplined approach helps in:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                <strong>Rupee Cost Averaging:</strong> Reduces impact of market volatility
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                <strong>Power of Compounding:</strong> Your returns generate more returns over time
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                <strong>Disciplined Investing:</strong> Builds wealth systematically without timing the market
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SIPCalculator;
