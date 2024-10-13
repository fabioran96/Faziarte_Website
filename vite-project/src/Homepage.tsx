import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import './Homepage.css';
import logo from './assets/faziartelogo.svg'


const Homepage = () => {
    return (
        <div className="homepage-container">

            <img src={logo} alt="Logo Faziarte" className='MainLogo' />

          <Button href='works' variant="primary">Ritorna alla bellezza</Button>
        </div>
      );
  
};

export default Homepage;