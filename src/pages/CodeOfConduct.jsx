import { useEffect } from "react";
import { FaFileAlt, FaSpinner } from "react-icons/fa";

const CodeOfConduct = () => {
  useEffect(() => {
    // Redirect after a short delay to show the loading screen
    const timer = setTimeout(() => {
      window.location.href = "/AMFI_Code-of-Conduct.pdf";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-warm-lg border-2 border-orange-100 max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-warm animate-pulse">
          <FaFileAlt className="text-white text-3xl" />
        </div>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center mb-4">
          <FaSpinner className="text-orange-500 text-4xl animate-spin" />
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Opening Document...
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Redirecting to AMFI Code of Conduct PDF
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-orange-100 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-[progress_1s_ease-in-out]"></div>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-4">
          If the document doesn't open automatically,{" "}
          <a
            href="/AMFI_Code-of-Conduct.pdf"
            className="text-orange-600 font-semibold hover:text-orange-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CodeOfConduct;
