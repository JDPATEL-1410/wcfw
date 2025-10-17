import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import { 
  FaChartPie, 
  FaChartLine, 
  FaUmbrella, 
  FaShieldAlt,
  FaPiggyBank,
  FaGem,
  FaCalculator,
  FaHandshake,
  FaPhone,
  FaWhatsapp,
  FaUniversity,
  FaCreditCard,
  FaHome,
  FaBullseye,
  FaUserTie,
  FaBookOpen
} from 'react-icons/fa';

const Services = () => {
  // Main services based on wcfw.in content
  const mainServices = [
    {
      icon: FaChartLine,
      title: "Stock Investment Solutions",
      description: "Discover the power of stocks as a key component of a diversified investment portfolio with our expert guidance.",
      features: [
        "Stock Market Analysis",
        "Portfolio Diversification", 
        "Risk Management Strategies",
        "Market Research & Insights",
        "Performance Monitoring",
        "Long-term Wealth Growth"
      ],
      buttonText: "Explore Stocks",
      buttonLink: "/contact",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaUniversity,
      title: "Fixed Deposits Planning",
      description: "Discover the power of fixed deposits and unlock a world of financial security and stability for wealth preservation.",
      features: [
        "High Interest Rate FDs",
        "Tax-Saving Fixed Deposits",
        "Flexible Tenure Options",
        "Senior Citizen Benefits",
        "Cumulative & Non-Cumulative",
        "Safe & Secure Investment"
      ],
      buttonText: "Plan FD",
      buttonLink: "/contact",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaUmbrella,
      title: "Tax Planning Solutions", 
      description: "Business owners are potentially the most tax-advantaged group in the tax code. Discover all the tax breaks available.",
      features: [
        "Business Tax Optimization",
        "Section 80C Planning", 
        "Tax Deduction Strategies",
        "GST Planning & Compliance",
        "Capital Gains Planning",
        "Tax-Efficient Structures"
      ],
      buttonText: "Save Tax",
      buttonLink: "/contact",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaBullseye,
      title: "Goal-Based Investing",
      description: "Embark on a transformative journey towards financial success with goal-based investing tailored to your dreams and aspirations.",
      features: [
        "Education Planning",
        "Marriage Fund Planning",
        "Home Purchase Planning",
        "Dream Vacation Fund",
        "Emergency Fund Creation",
        "Customized Investment Plans"
      ],
      buttonText: "Set Goals",
      buttonLink: "/contact", 
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaShieldAlt,
      title: "Life Insurance Planning",
      description: "Complete peace of mind with life insurance policies for various purposes including investment and tax benefits for family security.",
      features: [
        "Term Life Insurance",
        "Whole Life Policies",
        "ULIP Plans",
        "Child Insurance Plans", 
        "Pension-Linked Insurance",
        "Tax-Saving Insurance"
      ],
      buttonText: "Get Protected",
      buttonLink: "/contact",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: FaChartPie,
      title: "Mutual Funds Investment",
      description: "Unlock the power of mutual funds and embark on a journey towards financial prosperity with professional fund management.",
      features: [
        "Equity Mutual Funds",
        "Debt Mutual Funds", 
        "Hybrid Mutual Funds",
        "ELSS Tax Saving Funds",
        "SIP Planning",
        "Fund Selection & Review"
      ],
      buttonText: "Start SIP",
      buttonLink: "/calculator",
      gradient: "from-orange-500 to-yellow-500"
    }
  ];

  // Additional specialized services
  const additionalServices = [
    {
      icon: FaPiggyBank,
      title: "Retirement Planning",
      description: "Secure your golden years with comprehensive retirement planning solutions.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: FaHome,
      title: "Real Estate Investment",
      description: "Strategic real estate investment opportunities for portfolio diversification.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: FaCreditCard,
      title: "Loan & Credit Solutions", 
      description: "Personal loans, home loans, and credit optimization strategies.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: FaBookOpen,
      title: "Financial Education",
      description: "Comprehensive financial literacy programs and investment education.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Free Consultation", 
      description: "Book a complimentary consultation to discuss your financial goals and current situation with our experts."
    },
    {
      step: "02", 
      title: "Financial Analysis",
      description: "We analyze your finances, risk profile, and create a personalized investment strategy tailored to your needs."
    },
    {
      step: "03",
      title: "Portfolio Creation",
      description: "Build a diversified portfolio aligned with your goals, timeline, and risk tolerance across multiple asset classes."
    },
    {
      step: "04",
      title: "Ongoing Support", 
      description: "Regular reviews, rebalancing, and adjustments to keep you on track toward achieving your financial goals."
    }
  ];

  const whyChooseUs = [
    {
      title: "Years of Experience",
      description: "With years of experience and a dedicated team of professionals, we offer proven solutions.",
      icon: "🏆"
    },
    {
      title: "Comprehensive Solutions",
      description: "Wide range of services tailored to help individuals and businesses achieve their goals.",
      icon: "💎" 
    },
    {
      title: "Expert Team",
      description: "Experienced team of financial experts who understand the Indian financial landscape.",
      icon: "🚀"
    },
    {
      title: "Client-Focused Approach", 
      description: "Whether you're an individual or a business, we have solutions that can make a difference.",
      icon: "🎯"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/5"></div>
        
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Our Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              At We Care Freedom Wealth Pvt. Ltd., we are committed to providing top-notch services that meet the needs of our clients. With years of experience and a dedicated team of professionals, we offer a wide range of services tailored to help you achieve your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculators"
                className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center shadow-lg"
              >
                <FaCalculator className="mr-2" />
                Try Calculator
              </Link>
              
              <a
                href="https://wa.me/919377277793"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center shadow-lg"
              >
                <FaWhatsapp className="mr-2" />
                Get Free Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-10 shadow-warm border-2 border-orange-200 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              We Care Freedom Wealth Pvt. Ltd.
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Whether you're an individual or a business, we have solutions that can make a difference. In today's dynamic financial landscape, we recognize the importance of comprehensive financial planning and investment strategies that align with your unique needs and aspirations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Core Financial Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions covering all aspects of your financial journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Additional Specialized Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Extended range of financial solutions for comprehensive wealth management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100 hover:shadow-warm-lg transition-all duration-300 text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-warm`}>
                  <service.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make financial planning simple and straightforward with our proven methodology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-warm">
                  {step.step}
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transform -translate-y-1/2 z-0"></div>
                )}
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose We Care Freedom Wealth?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's what sets us apart as your trusted financial partner
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-warm-lg transition-all duration-300 border-2 border-orange-100"
              >
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Comprehensive Financial Solutions
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Investment Portfolio Management",
                    description: "Expert management of diversified investment portfolios across stocks, mutual funds, and fixed deposits."
                  },
                  {
                    title: "Tax Optimization Strategies", 
                    description: "Specialized tax planning for individuals and businesses to maximize savings and compliance."
                  },
                  {
                    title: "Goal-Based Financial Planning",
                    description: "Customized financial plans designed to achieve your specific life goals and dreams."
                  },
                  {
                    title: "Insurance & Risk Management",
                    description: "Comprehensive protection solutions for life, health, and asset protection needs."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-8 text-white"
            >
              <div className="text-center">
                <FaUserTie className="text-6xl text-white mb-6 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">Professional Expertise</h3>
                <p className="text-lg mb-6 opacity-90">
                  Our team of experienced financial professionals brings years of expertise in the Indian financial market to help you make informed investment decisions.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold">4600+</div>
                    <div className="text-sm opacity-90">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">15+</div>
                    <div className="text-sm opacity-90">Years Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a free consultation with our expert financial advisors and take the first step towards achieving your financial goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919377277793"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center shadow-lg"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp Consultation
              </a>
              
              <a
                href="tel:+919377277793"
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <FaPhone className="mr-2" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
