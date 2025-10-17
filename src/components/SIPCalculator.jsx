import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { FaRupeeSign, FaChartLine, FaCalendarAlt, FaPercentage } from 'react-icons/fa';
import { calculateSIP } from '../utils/calculateSIP';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SIPCalculator = ({ showTitle = true, compact = false }) => {
  const [sipData, setSipData] = useState({
    monthlyInvestment: 5000,
    expectedReturns: 12,
    timePeriod: 10
  });

  const [results, setResults] = useState({
    maturityAmount: 0,
    totalInvestment: 0,
    wealthGained: 0,
    chartData: null
  });

  useEffect(() => {
    const calculatedResults = calculateSIP(
      sipData.monthlyInvestment,
      sipData.expectedReturns,
      sipData.timePeriod
    );
    setResults(calculatedResults);
  }, [sipData]);

  const handleInputChange = (field, value) => {
    setSipData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const chartOptions = {
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
            weight: '600'
          },
          color: '#374151'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(249, 115, 22, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fbbf24',
        borderWidth: 2,
        cornerRadius: 12,
        displayColors: true,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString('en-IN')}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(249, 115, 22, 0.1)',
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Years',
          color: '#6b7280',
          font: {
            weight: 'bold',
            size: 13
          }
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y: {
        grid: {
          color: 'rgba(249, 115, 22, 0.1)',
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Amount (₹)',
          color: '#6b7280',
          font: {
            weight: 'bold',
            size: 13
          }
        },
        ticks: {
          color: '#6b7280',
          callback: function(value) {
            return '₹' + (value >= 10000000 ? (value/10000000).toFixed(1) + 'Cr' : 
                          value >= 100000 ? (value/100000).toFixed(1) + 'L' : 
                          value.toLocaleString('en-IN'));
          }
        }
      }
    }
  };

  const InputField = ({ icon: Icon, label, value, onChange, min, max, step, suffix }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-5 border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-warm"
    >
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
          <Icon className="text-white text-sm" />
        </div>
        <label className="text-sm font-bold text-gray-800">{label}</label>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #f97316 0%, #fbbf24 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <span className="font-medium">{min}{suffix}</span>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            {value.toLocaleString('en-IN')}{suffix}
          </span>
          <span className="font-medium">{max}{suffix}</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`${compact ? 'p-4' : 'p-6'} bg-gradient-to-br from-orange-50/50 to-yellow-50/50 rounded-2xl`}>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            SIP <span className="text-gradient-warm">Calculator</span>
          </h2>
          <p className="text-gray-600">
            Calculate your potential returns with systematic investment planning
          </p>
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-orange-500 rounded"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded mx-2"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-yellow-500 to-transparent rounded"></div>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <InputField
            icon={FaRupeeSign}
            label="Monthly Investment"
            value={sipData.monthlyInvestment}
            onChange={(value) => handleInputChange('monthlyInvestment', value)}
            min={500}
            max={100000}
            step={500}
            suffix=""
          />

          <InputField
            icon={FaPercentage}
            label="Expected Annual Returns"
            value={sipData.expectedReturns}
            onChange={(value) => handleInputChange('expectedReturns', value)}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
          />

          <InputField
            icon={FaCalendarAlt}
            label="Investment Period"
            value={sipData.timePeriod}
            onChange={(value) => handleInputChange('timePeriod', value)}
            min={1}
            max={40}
            step={1}
            suffix=" Years"
          />

          {/* Results Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 border-l-4 border-orange-500 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <p className="text-xs text-gray-600 mb-1 font-semibold">Total Investment</p>
              <p className="text-lg font-bold text-orange-600">
                ₹{results.totalInvestment?.toLocaleString('en-IN')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 border-l-4 border-yellow-500 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <p className="text-xs text-gray-600 mb-1 font-semibold">Wealth Gained</p>
              <p className="text-lg font-bold text-yellow-600">
                ₹{results.wealthGained?.toLocaleString('en-IN')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 border-l-4 border-orange-600 shadow-warm hover:shadow-warm-lg transition-all duration-300"
            >
              <p className="text-xs text-gray-600 mb-1 font-semibold">Maturity Amount</p>
              <p className="text-lg font-bold text-orange-700">
                ₹{results.maturityAmount?.toLocaleString('en-IN')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-warm-lg border-2 border-orange-100"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
              <FaChartLine className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Investment Growth</h3>
          </div>
          
          <div className="h-80">
            {results.chartData && (
              <Line options={chartOptions} data={results.chartData} />
            )}
          </div>
        </motion.div>
      </div>

      {/* Start SIP CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 p-6 bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-500 rounded-2xl text-white shadow-warm-lg"
      >
        <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to Start Your SIP Journey?</h3>
        <p className="mb-4 opacity-95 text-white/90">
          Begin your wealth creation with as low as ₹500 per month
        </p>
        <button className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Start SIP Today
        </button>
      </motion.div>
    </div>
  );
};

export default SIPCalculator;
