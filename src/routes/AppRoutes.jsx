import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy imports for pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Blog = lazy(() => import("../pages/Blog"));
const Calculator = lazy(() => import("../components/Calculator"));
const Calculators = lazy(() => import("../pages/Calculators"));
const Contact = lazy(() => import("../pages/Contact"));
const Login = lazy(() => import("../pages/Login"));
const Videos = lazy(() => import("../pages/Videos"));

// ✅ Calculator Components - Har calculator ke liye alag import
const SIPCalculator = lazy(() => import("../pages/calculators/SIPCalculator"));
const LumpsumCalculator = lazy(() => import("../pages/calculators/LumpsumCalculator"));
const SWPCalculator = lazy(() => import("../pages/calculators/SWPCalculator"));
const STPCalculator = lazy(() => import("../pages/calculators/STPCalculator"));
const RetirementCalculator = lazy(() => import("../pages/calculators/RetirementCalculator"));
const DelayCalculator = lazy(() => import("../pages/calculators/DelayCalculator"));
const EMICalculator = lazy(() => import("../pages/calculators/EMICalculator"));
const InsuranceCalculator = lazy(() => import("../pages/calculators/InsuranceCalculator"));
const TaxCalculator = lazy(() => import("../pages/calculators/TaxCalculator"));
const MarriageCalculator = lazy(() => import("../pages/calculators/MarriageCalculator"));
const EducationCalculator = lazy(() => import("../pages/calculators/EducationCalculator"));
const HomeLoanCalculator = lazy(() => import("../pages/calculators/HomeLoanCalculator"));
const CarLoanCalculator = lazy(() => import("../pages/calculators/CarLoanCalculator"));
const VacationCalculator = lazy(() => import("../pages/calculators/VacationCalculator"));

// Legal / Compliance Pages
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../pages/TermsOfService"));
const Disclaimer = lazy(() => import("../pages/Disclaimer"));
const CommissionDisclosure = lazy(() => import("../pages/CommissionDisclosure"));

const AppRoutes = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    }>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/videos" element={<Videos />} />

        {/* Calculators Main Page */}
        <Route path="/calculators" element={<Calculators />} />
        
        {/* ✅ Individual Calculator Routes - Har ek ke liye specific component */}
        <Route path="/calculator/sip" element={<SIPCalculator />} />
        <Route path="/calculator/lumpsum" element={<LumpsumCalculator />} />
        <Route path="/calculator/swp" element={<SWPCalculator />} />
        <Route path="/calculator/stp" element={<STPCalculator />} />
        <Route path="/calculator/retirement" element={<RetirementCalculator />} />
        <Route path="/calculator/delay" element={<DelayCalculator />} />
        <Route path="/calculator/emi" element={<EMICalculator />} />
        <Route path="/calculator/insurance" element={<InsuranceCalculator />} />
        <Route path="/calculator/tax" element={<TaxCalculator />} />
        <Route path="/calculator/marriage" element={<MarriageCalculator />} />
        <Route path="/calculator/education" element={<EducationCalculator />} />
        <Route path="/calculator/home-loan" element={<HomeLoanCalculator />} />
        <Route path="/calculator/car-loan" element={<CarLoanCalculator />} />
        <Route path="/calculator/vacation" element={<VacationCalculator />} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/commission-disclosure" element={<CommissionDisclosure />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
