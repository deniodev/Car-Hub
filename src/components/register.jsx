import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../src/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import bgImage from '../../src/images/bg-image.jpg';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const user = { username, email, password, confirmPassword };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!username) {
      newErrors.username = 'Username cannot be empty.';
    }

    if (!email) {
      newErrors.email = 'Email cannot be empty.';
    }

    if (!password) {
      newErrors.password = 'Password cannot be blank.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password cannot be blank.';
    }

    setErrors(newErrors);

    if (
      newErrors.username ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      return;
    }

    await dispatch(registerUser(user));
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
        <div className='tw-items-center tw-text-gray-300 tw-p-2 tw-rounded tw-w-full tw-max-w-[40rem] tw-mx-auto'>
          <h1 className='tw-text-2xl tw-font-semi-bold tw-text-white tw-mb-6'>
            Sign up
          </h1>

          <form className='tw-flex tw-flex-col tw-gap-4 tw-p-2'>
            {error && <p className='tw-text-red-500'>{error}</p>}

            <div className='tw-flex flex-col tw-gap-4 tw-md:flex-row tw-md:align-center tw-md:gap-1'>
              <div className='tw-flex-1'>
                <input
                  type='text'
                  id='username'
                  placeholder='Enter your username'
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  aria-label='Username'
                  className='tw-w-full tw-bg-gray-100 tw-bg-opacity-20 tw-border tw-border-white tw-text-white tw-rounded-full tw-py-2 tw-px-4 tw-md:rounded-r-none tw-md:rounded-l-full tw-placeholder-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-lime-400 tw-focus:border-transparent tw-focus:bg-lime-400 tw-focus:bg-opacity-20'
                />
                {errors.username && (
                  <p className='tw-text-red-500'>{errors.username}</p>
                )}
              </div>

              <div className='tw-flex-1'>
                <input
                  type='email'
                  id='email'
                  placeholder='Enter your email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label='Email'
                  className='tw-w-full tw-bg-gray-100 tw-bg-opacity-20 tw-border tw-border-white tw-text-white tw-rounded-full tw-py-2 tw-px-4 tw-md:rounded-l-none tw-md:rounded-r-full tw-placeholder-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-lime-400 tw-focus:border-transparent tw-focus:bg-lime-400 tw-focus:bg-opacity-20'
                />
                {errors.email && (
                  <p className='tw-text-red-500'>{errors.email}</p>
                )}
              </div>
            </div>

            <div className='tw-flex flex-col tw-gap-4 tw-md:flex-row tw-md:align-center tw-md:gap-1'>
              <div className='tw-flex-1'>
                <input
                  type='password'
                  id='password'
                  placeholder='Enter your password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label='Password'
                  className='tw-w-full tw-bg-gray-100 tw-bg-opacity-20 tw-border tw-border-white tw-text-white tw-rounded-full tw-py-2 tw-px-4 tw-md:rounded-r-none tw-md:rounded-l-full tw-placeholder-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-lime-400 tw-focus:border-transparent tw-focus:bg-lime-400 tw-focus:bg-opacity-20'
                />
                {errors.password && (
                  <p className='tw-text-red-500'>{errors.password}</p>
                )}
              </div>

              <div className='tw-flex-1'>
                <input
                  type='password'
                  id='confirmPassword'
                  placeholder='Confirm your password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  aria-label='Confirm Password'
                  className='tw-w-full tw-bg-gray-100 tw-bg-opacity-20 tw-border tw-border-white tw-text-white tw-rounded-full tw-py-2 tw-px-4 tw-md:rounded-l-none tw-md:rounded-r-full tw-placeholder-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-lime-400 tw-focus:border-transparent tw-focus:bg-lime-400 tw-focus:bg-opacity-20'
                />
                {errors.confirmPassword && (
                  <p className='tw-text-red-500'>{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {isLoading ? (
              <div>
                <div className='tw-bg-white tw-rounded-full tw-py-3 tw-px-4 tw-grid tw-place-items-center tw-w-full'>
                  <div role='status' className='tw-flex tw-items-center'>
                    <svg
                      aria-hidden='true'
                      className='tw-inline tw-w-5 tw-h-5 tw-mr-2 tw-text-gray-200 tw-animate-spin tw-dark:text-gray-600 tw-fill-lime-400'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                    <span className='tw-text-lime-700 tw-text-xs tw-flex-1 tw-w-max'>
                      Signing in...
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className='tw-grid tw-place-items-center'>
                <button
                  type='button'
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className='w-full tw-md:w-max tw-bg-white tw-text-lime-700 tw-rounded-full tw-py-2 tw-px-6 tw-hover:bg-gray-200'
                >
                  Sign up
                </button>
              </div>
            )}
          </form>

          <h2>
            Already have an account?{' '}
            <Link
              to='/login'
              className='tw-text-lg tw-font-semi-bold tw-text-white tw-hover:text-gray-300 tw-hover:underline'
            >
              Log in
            </Link>
            .
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
