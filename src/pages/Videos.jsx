// src/pages/Videos.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaYoutube, FaSearch, FaFilter, FaClock, FaEye } from 'react-icons/fa';

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'SIP & Mutual Funds', 'Tax Planning', 'Insurance', 'Retirement Planning', 'Market Analysis'];

const videos = [
  {
    id: 1,
    title: "Organize Your Money - Live the lifestyle you want | Nikhil Thakkar | We Care Freedom Wealth Pvt. Ltd",
    thumbnail: "https://img.youtube.com/vi/srALW6zLb0k/maxresdefault.jpg",
    videoId: "srALW6zLb0k",
    category: "SIP & Mutual Funds"
  },
  {
    id: 2,
    title: "Quarterly? Yearly? Here's the best time to review your Investment!",
    thumbnail: "https://img.youtube.com/vi/SuZCNYfqgQE/maxresdefault.jpg",
    videoId: "SuZCNYfqgQE",
    category: "Market Analysis"
  },
  {
    id: 3,
    title: "Personal Financial Organizer kya hai aur kyu Zaroori Hai?",
    thumbnail: "https://img.youtube.com/vi/XiLaDj23jHI/maxresdefault.jpg",
    videoId: "XiLaDj23jHI",
    category: "SIP & Mutual Funds"
  },
  {
    id: 4,
    title: "What is SIF? | Everything You Need to Know in Simple Terms | Nikhil Thakkar | We Care Freedom Wealth",
    thumbnail: "https://img.youtube.com/vi/fwW22NEA3fA/maxresdefault.jpg",
    videoId: "fwW22NEA3fA",
    category: "SIP & Mutual Funds"
  },
  {
    id: 5,
    title: "Safeguard Your Investments Through DigiLocker | Nikhil Thakkar | We Care Freedom Wealth",
    thumbnail: "https://img.youtube.com/vi/SEK4OPFxmws/maxresdefault.jpg",
    videoId: "SEK4OPFxmws",
    category: "Insurance"
  },
  {
    id: 6,
    title: "Diwali Picks 2024 | Nikhil Thakkar | We Care Freedom Wealth Pvt. Ltd.",
    thumbnail: "https://img.youtube.com/vi/g4AZe-tF4Vw/maxresdefault.jpg",
    videoId: "g4AZe-tF4Vw",
    category: "Market Analysis"
  },
  {
    id: 7,
    title: "નાની બચતનું વિરાટ સ્વરૂપ એટલે કે Liquid Funds By Nikhil Thakkar | We Care Freedom Wealth Pvt. Ltd.",
    thumbnail: "https://img.youtube.com/vi/5xyveU6aSEk/maxresdefault.jpg",
    videoId: "5xyveU6aSEk",
    category: "SIP & Mutual Funds"
  },
  {
    id: 8,
    title: "How Systematic Withdrawal Plans Can Secure Your Future | We Care Freedom Wealth Pvt. Ltd.",
    thumbnail: "https://img.youtube.com/vi/CTLybFCisos/maxresdefault.jpg",
    videoId: "CTLybFCisos",
    category: "Retirement Planning"
  },
  {
    id: 9,
    title: "Tax Free Monthly આવક લેવાનો એકમાત્ર Source | Nikhil Thakkar | We Care Freedom Wealth Pvt. Ltd.",
    thumbnail: "https://img.youtube.com/vi/ygd5AZbnPik/maxresdefault.jpg",
    videoId: "ygd5AZbnPik",
    category: "Tax Planning"
  },
  {
    id: 10,
    title: "Monthly Cash Flow with Capital Appreciation by Nikhil Thakkar | We Care Freedom Wealth",
    thumbnail: "https://img.youtube.com/vi/SrdhXBArYgA/maxresdefault.jpg",
    videoId: "SrdhXBArYgA",
    category: "SIP & Mutual Funds"
  },
  {
    id: 11,
    title: "Savings V/s Investing By Dwij Thakkar | We Care Freedom Wealth",
    thumbnail: "https://img.youtube.com/vi/ZN_tW2j8URY/maxresdefault.jpg",
    videoId: "ZN_tW2j8URY",
    category: "SIP & Mutual Funds"
  },
  {
    id: 12,
    title: "ટકાવારી બળવાન કે સમય બળવાન? તમને શું લાગે છે? | વી કેર ફ્રીડમ વેલ્થ પ્રાઇવેટ લીમીટેડ",
    thumbnail: "https://img.youtube.com/vi/M_R6uhzTrKU/maxresdefault.jpg",
    videoId: "M_R6uhzTrKU",
    category: "Market Analysis"
  },
  {
    id: 13,
    title: "WHAT IS SIP AND HOW IT WORK‘s? | By Dwij Thakkar | WCFW PVT. LTD.",
    thumbnail: "https://img.youtube.com/vi/Dw6qi4xwLo0/maxresdefault.jpg",
    videoId: "Dw6qi4xwLo0",
    category: "SIP & Mutual Funds"
  },
  {
    id: 14,
    title: "Power of Compounding by Dwij Thakker | We Care Freedom Wealth | WCFW | #Investing #Money #Freedom",
    thumbnail: "https://img.youtube.com/vi/-tcPdA-WIMI/maxresdefault.jpg",
    videoId: "-tcPdA-WIMI",
    category: "SIP & Mutual Funds"
  },
  {
    id: 15,
    title: "What is Financial Planning by Dwij Thakkar | We Care Freedom Wealth",
    thumbnail: "https://img.youtube.com/vi/X0rzVPbzMcM/maxresdefault.jpg",
    videoId: "X0rzVPbzMcM",
    category: "SIP & Mutual Funds"
  },
  {
    id: 16,
    title: "Since Last 2 Days Market Is Correcting What Should We Do? | Nikhil Thakkar | WCFW PVT. LTD.",
    thumbnail: "https://img.youtube.com/vi/jSQdQg9_hiQ/maxresdefault.jpg",
    videoId: "jSQdQg9_hiQ",
    category: "Market Analysis"
  },
  {
    id: 17,
    title: "કેમ ધનિષ્ઠ લોકો વધુ ને વધુ ધનિષ્ઠ થઇ રહ્યા છે? | નીખીલ ઠક્કર | વી કેર ફ્રીડમ વેલ્થ પ્રાઇવેટ લીમીટેડ",
    thumbnail: "https://img.youtube.com/vi/ra4BuJwRJyc/maxresdefault.jpg",
    videoId: "ra4BuJwRJyc",
    category: "SIP & Mutual Funds"
  },
  {
    id: 18,
    title: "Profit Booking from Mutual Funds at Sensex@65000 | Nikhil Thakkar | We Care Freedom Wealth Pvt. Ltd.",
    thumbnail: "https://img.youtube.com/vi/JxNiASDhLUo/maxresdefault.jpg",
    videoId: "JxNiASDhLUo",
    category: "SIP & Mutual Funds"
  },
  {
    id: 19,
    title: "The Feel of Abundance: Unlocking Financial Freedom | Nikhil Thakkar | We Care Freedom Wealth",
    thumbnail: "https://img.youtube.com/vi/QObpOLyYy-A/maxresdefault.jpg",
    videoId: "QObpOLyYy-A",
    category: "Retirement Planning"
  },
  {
    id: 20,
    title: "Natural Behaviour Impact on Wealth Creation Journey | NIkhil Thakkar | We Care Freedom Wealth",
    thumbnail: "https://img.youtube.com/vi/fqKNlVilTOI/maxresdefault.jpg",
    videoId: "fqKNlVilTOI",
    category: "SIP & Mutual Funds"
  },
  {
    id: 21,
    title: "FD કરવી કે LOAN ની PRINCIPAL ભરવી કે પછી EQUITY MUTUAL FUND માં invest કરવું? | Nikhil Thakkar",
    thumbnail: "https://img.youtube.com/vi/rKlribWaRVM/maxresdefault.jpg",
    videoId: "rKlribWaRVM",
    category: "SIP & Mutual Funds"
  },
  {
    id: 22,
    title: "કેવું લાગે છે બજેટ? | Budget 2023-24 | Nikhil Thakkar | We Care Freedom Wealth Pvt. Ltd.",
    thumbnail: "https://img.youtube.com/vi/sxIg0c4qBRU/maxresdefault.jpg",
    videoId: "sxIg0c4qBRU",
    category: "Tax Planning"
  },
  {
    id: 23,
    title: "Welcome 2023 | New Year Resolutions | Nikhil Thakkar | We Care Freedom Wealth Pvt. Ltd.",
    thumbnail: "https://img.youtube.com/vi/RLA3tF4MLJo/maxresdefault.jpg",
    videoId: "RLA3tF4MLJo",
    category: "Retirement Planning"
  },
  {
    id: 24,
    title: "How to Invest during Market Volatility? | Nikhil Thakkar | We Care Investments",
    thumbnail: "https://img.youtube.com/vi/Bv8l6Eey8s8/maxresdefault.jpg",
    videoId: "Bv8l6Eey8s8",
    category: "Market Analysis"
  },
  {
    id: 25,
    title: "What Is More Important Sensex or Your Goals | Market Outlook | Nikhil Thakkar | We Care Investments",
    thumbnail: "https://img.youtube.com/vi/Nhv-ogYCogk/maxresdefault.jpg",
    videoId: "Nhv-ogYCogk",
    category: "Market Analysis"
  },
  {
    id: 26,
    title: "Fix Deposit V/s Debt Fund | Nikhil Thakkar | We Care Investments",
    thumbnail: "https://img.youtube.com/vi/demiXH8j8_M/maxresdefault.jpg",
    videoId: "demiXH8j8_M",
    category: "SIP & Mutual Funds"
  },
  {
    id: 27,
    title: "Russia - Ukraine Crisis and Economic Impact on your Portfolio | Nikhil Thakkar | We Care Investments",
    thumbnail: "https://img.youtube.com/vi/Z_gqwqrFUUA/maxresdefault.jpg",
    videoId: "Z_gqwqrFUUA",
    category: "Market Analysis"
  },
  {
    id: 28,
    title: "2022 Life Changing Year For You | Goal Planning | Nikhil Thakkar | We Care Investments",
    thumbnail: "https://img.youtube.com/vi/YuTS8XBvvRo/maxresdefault.jpg",
    videoId: "YuTS8XBvvRo",
    category: "Retirement Planning"
  }
];


  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-white to-yellow-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl mb-4 shadow-warm">
            <FaYoutube className="text-white text-2xl" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            WeCare's <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Videos</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
            Watch our comprehensive video library covering investment strategies, tax planning, insurance, and wealth management tips from our expert financial advisors.
          </p>

          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-orange-500 rounded"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded mx-2"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-transparent rounded"></div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 bg-white rounded-2xl p-6 shadow-warm border-2 border-orange-100"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white cursor-pointer appearance-none min-w-[200px]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f97316'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1rem'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-warm border-2 border-orange-100 hover:border-orange-300 hover:shadow-warm-lg transition-all duration-300 group"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-warm-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <FaPlay className="text-white text-xl ml-1" />
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
                  <FaClock className="mr-1" />
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  {video.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                  {video.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {video.description}
                </p>

                {/* Video Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaEye className="mr-1" />
                    {video.views} views
                  </div>
                  <span>{video.uploadDate}</span>
                </div>

                {/* Watch Button */}
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
                >
                  <FaPlay className="mr-2" />
                  Watch Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaYoutube className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Videos Found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-center shadow-warm-lg"
        >
          <FaYoutube className="text-white text-4xl mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Subscribe to Our YouTube Channel
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
            Get the latest videos on investment tips, market analysis, and financial planning delivered directly to your inbox.
          </p>
          <a
            href="https://www.youtube.com/@wecarefreedomwealth"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            <FaYoutube className="mr-2" />
            Subscribe Now
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Videos;

