import React from 'react';
import LineChart from './LineChart';

const CardWithChartImage = (props) => {
  const place = props.place
   const type = props.type
  return (
    <div className="min-w-[900px] mx-[50px] p-6 bg-[rgba(0,0,0,0.75)] shadow-lg rounded-lg flex space-x-8">
        
      {/* Left side: Chart Image and Image */}
      <div className="w-1/2 flex flex-col space-y-4">
      <h1
          src="https://via.placeholder.com/150"
          alt="Sample"
          className="w-full h-64 object-cover rounded-md flex items-start justify-center text-white gap-2 text-5xl font-bold uppercase"
        >
          {/* <img src="https://flagsapi.com/BE/flat/64.png/" alt="" /> */}
          {place}</h1>
        <LineChart country={place} type={type}/>

        {/* Additional Image */}
        
      </div>

      {/* Right side: Description */}
      <div className="w-1/2">
        <h2 className="text-2xl  font-bold text-[#2596BE] mb-4">Climate Story</h2>
        <p className="text-gray-700 text-2xl text-white opacity-70">
          This section provides an overview of the Carbon Monoxide Emission over Years. The image on
          the left represents a chart that displays trends, offering insights into the data.
        </p>
        <ul className="mt-4 text-white list-disc pl-5 text-lg opacity-70">
          <li>The lowest value appears to be in 2006 (0.62006), implying a dip or lower performance that year.
          </li>
          <li>The highest value is in 2018 (0.75878), indicating a peak towards the end of the period.</li>
          <li>Significant Increase: Between 2014 and 2018, CO emissions rose sharply from 0.70092 to 0.75878, showing the highest rate of increase during this period.</li>
          <li>Overall Trend: There is a noticeable upward trend in CO emissions from 2003 (0.63298) to 2018 (0.75878). This suggests that over time, CO emissions have increased consistently, especially after 2010.</li>
          
        </ul>
      </div>
    </div>
  );
};

export default CardWithChartImage;