import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  buttonText = "Learn More",
  buttonLink = "#",
  gradient = "from-orange-500 to-yellow-500",
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="relative bg-white p-8 rounded-2xl shadow-warm border-2 border-orange-100 hover:border-orange-300 hover:shadow-warm-lg transition-all duration-300 group overflow-hidden"
    >
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 rounded-t-2xl"></div>

      {/* Icon Section */}
      <div className="relative mb-6">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-warm`}>
          <Icon className="text-white text-2xl" />
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
          <FaArrowRight className="text-white text-xs" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-yellow-600 transition-all duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Features List */}
      {features && (
        <ul className="space-y-2.5 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700 font-medium">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* CTA Button */}
      <a
        href={buttonLink}
        className="inline-flex items-center text-orange-600 font-bold hover:text-orange-700 transition-colors duration-300 group/btn"
      >
        {buttonText}
        <FaArrowRight className="ml-2 text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
      </a>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-50 to-transparent rounded-tl-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Decorative Top Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default ServiceCard;
