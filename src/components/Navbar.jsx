import { NavLink } from "react-router-dom";
import {useState} from 'react';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    }

    return (
        <div>
        <header>
        <nav className={isActive ? "nav-active" : ""}>
            
            <NavLink to="/home" className="logo">Nizzan</NavLink>
            <ul className="nav-lists">
                <li>
                    <NavLink to="/reservation">Reservation</NavLink>
                </li>
                <li>
                    <NavLink to="/myresevation">My Reservation</NavLink>
                </li>
                    <li>
                        <NavLink to="/add">Add Car</NavLink>
                    </li>
    
                    <li>
                        <NavLink to="/delete">Delete Car</NavLink>
                    </li>

            </ul>
            <footer>
    
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FaInstagram /></a>
        <p>© 2021 Nizzan</p>
    </footer>
        </nav>
        <div className="humberger" onClick={handleClick}>
            {isActive ? <FaTimes /> : <FaBars />}
        </div>
    </header>
    </div>
    );
    }

export default Navbar;