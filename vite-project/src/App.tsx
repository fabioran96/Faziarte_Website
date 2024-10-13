import './App.css'
import Murales from './Murales';
import Homepage from './Homepage';
import LaMiaArte from './LaMiaArte';
import Preventivi from './Preventivi';
import Scrivimi from './Scrivimi';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import logo from './assets/faziarte4.svg';
import FLogo from './assets/F-logo.svg';
import { FaInstagram, FaTiktok } from 'react-icons/fa'; 


function App() {
  return (
    <>
    <BrowserRouter>

    <Navbar className='navbar'>
        <Container>
        <Row className="align-items-center mx-auto">
          <Col xs={12} md={2} className="text-center">
            <Navbar.Brand href="/">faziarte</Navbar.Brand>
          </Col>
          <Col xs={12} md={10}>
      
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="murales">Murales</Nav.Link>
              <Nav.Link href="works">La mia Arte</Nav.Link>
              <Nav.Link href="preventivi">Preventivi</Nav.Link>
              <Nav.Link href="scrivimi">Scrivimi</Nav.Link>
              <Nav.Link href="talk">Shop</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Col>
        </Row>
        </Container>
      </Navbar>
    
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/murales" element={<Murales />} />
          <Route path="/works" element={<LaMiaArte />} />
          <Route path="/preventivi" element={<Preventivi />} />
          <Route path="/scrivimi" element={<Scrivimi />} />
          <Route path="/acquista" element={<Homepage />} />
        </Routes>

        <footer className="footer">
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          <Col xs={12} md={4} className="text-center text-md-left">
            <Button variant="primary" size="lg">
              Resta aggiornato
            </Button>
          </Col>
          
          <Col xs={12} md={4} className="text-center text-md-right">
          <div className="social-icons">
          <img src={FLogo} alt="logo" className="logo-footer" />
          <FaInstagram className="social-icon" /> 
          <FaTiktok className="social-icon" />    
        </div>
          </Col>
        </Row>
        <Row className='poweredBy'>
        <Col xs={12} md={4} className="text-center py-2">
            Powered by Fabio Ranocchiari
          </Col>
        </Row>
      </Container>
    </footer>
        
      

  
    </BrowserRouter>


    </>
  );
}


export default App
