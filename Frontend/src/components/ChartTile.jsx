import React from 'react';

const CardWithChartImage = () => {
  return (
    <div className="min-w-[900px] mx-[50px] p-6 bg-[rgba(0,0,0,0.75)] shadow-lg rounded-lg flex space-x-8">
        
      {/* Left side: Chart Image and Image */}
      <div className="w-1/2 flex flex-col space-y-4">
        {/* Chart Image */}
        <img
          src="https://via.placeholder.com/300x200?text=Chart+Image"
          alt="Chart"
          className="w-full h-48 object-cover rounded-md"
        />

        {/* Additional Image */}
        <img
          src="https://via.placeholder.com/150"
          alt="Sample"
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      {/* Right side: Description */}
      <div className="w-1/2">
        <h2 className="text-2xl  font-bold text-[#2596BE] mb-4">Product Performance</h2>
        <p className="text-gray-700">
          This section provides an overview of the product's performance over time. The image on
          the left represents a chart that displays sales trends, offering insights into sales
          growth and market demand.
        </p>
        <ul className="mt-4 text-gray-600 list-disc pl-5">
          <li>Sales in January: 12 units</li>
          <li>Sales in February: 19 units</li>
          <li>Sales in March: 3 units</li>
          <li>Sales in April: 5 units</li>
          <li>Sales in May: 2 units</li>
        </ul>
      </div>
    </div>
  );
};

export default CardWithChartImage;
