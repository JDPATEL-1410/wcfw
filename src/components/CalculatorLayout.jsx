import React, { useState } from "react";
import SIPCalculator from "../pages/calculators/SIPCalculator";
import LumpsumCalculator from "../pages/calculators/LumpsumCalculator";
import SWPCalculator from "../pages/calculators/SWPCalculator";
import STPCalculator from "../pages/calculators/STPCalculator";
import RetirementCalculator from "../pages/calculators/RetirementCalculator";
import DelayCalculator from "../pages/calculators/DelayCalculator";
import EMICalculator from "../pages/calculators/EMICalculator";
import InsuranceCalculator from "../pages/calculators/InsuranceCalculator";
import TaxCalculator from "../pages/calculators/TaxCalculator";
import MarriageCalculator from "../pages/calculators/MarriageCalculator";
import EducationCalculator from "../pages/calculators/EducationCalculator";
import HomeLoanCalculator from "../pages/calculators/HomeLoanCalculator";
import CarLoanCalculator from "../pages/calculators/CarLoanCalculator";
import VacationCalculator from "../pages/calculators/VacationCalculator";
import { FaCalculator } from "react-icons/fa";

const calculators = {
  sip: { label: "SIP Calculator", component: <SIPCalculator /> },
  lumpsum: { label: "Lumpsum Calculator", component: <LumpsumCalculator /> },
  swp: { label: "SWP Calculator", component: <SWPCalculator /> },
  stp: { label: "STP Calculator", component: <STPCalculator /> },
  retirement: { label: "Retirement Calculator", component: <RetirementCalculator /> },
  delay: { label: "Delay Calculator", component: <DelayCalculator /> },
  emi: { label: "EMI Calculator", component: <EMICalculator /> },
  insurance: { label: "Insurance Calculator", component: <InsuranceCalculator /> },
  tax: { label: "Tax Calculator", component: <TaxCalculator /> },
  marriage: { label: "Marriage Calculator", component: <MarriageCalculator /> },
  education: { label: "Education Calculator", component: <EducationCalculator /> },
  "home-loan": { label: "Home Loan Calculator", component: <HomeLoanCalculator /> },
  "car-loan": { label: "Car Loan Calculator", component: <CarLoanCalculator /> },
  vacation: { label: "Vacation Calculator", component: <VacationCalculator /> },
};

const Calculator = () => {
  const [selected, setSelected] = useState("sip");

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-white to-yellow-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl mb-4 shadow-warm">
            <FaCalculator className="text-white text-2xl" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Financial <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Calculators</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Plan your financial future with our comprehensive suite of calculators. 
            Make informed investment decisions today.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-orange-500 rounded"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded mx-2"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-transparent rounded"></div>
          </div>
          
          {/* Dropdown with enhanced styling */}
          <div className="relative inline-block">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="px-8 py-4 pr-12 border-2 border-orange-300 rounded-xl text-gray-800 font-semibold shadow-warm bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f97316'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5rem'
              }}
            >
              {Object.entries(calculators).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Calculator */}
        <div className="bg-white rounded-2xl shadow-warm-lg p-6 md:p-8 border-2 border-orange-100 hover:border-orange-200 transition-all duration-300">
          {/* Calculator Title Bar */}
          <div className="mb-6 pb-4 border-b-2 border-orange-100">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mr-3"></span>
              {calculators[selected].label}
            </h2>
          </div>

          {/* Calculator Component */}
          <div className="calculator-content">
            {calculators[selected].component}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-200 shadow-warm hover:shadow-warm-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4 shadow-md">
              <span className="text-white text-xl font-bold">✓</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Accurate Results</h3>
            <p className="text-gray-600 text-sm">Get precise calculations based on current market standards and regulations.</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl border-2 border-orange-200 shadow-warm hover:shadow-warm-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 shadow-md">
              <span className="text-white text-xl font-bold">⚡</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Instant Calculations</h3>
            <p className="text-gray-600 text-sm">Real-time results to help you make quick and informed financial decisions.</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-200 shadow-warm hover:shadow-warm-lg transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4 shadow-md">
              <span className="text-white text-xl font-bold">📊</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Visual Insights</h3>
            <p className="text-gray-600 text-sm">Easy-to-understand charts and graphs for better financial planning.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-center shadow-warm-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Help Planning Your Investments?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our expert financial advisors are here to guide you through your investment journey.
          </p>
          <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Talk to an Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
