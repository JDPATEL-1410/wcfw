// src/pages/Home.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import { 
  FaChartPie, 
  FaShieldAlt, 
  FaUmbrella,
  FaPiggyBank,
  FaGem,
  FaChartLine,
  FaUsers,
  FaAward,
  FaRocket,
  FaCalculator,
  FaHandshake,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaPhoneAlt,
  FaRupeeSign,      // ✅ Added
  FaCalendarAlt     // ✅ Added
} from 'react-icons/fa';

const Home = () => {
  const [sipAmount, setSipAmount] = useState(10000);
  const [sipYears, setSipYears] = useState(15);
  const [sipReturn, setSipReturn] = useState(12);

  // Calculate SIP Returns
  const calculateSIP = () => {
    const monthlyRate = sipReturn / 12 / 100;
    const months = sipYears * 12;
    const futureValue = sipAmount * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    const invested = sipAmount * months;
    const returns = futureValue - invested;
    
    return {
      futureValue: Math.round(futureValue),
      invested: Math.round(invested),
      returns: Math.round(returns)
    };
  };

  const results = calculateSIP();

  const services = [
    {
      icon: FaChartPie,
      title: "Financial Planning",
      description: "Comprehensive financial planning tailored to your life goals and dreams.",
      features: ["Goal-based Planning", "Risk Assessment", "Portfolio Review", "Regular Monitoring"],
      buttonText: "Plan Your Future",
      buttonLink: "/services",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaChartLine,
      title: "Mutual Funds & SIP",
      description: "Start your wealth creation journey with systematic investment plans.",
      features: ["Diversified Portfolio", "Tax Benefits", "Professional Management", "Low Minimum Investment"],
      buttonText: "Start SIP",
      buttonLink: "/calculators",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaUmbrella,
      title: "Tax Saving Schemes",
      description: "Optimize your tax liability while building wealth for the future.",
      features: ["ELSS Funds", "PPF Planning", "Tax Deductions", "Smart Tax Planning"],
      buttonText: "Save Tax",
      buttonLink: "/services",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaShieldAlt,
      title: "Insurance Planning",
      description: "Protect your family's financial future with comprehensive insurance solutions.",
      features: ["Term Insurance", "Health Insurance", "Child Plans", "Retirement Plans"],
      buttonText: "Get Protected",
      buttonLink: "/services",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaPiggyBank,
      title: "Retirement Planning",
      description: "Secure your golden years with strategic retirement planning solutions.",
      features: ["Pension Plans", "Annuity Plans", "Senior Citizen Schemes", "Healthcare Planning"],
      buttonText: "Plan Retirement",
      buttonLink: "/services",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaGem,
      title: "Wealth Management",
      description: "Premium wealth management services for high net worth individuals.",
      features: ["Portfolio Management", "Alternative Investments", "Estate Planning", "Family Office"],
      buttonText: "Manage Wealth",
      buttonLink: "/services",
      gradient: "from-orange-500 to-yellow-500"
    }
  ];

  const testimonials = [
    {
      name: "Satisfied Client",
      designation: "Retirement Planning Client",
      company: "",
      testimonial: "Since working with We Care Freedom Wealth have met and surpassed my expectations of working with financial advisors. They take the time to really know their clients which gives me every confidence that not just my financial goals are well understood but also my comfort level. They regularly provide updates and have always been available to answer any questions or to explain options within my portfolio. Transitioning into retirement has been much easier thanks to We Care investments guidance.",
      rating: 5
    },
    {
      name: "Family Client",
      designation: "14 Years Association",
      company: "",
      testimonial: "We Care Investments have been our financial advisors for the past 14 years. They have always offered sound financial advice based on our investment objectives as well as our personal needs. They keep in regular contact with us and provide us with on-going financial advice as our needs and markets change. They take the time needed to fully explain our options and to guide us in an appropriate direction. We feel as though they truly care about our family, our finances, and our future.",
      rating: 5
    },
    {
      name: "Nikhil's Client",
      designation: "Long-term Investor",
      company: "",
      testimonial: "My association with Nikhil We Care Investments goes back a long time. I have grown over the years to trust Nikhil's advice and recommendations on various investment alternatives which have been commensurate with my risk appetite. Thus far, I have grown my portfolio with stable and satisfactory returns. In fact, you are now a 'one-stop-shop' for all my investments and insurance requirements. I wish you all success in the future and look forward to a continuing mutually rewarding association.",
      rating: 5
    }
  ];

  const stats = [
    { icon: FaUsers, number: "10,000+", label: "Happy Clients" },
    { icon: FaChartLine, number: "₹1,200Cr+", label: "Assets Under Management" },
    { icon: FaAward, number: "15%", label: "Average Returns" },
    { icon: FaRocket, number: "20+", label: "Years of Excellence" }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Financial Happiness Program Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/50 via-white to-yellow-50/50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm-lg"
            >
              <FaRocket className="text-white text-3xl" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Start Your Wealth Creation <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Journey with Us!</span>
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-warm border-2 border-orange-100"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  At the <strong className="text-orange-600">Financial Happiness Program</strong>, our goal is to empower individuals like you to achieve financial well-being and happiness. We believe that financial literacy and mindful money management are the keys to creating a secure and fulfilling life.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white shadow-warm-lg"
              >
                <p className="text-lg leading-relaxed">
                  Our program is designed to provide you with the knowledge, tools, and support you need to take control of your finances and make smart financial decisions. Whether you're looking to get out of debt, save for the future, or simply improve your financial habits, we're here to guide you every step of the way.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive SIP Calculator Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-yellow-50/30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Financial <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Calculator</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your SIP returns and see the power of systematic investing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 md:p-12 border-2 border-orange-200 shadow-warm-lg"
          >
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Monthly Amount */}
              <div className="bg-white rounded-2xl p-6 shadow-warm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Monthly Amount</h3>
                  <FaRupeeSign className="text-orange-500 text-2xl" />
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                  className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>₹1,000</span>
                  <span>₹20,000</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">₹{sipAmount.toLocaleString()}</div>
                  <p className="text-sm text-gray-500">per month</p>
                </div>
              </div>

              {/* Number of Years */}
              <div className="bg-white rounded-2xl p-6 shadow-warm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">No. of Years</h3>
                  <FaCalendarAlt className="text-orange-500 text-2xl" />
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={sipYears}
                  onChange={(e) => setSipYears(Number(e.target.value))}
                  className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>2</span>
                  <span>30</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{sipYears}</div>
                  <p className="text-sm text-gray-500">years</p>
                </div>
              </div>

              {/* Expected Return */}
              <div className="bg-white rounded-2xl p-6 shadow-warm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Expected Return</h3>
                  <FaChartLine className="text-orange-500 text-2xl" />
                </div>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[9, 12, 15].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSipReturn(rate)}
                      className={`py-2 px-4 rounded-lg font-bold transition-all duration-300 ${
                        sipReturn === rate
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-warm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="9"
                  max="15"
                  step="1"
                  value={sipReturn}
                  onChange={(e) => setSipReturn(Number(e.target.value))}
                  className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="text-center mt-4">
                  <div className="text-3xl font-bold text-orange-600">{sipReturn}%</div>
                  <p className="text-sm text-gray-500">per annum</p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 text-center shadow-warm">
                <p className="text-sm text-gray-600 mb-2">Total Investment</p>
                <p className="text-3xl font-bold text-blue-600">₹{(results.invested / 100000).toFixed(2)}L</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-warm">
                <p className="text-sm text-gray-600 mb-2">Estimated Returns</p>
                <p className="text-3xl font-bold text-green-600">₹{(results.returns / 100000).toFixed(2)}L</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 text-center shadow-warm-lg">
                <p className="text-sm text-white/90 mb-2">Total Value</p>
                <p className="text-3xl font-bold text-white">₹{(results.futureValue / 100000).toFixed(2)}L</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/calculators"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-warm-lg inline-flex items-center text-lg"
              >
                <FaCalculator className="mr-3 text-xl" />
                Explore All Calculators
                <FaArrowRight className="ml-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Financial <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions designed to help you achieve your dreams and secure your future
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Why Choose <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">We Care Freedom Wealth?</span>
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Expert Guidance",
                    description: "Professional financial advisors with decades of experience in wealth management and investment planning."
                  },
                  {
                    title: "Personalized Solutions",
                    description: "Customized investment strategies based on your unique financial goals, risk appetite, and life situation."
                  },
                  {
                    title: "Transparent Process",
                    description: "Complete transparency in fees, processes, and investment recommendations with regular updates."
                  },
                  {
                    title: "One-Stop Solution",
                    description: "Comprehensive services covering investments, insurance, tax planning, and retirement solutions."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-warm">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center group hover:scale-105 transition-transform duration-300 shadow-warm-lg"
                >
                  <stat.icon className="text-white text-5xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                  <p className="text-white/90 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Our <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real testimonials from our satisfied clients who have trusted us with their financial future
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Additional Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-warm-lg border-2 border-orange-100 hover:border-orange-300 transition-all duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
                  <FaHandshake className="text-white text-3xl" />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 italic mb-6 max-w-4xl mx-auto leading-relaxed">
                  "We have known We Care Investments for 2 decades and more now and during this time we have been very impressed with their competence not only with their wise and skillful placement of our money but also their very professional organization. They regularly get in touch with us and also visit us several times a year to review our situation and to make suggestions on any improvements they think they can make. They have a proactive approach to their work and, after each visit, they later follow up and forward a very detailed report explaining the current situation."
                </blockquote>
                <div className="text-orange-600 font-bold text-lg">20+ Years Association Client</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 shadow-warm-lg"
            >
              <FaRocket className="text-white text-4xl" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Wealth Creation Journey?
            </h2>
            <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto">
              Join thousands of satisfied investors who trust us with their financial future. 
              Start your SIP today with as low as ₹500 per month.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculators"
                className="bg-white text-orange-600 font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center shadow-warm-lg text-lg"
              >
                <FaCalculator className="mr-3 text-xl" />
                Calculate SIP Returns
              </Link>
              
              <Link
                to="/contact"
                className="bg-transparent border-3 border-white text-white font-bold py-4 px-10 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center text-lg"
              >
                <FaPhoneAlt className="mr-3" />
                Book Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
