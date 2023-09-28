import{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/ReservationsSlice';
import Navbar from './Navbar';

const ReservationList = () => {
  const { reservations, loading, hasErrors } = useSelector((state) => state.reservations);
  const user = useSelector((state) => state.user.user); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
    console.log('fetching reservations');
  }, [dispatch]);

  if (loading) return <p>Loading reservations...</p>;
  if (hasErrors) return <p>Unable to display reservations.</p>;

  const userReservations = reservations.filter((reservation) => reservation.user_id === user.id);

  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: '260px' }}>
      <table className="list-wrapper">
        
        <thead>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>City</th>
                
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
            </tr>
        ))}
      </table>
        </div>
    </>
  );
};

export default ReservationList;
