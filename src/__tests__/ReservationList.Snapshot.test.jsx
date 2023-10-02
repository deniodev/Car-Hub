import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import ReservationList  from '../components/ReservationList';
import store from '../redux/store';
import { describe, test, expect } from 'vitest';

describe('Reservations', () => {
  test('should render reservations', () => {
    const reservations = render(
      <Provider store={store}>
        <BrowserRouter>
          <ReservationList />
        </BrowserRouter>
      </Provider>
    );

    expect(reservations).toMatchSnapshot();
  });
});