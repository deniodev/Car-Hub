import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './pages/register';
import Login from './pages/login';

import ProtectedRoutes from './components/protetedRoutes';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CarDetails from './components/Main/CarDetails';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';

import store from './redux/store';
import './App.css';


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
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Navbar />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/reservationform" element={<ReservationForm />} />
          <Route path="/reservationlist" element={<ReservationList />} />

        </Routes>
        </BrowserRouter>
      </Provider>
    </div>
   )
}

export default App
