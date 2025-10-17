import React from "react";
import { motion } from "framer-motion";
import { FaChartBar, FaInfoCircle } from "react-icons/fa";

const CommissionDisclosure = () => {
  const commissions = [
    { scheme: "Arbitrage Funds", firstYear: "0.05% to 0.60%", onwards: "0.05% to 0.60%" },
    { scheme: "ELSS Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
    { scheme: "Equity Oriented Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
    { scheme: "Aggressive Hybrid Equity Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
    { scheme: "Fixed Maturity Plans", firstYear: "0.05% to 0.50%", onwards: "0.05% to 0.50%" },
    { scheme: "Fund of Funds", firstYear: "0.25% to 1%", onwards: "0.25% to 1%" },
    { scheme: "Gilt Funds", firstYear: "0.25% to 1%", onwards: "0.05% to 0.65%" },
    { scheme: "Hybrid Debt Funds", firstYear: "0.05% to 0.75%", onwards: "0.05% to 0.75%" },
    { scheme: "Income Funds", firstYear: "0.05% to 1%", onwards: "0.05% to 1%" },
    { scheme: "Index Funds", firstYear: "0.01% to 0.75%", onwards: "0.01% to 0.75%" },
    { scheme: "Liquid / Ultra Short-Term Funds", firstYear: "0.05% to 0.50%", onwards: "0.05% to 0.50%" },
    { scheme: "Short-Term Income Funds", firstYear: "0.05% to 0.65%", onwards: "0.05% to 0.65%" },
    { scheme: "Thematic / Sector Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 hero-bg opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
        
        <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mr-4 shadow-warm">
                <FaChartBar className="text-3xl" />
              </div>
              <h1 className="text-5xl font-bold">
                Commission <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Disclosure</span>
              </h1>
            </div>
            <p className="text-lg text-gray-300">
              Under SEBI Circular SEBI/IMD/CIR No.4 /168230/09
            </p>
          </motion.div>
        </div>
      </section>

      {/* Commission Table */}
      <section className="py-16 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 bg-white rounded-2xl p-6 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <FaInfoCircle className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Trail Commission Structure</h2>
                <p className="text-gray-600 leading-relaxed">
                  As per SEBI regulations, we are required to disclose the trail commission received from mutual fund houses. 
                  The following table provides the range of trailing commissions we receive on various mutual fund schemes as a percentage of AUM (Assets Under Management).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-x-auto shadow-warm-lg rounded-2xl border-2 border-orange-100"
          >
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  <th className="p-4 text-left font-bold">Scheme Type</th>
                  <th className="p-4 text-left font-bold">Trail 1st Year</th>
                  <th className="p-4 text-left font-bold">Trail 2nd Year Onwards</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-orange-50/50" : "bg-white"
                    } hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-200 border-b border-orange-100`}
                  >
                    <td className="p-4 font-semibold text-gray-800">{row.scheme}</td>
                    <td className="p-4 text-gray-700 font-medium">{row.firstYear}</td>
                    <td className="p-4 text-gray-700 font-medium">{row.onwards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Important Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 bg-white p-8 rounded-2xl shadow-warm border-2 border-orange-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-3"></span>
              Important Notes & Disclaimers
            </h3>
            
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <p>
                  <strong className="text-orange-600">Market Risk:</strong> Investments in mutual funds are subject to market risk. Customers should
                  read the scheme-related documents / key information documents of the Mutual
                  Fund products carefully before investing.
                </p>
              </div>

              <div className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <p>
                  <strong className="text-orange-600">Commission Updates:</strong> This disclosure is on a
                  best-effort basis and commission rates are updated as and when actual
                  details are received from AMCs (Asset Management Companies).
                </p>
              </div>

              <div className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <p>
                  <strong className="text-orange-600">Reference Only:</strong> This information is for reference only and does not represent any financial
                  advice. Prices and NAVs of mutual fund schemes are subject to market
                  fluctuations. Past performance does not indicate or guarantee future
                  results.
                </p>
              </div>

              <div className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <p>
                  <strong className="text-orange-600">Client Freedom:</strong> This disclosure is an integral part of proposals we prepare for clients and
                  is provided purely on a non-binding, informational basis. Clients are free
                  to accept or reject proposals and are encouraged to seek independent legal,
                  investment, and taxation advice before making decisions.
                </p>
              </div>

              <div className="flex items-start">
                <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <p>
                  <strong className="text-orange-600">Liability Disclaimer:</strong> We shall not be held responsible for any direct or indirect loss arising
                  from reliance on this information. Always consult with certified financial advisors
                  before making investment decisions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 bg-gradient-to-r from-orange-500 to-yellow-500 p-8 rounded-2xl text-center shadow-warm-lg text-white"
          >
            <h3 className="text-2xl font-bold mb-3">Have Questions About Our Commission Structure?</h3>
            <p className="mb-6 text-white/90">
              Our team is here to provide complete transparency and answer all your queries.
            </p>
            <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CommissionDisclosure;
