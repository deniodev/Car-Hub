import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { describe, test, expect } from 'vitest';
import DeleteCar from '../pages/DeleteCar';

describe('Cars', () => {
  test('should render cars table', () => {
    const cars = render(
      <Provider store={store}>
        <BrowserRouter>
        <DeleteCar />
        </BrowserRouter>
      </Provider>
    );

    expect(cars).toMatchSnapshot();
  });
});