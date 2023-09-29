import{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/ReservationsSlice';
import { getCars } from '../redux/CarsSlice';
import Navbar from './Navbar';
import '../Style/ReservationList.css'

const ReservationList = () => {
  const { reservations, loading, hasErrors } = useSelector((state) => state.reservations);
  const user = useSelector((state) => state.user.user); 
  const carName = useSelector((state) => state.cars.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
    console.log('fetching reservations');

  }, [dispatch]);

  const userReservations = reservations.filter((reservation) => reservation.user_id === user.id);

  useEffect(() => {
    userReservations.forEach((reservation) => {
      dispatch(getCars(reservation.car_id));
    });
  }, [dispatch, userReservations]);

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
            <td>{carName[reservation.car_id]?.name || 'Loading...'}</td>
            </tr>
        ))}
    
      </table>
        </div>
    </>
  );
};

export default ReservationList;
