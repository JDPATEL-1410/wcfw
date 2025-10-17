// src/pages/calculators/EMICalculator.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalculator, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaPercentage,
  FaHome,
  FaCar,
  FaChartPie,
  FaInfoCircle,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaArrowUp,
  FaArrowDown
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

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [prepayment, setPrepayment] = useState(0);
  const [activeTab, setActiveTab] = useState('balance');

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    
    // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    
    // With prepayment
    let adjustedMonths = months;
    let interestSaved = 0;
    
    if (prepayment > 0) {
      // Calculate reduced tenure with prepayment
      let balance = principal;
      let monthCount = 0;
      
      while (balance > 0 && monthCount < months) {
        const interest = balance * monthlyRate;
        const principalPaid = emi - interest;
        balance = balance - principalPaid - prepayment;
        monthCount++;
        
        if (balance <= 0) break;
      }
      
      adjustedMonths = monthCount;
      const newTotalPayment = (emi * adjustedMonths) + (prepayment * adjustedMonths);
      const newTotalInterest = newTotalPayment - principal;
      interestSaved = totalInterest - newTotalInterest;
    }
    
    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal),
      adjustedMonths: Math.round(adjustedMonths),
      interestSaved: Math.round(interestSaved),
      yearsReduced: ((months - adjustedMonths) / 12).toFixed(1)
    };
  };

  const results = calculateEMI();

  // Outstanding Balance Chart
  const balanceChartData = {
    labels: Array.from({ length: loanTenure + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Outstanding Principal',
        data: Array.from({ length: loanTenure + 1 }, (_, i) => {
          const months = i * 12;
          let balance = loanAmount;
          const monthlyRate = interestRate / 12 / 100;
          
          for (let j = 0; j < months && j < loanTenure * 12; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid - prepayment;
            if (balance <= 0) return 0;
          }
          
          return Math.max(0, Math.round(balance));
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
      },
      {
        label: 'Principal Paid',
        data: Array.from({ length: loanTenure + 1 }, (_, i) => {
          const months = i * 12;
          let balance = loanAmount;
          const monthlyRate = interestRate / 12 / 100;
          
          for (let j = 0; j < months && j < loanTenure * 12; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid - prepayment;
            if (balance <= 0) return loanAmount;
          }
          
          return Math.round(loanAmount - Math.max(0, balance));
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
      data: [results.principal, results.totalInterest],
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

  // Yearly Payment Breakdown Bar
  const yearlyBarData = {
    labels: Array.from({ length: Math.min(10, loanTenure) }, (_, i) => `Year ${i + 1}`),
    datasets: [
      {
        label: 'Principal',
        data: Array.from({ length: Math.min(10, loanTenure) }, (_, year) => {
          let totalPrincipal = 0;
          let balance = loanAmount;
          const monthlyRate = interestRate / 12 / 100;
          const startMonth = year * 12;
          const endMonth = Math.min((year + 1) * 12, loanTenure * 12);
          
          for (let j = 0; j < startMonth; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid - prepayment;
            if (balance <= 0) return 0;
          }
          
          for (let j = startMonth; j < endMonth; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            totalPrincipal += principalPaid;
            balance = balance - principalPaid - prepayment;
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
          let balance = loanAmount;
          const monthlyRate = interestRate / 12 / 100;
          const startMonth = year * 12;
          const endMonth = Math.min((year + 1) * 12, loanTenure * 12);
          
          for (let j = 0; j < startMonth; j++) {
            const interest = balance * monthlyRate;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid - prepayment;
            if (balance <= 0) return 0;
          }
          
          for (let j = startMonth; j < endMonth; j++) {
            const interest = balance * monthlyRate;
            totalInterest += interest;
            const principalPaid = results.emi - interest;
            balance = balance - principalPaid - prepayment;
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
    <div className="emi-calculator pt-8 pb-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side - Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Amount */}
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
              Loan Amount
            </label>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹1L</span>
              <span className="text-2xl font-bold text-blue-600">₹{(loanAmount / 100000).toFixed(1)}L</span>
              <span className="text-xs text-gray-600 font-semibold">₹1Cr</span>
            </div>
          </motion.div>

          {/* Interest Rate */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
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
              min="5"
              max="20"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">5%</span>
              <span className="text-2xl font-bold text-red-600">{interestRate}%</span>
              <span className="text-xs text-gray-600 font-semibold">20%</span>
            </div>
          </motion.div>

          {/* Loan Tenure */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaCalendarAlt className="text-white" />
              </div>
              Loan Tenure
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">1 Year</span>
              <span className="text-2xl font-bold text-green-600">{loanTenure} Years</span>
              <span className="text-xs text-gray-600 font-semibold">30 Years</span>
            </div>
          </motion.div>

          {/* Monthly Prepayment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-warm"
          >
            <label className="flex items-center text-gray-700 font-bold mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <FaMoneyBillWave className="text-white" />
              </div>
              Monthly Prepayment (Optional)
            </label>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={prepayment}
              onChange={(e) => setPrepayment(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-600 font-semibold">₹0</span>
              <span className="text-2xl font-bold text-purple-600">₹{(prepayment / 1000).toFixed(0)}K</span>
              <span className="text-xs text-gray-600 font-semibold">₹1L</span>
            </div>
          </motion.div>

          {/* Prepayment Benefits */}
          {prepayment > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaArrowDown className="text-2xl" />
                <span className="font-bold text-lg">Prepayment Benefits</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Interest Saved:</span>
                  <span className="font-bold">₹{(results.interestSaved / 100000).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between">
                  <span>Years Reduced:</span>
                  <span className="font-bold">{results.yearsReduced} Years</span>
                </div>
              </div>
            </motion.div>
          )}
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
              <p className="text-sm opacity-90 mt-1">Per month payment</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 shadow-warm-lg text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <FaChartPie className="text-3xl" />
                <span className="text-xs font-bold uppercase">Total Interest</span>
              </div>
              <p className="text-3xl font-bold">₹{(results.totalInterest / 100000).toFixed(2)}L</p>
              <p className="text-sm opacity-90 mt-1">Interest payable</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border-2 border-blue-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaRupeeSign className="text-3xl text-blue-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Principal</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">₹{(results.principal / 100000).toFixed(2)}L</p>
              <p className="text-xs text-gray-600 mt-1">Loan Amount</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-warm"
            >
              <div className="flex items-center justify-between mb-3">
                <FaFileInvoiceDollar className="text-3xl text-green-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Total</span>
              </div>
              <p className="text-2xl font-bold text-green-600">₹{(results.totalPayment / 100000).toFixed(2)}L</p>
              <p className="text-xs text-gray-600 mt-1">Total Payment</p>
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
                Outstanding Balance
              </button>
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'breakdown'
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
            <h4 className="font-bold text-gray-800 mb-2 text-lg">About EMI Calculation</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              EMI (Equated Monthly Installment) is the fixed amount you pay every month towards your loan. Here's what you should know:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Fixed Payment:</strong> EMI remains constant throughout the loan tenure
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Interest Component:</strong> Higher in initial years, decreases over time
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Principal Component:</strong> Lower initially, increases towards the end
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Prepayment:</strong> Extra payments reduce interest burden and loan tenure
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EMICalculator;
