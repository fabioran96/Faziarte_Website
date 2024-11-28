import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import './Homepage.css';
import logo from './assets/faziartelogo.svg';
import FLogo from './assets/Fazia-Logo.png';
import LaTuaRosaImg from './assets/La tua rosa.png';
import MedusaImg from './assets/Medusa.png';
import FaziarteWorkImg from './assets/faziarteWork.png';

const Homepage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); 
  };

  useEffect(() => {
    handleResize(); 
    window.addEventListener('resize', handleResize); 
    return () => window.removeEventListener('resize', handleResize); 
  }, []);

  const handleScrollToBottomSection = () => {
    if (bottomSectionRef.current) {
      const topOffset = bottomSectionRef.current.getBoundingClientRect().top + window.pageYOffset - 65; 
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="homepage-container">
      <div className="top-section">
        <img 
          src={isMobile ? FLogo : logo} 
          alt="Logo Faziarte" 
          className='MainLogo' 
        />

        <Button onClick={handleScrollToBottomSection} variant="primary" className="hide-on-mobile">
          Ritorna alla bellezza
        </Button>
      </div>

      <div ref={bottomSectionRef} className="bottom-section">
        <Container className="animated-boxes">
          <Row>
            <Col xs={12} md={4}>
              <div className="box" onClick={() => window.location.href = '/murales'}>
                <img src={LaTuaRosaImg} alt="Murales" className="box-image" />
              </div>
              <h3 className='box-title'>Murales</h3>
            </Col>
            <Col xs={12} md={4}>
              <div className="box" onClick={() => window.location.href = '/works'}>
                <img src={MedusaImg} alt="La mia Arte" className="box-image" />
              </div>
              <h3 className='box-title'>La mia Arte</h3>
            </Col>
            <Col xs={12} md={4}>
              <div className="box" onClick={() => window.location.href = '/preventivi'}>
                <img src={FaziarteWorkImg} alt="Preventivi" className="box-image" />
              </div>
              <h3 className='box-title'>Preventivi</h3>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Homepage;