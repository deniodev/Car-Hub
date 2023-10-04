import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logInUser } from '../redux/userSlice';

import bgImage from '../../src/images/bg-image.jpg';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { username: '', password: '' };

    if (!username) {
      newErrors.username = 'Username cannot be empty.';
    }

    if (!password) {
      newErrors.password = 'Password cannot be blank.';
    }

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      return;
    }

    await dispatch(logInUser({ username, password }));
    navigate('/');
  };

  return (
    <div
      className='tw-h-screen tw-overflow-hidden tw-bg-cover tw-bg-no-repeat tw-p-12 tw-text-center'
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className='tw-absolute tw-grid tw-place-items-center tw-bottom-0 tw-left-0 tw-right-0 tw-top-0 tw-h-full tw-w-full tw-overflow-hidden tw-bg-fixed'
        style={{
          backgroundColor: 'rgba(115, 145, 6, 0.9)',
        }}
      >
        <div className='tw-items-center tw-text-gray-300 tw-p-2 tw-rounded tw-w-full tw-max-w-lg tw-mx-auto'>
          <h1 className='tw-text-2xl tw-text-white tw-font-semi-bold tw-mb-6'>
            Log In
          </h1>

          <form className='tw-p-2 tw-flex tw-flex-col tw-gap-4'>
            {error && <p className='tw-text-red-500'>{error}</p>}

            <div className='tw-w-full'>
              <input
                type='text'
                id='username'
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-label='Username'
                className='tw-w-full tw-bg-gray-100 tw-bg-opacity-20 tw-border tw-border-white tw-text-white tw-rounded-full tw-py-2 tw-px-4 tw-placeholder-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-lime-400 tw-focus:border-transparent tw-focus:bg-lime-400 tw-focus:bg-opacity-20'
              />
              {errors.username && (
                <p className='tw-text-red-500'>{errors.username}</p>
              )}
            </div>

            <div className='tw-w-full'>
              <input
                type='password'
                id='password'
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label='Password'
                className='tw-w-full tw-bg-gray-100 tw-bg-opacity-20 tw-border tw-border-white tw-text-white tw-rounded-full tw-py-2 tw-px-4 tw-placeholder-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-lime-400 tw-focus:border-transparent tw-focus:bg-lime-400 tw-focus:bg-opacity-20'
              />
              {errors.password && (
                <p className='tw-text-red-500'>{errors.password}</p>
              )}
            </div>

            {isLoading ? (
              <div>
                <div className='tw-w-full tw-md:w-max tw-bg-white tw-text-lime-700 tw-rounded-full tw-py-3 tw-px-4'>
                  <div role='status' className='tw-flex tw-items-center'>
                    {/* Loading indicator */}
                  </div>
                </div>
              </div>
            ) : (
              <div className='tw-w-full'>
                <button
                  type='button'
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className='w-full tw-md:w-max tw-bg-white tw-text-lime-700 tw-rounded-full tw-py-2 tw-px-6 tw-hover:bg-gray-200'
                >
                  Log in
                </button>
              </div>
            )}
          </form>

          <h2>
            Don&apos;t have an account?{' '}
            <Link
              to='/register'
              className='tw-text-lg tw-font-semi-bold tw-text-white tw-hover:text-gray-300 tw-hover:underline'
            >
              Sign up
            </Link>
            .
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
