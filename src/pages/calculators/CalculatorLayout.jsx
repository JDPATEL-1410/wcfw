import React from "react";

const CalculatorLayout = ({ title, description, inputs, chart, results }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Inputs */}
          <div className="space-y-6 bg-white p-6 rounded-2xl shadow">
            {inputs ? inputs : <p className="text-gray-400">No inputs provided.</p>}
          </div>

          {/* Right: Chart */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="w-full h-80 flex items-center justify-center">
              {chart ? chart : <p className="text-gray-400">No chart available.</p>}
            </div>
          </div>
        </div>

        {/* Bottom: Results */}
        {results && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {results}
          </div>
        )}
      </div>
    </section>
  );
};

export default CalculatorLayout;