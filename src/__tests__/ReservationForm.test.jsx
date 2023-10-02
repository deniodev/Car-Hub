// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import store from '../redux/store';
// import ReservationForm from '../components/ReservationForm';
// import { test, expect } from 'vitest';
// import '@testing-library/jest-dom';

// test('renders reservation form correctly', () => {
//     const { getByPlaceholderText, getByText } = render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReservationForm />
//         </BrowserRouter>
//       </Provider>
//     );
  
//     const dateInput = getByPlaceholderText('Reservation Date');
//     const cityInput = getByPlaceholderText('City');
//     const usernameInput = getByPlaceholderText('Username');
//     const reserveButton = getByText('Check Now');
  
//     expect(dateInput).toBeInTheDocument();
//     expect(cityInput).toBeInTheDocument();
//     expect(usernameInput).toBeInTheDocument();
//     expect(reserveButton).toBeInTheDocument();
//   });
  
//   test('submits form with correct values', () => {
//     const { getByPlaceholderText, getByText } = render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReservationForm />
//         </BrowserRouter>
//       </Provider>
//     );
  
//     const dateInput = getByPlaceholderText('Reservation Date');
//     const cityInput = getByPlaceholderText('City');
//     const usernameInput = getByPlaceholderText('Username');
//     const reserveButton = getByText('Check Now');
  
//     fireEvent.change(dateInput, { target: { value: '2023-10-02' } });
//     fireEvent.change(cityInput, { target: { value: 'New York' } });
//     fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
//     fireEvent.click(reserveButton);
  
//   });