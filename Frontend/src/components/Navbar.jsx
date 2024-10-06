import React from 'react'
import Logo from '../assets/Logo.png'
import { motion } from 'framer-motion'

const Navbar = () => {
    return (
        <div className='flex flex-row gap-16 items-center justify-between items-center px-4 py-2 text-white font-medium text-2xl'>
            <motion.div 
            initial={{scale:0}}
            animate={{scale:1,transition:{duration:0.5,delay:0.8,type:'spring',stiffness:120}}}
            whileHover={{scale:1.1,cursor:"pointer"}}
            className='w-[80px] h-[80px] rounded-full overflow-hidden'>
                <img src={Logo} alt="" />
            </motion.div>
            <motion.div 
            initial={{opacity:0,y:-100}}
            animate={{opacity:1,y:0}}
            transition={{type:'spring'}}
            className='flex gap-12'>
                <motion.h1 whileHover={{fontWeight:"bold",cursor:"pointer"}}>Home</motion.h1>
                <motion.h1 whileHover={{fontWeight:"bold",cursor:"pointer"}}>About</motion.h1>
                <motion.h1 whileHover={{fontWeight:"bold",cursor:"pointer"}}>Contact Us</motion.h1>
            </motion.div>
            <motion.svg
            initial={{scale:0,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:0.5,stagger:3}}
            width="80" height="60" viewBox="0 0 179 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="179" height="22.0198" fill="white" />
                <rect x="44.0397" y="39.0675" width="134.96" height="22.0198" fill="white" />
                <rect y="78.1349" width="179" height="22.0198" fill="white" />
            </motion.svg>


        </div>
    )
}

export default Navbar