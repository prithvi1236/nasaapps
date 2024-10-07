import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { motion } from 'framer-motion';

const SearchMenu = () => {
  const [place, setPlace] = useState('');
  const [countries, setCountries] = useState([]); // State to hold list of countries
  const [filteredCountries, setFilteredCountries] = useState([]); // State to hold filtered countries
  const ref = useRef(null);

  // Fetch countries from the Flask backend on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/country');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Filter countries based on user input and limit to 6 results
  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.toLowerCase().includes(place.toLowerCase())
    ).slice(0, 6); // Limit results to 6
    setFilteredCountries(filtered);
  }, [place, countries]);

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div ref={ref} />
        <motion.textarea
          initial={{ opacity: 0, scale: 0.5, y: 300 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, type: 'spring', stiffness: 150, delay: 0.2 }}
          placeholder='Enter the country'
          className='rounded-full border border-gray-300 p-2 w-1/2 font-medium text-lg px-4'
          rows="1"
          value={place}
          onChange={(e) => {
            setPlace(e.target.value); // Update state
          }}
          style={{ resize: 'none', overflow: 'hidden' }}
        />
        
        {place !== '' && filteredCountries.length > 0 && (
          <>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
              {filteredCountries.map((country) => (
                <motion.div
                  key={country}
                  initial={{ y: 10, opacity: 0.5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ cursor: 'pointer', scale: 1.1, y: -10 }}
                  transition={{ duration: 1, ease: 'linear' }}
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4"
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{country}</div>
                    <p className="text-gray-700 text-base">
                      This is an example of a simple card component in React with Tailwind
                      CSS. You can add an image and some text here to describe the content
                      of the card.
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #hashtag1
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #hashtag2
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #hashtag3
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {place !== '' && filteredCountries.length === 0 && (
          <div className="text-red-500 font-medium mt-4">
            No countries found matching your search.
          </div>
        )}
      </div>
    </>
  );
}

export default SearchMenu;
