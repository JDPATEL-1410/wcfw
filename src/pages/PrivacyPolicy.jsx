import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaShieldAlt } from "react-icons/fa";

const PrivacyPolicy = () => {
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
                <FaLock className="text-3xl" />
              </div>
              <h1 className="text-5xl font-bold">
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Policy</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300">
              Effective from June 1, 2018 | Updated October 3, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-5xl mx-auto px-4 space-y-10 text-gray-700 leading-relaxed">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <p>
              This privacy policy sets out how The Happyness Culture uses and protects
              any information that you share when you use this website. We are committed
              to ensuring that your privacy is protected at all times. Any information
              provided will only be used in accordance with this policy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">1. General Commitment</h2>
                <p>
                  We understand that our relationship is strongly built on trust and faith.
                  In the course of using this website or availing our services, we may
                  become privy to personal information of our customers, including
                  confidential details. We are strictly committed to protecting such
                  information and have taken reasonable measures to secure it. However, we
                  shall not be liable for disclosures required by law, regulators, or due to
                  circumstances beyond our control.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">2. Information We Collect</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>Name and contact details (email, phone number, address).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>Information when registering, purchasing, or using features.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>Usage details such as IP address, browser, and interactions.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">3. Collection & Use of Image Data</h2>
                <p>
                  With your permission, our application may access your device's camera or
                  gallery for features like document upload and Video KYC. Uploaded images
                  are used solely for verification and are not shared with third parties,
                  unless required by law or necessary for service delivery.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">4. Use of Location Data</h2>
                <p>
                  We may access your location to verify your identity and grant access to
                  application features where relevant. This data is not shared externally
                  without your consent, except where legally mandated.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">5. Security</h2>
                <p>
                  We are committed to ensuring that your information is secure. To prevent
                  unauthorized access or disclosure, we implement physical, electronic, and
                  managerial safeguards, including 256-bit encryption and secure hosting
                  with continuous backups.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">6. Links to Other Websites</h2>
                <p>
                  Our website may contain links to other websites. We are not responsible
                  for the protection and privacy of any information you provide on such
                  third-party websites. Users are advised to review the privacy policies of
                  those websites.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">7. Controlling Your Personal Information</h2>
                <p>
                  If you believe any information we hold is incorrect or incomplete, please
                  contact us at <a href="mailto:info@wecare.investments" className="text-orange-600 font-semibold hover:text-orange-700">info@wecare.investments</a>. 
                  You may also request deletion of your account or certain personal
                  information through app settings or official channels.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">8. Security Certificates</h2>
                <p>
                  We recognize the security implications of being a trusted financial
                  services provider. All client data is encrypted, stored securely, and not
                  shared without explicit consent. Passwords are one-way encrypted before
                  being stored in our systems. Communication with AMCs and other partners
                  is also encrypted for maximum security.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100"
          >
            <div className="flex items-start">
              <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">9. Policy Updates</h2>
                <p>
                  This policy may be updated periodically. Please check this page from time
                  to time to ensure you are happy with any changes. The latest update was on
                  <strong> October 3, 2025</strong>.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
