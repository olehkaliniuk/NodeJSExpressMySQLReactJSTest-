import axios from 'axios'
import React, { useEffect, useState } from "react"
import Home from './components/Home'
import About from './components/About'
import Heaeder from './components/Heaeder'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {





  return (
    <Router>
      <Heaeder/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
  )
}

export default App
