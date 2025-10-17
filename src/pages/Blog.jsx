import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBook, 
  FaSearch, 
  FaCalendarAlt, 
  FaUser, 
  FaArrowRight,
  FaPlay,
  FaDownload,
  FaTags,
  FaClock,
  FaChartLine,
  FaGift,
  FaPhone,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    persons: '1',
    date: '',
    message: ''
  });

  const categories = ['All', 'Investment Tips', 'Demat Account', 'Stock Market', 'Financial Planning', 'Tax Saving'];

  // Blog posts related to WCFW services
  const blogPosts = [
    {
      id: 1,
      title: "How to Open a FREE Demat & Trading Account in 2025",
      excerpt: "Complete guide to opening your demat and broking account with We Care Freedom Wealth - absolutely FREE with zero charges.",
      category: "Demat Account",
      author: "We Care Team",
      date: "2025-10-08",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
      featured: true,
      tags: ["Demat Account", "FREE", "Trading", "Stock Market"]
    },
    {
      id: 2,
      title: "Why Choose We Care Freedom Wealth for Your Investment Journey",
      excerpt: "Discover the benefits of partnering with We Care Freedom Wealth for all your investment and financial planning needs.",
      category: "Investment Tips",
      author: "Financial Expert",
      date: "2025-10-05",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
      tags: ["Investment", "Financial Planning", "We Care", "Expert Advice"]
    },
    {
      id: 3,
      title: "Stock Market Basics: Getting Started with Trading",
      excerpt: "Everything beginners need to know about stock market investing and trading through your demat account.",
      category: "Stock Market",
      author: "Market Analyst",
      date: "2025-10-02",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
      tags: ["Stock Market", "Trading", "Beginner Guide", "Investment"]
    },
    {
      id: 4,
      title: "Tax Saving Strategies with Mutual Funds",
      excerpt: "Learn how to save tax while building wealth through smart mutual fund investments via We Care platform.",
      category: "Tax Saving",
      author: "Tax Advisor",
      date: "2025-09-28",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      tags: ["Tax Saving", "Mutual Funds", "ELSS", "80C"]
    },
    {
      id: 5,
      title: "Complete Financial Planning Solutions at We Care",
      excerpt: "Comprehensive financial planning services offered by We Care Freedom Wealth for individuals and families.",
      category: "Financial Planning",
      author: "Planning Expert",
      date: "2025-09-25",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400",
      tags: ["Financial Planning", "Goal Planning", "Wealth Management"]
    },
    {
      id: 6,
      title: "Benefits of FREE Demat Account with We Care",
      excerpt: "Understand all the benefits and features you get with your FREE demat and broking account from We Care.",
      category: "Demat Account",
      author: "Account Specialist",
      date: "2025-09-22",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400",
      tags: ["Demat", "FREE Account", "Benefits", "Trading"]
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank You for contact with us, we will contact you soon.");
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mr-4 shadow-warm">
                <FaBook className="text-3xl" />
              </div>
              <h1 className="text-5xl font-bold">
                Blogs – <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">We Care Freedom Wealth</span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Stay informed with our latest insights on investments, financial planning, and get your FREE demat & broking account today!
            </p>
          </motion.div>
        </div>
      </section>

      {/* FREE Demat Account Banner */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center mb-6">
              <FaGift className="text-6xl mr-4" />
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  For a <span className="text-7xl font-extrabold">FREE</span>
                </h2>
                <h3 className="text-2xl font-semibold">demat & broking account</h3>
              </div>
            </div>
            
            <p className="text-xl mb-8 opacity-90">
              Open your investment account today and start your wealth creation journey with We Care Freedom Wealth
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#register-form"
                className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center shadow-lg"
              >
                <FaChartLine className="mr-2" />
                Register Now
              </a>
              
              <a
                href="https://wa.me/919377277793"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" />
              <input
                type="text"
                placeholder="Search articles about investments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-warm'
                      : 'bg-orange-50 text-gray-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-12 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-warm-lg border-2 border-orange-100"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600"></div>
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-warm">
                    Featured
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center font-medium">
                      <FaClock className="mr-1 text-orange-500" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-semibold mr-3 shadow-md">
                        {featuredPost.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">{new Date(featuredPost.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center shadow-warm">
                      Read More <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-warm border-2 border-orange-100 hover:border-orange-300 hover:shadow-warm-lg transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-3">
                    <div className="flex items-center font-medium">
                      <FaUser className="mr-1 text-orange-500" />
                      {post.author}
                    </div>
                    <span className="text-orange-300">•</span>
                    <div className="flex items-center font-medium">
                      <FaCalendarAlt className="mr-1 text-orange-500" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <span className="text-orange-300">•</span>
                    <div className="flex items-center font-medium">
                      <FaClock className="mr-1 text-orange-500" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-yellow-600 transition-all duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs font-medium border border-orange-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="text-orange-600 font-bold hover:text-orange-700 transition-colors duration-300 flex items-center">
                    Read Article <FaArrowRight className="ml-2 text-sm" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register-form" className="py-20 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-warm-lg border-2 border-orange-200 p-10"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Register for Your FREE Demat Account
              </h2>
              <p className="text-gray-600">
                Thank You for contact with us, we will contact you soon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Number of person</label>
                  <select
                    name="persons"
                    value={formData.persons}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Send Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Any additional message or requirements..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-warm"
                >
                  Register Now
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Need Help? Contact Us Today!</h2>
            <p className="text-lg mb-8 opacity-90">
              Our expert team is ready to assist you with your investment journey
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919377277793"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center shadow-lg"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp: +91 93772 77793
              </a>
              
              <a
                href="tel:+919377277793"
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <FaPhone className="mr-2" />
                Call Now
              </a>

              <a
                href="mailto:care@wcfw.in"
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <FaEnvelope className="mr-2" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
