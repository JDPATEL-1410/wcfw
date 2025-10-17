import React from 'react';
import { motion } from 'framer-motion';
import vasudev_thakker from '../assets/team/vasudev-thakker.jpg';
import chintal_patel from '../assets/team/chintal-patel.jpg';
import dharmesh_kunadia from '../assets/team/dharmesh-kunadia.jpg';
import dhruvik_shah from '../assets/team/dhruvik-shah.jpg'; 
import tushar_shah from '../assets/team/tushar-shah.jpg';
import kamlesh_patel from '../assets/team/kamlesh-patel.jpg';
import hetal_mehta from '../assets/team/hetal-mehta.jpg';
import rajesh_chauhan from '../assets/team/rajesh-chauhan.jpg';
import prakash_machhi from '../assets/team/prakash-machhi.jpg';
import vaidehi_patel from '../assets/team/vaidehi-patel.jpg';
import pritesh_thakor from '../assets/team/pritesh-thakor.jpg'; 
import dhruvi_sheth from '../assets/team/dhruvi-sheth.jpg';
import meenaben_gohel from '../assets/team/meenaben-gohel.jpg';
import pravin_solanki from '../assets/team/pravin-solanki.jpg';
import rahul_solanki from '../assets/team/rahul-solanki.jpg';
import pratik_shah from '../assets/team/pratik-shah.jpg';
import vijay_vaghela from '../assets/team/vijay-vaghela.jpg';
import geetaben_thakker from '../assets/team/geetaben-thakker.jpg';
import nishith_pandya from '../assets/team/nishith-pandya.png';
import nikhil_thakker from '../assets/team/nikhil-thakker.jpg';
import Megha_thakker from '../assets/team/megha-thakker.jpg';
import groupimage from '../assets/groupimage.png';


import {
  FaRocket,
  FaEye,
  FaHeart,
  FaUsers,
  FaAward,
  FaCertificate,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaGraduationCap,
  FaShieldAlt,
  FaHandshake,
  FaChartLine,
  FaCrown,
  FaStar,
  FaUserTie,
  FaBuilding,
  FaTrophy,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { color } from 'chart.js/helpers';

const About = () => {
  const values = [
    {
      icon: FaHeart,
      title: "Client-Centric Approach",
      description: "Every decision we make is centered around our clients' best interests and long-term financial success through our one-to-one coaching process."
    },
    {
      icon: FaCertificate,
      title: "Financial Literacy",
      description: "We are on a mission to educate people about Financial Literacy and help them live a financially healthy and stress-free life."
    },
    {
      icon: FaAward,
      title: "Scientific Approach",
      description: "We help people live a financially confident life by following a scientific money management process."
    },
    {
      icon: FaUsers,
      title: "Family-Focused",
      description: "We ensure that our clients get the right amount of money at the right point of time through comprehensive financial planning."
    }
  ];

const foundingMembers = [
  {
    name: "Shri Vasudev Thakker",
    designation: "Founder & Chairman",
    role: "Co-Founder",
    experience: "35+ Years",
    specialization: "Insurance & Wealth Planning",
    description:
      "Visionary leader who started the firm in 1989 with LIC and Post Office savings, later transforming it into a complete wealth creation platform.",
    achievements: [
      "Founded the company in 1989",
      "Pioneer in Gujarat's financial planning space",
      "Built 4600+ family network"
    ],
    image: vasudev_thakker, // Add correct path
    location: "Anand, Gujarat",
    joinedYear: "1989"
  },
  {
    name: "Lt. Smt. Geetaben Thakker",
    designation: "Co-Founder",
    role: "Co-Founder",
    experience: "30+ Years",
    specialization: "Client Relations & Operations",
    description:
      "Co-founded the firm with unwavering dedication to helping families achieve financial security and peace of mind.",
    achievements: [
      "Co-founded WeCare Investment",
      "Established client-centric approach",
      "Built strong foundation for family-focused services"
    ],
    image: geetaben_thakker, // Add correct path
    location: "Anand, Gujarat",
    joinedYear: "1989"
  },
  {
    name: "Megha Thakker",
    designation: "Director",
    role: "Founding Member",
    experience: "15+ Years",
    specialization: "Client Experience & Strategic Planning",
    description:
      "Dedicated to improving client experiences and maintaining We Care’s value-driven service standards.",
    achievements: [
      "Enhanced operational efficiency",
      "Led multiple client engagement programs",
      "Promotes financial awareness among women"
    ],
    image: Megha_thakker, // Add correct path
    location: "Anand, Gujarat",
    joinedYear: "2008"
  },
  {
    name: "Nikhil Thakkar",
    designation: "Managing Director",
    role: "Founding Member",
    experience: "15+ Years",
    specialization: "Digital Strategy & Wealth Management",
    description:
      "Leading the next generation of financial advisors with innovation, technology, and education-driven strategies.",
    achievements: [
      "Introduced tech-led financial planning systems",
      "Expanded We Care’s digital footprint across India",
      "Drives the mission of 10 Lakh financially aware citizens"
    ],
    image: nikhil_thakker, // Add correct path
    location: "Anand, Gujarat",
    joinedYear: "2008"
  }
];


const headDepartment = [
  {
    name: "Nishith Pandya",
    designation: "Insurance Head",
    department: "Insurance & Risk Management",
    experience: "12+ Years",
    specialization: "Life & General Insurance",
    description: "Expert in holistic protection planning and insurance advisory.",
    responsibilities: ["Life Insurance Planning", "Risk Management", "Client Insurance Advisory", "Policy Review"],
    image: nishith_pandya,
    email: "nishith@wcfw.in",
    phone: "+91 98765 43210",
    location: "Anand Office",
    expertise: ["Insurance Planning", "Wealth Protection", "Risk Analysis"]
  },
  {
    name: "Dharmesh Kunadia",
    designation: "Associate Partner",
    department: "Strategic Development",
    experience: "10+ Years",
    specialization: "Mutual Fund Distribution",
    description: "Focused on building scalable advisory systems and investor growth models.",
    responsibilities: ["Business Development", "Mutual Fund Advisory", "Investor Relations", "Team Mentoring"],
    image: dharmesh_kunadia,
    email: "dharmesh@wcfw.in",
    phone: "+91 98765 43211",
    location: "Anand Office",
    expertise: ["Business Strategy", "Mutual Funds", "Goal Planning"]
  },
  {
    name: "Dhruvik Shah",
    designation: "Associate Partner",
    department: "Financial Planning",
    experience: "9+ Years",
    specialization: "Financial Coaching & SIP Planning",
    description: "Promotes Financial Happiness through structured SIP and goal-based planning.",
    responsibilities: ["Financial Planning", "Client Coaching", "Goal Mapping", "SIP Strategy"],
    image: dhruvik_shah,
    email: "dhruvik@wcfw.in",
    phone: "+91 98765 43212",
    location: "Anand Office",
    expertise: ["Financial Literacy", "Wealth Creation", "Client Education"]
  },
  {
    name: "Tushar Shah",
    designation: "Associate Partner",
    department: "Client Relationship",
    experience: "8+ Years",
    specialization: "Client Experience Management",
    description: "Ensures strong and long-lasting relationships with investors through personalized engagement.",
    responsibilities: ["Client Servicing", "Relationship Management", "Investor Experience", "Portfolio Review"],
    image: tushar_shah,
    email: "tushar@wcfw.in",
    phone: "+91 98765 43213",
    location: "Anand Office",
    expertise: ["Client Experience", "Retention Strategy", "CRM Implementation"]
  },
  {
    name: "Kamlesh Patel",
    designation: "General Manager",
    department: "Administration & Operations",
    experience: "10+ Years",
    specialization: "Team & Office Management",
    description: "Handles multi-branch coordination, administration, and process improvement.",
    responsibilities: ["Office Administration", "Branch Coordination", "Process Management", "Team Leadership"],
    image: kamlesh_patel,
    email: "kamlesh@wcfw.in",
    phone: "+91 98765 43214",
    location: "Anand Office",
    expertise: ["Operations", "Process Control", "Leadership"]
  },
  {
    name: "Hetal Mehta",
    designation: "Back Office Head",
    department: "Operations & Client Support",
    experience: "8+ Years",
    specialization: "Client Service & Documentation",
    description: "Leads back-office operations ensuring smooth documentation and client service processes.",
    responsibilities: ["Client Documentation", "Service Requests", "Process Supervision", "Quality Control"],
    image: hetal_mehta,
    email: "hetal@wcfw.in",
    phone: "+91 93772 77793",
    location: "All Branches",
    expertise: ["Customer Support", "Documentation", "Process Optimization"]
  },
  {
    name: "Rajesh Chauhan",
    designation: "Associate Partner",
    department: "Client Relations",
    experience: "9+ Years",
    specialization: "Portfolio Review & Relationship Management",
    description: "Ensures consistent client engagement through periodic portfolio reviews.",
    responsibilities: ["Portfolio Review", "Client Retention", "Financial Analysis", "Performance Reporting"],
    image: rajesh_chauhan,
    email: "rajesh@wcfw.in",
    phone: "+91 98765 43215",
    location: "Anand Office",
    expertise: ["Portfolio Analysis", "Client Engagement", "Wealth Strategy"]
  },
  {
    name: "Prakash Machhi",
    designation: "Insurance Head",
    department: "Insurance & Risk Planning",
    experience: "12+ Years",
    specialization: "Risk Management & Protection Planning",
    description: "Expert in creating custom insurance portfolios and ensuring comprehensive coverage for clients.",
    responsibilities: ["Insurance Planning", "Risk Coverage", "Claims Management", "Policy Structuring"],
    image: prakash_machhi,
    email: "prakash@wcfw.in",
    phone: "+91 98765 43216",
    location: "Anand Office",
    expertise: ["Insurance Planning", "Protection Strategy", "Claims Handling"]
  },
  {
    name: "Vaidehi Patel",
    designation: "Operations Executive - Vadodara",
    department: "Branch Operations",
    experience: "6+ Years",
    specialization: "Client Coordination",
    description: "Manages client servicing and documentation at Vadodara branch.",
    responsibilities: ["Client Support", "Branch Coordination", "Service Follow-ups", "Record Maintenance"],
    image: vaidehi_patel,
    email: "vaidehi@wcfw.in",
    phone: "+91 98765 43217",
    location: "Vadodara Office",
    expertise: ["Branch Management", "Client Relations", "Coordination"]
  },
  {
    name: "Pritesh Thakor",
    designation: "IT Head",
    department: "Technology & Automation",
    experience: "7+ Years",
    specialization: "CRM Development & Business Automation",
    description: "Heads the tech division, driving automation and CRM integration across business processes.",
    responsibilities: ["CRM Development", "Process Automation", "Technology Integration", "AI & Data Systems"],
    image: pritesh_thakor,
    email: "pritesh@ainatech.in",
    phone: "+91 98254 25401",
    location: "Anand Office",
    expertise: ["Zoho CRM", "Automation", "Tech Strategy"]
  }
];

 // Team Members with hover info
const teamDepartments = [
  {
    department: "Client Services",
    members: [
      {
        name: "Dhruvi Sheth",
        role: "Relationship Manager",
        experience: "5+ Years",
        image: dhruvi_sheth,
        email: "dhruvi@wcfw.in",
        specialization: "Client Relationship Management"
      },
      {
        name: "Chintal Patel",
        role: "Relationship Manager",
        experience: "5+ Years",
        image: chintal_patel,
        email: "chintal@wcfw.in",
        specialization: "Client Servicing & Support"
      },
      {
        name: "Meenaben Gohel",
        role: "Insurance Team",
        experience: "8+ Years",
        image: meenaben_gohel,
        email: "meena@wcfw.in",
        specialization: "Insurance Operations & Policy Support"
      }
    ]
  },
  {
    department: "Support & Operations",
    members: [
      {
        name: "Pravin Solanki",
        role: "Support Executive",
        experience: "6+ Years",
        image: pravin_solanki,
        email: "pravin@wcfw.in",
        specialization: "Administrative & Client Support"
      },
      {
        name: "Rahul Solanki",
        role: "Support Executive",
        experience: "5+ Years",
        image: rahul_solanki,
        email: "rahul@wcfw.in",
        specialization: "Documentation & Back Office Support"
      }
    ]
  },
  {
    department: "Equity & Research",
    members: [
      {
        name: "Vijay Vaghela",
        role: "Equity Team Member",
        experience: "7+ Years",
        image: vijay_vaghela,
        email: "vijay@wcfw.in",
        specialization: "Equity Market Research & Analysis"
      },
      {
        name: "Pratik Shah",
        role: "Terminal Operator",
        experience: "4+ Years",
        image: pratik_shah,
        email: "pratik@wcfw.in",
        specialization: "Equity Trading & Transaction Execution"
      }
    ]
  }
];

  // Tooltip Component
  const PersonTooltip = ({ person, children, type = "team" }) => {
    return (
      <div className="relative group">
        {children}

        {/* Hover Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
          <div className="bg-gray-900 text-white text-sm rounded-xl p-4 shadow-2xl min-w-[280px] max-w-[320px]">
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-900"></div>

            {/* Content */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 border-b border-gray-700 pb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-white">{person.name}</h4>
                  <p className="text-orange-300 text-xs">{person.role || person.designation}</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center text-gray-300">
                  <FaAward className="mr-2 text-orange-400" />
                  <span>{person.experience}</span>
                </div>

                {person.email && (
                  <div className="flex items-center text-gray-300">
                    <FaEnvelope className="mr-2 text-blue-400" />
                    <span>{person.email}</span>
                  </div>
                )}

                {person.phone && (
                  <div className="flex items-center text-gray-300">
                    <FaPhone className="mr-2 text-green-400" />
                    <span>{person.phone}</span>
                  </div>
                )}

                {person.location && (
                  <div className="flex items-center text-gray-300">
                    <FaMapMarkerAlt className="mr-2 text-red-400" />
                    <span>{person.location}</span>
                  </div>
                )}

                {person.specialization && (
                  <div className="flex items-start text-gray-300">
                    <FaStar className="mr-2 text-yellow-400 mt-0.5" />
                    <span>{person.specialization}</span>
                  </div>
                )}

                {person.education && (
                  <div className="flex items-start text-gray-300">
                    <FaGraduationCap className="mr-2 text-purple-400 mt-0.5" />
                    <span>{person.education}</span>
                  </div>
                )}

                {person.expertise && (
                  <div className="border-t border-gray-700 pt-2">
                    <p className="text-gray-400 text-xs mb-1">Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {person.expertise.map((skill, idx) => (
                        <span key={idx} className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const achievements = [
    {
      icon: FaUsers,
      number: "4600+",
      title: "Families Served",
      description: "Trusted by thousands of families across Gujarat"
    },
    {
      icon: FaGraduationCap,
      number: "22+",
      title: "Years Experience",
      description: "Over 22 years of remarkable achievements in financial planning"
    },
    {
      icon: FaChartLine,
      number: "4",
      title: "Cities",
      description: "Operations in Anand, Ahmedabad, Vadodara and Delhi"
    },
    {
      icon: FaShieldAlt,
      number: "100%",
      title: "Trust & Support",
      description: "Continued support and trust from our valued clients"
    }
  ];

  const milestones = [
    {
      year: "1989",
      title: "Company Founded",
      description: "Started by Shri Vasudev Thakker and Lt. Smt. Geetaben Thakker with LIC and Post office savings"
    },
    {
      year: "2008",
      title: "Wealth Creation Platform",
      description: "Converted to complete financial planning platform and distribution of all financial asset classes"
    },
    {
      year: "2020",
      title: "Multi-City Expansion",
      description: "Expanded operations to Anand, Ahmedabad and Vadodara City of Gujarat"
    },
    {
      year: "2023",
      title: "4600+ Families",
      description: "Crossed the mark of 4600+ families under our umbrella across three cities"
    },
    {
      year: "2025",
      title: "Mission 10 Lakh",
      description: "Goal to educate 10,00,000 people about financial literacy by Dec 2025"
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
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">WeCare Investment</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We are on a Mission to educate people about Financial Literacy and help them to live a Financially healthy and stress-free life, so that they Live Well and Die Respectfully.
            </p>
          </motion.div>
        </div>
      </section>

     {/* Mission & Vision Section */}
<section className="py-20 bg-gradient-to-br from-orange-50/50 to-yellow-50/50 relative overflow-hidden">
  {/* Decorative Glows */}
  <div className="absolute top-16 left-16 w-40 h-40 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-full blur-3xl"></div>
  <div className="absolute bottom-10 right-16 w-48 h-48 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-12 shadow-xl border border-orange-200 text-center"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 rounded-t-3xl"></div>

      {/* Section Title */}
      <h2 className="text-4xl font-bold text-gray-800 mb-10">
        Mission & Vision
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Mission Card */}
        <div className="bg-gradient-to-br from-orange-100 via-yellow-50 to-white rounded-2xl p-8 border border-orange-200 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <FaRocket className="text-white text-3xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            We are on a mission to educate people about 
            <span className="text-orange-600 font-semibold"> financial literacy </span>
            and to help them live a financially healthy and stress-free life — so that they 
            <span className="text-orange-600 font-semibold"> live well and die respectfully.</span>
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-gradient-to-br from-yellow-100 via-orange-50 to-white rounded-2xl p-8 border border-yellow-200 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <FaEye className="text-white text-3xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our vision is to educate <strong>10,00,000 people</strong> about 
            <span className="text-orange-600 font-semibold"> financial literacy </span>
            and empower them to live a 
            <strong> financially confident and stress-free life </strong> 
            by following a <strong> scientific money management process </strong> 
            by <strong> December 2025.</strong>
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</section>


         {/* Founding Members with Hover Tooltips */}
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
              Our Founding Members
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visionary leaders who laid the foundation of WeCare Investment in 1989
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {foundingMembers.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 shadow-warm border-2 border-orange-200 text-center"
              >
                {/* Founder Image with Tooltip */}
                <div className="mb-6">
                  <PersonTooltip person={founder}>
                    {founder.image ? (
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-300 shadow-warm cursor-pointer hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-warm cursor-pointer hover:scale-110 transition-transform duration-300">
                        <FaCrown />
                      </div>
                    )}
                  </PersonTooltip>

                  <h3 className="text-2xl font-bold text-gray-800">{founder.name}</h3>
                  <p className="text-orange-600 font-semibold">{founder.designation}</p>
                  <p className="text-gray-600">{founder.experience} Experience</p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{founder.description}</p>

                <div className="text-left">
                  <h4 className="font-bold text-gray-800 mb-3 text-center">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {founder.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <FaStar className="text-orange-500 mr-2 text-sm" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Head Department with Hover Tooltips */}
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
              Head Department
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leadership team driving our mission of financial literacy and client success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {headDepartment.map((head, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100 hover:shadow-warm-lg transition-all duration-300 text-center"
              >
                {/* Head Department Image with Tooltip */}
                <div className="mb-6">
                  <PersonTooltip person={head}>
                    {head.image ? (
                      <img
                        src={head.image}
                        alt={head.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-orange-300 shadow-warm cursor-pointer hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-warm cursor-pointer hover:scale-110 transition-transform duration-300">
                        <FaUserTie />
                      </div>
                    )}
                  </PersonTooltip>

                  <h3 className="text-xl font-bold text-gray-800">{head.name}</h3>
                  <p className="text-orange-600 font-semibold">{head.designation}</p>
                  <p className="text-gray-600 text-sm">{head.department}</p>
                  <p className="text-yellow-600 text-sm font-semibold">{head.experience}</p>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">{head.description}</p>

                <div className="mb-4 text-xs space-y-1">
                  <p className="text-orange-600">📧 {head.email}</p>
                  <p className="text-orange-600">📞 {head.phone}</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">Key Responsibilities:</h4>
                  <ul className="space-y-1">
                    {head.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 text-xs">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members with Hover Tooltips */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals working together to serve our 4600+ families
            </p>
          </motion.div>

          <div className="space-y-12">
            {teamDepartments.map((dept, deptIndex) => (
              <motion.div
                key={deptIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: deptIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4 shadow-warm">
                    <FaBuilding className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{dept.department}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dept.members.map((member, memberIndex) => (
                    <div
                      key={memberIndex}
                      className="bg-gradient-to-br from-orange-50/50 to-yellow-50/50 rounded-xl p-6 border-2 border-orange-200 text-center hover:shadow-warm transition-all duration-300"
                    >
                      {/* Team Member Image with Tooltip */}
                      <PersonTooltip person={member}>
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-orange-300 shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg shadow-md cursor-pointer hover:scale-110 transition-transform duration-300">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </PersonTooltip>

                      <h4 className="font-bold text-gray-800 mb-1">{member.name}</h4>
                      <p className="text-orange-600 text-sm font-semibold mb-1">{member.role}</p>
                      <p className="text-gray-600 text-xs">{member.experience}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Family Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Family
            </h2>

           <div className="bg-white rounded-2xl p-12 shadow-warm-lg border-2 border-orange-200">
  <div className="mb-8">
    <div className="w-full max-w-2xl mx-auto rounded-xl shadow-warm overflow-hidden border-2 border-orange-200">
      <img
        src={groupimage}
        alt="We Care Freedom Wealth Team"
        className="w-full h-64 object-cover object-center"
      />
    </div>
  </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">One Big Family</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At WeCare Investment, we don't just serve clients - we build lasting relationships with families.
                Our 4600+ families across Anand, Ahmedabad, and Vadodara are not just clients, they are part of our extended family.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">4600+</div>
                  <div className="text-gray-600">Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">4</div>
                  <div className="text-gray-600">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">22+</div>
                  <div className="text-gray-600">Years</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Achievements */}
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
              Our Achievements
            </h2>
            <p className="text-lg text-gray-600 mb-2">Data as on 09 June 2023</p>

            <div className="mb-8">
              <div className="w-64 h-48 mx-auto bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl shadow-warm flex items-center justify-center border-2 border-orange-200">
                <div className="text-center">
                  <FaTrophy className="text-5xl text-orange-400 mb-2" />
                  <p className="text-gray-600">Achievement Trophy</p>
                  <p className="text-xs text-gray-500">Add achievement image here</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 max-w-3xl mx-auto">
              We sincerely appreciate continued support and trust which has reflected into remarkable achievements since the last 15 years
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center group hover:scale-105 transition-transform duration-300 shadow-warm"
              >
                <achievement.icon className="text-white text-4xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-3xl font-bold mb-2">{achievement.number}</h3>
                <h4 className="text-lg font-semibold mb-2">{achievement.title}</h4>
                <p className="text-white/90 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
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
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings in 1989 to touching thousands of lives across Gujarat
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-400 via-orange-500 to-orange-600 h-full rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1 px-8">
                    <div className={`bg-white rounded-2xl p-6 shadow-warm border-2 border-orange-100 hover:shadow-warm-lg transition-all duration-300 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-bold text-lg mb-2 inline-block px-3 py-1 rounded-lg">
                        {milestone.year}
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>


                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-warm z-10"></div>

                  <div className="flex-1 px-8"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape how we serve our clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-warm border-2 border-orange-100 hover:border-orange-300 hover:shadow-warm-lg transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-warm">
                  <value.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
