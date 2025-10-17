// src/pages/calculators/DelayCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaClock, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaExclamationTriangle,
  FaChartLine,
  FaInfoCircle,
  FaHourglassHalf,
  FaSadTear,
  FaFire
} from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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

const DelayCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(20);
  const [delayYears, setDelayYears] = useState(5);
  const [activeTab, setActiveTab] = useState('comparison');

  // Calculate with and without delay
  const calculateDelay = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    
    // Without delay - full period
    const fullPeriodMonths = investmentPeriod * 12;
    const fullPeriodValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, fullPeriodMonths) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    const fullPeriodInvestment = monthlyInvestment * fullPeriodMonths;
    
    // With delay - reduced period
    const reducedPeriodMonths = (investmentPeriod - delayYears) * 12;
    const delayedValue = reducedPeriodMonths > 0 
      ? monthlyInvestment * 
        ((Math.pow(1 + monthlyRate, reducedPeriodMonths) - 1) / monthlyRate) * 
        (1 + monthlyRate)
      : 0;
    const delayedInvestment = monthlyInvestment * Math.max(0, reducedPeriodMonths);
    
    // Cost of delay
    const opportunityCost = fullPeriodValue - delayedValue;
    const missedInvestment = fullPeriodInvestment - delayedInvestment;
    const missedReturns = opportunityCost - missedInvestment;
    
    // To match delayed value, what monthly SIP needed?
    const requiredMonthlyInvestment = reducedPeriodMonths > 0
      ? (fullPeriodValue * monthlyRate) / ((Math.pow(1 + monthlyRate, reducedPeriodMonths) - 1) * (1 + monthlyRate))
      : 0;
    
    const extraAmountNeeded = requiredMonthlyInvestment - monthlyInvestment;
    
    return {
      fullPeriodValue: Math.round(fullPeriodValue),
      fullPeriodInvestment: Math.round(fullPeriodInvestment),
      delayedValue: Math.round(delayedValue),
      delayedInvestment: Math.round(delayedInvestment),
      opportunityCost: Math.round(opportunityCost),
      missedInvestment: Math.round(missedInvestment),
      missedReturns: Math.round(missedReturns),
      requiredMonthlyInvestment: Math.round(requiredMonthlyInvestment),
      extraAmountNeeded: Math.round(extraAmountNeeded),
      lossPercentage: ((opportunityCost / fullPeriodValue) * 100).toFixed(2)
    };
  };

  const results = calculateDelay();

  // Comparison Line Chart
  const comparisonChartData = {
    labels: Array.from({ length: investmentPeriod + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Start Now',
        data: Array.from({ length: investmentPeriod + 1 }, (_, i) => {
          const months = i * 12;
          const monthlyRate = expectedReturn / 12 / 100;
          if (months === 0) return 0;
          return Math.round(monthlyInvestment * 
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
            (1 + monthlyRate));
        }),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: `Start After ${delayYears} Years`,
        data: Array.from({ length: investmentPeriod + 1 }, (_, i) => {
          if (i < delayYears) return 0;
          const months = (i - delayYears) * 12;
          const monthlyRate = expectedReturn / 12 / 100;
          if (months === 0) return 0;
          return Math.round(monthlyInvestment * 
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
            (1 + monthlyRate));
        }),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  const comparisonChartOptions = {
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
        ticks: { font: { size: 11 } }
      }
    }
  };

  // Cost Breakdown Bar Chart
  const costBarData = {
    labels: ['Missed Investment', 'Missed Returns', 'Total Opportunity Cost'],
    datasets: [{
      label: 'Cost of Delay',
      data: [results.missedInvestment, results.missedReturns, results.opportunityCost],
      backgroundColor: [
        'rgba(251, 146, 60, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(220, 38, 38, 0.8)'
      ],
      borderColor: [
        'rgb(251, 146, 60)',
        'rgb(239, 68, 68)',
        'rgb(220, 38, 38)'
      ],
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  const costBarOptions = {
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
            return 'Amount: ₹' + (context.parsed.y / 100000).toFixed(2) + 'L';
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

  // Value Comparison Doughnut
  const doughnutChartData = {
    labels: ['Value with Delay', 'Opportunity Lost'],
    datasets: [{
      data: [results.delayedValue, results.opportunityCost],
      backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(239, 68, 68, 0.8)'],
      borderColor: ['rgb(34, 197, 94)', 'rgb(239, 68, 68)'],
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
            const percentage = ((context.parsed / results.fullPeriodValue) * 100).toFixed(1);
            return context.label + ': ₹' + (context.parsed / 100000).toFixed(2) + 'L (' + percentage + '%)';
          }
        }
      }
    }
  };

  return (
    <div className="delay-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly Investment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaRupeeSign className="text-white" />
              </div>
              Monthly Investment
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹1K</span>
              <span className="text-2xl font-bold text-blue-600">
                ₹{monthlyInvestment.toLocaleString()}
              </span>
              <span className="text-xs text-gray-600 font-semibold">₹1L</span>
            </div>
          </motion.div>

          {/* Expected Return */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
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
              min="5"
              max="20"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">5%</span>
              <span className="text-2xl font-bold text-green-600">{expectedReturn}%</span>
              <span className="text-xs text-gray-600 font-semibold">20%</span>
            </div>
          </motion.div>

          {/* Investment Period */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaCalendarAlt className="text-white" />
              </div>
              Total Investment Period
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">5 Years</span>
              <span className="text-2xl font-bold text-purple-600">{investmentPeriod} Years</span>
              <span className="text-xs text-gray-600 font-semibold">40 Years</span>
            </div>
          </motion.div>

          {/* Delay Years */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaHourglassHalf className="text-white" />
              </div>
              Delay in Starting (Years)
            </label>
            <input
              type="range"
              min="1"
              max={Math.max(1, investmentPeriod - 1)}
              step="1"
              value={Math.min(delayYears, investmentPeriod - 1)}
              onChange={(e) => setDelayYears(Number(e.target.value))}
              className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Year</span>
              <span className="text-2xl font-bold text-red-600">{delayYears} Years</span>
              <span className="text-xs text-gray-600 font-semibold">{investmentPeriod - 1} Years</span>
            </div>
          </motion.div>

          {/* Warning Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 shadow-warm-lg text-white"
          >
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-3xl mr-3" />
              <div>
                <p className="font-bold text-lg">Opportunity Cost</p>
                <p className="text-3xl font-bold">₹{(results.opportunityCost / 100000).toFixed(2)}L</p>
              </div>
            </div>
            <p className="text-sm opacity-90">
              By delaying {delayYears} years, you lose {results.lossPercentage}% of potential wealth!
            </p>
          </motion.div>
        </div>

        {/* Right Side - Results & Charts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <FaChartLine className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Start Now</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                ₹{(results.fullPeriodValue / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">If started today</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border-2 border-red-100 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <FaSadTear className="text-3xl text-red-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">With Delay</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                ₹{(results.delayedValue / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-gray-600 mt-1">After {delayYears} years delay</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaFire className="text-3xl" />
                <span className="text-xs font-bold uppercase">Lost</span>
              </div>
              <p className="text-2xl font-bold">
                ₹{(results.opportunityCost / 100000).toFixed(2)}L
              </p>
              <p className="text-xs opacity-90 mt-1">Opportunity Cost</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaRupeeSign className="text-3xl" />
                <span className="text-xs font-bold uppercase">Required</span>
              </div>
              <p className="text-2xl font-bold">
                ₹{(results.requiredMonthlyInvestment / 1000).toFixed(0)}K
              </p>
              <p className="text-xs opacity-90 mt-1">Monthly SIP to match</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-red-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-red-100 bg-gradient-to-r from-red-50 to-orange-50">
              <button
                onClick={() => setActiveTab('comparison')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'comparison'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'text-gray-600 hover:bg-red-100'
                }`}
              >
                Growth Comparison
              </button>
              <button
                onClick={() => setActiveTab('cost')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'cost'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'text-gray-600 hover:bg-red-100'
                }`}
              >
                Cost Breakdown
              </button>
              <button
                onClick={() => setActiveTab('impact')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'impact'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'text-gray-600 hover:bg-red-100'
                }`}
              >
                Impact Analysis
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
                  <Line data={comparisonChartData} options={comparisonChartOptions} />
                )}
                {activeTab === 'cost' && (
                  <Bar data={costBarData} options={costBarOptions} />
                )}
                {activeTab === 'impact' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-80">
                      <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Extra SIP Needed Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200 shadow-warm"
          >
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
              <FaExclamationTriangle className="text-yellow-600 mr-2" />
              To Match Original Target
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Extra Monthly Investment</p>
                <p className="text-2xl font-bold text-orange-600">+₹{(results.extraAmountNeeded / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Monthly SIP</p>
                <p className="text-2xl font-bold text-orange-600">₹{(results.requiredMonthlyInvestment / 1000).toFixed(0)}K</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              You need to invest <strong>{((results.extraAmountNeeded / monthlyInvestment) * 100).toFixed(0)}% more</strong> monthly to compensate for the {delayYears}-year delay!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl p-6 border-2 border-rose-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">The Cost of Waiting - Time is Money!</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              This calculator shows the real impact of delaying your investment. Every year you wait costs you compound growth:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                <strong>Compound Interest Loss:</strong> You miss out on returns that would have generated more returns
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                <strong>Higher Burden:</strong> You need to invest significantly more per month to catch up
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                <strong>Time Cannot Be Recovered:</strong> Lost time = Lost wealth. Start investing today!
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DelayCalculator;
