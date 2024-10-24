import './App.css'
import Murales from './Murales';
import Homepage from './Homepage';
import LaMiaArte from './LaMiaArte';
import Preventivi from './Preventivi';
import Scrivimi from './Scrivimi';
import Shop from './Shop';
import Carrello from './Carrello';
import { Product } from './types'; 
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import FLogo from './assets/Fazia-Logo.png';
import { FaInstagram, FaTiktok, FaShoppingCart, FaUserShield} from 'react-icons/fa'; 
import MuralesDetail from './MuralesDetails';
import StripeContainer from './StripeContainer';
import CheckoutButton from './CheckoutButton';
import AdminDashboard from './AdminDashboard';
import Login from './Login';
import AddMurales from './AddMurales';
import DettaglioProdotto from './DettaglioProdotto';

function App() {

  const [carrello, setCarrello] = useState<Product[]>([]);


  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletterEmail(e.target.value);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'iscrizione alla newsletter');
      }

      alert('Iscrizione completata con successo! Grazie per esserti iscritto.');
      setNewsletterEmail(''); 
    } catch (error) {
      console.error('Errore durante l\'iscrizione:', error);
      alert('C\'è stato un problema. Riprova più tardi.');
    }
  };

  return (
    <>
    <BrowserRouter>

    <Navbar className="navbar sticky-top bg-white" expand="lg" bg="light" variant="light">
  <Container>
    <Row className="align-items-center mx-auto">
      <Col xs={12} md={2} className="text-center">
        <Navbar.Brand href="/">
          <img src={FLogo} alt="logo" style={{ width: '50px', height: 'auto' }} /> faziarte
        </Navbar.Brand>
      </Col>
      <Col xs={12} md={10}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto link-navbar">
            <Nav.Link as={Link} to="/murales">Murales</Nav.Link>
            <Nav.Link as={Link} to="/works">La mia Arte</Nav.Link>
            <Nav.Link as={Link} to="/preventivi">Preventivi</Nav.Link>
            <Nav.Link as={Link} to="/scrivimi">Scrivimi</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/carrello">
              <FaShoppingCart size={24} />
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              <FaUserShield size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Col>
    </Row>
  </Container>
</Navbar>

       <StripeContainer>
    
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/murales" element={<Murales />} />
          <Route path="/works" element={<LaMiaArte />} />
          <Route path="/preventivi" element={<Preventivi />} />
          <Route path="/scrivimi" element={<Scrivimi />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/murales/:id" element={<MuralesDetail />} /> 
          <Route path="/carrello" element={<Carrello />} />
          <Route path="/checkout" element={<CheckoutButton />} />
          <Route path="/success" element={<h1>Pagamento avvenuto con successo!</h1>} />
          <Route path="/cancel" element={<h1>Pagamento annullato.</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/add-murale" element={<AddMurales />} />
          <Route path="/products/:productId" element={<DettaglioProdotto />} />
          

        </Routes>
       </StripeContainer>

       <footer className="footer">
  <Container fluid>
    <Row className="align-items-center justify-content-between">
      <Col xs={12} md={4} className="text-center text-md-left">
        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
          <div className="d-flex">
            <input
              type="email"
              placeholder="Lascia la tua mail e rimani aggiornato"
              value={newsletterEmail}
              onChange={handleNewsletterChange}
              required
              className="form-control me-2" // Aggiungi questa classe per il campo input
              style={{ height: '40px' }} // Stessa altezza del pulsante
            />
            <Button
              variant="primary"
              type="submit"
              style={{ height: '40px' }} // Aggiunge la stessa altezza per il pulsante
            >
              Iscriviti
            </Button>
            
            
            
          </div>
          
        </form>
      </Col>

      <Col xs={12} md={4} className="text-center text-md-right">
        <div className="social-icons">
          <img src={FLogo} alt="logo" className="logo-footer" />
          <a href="https://www.instagram.com/faziarte/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://www.tiktok.com/@faziarte" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="social-icon" />
          </a>
        </div>
      </Col>
    </Row>
    <Row className="poweredBy">
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
