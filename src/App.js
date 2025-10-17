import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop'; // ✅ Import
import { motion } from 'framer-motion';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ Add this - Router ke andar, sabse pehle */}
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-16"
        >
          <AppRoutes />
        </motion.main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
