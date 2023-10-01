import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';
import LogoutLink from './LogoutLink';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <header>
        <nav className={isActive ? 'nav-active' : ''}>
          <NavLink to='/' className='logo'>
            Car-Hub
          </NavLink>
          <ul className='nav-lists'>
            <li>
              <NavLink to='/reservationform'>Reservation</NavLink>
            </li>
            <li>
              <NavLink to='/reservationlist'>My Reservation</NavLink>
            </li>
            <li>
              <NavLink to='/addcar'>Add Car</NavLink>
            </li>

            <li>
              <NavLink to='/delete'>Delete Car</NavLink>
            </li>

            <li>
              <LogoutLink />
            </li>
          </ul>
          <footer>
            <a
              href='https://www.facebook.com/'
              target='_blank'
              rel='noreferrer'
            >
              <FaFacebook />
            </a>
            <a href='https://twitter.com/' target='_blank' rel='noreferrer'>
              <FaTwitter />
            </a>
            <a
              href='https://www.linkedin.com/'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedin />
            </a>
            <a
              href='https://www.instagram.com/'
              target='_blank'
              rel='noreferrer'
            >
              <FaInstagram />
            </a>
            <p>© 2023 Car-Hub</p>
          </footer>
        </nav>
        <div className='humberger' onClick={handleClick}>
          {isActive ? <FaTimes /> : <FaBars />}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
