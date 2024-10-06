import { useEffect, useRef,useState } from "react"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import SearchMenu from "./components/SearchMenu"
import Mainbg from './assets/Mainbg.jpg'
import Footer from "./components/Footer"


function App() {
  const ref =useRef(null)
  const [clicked,setClicked]=useState(0)
  useEffect(() => {
    if (clicked>0) {
      ref.current.scrollIntoView({behavior: "smooth"})
    }
  },[clicked])
  return (
    <>
        <div
        style={{backgroundImage: `url(${Mainbg})`,fontFamily:'Courier New'}}
        className="w-full h-full text-3xl font-bold item-center">
          <Navbar/>
          <Hero setClicked={setClicked}/>
          <div ref={ref}/>
          <SearchMenu/>
          <br />
          <Footer/>
        </div>
        
        </>
      )
    }
  


export default App
