// src/pages/calculators/CarLoanCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCar, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaMoneyBillWave,
  FaGasPump,
  FaTools,
  FaShieldAlt,
  FaChartLine,
  FaInfoCircle,
  FaCalculator,
  FaFileInvoiceDollar
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

const CarLoanCalculator = () => {
  const [carPrice, setCarPrice] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTenure, setLoanTenure] = useState(5);
  const [includeRunningCost, setIncludeRunningCost] = useState(true);
  const [activeTab, setActiveTab] = useState('balance');

  // Calculate Car Loan
  const calculateCarLoan = () => {
    const loanAmount = carPrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    
    // EMI Calculation
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    // Running Costs (per month estimates)
    const fuelCost = 6000; // Average monthly fuel
    const maintenanceCost = 2000; // Average monthly maintenance
    const insuranceCost = 1000; // Average monthly insurance
    const totalRunningCost = fuelCost + maintenanceCost + insuranceCost;
    
    // Total ownership cost
    const totalOwnershipCost = includeRunningCost 
      ? totalPayment + (totalRunningCost * months)
      : totalPayment;
    
    // On-road price estimate
    const rto = carPrice * 0.10; // ~10% RTO
    const insurance = carPrice * 0.04; // ~4% insurance
    const otherCharges = 50000; // Registration, accessories etc
    const onRoadPrice = carPrice + rto + insurance + otherCharges;
    
    return {
      loanAmount: Math.round(loanAmount),
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      downPaymentPercent: ((downPayment / carPrice) * 100).toFixed(1),
      onRoadPrice: Math.round(onRoadPrice),
      rto: Math.round(rto),
      insurance: Math.round(insurance),
      otherCharges,
      runningCosts: {
        fuel: fuelCost,
        maintenance: maintenanceCost,
        insurance: insuranceCost,
        total: totalRunningCost,
        totalOverTenure: totalRunningCost * months
      },
      totalOwnershipCost: Math.round(totalOwnershipCost),
      emiPlusRunning: Math.round(emi + totalRunningCost)
    };
  };

  const results = calculateCarLoan();

  // Outstanding Balance Chart
  const balanceChartData = {
    labels: Array.from({ length: loanTenure + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Outstanding Loan',
        data: Array.from({ length: loanTenure + 1 }, (_, i) => {
          const months = i * 12;
          let balance = results.loanAmount;
          const monthlyRate = interestRate / 12 / 100;
          
          for (let j = 0; j < months && j < loanTenure * 12; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid;
            if (balance <= 0) return 0;
          }
          
          return Math.max(0, Math.round(balance));
        }),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Principal Paid',
        data: Array.from({ length: loanTenure + 1 }, (_, i) => {
          const months = i * 12;
          let balance = results.loanAmount;
          const monthlyRate = interestRate / 12 / 100;
          
          for (let j = 0; j < months && j < loanTenure * 12; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid;
            if (balance <= 0) return results.loanAmount;
          }
          
          return Math.round(results.loanAmount - Math.max(0, balance));
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

  // Cost Breakdown Doughnut
  const doughnutData = {
    labels: ['Principal', 'Interest', 'Running Costs'],
    datasets: [{
      data: includeRunningCost 
        ? [results.loanAmount, results.totalInterest, results.runningCosts.totalOverTenure]
        : [results.loanAmount, results.totalInterest, 0],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(251, 146, 60, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(239, 68, 68)',
        'rgb(251, 146, 60)'
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
            const percentage = ((context.parsed / results.totalOwnershipCost) * 100).toFixed(1);
            return context.label + ': ₹' + (context.parsed / 100000).toFixed(2) + 'L (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Monthly Cost Breakdown Bar
  const monthlyBarData = {
    labels: ['EMI', 'Fuel', 'Maintenance', 'Insurance', 'Total'],
    datasets: [{
      label: 'Monthly Costs',
      data: includeRunningCost
        ? [
            results.emi,
            results.runningCosts.fuel,
            results.runningCosts.maintenance,
            results.runningCosts.insurance,
            results.emiPlusRunning
          ]
        : [results.emi, 0, 0, 0, results.emi],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(251, 146, 60)',
        'rgb(168, 85, 247)',
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)'
      ],
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  const monthlyBarOptions = {
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
            return 'Cost: ₹' + context.parsed.y.toLocaleString();
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
        ticks: { font: { size: 10 } }
      }
    }
  };

  return (
    <div className="car-loan-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Car Price */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaCar className="text-white" />
              </div>
              Car Ex-Showroom Price
            </label>
            <input
              type="range"
              min="300000"
              max="5000000"
              step="50000"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹3L</span>
              <span className="text-2xl font-bold text-blue-600">₹{(carPrice / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">₹50L</span>
            </div>
          </motion.div>

          {/* Down Payment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaMoneyBillWave className="text-white" />
              </div>
              Down Payment ({results.downPaymentPercent}%)
            </label>
            <input
              type="range"
              min="0"
              max={carPrice * 0.5}
              step="25000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-green-600">₹{(downPayment / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">50%</span>
            </div>
          </motion.div>

          {/* Interest Rate */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaPercentage className="text-white" />
              </div>
              Interest Rate (Annual)
            </label>
            <input
              type="range"
              min="7"
              max="18"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">7%</span>
              <span className="text-2xl font-bold text-red-600">{interestRate}%</span>
              <span className="text-xs text-gray-600 font-semibold">18%</span>
            </div>
          </motion.div>

          {/* Loan Tenure */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaCalendarAlt className="text-white" />
              </div>
              Loan Tenure
            </label>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Year</span>
              <span className="text-2xl font-bold text-purple-600">{loanTenure} Years</span>
              <span className="text-xs text-gray-600 font-semibold">7 Years</span>
            </div>
          </motion.div>

          {/* Include Running Cost Toggle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200 shadow-warm"
          >
            <label className="flex items-center justify-between text-gray-700 font-bold mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                  <FaGasPump className="text-white" />
                </div>
                Include Running Costs
              </div>
              <button
                onClick={() => setIncludeRunningCost(!includeRunningCost)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${
                  includeRunningCost ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                    includeRunningCost ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
            {includeRunningCost && (
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Fuel (monthly):</span>
                  <span className="font-bold">₹{results.runningCosts.fuel.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Maintenance:</span>
                  <span className="font-bold">₹{results.runningCosts.maintenance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance:</span>
                  <span className="font-bold">₹{results.runningCosts.insurance.toLocaleString()}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* On-Road Price Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 shadow-warm"
          >
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <FaFileInvoiceDollar className="mr-2 text-cyan-600" />
              On-Road Price Estimate
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Ex-Showroom:</span>
                <span className="font-bold">₹{(carPrice / 100000).toFixed(2)}L</span>
              </div>
              <div className="flex justify-between">
                <span>RTO (10%):</span>
                <span className="font-bold">₹{(results.rto / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance (4%):</span>
                <span className="font-bold">₹{(results.insurance / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span>Others:</span>
                <span className="font-bold">₹{(results.otherCharges / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-cyan-200">
                <span className="font-bold text-cyan-700">On-Road Price:</span>
                <span className="font-bold text-cyan-700 text-lg">₹{(results.onRoadPrice / 100000).toFixed(2)}L</span>
              </div>
            </div>
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
              className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaCalculator className="text-3xl" />
                <span className="text-xs font-bold uppercase">Monthly EMI</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.emi / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-90 mt-1">Loan payment only</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaGasPump className="text-3xl" />
                <span className="text-xs font-bold uppercase">Total Monthly</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.emiPlusRunning / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-90 mt-1">EMI + Running costs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaRupeeSign className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Loan Amount</span>
              </div>
              <p className="text-2xl font-bold text-green-600">₹{(results.loanAmount / 100000).toFixed(2)}L</p>
              <p className="text-xs text-gray-600 mt-1">Principal borrowed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border-2 border-red-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaChartLine className="text-3xl text-red-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Total Cost</span>
              </div>
              <p className="text-2xl font-bold text-red-600">₹{(results.totalOwnershipCost / 100000).toFixed(2)}L</p>
              <p className="text-xs text-gray-600 mt-1">Over {loanTenure} years</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-blue-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <button
                onClick={() => setActiveTab('balance')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'balance'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Loan Balance
              </button>
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
                onClick={() => setActiveTab('monthly')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'monthly'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Monthly Costs
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
                      <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                  </div>
                )}
                {activeTab === 'monthly' && (
                  <Bar data={monthlyBarData} options={monthlyBarOptions} />
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
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Car Loan Tips</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Down Payment:</strong> Aim for 20-25% to reduce EMI
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Loan Tenure:</strong> Shorter tenure = less interest paid
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Credit Score:</strong> Good score gets lower rates
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Running Costs:</strong> Factor in fuel, maintenance
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Prepayment:</strong> Save interest with early closure
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>On-Road Price:</strong> Budget 15-20% extra for RTO
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CarLoanCalculator;
