import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        {/* <Route path="/" element={<Navbar />} /> */}
        </Routes>
    </Router>
  )
}

export default App
