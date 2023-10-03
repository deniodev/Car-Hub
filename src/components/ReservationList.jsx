import{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/ReservationsSlice';
import Navbar from './Navbar';
import '../Style/reservationList.css'

const ReservationList = () => {
  const { reservations, loading, hasErrors } = useSelector((state) => state.reservations);
  const user = useSelector((state) => state.user.user); 
  const cars= useSelector((state) => state.cars.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const carIdToName= cars.reduce((map, car) => {
    map[car.id] = car.name;
    return map;
  }, {});

  const userReservations = reservations
    .filter((reservation) => reservation.user_id === user.id)
    .map((reservation) => ({
      ...reservation,
      car_name: carIdToName[reservation.car_id] || 'Loading...', 
    }));


  if (loading) return <p>Loading reservations...</p>;
  if (hasErrors) return <p>Unable to display reservations.</p>;

  return (
    <>
      <Navbar />
      <div className="list-wrapper">
      <table>
        <thead>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>City</th>
                <th>Car Name</th>
            </tr>
        </thead>
        {userReservations.map((reservation) => (
            <tr key={reservation.id}>
          <td >
            {reservation.start_date} 
          </td>
            <td >
                {reservation.end_date}
            </td>
            <td>
                {reservation.city}
            </td>
            <td>{reservation.car_name}</td>
            </tr>
        ))}  
      </table>
        </div>
    </>
  );
};

export default ReservationList;
