import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReservation, postReservation } from '../redux/ReservationsSlice';
import { useLocation } from 'react-router-dom';
import { getCars } from '../redux/CarsSlice';
import '../Style/Reservation.css'
import Navbar from './Navbar';

const ReservationForm = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [carName, setCarName] = useState('');
  const [message, setMessage] = useState('');

  const { state } = useLocation();
  const carDetails = state ? state.carDetails : null;
  const user = useSelector((state) => state.user.user);
  const cars = useSelector((state) => state.cars.cars);

  useEffect(() => {
    dispatch(getCars());
}, [dispatch]);

useEffect(() => {

  if (user) {
    setUserName(user.username);
    setUserId(user.id); 
  }
}, [user]);

const findCarId = (name) => {
    const car = cars.find((car) => car.name === name);
    return car? car.id : null;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const carId = findCarId(carName);
    const reservationData = {
      start_date: date,
      end_date: date,
      city,
      user_id: userId,
      user_name: userName,
      car_id: carDetails ? carDetails.id : carId,
      car_name: carName || (carDetails ? carDetails.name : null),
    };

    dispatch(postReservation(reservationData))
      .then(() => {
        dispatch(addReservation(reservationData));
        setMessage('Reservation added successfully');
        setDate('');
        setCity('');
        setUserName('');
        setCarName('');
        setUserId('');

        setTimeout(() => {
          setMessage('');
        }, 5000);
      })
      .catch((error) => {
        throw Error(error);
      });
  };

  return (
    <>
    <Navbar />
    <div className="form-container">
    <div className="reservation-title">
    <h1> Car is availbale and ready to be reserved!</h1>
      <hr />
    <p style={{paddingTop: '5px'}}> Please fill the form below to reserve the car and enjoy, you can reserve the car for one day only</p>
    {message && <p className="success-message">{message}</p>}
    </div>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          placeholder="Reservation Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
         type="text"
         placeholder="Username"
         value={userName}
         onChange={(e) => setUserName(e.target.value)}
        />
        {carDetails ? (
          <input
            type="text"
            placeholder="Car Name"
            value={carDetails ? carDetails.name : ''}
            onChange={(e) => setCarName(e.target.value)}
          />
        ) : (
          <select
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            >
            <option value="">Select a car</option>
            {cars.map((car) => (
                <option key={car.id} value={car.name} className='car-option'>
                {car.name}
                {car.id}
                </option>
            ))}
        </select>

        
        )}
        <button type="submit" className="reserve-button">
          Reserve
        </button>
      </form>
    </div>
    </>
  );
};

export default ReservationForm;
