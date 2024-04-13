import { useState } from 'react'
import Table from "./Table2.jsx"
import './App.css'
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Wetherpage from "./weatherpage2.jsx"
import Map from "./mapcomponent.jsx"
import Forecat from "./forecast.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Table/>}/>
      <Route path="/weather/:id" element={<Wetherpage/> }/>
      <Route path="/map" element={<Map/>}/>
      <Route path="/forecast" element={<Forecat/>}/>



    </Routes>
    
    </BrowserRouter>
     
    </>
  )
}

export default App
