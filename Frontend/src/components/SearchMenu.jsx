import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination'; // Import Swiper pagination styles
import CardWithChart from './ChartTile';
import { EffectFade, Pagination } from 'swiper/modules'; // Import Pagination module

const SearchMenu = () => {
  const [place, setPlace] = useState('');
  const data = ["India","China"]
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [clicked, setClicked] = useState(0);

  // Scroll into view when place changes
  useEffect(() => {
    if (place !== '') {
      ref.current.scrollIntoView({ behavior: "smooth" });
    } else {
      setClicked(0);
    }
  }, [place]);

  useEffect(() => {
    const fetchData = async () => {
      if (clicked > 0) {
        ref2.current.scrollIntoView({ behavior: "smooth" });
      }}

  }, [place]);

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div ref={ref} />
        <motion.textarea
          initial={{ opacity: 0, scale: 0.5, y: 300 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, type: 'spring', stiffness: 150, delay: 0.2 }}
          placeholder='Enter the city'
          className='rounded-full border border-gray-300 p-2 w-1/2 font-medium text-lg px-4'
          rows="1"
          value={place}
          onChange={(e) => {
            setPlace(e.target.value); // Update state
          }}
          style={{ resize: 'none', overflow: 'hidden' }}
        />
        {place !== '' &&
          <>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
              {data.map((d) => (
                <motion.div
                  key={d}
                  initial={{ y: 10, opacity: 0.5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ cursor: 'pointer', scale: 1.1, y: -10 }}
                  transition={{ duration: 1, ease: 'linear' }}
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4"
                >
                  <div
                    onClick={() => { setClicked((prev) => prev + 1); }}
                    className="px-6 py-4"
                  >
                    <div className="font-bold text-xl mb-2">{d}</div>
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
        }
      </div>
      {clicked > 0 &&
        <>
          <div ref={ref2} />
          <br />
          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} mx-1"> s</span>`;
              },
            }} // Adding margin using Tailwind
            modules={[EffectFade, Pagination]} // Include the Pagination module
          >
            <SwiperSlide><CardWithChart /></SwiperSlide>
            <SwiperSlide><CardWithChart /></SwiperSlide>
            <SwiperSlide><CardWithChart /></SwiperSlide>
          </Swiper>
        </>
      }
    </>
  );
}

export default SearchMenu;
