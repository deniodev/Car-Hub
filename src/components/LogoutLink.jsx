import { Link } from 'react-router-dom';
import { removeToken } from '../utils/localStorage';

const LogoutLink = () => {
  const handleLogout = () => {
    removeToken();
  };

  return (
    <Link to="/login" onClick={handleLogout}>
      Logout
    </Link>
  );
};

export default LogoutLink;