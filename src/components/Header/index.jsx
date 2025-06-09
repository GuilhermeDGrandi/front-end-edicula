import { Container, IconButton } from './styled';
import { FaHome, FaCalendar, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = e => {
    e.preventDefault();
    dispatch({type: "LOGOUT"});
    navigate('/login');
  };

  return (
    <Container>
      <Link to={"/"}><FaHome size={24} /></Link>
      <Link to={"/reserva"}><FaCalendar size={24} /></Link>

      <IconButton onClick={handleLogout} aria-label="Logout">
        <FaSignInAlt size={24} />
      </IconButton>
    </Container>
  );
}
