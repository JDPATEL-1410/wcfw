// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaArrowUp,
  FaFacebook,
  FaTwitter
} from 'react-icons/fa';

import logo from '../assets/footerlogo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Service', path: '/services' },
    { name: 'Calculators', path: '/calculators' },
    { name: 'Blog', path: '/blog' },
    { name: 'Video', path: '/videos' },
    { name: 'Contact Us', path: '/contact' }
  ];

  // Office Locations from the image
  const offices = [
    {
      title: "Anand Office",
      address: "312 - 316, 3rd Floor, Krishna Shrey Complex, Nr. Sanket Sales, Raj Marg, Anand - 388001",
      phone: "+91 98201 35296 , +91 91772 77703",
      email: "info@wcfw.in"
    },
    {
      title: "Vadodara Office",
      address: "304-305-306, The Park, Above Nexa Car Showroom, Opp. Blue Lagoon Restaurant, Akshar Chowk, O.P. Road",
      phone: "+91 98241 43812 , +91 91772 77703",
      email: "tushar@wcfw.in, vadodara@wcfw.in"
    },
    {
      title: "Ahmedabad Branch Office",
      address: "301, 3rd floor, Avani 1, Besides JMC House, Nr Panmal Garden, Off C.G Road, Ahmedabad - 380 009",
      phone: "+91 78430 47366 , +91 91772 77703",
      email: "ahmedabad@wcfw.in, info@wcfw.in"
    },
    {
      title: "Delhi Branch Office",
      address: "505, 5th Floor, Mansarover Building, Nehru Place, New Delhi-110019",
      phone: "+91 98100 31561 , +91 84870 68946",
      email: "pravin@wcfw.in, info@wcfw.in"
    }
    
  ];

  const tools = [
    'Financial Calculators',
    'Buy MF Online',
    'Pay Premium Online'
  ];

  const services = [
    'Financial Planning',
    'Tax Planning',
    'Mutual Fund',
    'NRI Corner'
  ];

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/wecarefreedomwealth', color: 'hover:text-blue-400' },
    { icon: FaTwitter, href: 'https://twitter.com/wecarefreedomwealth', color: 'hover:text-blue-300' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/wecarefreedomwealth', color: 'hover:text-blue-400' },
    { icon: FaInstagram, href: 'https://instagram.com/wecarefreedomwealth', color: 'hover:text-pink-400' },
    { icon: FaYoutube, href: 'https://youtube.com/@wecarefreedomwealth', color: 'hover:text-red-400' }
  ];

  // Market Indices Data with proper links
  const marketIndices = [
    { name: 'NSE', link: 'https://www.nseindia.com/' },
    { name: 'BSE', link: 'https://www.bseindia.com/' },
    { name: 'SEBI', link: 'https://www.sebi.gov.in/' },
    { name: 'RBI', link: 'https://www.rbi.org.in/' },
    { name: 'CDSL', link: 'https://www.cdslindia.com/' },
    { name: 'NCDEX', link: 'https://www.ncdex.com/' },
    { name: 'MCX', link: 'https://www.mcxindia.com/' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-bg opacity-10"></div>

      {/* Decorative Orange Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600"></div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="mb-6 flex justify-center lg:justify-start">
              <img
                src={logo}
                alt="WeCare Freedom Wealth"
                className="h-28 object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in financial growth. We help you build wealth through smart
              investment strategies and personalized financial planning.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full flex items-center justify-center ${social.color} transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-500/40 hover:to-yellow-500/40 border border-orange-500/30`}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

         {/* Quick Links */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  viewport={{ once: true }}
>
  <h3 className="text-lg font-bold mb-6 text-gradient-warm">Quick Links</h3>
  <ul className="space-y-3">
    {[
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Our Services", path: "/services" },
      { name: "Blog", path: "/blog" },
      { name: "Videos", path: "/videos" },
      { name: "Calculators", path: "/calculators" },
      { name: "Contact Us", path: "/contact" },
      { name: "Login", path: "/login" },
    ].map((link, index) => (
      <li key={index}>
        <Link
          to={link.path}
          className="text-gray-400 hover:text-orange-400 flex items-center group transition-colors duration-200"
        >
          <span className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
</motion.div>

{/* Tools */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
>
  <h3 className="text-lg font-bold mb-6 text-gradient-warm">Tools</h3>
  <ul className="space-y-3">
    {[
      { name: "SIP Calculator", path: "/calculator/sip" },
      { name: "Lumpsum Calculator", path: "/calculator/lumpsum" },
      { name: "SWP Calculator", path: "/calculator/swp" },
      { name: "STP Calculator", path: "/calculator/stp" },
      { name: "Retirement Calculator", path: "/calculator/retirement" },
      { name: "Tax Calculator", path: "/calculator/tax" },
      { name: "EMI Calculator", path: "/calculator/emi" },
    ].map((tool, index) => (
      <li key={index}>
        <Link
          to={tool.path}
          className="text-gray-400 hover:text-orange-400 flex items-center group transition-colors duration-200"
        >
          <span className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          {tool.name}
        </Link>
      </li>
    ))}
  </ul>
</motion.div>

{/* Services */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  viewport={{ once: true }}
>
  <h3 className="text-lg font-bold mb-6 text-gradient-warm">Our Services</h3>
  <ul className="space-y-3">
    {[
      { name: "Mutual Funds", path: "/services/mutual-fund" },
      { name: "Insurance", path: "/services/insurance" },
      { name: "Goal-Based Investing", path: "/services/goal-based-investing" },
      { name: "Tax Planning", path: "/services/tax-planning" },
      { name: "Stocks & Equity", path: "/services/stocks" },
      { name: "Fixed Deposits", path: "/services/fixed-deposit" },
      { name: "Financial Planning", path: "/services/financial-planning" },
    ].map((service, index) => (
      <li key={index}>
        <Link
          to={service.path}
          className="text-gray-400 hover:text-orange-400 flex items-center group transition-colors duration-200"
        >
          <span className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          {service.name}
        </Link>
      </li>
    ))}
  </ul>
</motion.div>

        </div>

        {/* Office Locations - 4 Offices Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-white/10 pt-12"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gradient-warm">Our Offices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-orange-500/20 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 hover:shadow-warm">
                <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {office.title}
                </h4>

                <div className="space-y-3 text-sm">
                  <p className="text-gray-300 leading-relaxed">
                    {office.address}
                  </p>

                  <div className="flex items-center text-gray-400">
                    <FaPhone className="mr-2 text-orange-400 flex-shrink-0" />
                    <span>{office.phone}</span>
                  </div>

                  <div className="flex items-center text-gray-400">
                    <FaEnvelope className="mr-2 text-orange-400 flex-shrink-0" />
                    <a
                      href={`mailto:${office.email.split(',')[0]}`}
                      className="hover:text-orange-400 transition-colors duration-300"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Market Indices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-400">
            {marketIndices.map((index, idx) => (
              <React.Fragment key={idx}>
                <a
                  href={index.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  {index.name}
                </a>
                {idx < marketIndices.length - 1 && <span className="text-orange-500">|</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Regulatory & Risk Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-black/40 backdrop-blur-sm text-gray-400 text-xs leading-relaxed p-6 rounded-xl mt-8 space-y-4 border border-orange-500/20"
        >
          <p>
            <strong className="text-orange-400">Risk Factors –</strong> Investments in Mutual Funds are subject to Market Risks.
            Read all scheme related documents carefully before investing. Mutual Fund Schemes do not
            assure or guarantee any returns. Past performances of any Mutual Fund Scheme may or may not be sustained in future.
            There is no guarantee that the investment objective of any suggested scheme shall be achieved. All existing and prospective investors are advised to check and evaluate the Exit loads and
            other exit structure and TER applicable at the time of making the investment before finalizing on any investment decision for Mutual Funds schemes. We deal in
            Regular Plans only for Mutual Fund Schemes and earn a Trailing Commission on client investments. Disclosure For Commission earnings is made to clients at
            the time of investments. Option of Direct Plan for every Mutual Fund Scheme is available to investors offering advantage of lower expense ratio. We are not
            entitled to earn any commission on Direct plans. Hence we do not deal in Direct Plans.
          </p>

          <p>
            <strong className="text-orange-400">AMFI Registered Mutual Fund Distributor</strong> | ARN: <strong>249212</strong> |
            Date of Registration: <strong>26/07/2025</strong> | Current Validity: <strong>25/05/2028</strong>
          </p>

          <p>
            © Copyright 2020. All Rights Reserved. |
            <Link to="/commission-disclosure" className="text-orange-400 hover:text-orange-300 ml-1 transition-colors">
              Commission Disclosure
            </Link> |
            <Link to="/sid-sai-kim" className="text-orange-400 hover:text-orange-300 ml-1 transition-colors">
              SID/SAI/KIM
            </Link> |
            <Link to="/privacy-policy" className="text-orange-400 hover:text-orange-300 ml-1 transition-colors">
              Privacy Policy
            </Link> |
            <Link to="/code-of-conducts" className="text-orange-400 hover:text-orange-300 ml-1 transition-colors">
              Code of Conducts
            </Link>
          </p>

          <p>
            For any Grievance do contact on Mobile Number and Email id of We Care Customer care: Hetal Maheta:
            <a href="tel:+919377277793" className="text-orange-400 hover:text-orange-300 ml-1 transition-colors">9377277793</a> and
            <a href="tel:+919824129366" className="text-orange-400 hover:text-orange-300 ml-1 transition-colors">9824129366</a> mail is
            <a href="mailto:care@wcfw.in" className="text-orange-400 hover:text-orange-300 ml-1 transition-colors">care@wcfw.in</a>
          </p>

          <p className="text-center">
            Copyright © 2025 We Care Freedom Wealth 
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <div className="relative border-t border-white/10 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-xs mb-4 md:mb-0">
                © 2025 We Care Freedom Wealth. All Rights Reserved | Designed by <a href="https://ainatech.in" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 ml-1 transition-colors" aria-label="AinaTech website">AinaTech Services LLP</a>
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-xs">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</Link>
                <Link to="/disclaimer" className="text-gray-400 hover:text-orange-400 transition-colors">Disclaimer</Link>
                <Link to="/commission-disclosure" className="text-gray-400 hover:text-orange-400 transition-colors">Commission Disclosure</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-6 bottom-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-warm-lg hover:shadow-warm transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;
