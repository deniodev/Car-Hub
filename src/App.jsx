import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/register';
import Login from './pages/login';
import Logout from './components/logout';
import ProtectedRoutes from './components/protetedRoutes';
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Logout />
              </ProtectedRoutes>
            }
          />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Navbar />} />
        </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  //   <Router>
  //   <Routes>
  //     <Route path="/" element={<Navbar />} />
  //     </Routes>
  // </Router>
  )
}

export default App
