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
      className="h-screen overflow-hidden bg-cover bg-no-repeat p-12 text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className="absolute grid place-items-center bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
        style={{
          backgroundColor: 'rgba(115, 145, 6, 0.9)',
        }}
      >
        <div className="items-center text-gray-300 p-2 rounded w-full max-w-lg mx-auto">
  <h1 className="text-2xl text-white font-semi-bold mb-6">Log In</h1>

  <form className="p-2 flex flex-col gap-4">
    {error && <p className="text-red-500">{error}</p>}

    <div className="w-full">
      <input
        type="text"
        id="username"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        required
        aria-label="Username"
        className="w-full bg-gray-100 bg-opacity-20 border border-white text-white rounded-full py-2 px-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent focus:bg-lime-400 focus:bg-opacity-20"
      />
      {errors.username && (
        <p className="text-red-500">{errors.username}</p>
      )}
    </div>

    <div className="w-full">
      <input
        type="password"
        id="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        required
        aria-label="Password"
        className="w-full bg-gray-100 bg-opacity-20 border border-white text-white rounded-full py-2 px-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent focus:bg-lime-400 focus:bg-opacity-20"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password}</p>
      )}
    </div>

    {isLoading ? (
      <div>
        <div className="w-full md:w-max bg-white text-lime-700 rounded-full py-3 px-4">
          <div role="status" className="flex items-center">
            {/* Loading indicator */}
          </div>
        </div>
      </div>
    ) : (
      <div className="w-full">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full md:w-max bg-white text-lime-700 rounded-full py-2 px-6 hover:bg-gray-200"
        >
          Log in
        </button>
      </div>
    )}
  </form>

  <h2>
    Don&apos;t have an account?{' '}
    <Link
      to="/register"
      className="text-lg font-semi-bold text-white hover:text-gray-300 hover:underline"
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