// src/pages/calculators/HomeLoanCalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaMoneyBillWave,
  FaUser,
  FaBuilding,
  FaChartLine,
  FaInfoCircle,
  FaCalculator,
  FaCheckCircle,
  FaExclamationTriangle
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

const HomeLoanCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEMI, setExistingEMI] = useState(0);
  const [activeTab, setActiveTab] = useState('outstanding');

  // Calculate Home Loan
  const calculateHomeLoan = () => {
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    
    // EMI Calculation
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    // Eligibility check (FOIR - Fixed Obligation to Income Ratio)
    const maxEMI = (monthlyIncome * 0.5) - existingEMI; // 50% FOIR
    const eligible = emi <= maxEMI;
    const maxLoanEligible = (maxEMI * (Math.pow(1 + monthlyRate, months) - 1)) / 
                            (monthlyRate * Math.pow(1 + monthlyRate, months));
    
    // Tax benefits (Section 80C + 24(b))
    const annualPrincipal = (loanAmount / months) * 12;
    const firstYearInterest = loanAmount * (interestRate / 100);
    const taxBenefit80C = Math.min(annualPrincipal, 150000) * 0.30; // 30% tax slab
    const taxBenefit24b = Math.min(firstYearInterest, 200000) * 0.30;
    const totalFirstYearTaxBenefit = taxBenefit80C + taxBenefit24b;
    
    return {
      loanAmount: Math.round(loanAmount),
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      eligible,
      maxLoanEligible: Math.round(maxLoanEligible),
      maxEMI: Math.round(maxEMI),
      emiToIncomeRatio: ((emi / monthlyIncome) * 100).toFixed(1),
      downPaymentPercent: ((downPayment / propertyValue) * 100).toFixed(1),
      taxBenefit: Math.round(totalFirstYearTaxBenefit)
    };
  };

  const results = calculateHomeLoan();

  // Outstanding Balance Chart
  const balanceChartData = {
    labels: Array.from({ length: loanTenure + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Outstanding Principal',
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
        pointRadius: 3,
        pointHoverRadius: 6
      },
      {
        label: 'Principal Repaid',
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
        pointRadius: 3,
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

  // Principal vs Interest Doughnut
  const doughnutData = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [{
      data: [results.loanAmount, results.totalInterest],
      backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(239, 68, 68, 0.8)'],
      borderColor: ['rgb(34, 197, 94)', 'rgb(239, 68, 68)'],
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
          font: { size: 12, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context) {
            const percentage = ((context.parsed / results.totalPayment) * 100).toFixed(1);
            return context.label + ': ₹' + (context.parsed / 100000).toFixed(2) + 'L (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Yearly Payment Bar Chart
  const yearlyBarData = {
    labels: Array.from({ length: Math.min(10, loanTenure) }, (_, i) => `Year ${i + 1}`),
    datasets: [
      {
        label: 'Principal',
        data: Array.from({ length: Math.min(10, loanTenure) }, (_, year) => {
          let totalPrincipal = 0;
          let balance = results.loanAmount;
          const monthlyRate = interestRate / 12 / 100;
          const startMonth = year * 12;
          const endMonth = Math.min((year + 1) * 12, loanTenure * 12);
          
          for (let j = 0; j < startMonth; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid;
            if (balance <= 0) return 0;
          }
          
          for (let j = startMonth; j < endMonth; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            totalPrincipal += principalPaid;
            balance = balance - principalPaid;
            if (balance <= 0) break;
          }
          
          return Math.round(totalPrincipal);
        }),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 8
      },
      {
        label: 'Interest',
        data: Array.from({ length: Math.min(10, loanTenure) }, (_, year) => {
          let totalInterest = 0;
          let balance = results.loanAmount;
          const monthlyRate = interestRate / 12 / 100;
          const startMonth = year * 12;
          const endMonth = Math.min((year + 1) * 12, loanTenure * 12);
          
          for (let j = 0; j < startMonth; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid;
            if (balance <= 0) return 0;
          }
          
          for (let j = startMonth; j < endMonth; j++) {
            const interest = balance * monthlyRate;
            totalInterest += interest;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid;
            if (balance <= 0) break;
          }
          
          return Math.round(totalInterest);
        }),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
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
        stacked: true,
        grid: { color: 'rgba(239, 68, 68, 0.1)' },
        ticks: {
          callback: function(value) {
            return '₹' + (value / 100000).toFixed(0) + 'L';
          },
          font: { size: 11 }
        }
      },
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 10 } }
      }
    }
  };

  return (
    <div className="home-loan-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Value */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaHome className="text-white" />
              </div>
              Property Value
            </label>
            <input
              type="range"
              min="1000000"
              max="20000000"
              step="100000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹10L</span>
              <span className="text-2xl font-bold text-blue-600">₹{(propertyValue / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">₹2Cr</span>
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
              max={propertyValue * 0.5}
              step="50000"
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
              min="6"
              max="15"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">6%</span>
              <span className="text-2xl font-bold text-red-600">{interestRate}%</span>
              <span className="text-xs text-gray-600 font-semibold">15%</span>
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
              min="5"
              max="30"
              step="1"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">5 Years</span>
              <span className="text-2xl font-bold text-purple-600">{loanTenure} Years</span>
              <span className="text-xs text-gray-600 font-semibold">30 Years</span>
            </div>
          </motion.div>

          {/* Monthly Income */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaUser className="text-white" />
              </div>
              Monthly Income
            </label>
            <input
              type="range"
              min="30000"
              max="500000"
              step="10000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full h-3 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹30K</span>
              <span className="text-2xl font-bold text-yellow-600">₹{(monthlyIncome / 1000).toFixed(0)}K</span>
              <span className="text-xs text-gray-600 font-semibold">₹5L</span>
            </div>
          </motion.div>

          {/* Existing EMI */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaBuilding className="text-white" />
              </div>
              Existing EMI (Optional)
            </label>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={existingEMI}
              onChange={(e) => setExistingEMI(Number(e.target.value))}
              className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-orange-600">₹{(existingEMI / 1000).toFixed(0)}K</span>
              <span className="text-xs text-gray-600 font-semibold">₹1L</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Results & Charts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Eligibility Status */}
          {results.eligible ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <FaCheckCircle className="text-2xl mr-3" />
                    <h3 className="text-2xl font-bold">Loan Eligible!</h3>
                  </div>
                  <p className="text-lg">You can borrow up to ₹{(results.maxLoanEligible / 100000).toFixed(2)}L</p>
                  <p className="text-sm opacity-90 mt-1">EMI-to-Income Ratio: {results.emiToIncomeRatio}%</p>
                </div>
                <FaHome className="text-5xl opacity-50" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <FaExclamationTriangle className="text-2xl mr-3" />
                    <h3 className="text-2xl font-bold">Eligibility Issue</h3>
                  </div>
                  <p className="text-lg">Reduce loan amount or increase income</p>
                  <p className="text-sm opacity-90 mt-1">Max eligible: ₹{(results.maxLoanEligible / 100000).toFixed(2)}L</p>
                </div>
                <FaExclamationTriangle className="text-5xl opacity-50" />
              </div>
            </motion.div>
          )}

          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaCalculator className="text-3xl" />
                <span className="text-xs font-bold uppercase">Monthly EMI</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.emi / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-90 mt-1">For {loanTenure} years</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaRupeeSign className="text-3xl" />
                <span className="text-xs font-bold uppercase">Loan Amount</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.loanAmount / 100000).toFixed(2)}L</p>
              <p className="text-sm opacity-90 mt-1">Principal borrowed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border-2 border-red-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaChartLine className="text-3xl text-red-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Interest</span>
              </div>
              <p className="text-2xl font-bold text-red-600">₹{(results.totalInterest / 100000).toFixed(2)}L</p>
              <p className="text-xs text-gray-600 mt-1">Total interest payable</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaMoneyBillWave className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Tax Benefit</span>
              </div>
              <p className="text-2xl font-bold text-green-600">₹{(results.taxBenefit / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-600 mt-1">First year (est.)</p>
            </motion.div>
          </div>

          {/* Chart Tabs */}
          <div className="bg-white rounded-xl border-2 border-blue-100 shadow-warm overflow-hidden">
            <div className="flex border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <button
                onClick={() => setActiveTab('outstanding')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'outstanding'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Outstanding
              </button>
              <button
                onClick={() => setActiveTab('split')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'split'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Payment Split
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'yearly'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
              >
                Yearly Breakdown
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
                {activeTab === 'outstanding' && (
                  <Line data={balanceChartData} options={balanceChartOptions} />
                )}
                {activeTab === 'split' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-80">
                      <Doughnut data={doughnutData} options={doughnutOptions} />
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
        transition={{ delay: 0.7 }}
        className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 shadow-warm"
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
            <FaInfoCircle className="text-white text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Home Loan Tips</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Down Payment:</strong> Aim for 20% to avoid PMI
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Tax Benefits:</strong> Up to ₹3.5L under 80C + 24(b)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Credit Score:</strong> Maintain 750+ for best rates
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>EMI Ratio:</strong> Keep below 40-50% of income
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Prepayment:</strong> Save lakhs in interest
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <strong>Compare Rates:</strong> 0.5% can save significant amount
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

export default HomeLoanCalculator;
