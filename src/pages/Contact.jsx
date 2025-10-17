import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp,
  FaClock,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaCheckCircle,
  FaPaperPlane,
  FaBuilding, 
  FaFacebook,
} from 'react-icons/fa';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Real office locations from wcfw.in/contact
  const officeLocations = [
    {
       city: "Anand",
    address: "312 - 316, 3rd Floor, Krishna Shrey Complex, Nr. Sanket Sales, Raj Marg, Anand - 388001",
    phones: ["+91 98241 29366", "+91 93772 77703"],
    emails: ["info@wcfw.in"],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d147.95806132827518!2d72.943892!3d22.5658472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4fd40a134a8d%3A0x9cec1ba95b807341!2sWe%20Care%20Freedom%20Wealth%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1697074456145!5m2!1sen!2sin",
    },
    {
      city: "Ahmedabad", 
      address: "301, 3rd floor, Anam 1, Besides JMC House, Nr. Parimal Garden, Off. C G Road, Ahmedabad - 380 009",
      phones: ["+91 72840 47366", "+91 93772 77703"],
      emails: ["dhruvik@wcfw.in", "info@wcfw.in"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.1!2d72.5566!3d23.0340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAyJzAyLjQiTiA3MsKwMzMnMjMuOCJF!5e0!3m2!1sen!2sin!4v1696920000000!5m2!1sen!2sin"
    },
    {
      city: "Vadodara",
      address: "304-305-306, The Park, Above Nexa Car Showroom, Opp. Blue Lagoon Restaurant, Akshar Chowk, O.P. Road", 
      phones: ["+91 98241 43812", "+91 93772 77703"],
      emails: ["tushar@wcfw.in", "vaidehi@wcfw.in"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.2!2d73.1812!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzI2LjAiTiA3M8KwMTAnNTIuMyJF!5e0!3m2!1sen!2sin!4v1696920000000!5m2!1sen!2sin"
    },
    {
  city: "Delhi",
  title: "Delhi Branch Office",
  address: "505, 5th Floor, Mansarover Building, Nehru Place, New Delhi - 110019",
  phones: ["+91 98100 31561", "+91 84870 68946"],
  emails: ["pravin@wcfw.in", "info@wcfw.in"],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.522458072756!2d77.25075447527322!3d28.55145188888571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce36d49e45b33%3A0xa704474671d18209!2sMansarover%20Building%2C%20Nehru%20Place%2C%20New%20Delhi%2C%20Delhi%20110019!5e0!3m2!1sen!2sin!4v1707500000000!5m2!1sen!2sin"
}

  ];

  const businessHours = [
    { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
    { day: "Saturday", time: "10:00 AM - 5:00 PM" },
    { day: "Sunday", time: "By Appointment" }
  ];

  const services = [
    "Financial Planning Consultation",
    "SIP & Mutual Fund Advisory", 
    "Stock Investment Guidance",
    "Fixed Deposit Planning",
    "Tax Planning Services",
    "Insurance Planning",
    "Goal-Based Investing",
    "Demat Account Opening",
    "Retirement Planning",
    "Wealth Management"
  ];
const socialLinks = [
{ icon: FaLinkedin, href: "https://www.linkedin.com/company/wecarefreedomwealth", color: "hover:text-blue-600" },
{ icon: FaInstagram, href: "https://www.instagram.com/wecarefreedomwealth", color: "hover:text-pink-600" },
{ icon: FaYoutube, href: "https://www.youtube.com/@wecarefreedomwealth", color: "hover:text-red-600" },
{ icon: FaWhatsapp, href: "https://wa.me/919377277703", color: "hover:text-green-600" },
{ icon: FaFacebook, href: "https://www.facebook.com/wecarefreedomwealth", color: "hover:text-blue-800" }
];


  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-warm-lg max-w-md"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your message has been sent successfully. Our team will contact you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-warm"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

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
              WeCare  : <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Contact us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Ready to start your financial journey? Our expert advisors across Anand, Ahmedabad, and Vadodara are here to help you achieve your financial goals. Schedule a free consultation today!
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2"></div>
                3 Office Locations
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2"></div>
                Expert Financial Guidance
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2"></div>
                Personalized Investment Solutions
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Locations */}
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
              Our Office Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit any of our three convenient locations across Gujarat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 shadow-warm border-2 border-orange-100 hover:border-orange-300 hover:shadow-warm-lg transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4 shadow-warm">
                    <FaBuilding className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{office.city} Office</h3>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <div className="flex items-start mb-3">
                    <FaMapMarkerAlt className="text-orange-500 mr-3 mt-1" />
                    <p className="text-gray-700 leading-relaxed">{office.address}</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <FaPhone className="text-orange-500 mr-2" />
                    Phone Numbers
                  </h4>
                  <div className="space-y-1">
                    {office.phones.map((phone, idx) => (
                      <a 
                        key={idx}
                        href={`tel:${phone}`}
                        className="block text-gray-600 hover:text-orange-600 transition-colors duration-300"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email Addresses */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <FaEnvelope className="text-orange-500 mr-2" />
                    Email Addresses
                  </h4>
                  <div className="space-y-1">
                    {office.emails.map((email, idx) => (
                      <a 
                        key={idx}
                        href={`mailto:${email}`}
                        className="block text-gray-600 hover:text-orange-600 transition-colors duration-300"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-3">
                  <a
                    href={`tel:${office.phones[0]}`}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                  >
                    <FaPhone className="mr-2" />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${office.phones[0].replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                  >
                    <FaWhatsapp className="mr-2" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-warm-lg border-2 border-orange-100"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 rounded-t-2xl"></div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send us a <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Message</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className={`w-full py-3 px-4 border-2 ${errors.firstName ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className={`w-full py-3 px-4 border-2 ${errors.lastName ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`w-full py-3 px-4 border-2 ${errors.email ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                    className={`w-full py-3 px-4 border-2 ${errors.phone ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Office Location</label>
                  <select
                    {...register('location', { required: 'Please select an office' })}
                    className={`w-full py-3 px-4 border-2 ${errors.location ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                  >
                    <option value="">Select preferred office</option>
                    <option value="Anand">Anand Office</option>
                    <option value="Ahmedabad">Ahmedabad Office</option>
                    <option value="Vadodara">Vadodara Office</option>
                    <option value="Delhi">Delhi Office</option>
                  </select>
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Service Interested In</label>
                  <select
                    {...register('service', { required: 'Please select a service' })}
                    className={`w-full py-3 px-4 border-2 ${errors.service ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="5"
                    {...register('message', { required: 'Message is required' })}
                    className={`w-full py-3 px-4 border-2 ${errors.message ? 'border-red-500' : 'border-orange-200'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white`}
                    placeholder="Tell us about your financial goals and how we can help..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center shadow-warm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Quick <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Contact</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Get in touch with us through any of the following channels. We're here to help you succeed!
                </p>
              </div>

              {/* Quick Contact Info */}
              <div className="bg-white rounded-xl p-6 shadow-warm border-2 border-orange-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Main Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaWhatsapp className="text-green-500 text-xl mr-4" />
                    <div>
                      <p className="font-semibold text-gray-800">WhatsApp</p>
                      <a href="https://wa.me/919377277703" className="text-gray-600 hover:text-green-500 transition-colors">
                        +91 93772 77703
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-orange-500 text-xl mr-4" />
                    <div>
                      <p className="font-semibold text-gray-800">General Inquiry</p>
                      <a href="mailto:info@wcfw.in" className="text-gray-600 hover:text-orange-500 transition-colors">
                        info@wcfw.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl p-6 shadow-warm border-2 border-orange-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((hours, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-orange-50 last:border-0">
                      <span className="text-gray-700 font-semibold">{hours.day}</span>
                      <span className="text-gray-600">{hours.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl p-6 shadow-warm border-2 border-orange-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <p className="text-gray-600 mb-4">
                  Stay connected for the latest financial insights and tips
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 hover:scale-110 border-2 border-orange-200`}
                    >
                      <social.icon className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Maps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Visit Our <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Offices</span>
            </h2>
            <p className="text-xl text-gray-600">
              Choose the most convenient location for your visit
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-warm border-2 border-orange-100"
              >
                <div className="h-64 w-full">
                  <iframe
                    title={`${office.city} Office Location`}
                    src={office.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{office.city} Office</h3>
                  <p className="text-gray-600 text-sm mb-4">{office.address}</p>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${office.phones[0]}`}
                      className="flex-1 text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/${office.phones[0].replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all duration-300"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
