// import { render } from '@testing-library/react';
// import { MemoryRouter, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import { describe, test, expect } from 'vitest'; // Importing from vitest
// import CarDetails from '../../src/components/Main/CarDetails';

// const mockStore = configureStore([]);

// describe('CarDetails', () => {
//     test('matches snapshot', () => {
//       const carData = {
//         id: 47,
//         name: 'Honda Civic',
//         image: 'linktoImage.png',
//         description: "Expedita quia dolore",
//         price: "56413.84",
//       };
  
//       const initialState = {
//         cars: {
//           cars: [carData],
//         },
//       };
  
//       const store = mockStore(initialState);
  
//       const { container } = render(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={['/car/1']}>
//             <Routes>
//               <Route path="/cars/:id" element={<CarDetails />} />
//             </Routes>
//           </MemoryRouter>
//         </Provider>
//       );
  
//       expect(container).toMatchSnapshot();
//     });
//   });