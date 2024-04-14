import Table from "./Table2.jsx"
import './App.css'
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Wetherpage from "./weatherpage2.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Table/>}/>
            <Route path="/weather/:id" element={<Wetherpage/> }/>
            <Route path="/map" element={<Map/>}/>
          </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
