import React from 'react'
import Navbar from './components/header/Navbar'
import Home from './components/sections/Home'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Reviews from './components/sections/Reviews'
import Contact from './components/sections/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <div>
      <h1>me</h1>
      <Navbar/>
      <Home />
      <About />
      <Services />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  )
}

export default App