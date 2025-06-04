import {Container} from './styled'
import {FaHome, FaCalendar, FaSignInAlt } from "react-icons/fa"
import {Link} from 'react-router-dom'



export default function Header() {

    return (
        <Container>
            <Link to={"/"} ><FaHome size={24} />   </Link>
            <Link to={"/reserva"} ><FaCalendar size={24} />   </Link>
            <Link to={"/login"} ><FaSignInAlt size={24} />   </Link>
        </Container>
    )
}