import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        </Routes>
    </Router>
  )
}

export default App
