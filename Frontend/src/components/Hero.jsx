import React from 'react'
import HeroImg from '../assets/HeroImg.jpg'
import {motion} from 'framer-motion'


const Hero = (props) => {
  const setClicked =props.setClicked;
  return (
    <motion.div 
    initial={{opacity:0,scale:0.5}}
    whileInView={{opacity:0.7,scale:1}}
    transition={{duration:0.9,type:'spring',delay:0.1}}
    className='bg-black opacity-50 w-screen/4 h-[550px] m-16 px-32 py-64 text-white flex items-center rounded-2xl gap-20'>
      <div className='w-1/2'>
        <motion.h1 
        style={{fontFamily:'Courier New'}}
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1.5,type:'spring',stiffness:150,delay:0.9}}
        className='text-5xl flex flex-col text-white font-sans'>
        The Climate Story
        </motion.h1>

        <br />
        <motion.p
        initial={{opacity:0,y:300}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:1.5,type:'spring',stiffness:150,delay:0.6}}
        className='text-lg font-normal'>
          Discover the oldest and the most fascinating tale of the world around us.Here we will be
          exploring the Datasets collected by diffrent Space Agencies all over the globe and analysing
          their data and deriving meaningful insights from them.
        </motion.p>
        <motion.button
        initial={{opacity:0,scale:0}}
        whileInView={{opacity:1,scale:1}}
        transition={{duration:1.5,type:'spring',stiffness:150,delay:1.1}}
        onClick={()=>{setClicked((pre)=>pre+1)}}
        className='mt-8 px-6 py-2 text-2xl bg-white text-black rounded-full font-normal hover:bg-[#2596BE] hover:text-white hover:scale-105'>Learn More</motion.button>
      </div>
      <div className='w-1/2'>
        <motion.div 
        initial={{rotateZ:360}}
        whileInView={{rotateZ:0}}
        whileHover={{scale:1.1,cursor:'pointer'}}
        // transition={{delay:0.5,repeat:Infinity,ease:'linear',duration:20}}
        className='scale-80 rounded-full overflow-hidden w-full flex mr-0'>
          <img src={HeroImg} alt="" />
        </motion.div>

      </div>
    </motion.div>
  )
}

export default Hero