import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";

const Disclaimer = () => {
  const disclaimerSections = [
    {
      title: "Market Risks & Investment Disclosures",
      content: "Mutual fund investments are subject to market risks, and values may fluctuate due to economic and financial conditions. Past performance does not guarantee future results, and short-term market movements are unpredictable. Investors should review all scheme-related documents carefully before investing."
    },
    {
      title: "Dividend Payments",
      content: "Opting for the Dividend Option does not guarantee payouts. Dividends are distributed only when a fund has sufficient surplus. If no surplus is generated, no dividend will be paid."
    },
    {
      title: "Updating Personal Information",
      content: "Investors must keep their records updated to ensure smooth transactions and communication. Any changes in personal details such as name, address, contact information, nominee, or bank account must be reported immediately. Outdated or inaccurate details may lead to transaction failures or non-receipt of critical information."
    },
    {
      title: "Nominee & Joint Holder Updates",
      content: "If a nominee or joint holder passes away, records must be updated promptly to avoid complications in claiming investments. Proof such as a death certificate and identity verification documents are required for changes. Keeping nominee details current ensures smooth transfer of investments to legal heirs."
    },
    {
      title: "Review Meetings & Reports",
      content: "We recommend annual reviews to track portfolio performance and realign investments with financial goals. Markets evolve, and periodic reviews help optimize asset allocation. AMCs send statements via email, ensuring transparency and easy record-keeping."
    },
    {
      title: "Valuation Reports & NAV Calculations",
      content: "NAV and valuation figures reflect the last recorded transaction date and may not represent current values. NAV applicable to transactions depends on execution date and cutoff times. Reports are for information only and should not be the sole basis for investment decisions."
    },
    {
      title: "Lock-in Periods & Exit Loads",
      items: [
        "Retirement & Children's Gift Funds: Lock-in of 5 years per installment.",
        "ELSS Funds: Lock-in of 3 years per installment.",
        "Exit Loads: Apply separately on each SIP installment or lump sum redemption within 12–24 months. Exit load rates vary across schemes."
      ]
    },
    {
      title: "Taxation & TDS Rules",
      content: "Taxation on mutual funds depends on investment type, holding duration, and redemption date. Short-Term and Long-Term Capital Gains (STCG, LTCG) apply differently. NRI investors with NRE/NRO accounts will have TDS deducted as per regulations. Investors should consult a tax advisor before making decisions."
    },
    {
      title: "Regulatory & Compensation Disclosure",
      content: "We distribute only regular plans of mutual funds and earn trail commissions from AMCs. We do not distribute direct plans and do not charge investors any direct advisory fees. Our role is limited to facilitating investments."
    },
    {
      title: "Exit Load, Lock-in Period & Redemption Terms",
      content: "Investors must review exit loads, lock-in rules, and redemption terms before withdrawal. Redemption proceeds are credited in T+1 or T+2 days depending on the scheme's processing. Planning redemptions in advance ensures timely fund access."
    },
    {
      title: "Data Privacy & Security",
      content: "We do not share, sell, or misuse investor data. Sensitive details like PAN, Aadhaar, and bank accounts are not stored on our website. Transactions are processed securely through AMCs, RTAs, BSE/NSE/MFU platforms to ensure compliance and confidentiality."
    },
    {
      title: "Error Rectification & Misrepresentation Disclaimer",
      content: "While we aim for accuracy, occasional errors may occur. Investors are responsible for verifying details before making financial decisions. We reserve the right to rectify errors but do not guarantee assured returns or fixed income. Beware of fraudulent schemes and misleading investment guarantees — mutual funds are market-linked and subject to risks."
    }
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
                <FaExclamationTriangle className="text-3xl" />
              </div>
              <h1 className="text-5xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Disclaimer</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300">
              Important regulatory and risk disclosures for investors
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Important Notice Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 text-white shadow-warm-lg"
          >
            <div className="flex items-start">
              <FaShieldAlt className="text-3xl mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Important Notice</h2>
                <p className="text-white/90 leading-relaxed">
                  This page contains important regulatory disclosures and risk factors that all investors must understand before making investment decisions. 
                  Please read this information carefully and consult with our advisors if you have any questions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer Sections */}
          <div className="space-y-6">
            {disclaimerSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-warm border-2 border-orange-100 hover:border-orange-200 hover:shadow-warm-lg transition-all duration-300"
              >
                <div className="flex items-start">
                  <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">{section.title}</h2>
                    
                    {section.content && (
                      <p className="text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    )}
                    
                    {section.items && (
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 bg-white rounded-2xl p-8 shadow-warm-lg border-2 border-orange-200"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaExclamationTriangle className="text-orange-500 mr-3" />
              Investor Responsibility
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using our services and investing in mutual funds through our platform, you acknowledge that you have read, understood, 
              and agreed to all the terms, conditions, and disclaimers mentioned on this page. You accept full responsibility for your 
              investment decisions and understand that mutual fund investments are subject to market risks.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold text-orange-700">
              For any queries or clarifications regarding these disclosures, please contact our support team or consult with our 
              certified financial advisors before making investment decisions.
            </p>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 bg-gradient-to-r from-orange-500 to-yellow-500 p-8 rounded-2xl text-center shadow-warm-lg text-white"
          >
            <h3 className="text-2xl font-bold mb-3">Need Clarification?</h3>
            <p className="mb-6 text-white/90">
              Our team is available to answer any questions you may have about these disclosures.
            </p>
            <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Support
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Disclaimer;
