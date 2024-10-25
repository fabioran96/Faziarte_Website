import './LaMiaArte.css'
import FLogo from './assets/Fazia-Logo.png' ;
import{Container, Row, Col, Image, Button, Form} from 'react-bootstrap'
import { useState, useRef, useEffect } from 'react';
import Gallery1 from './assets/faziarteAmbraCotti.png'
import Gallery2 from './assets/faziarteWork.png'
import Gallery3 from './assets/FeniceShooting.png'
import Gallery4 from './assets/faziarteCiambragina.png'
import Gallery5 from './assets/DuaTurbante.png'
import Gallery6 from './assets/Medusa.png'
import Gallery7 from './assets/Speranza.png'
import Gallery8 from './assets/Infinito.png'
import Gallery9 from './assets/LivePainting.png'
import Gallery10 from './assets/Sophia.png'
import OldFLogo from './assets/OldF-Logo.svg'
import elementiGrafici from './assets/elementi grafici.png'
import VTMap from './assets/Viterbo.png'
import Collab1 from './assets/Collab1.png'
import Collab2 from './assets/Collab2.png'
import Collab3 from './assets/Collab3.png'



const LaMiaArte = () => {

  const [contactData, setContactData] = useState({
        name: '',
        surname: '',
        email: '',
        message: ''
      });

  const [showMore, setShowMore] = useState(false);

  const [isLaMiaStoriaVisible, setIsLaMiaStoriaVisible] = useState(false);
  const [isLastSectionVisible, setIsLastSectionVisible] = useState(false); // Stato per la sezione finale
  const laMiaStoriaRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef<HTMLDivElement>(null);
  


  const handleShowMoreClick = () => {
    setShowMore(!showMore); // Cambia lo stato quando l'utente clicca il pulsante
  };
    
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Contact form data:', contactData);
  };

  const handleScroll = () => {
    if (laMiaStoriaRef.current) {
      const rect = laMiaStoriaRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top <= windowHeight * 0.75) {
        setIsLaMiaStoriaVisible(true); // Attiva l'animazione per La Mia Storia
      } else {
        setIsLaMiaStoriaVisible(false);
      }
    }

    if (lastSectionRef.current) {
      const rect = lastSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top <= windowHeight * 0.75) {
        setIsLastSectionVisible(true); // Attiva l'animazione per la sezione finale
      } else {
        setIsLastSectionVisible(false);
      }
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


    
    return (
        <div className="works-container">
            <p className="mission">Ci siamo ormai abituati alla falsa bellezza dell'essenzialità, delle cose che “funzionano”. 
            Nell’arte e nel design ci sono sempre meno dettagli, le cose sempre più di facile e istantanea lettura. 
            Sempre più minimalismo e sempre meno contenuti profondi. 
            E mano mano tutte le cose ci lasciano meno emozioni. Si è persa la concezione del duraturo, di fare qualcosa solo perché è bello. 
            L’arte non può essere solo funzionale. Deve far star bene le persone, senza troppi fini commerciali.</p>

            <img src={FLogo} alt="logo" className='round-logo' />

         <Container fluid className='gallery'>
          <Row>
              <Col xs={12} md={5} >
                <Image id="image1" src={Gallery1} fluid className='gallery-images'/>
              </Col>
              <Col xs={12} md={7}>
                <Image id="image2" src={Gallery2} fluid className='gallery-images'/>
                <Row className='mt-2'>
                    <Col>
                    <Image className='elementografico' src={elementiGrafici}></Image>
                    </Col>
                  <Col>
                  <h2 className='passione'>passione.</h2>
                  </Col>
                  
                </Row>
              </Col>
          </Row>
          
         <Row>
           <Col xs={12} md={2}>
            <Image id="image3" src={Gallery3} fluid  className='gallery-images'/>
           </Col>
         <Col xs={12} md={4}>
          <Image id="image478" src={Gallery4} fluid  className='gallery-images'/>
          <Image id="image478" src={Gallery7} fluid  className='gallery-images'/>
          <Image id="image478" src={Gallery8} fluid  className='gallery-images'/>

         </Col>
         <Col xs={12} md={2}>
         <Image id="image5" src={Gallery5} fluid  className='gallery-images'/>
         <Image id="image9" src={Gallery9} fluid  className='gallery-images'/>
         </Col>     
         <Col xs={12} md={4}>
         <Image id="image6" src={Gallery6} fluid  className='gallery-images'/>
         <Image id="image10" src={Gallery10} fluid  className='gallery-images'/>
         </Col>   
         </Row>

         
         </Container>

         <Container
        ref={laMiaStoriaRef}
        className={`LaMiaStoria ${isLaMiaStoriaVisible ? 'active' : ''}`}
      >
        <h3>La mia Storia</h3>

         <p className="mission">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fugiat obcaecati similique voluptatum quisquam? 
            Ea, commodi corrupti deleniti quam natus, illum asperiores incidunt voluptas sequi quidem veritatis, provident unde non?
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae purus vel turpis posuere aliquet. Nunc in nulla tincidunt, 
            bibendum nibh in, imperdiet est. Etiam sapien arcu, fringilla sit amet sapien et, sodales faucibus neque. In erat dui, blandit
             vel euismod sit amet, fringilla in metus. Nam vel nisi non justo iaculis suscipit id non tortor. Sed et mi tellus. Vestibulum 
             id magna a urna malesuada eleifend. Vivamus convallis tristique arcu id malesuada. In ac rutrum diam. Phasellus eu 
             ipsum elementum, rutrum elit nec, condimentum augue. Nulla eget enim at massa blandit gravida. Duis consectetur dolor at 
             libero dignissim ornare. Nam tristique nunc non volutpat rhoncus. Aliquam id lobortis odio.
            Nunc et est mattis, venenatis arcu maximus, varius massa. Duis euismod convallis odio, id convallis tellus dapibus in. 
            Mauris a faucibus mi. Donec eget felis lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sagittis elit. Vivamus nibh quam, pulvinar id aliquet vel, feugi</p>

            <Row>
                <Col xs={6} md={6} className='d-flex justify-content-end'>
                 <Image className='old-logo' src={OldFLogo}></Image> 
                </Col> 
                <Col xs={6} md={6} className='d-flex justify-content-start'>
                    <Image className='new-logo' src={FLogo}></Image>
                </Col>
                
            </Row>

            <p className='mission'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque fugiat obcaecati similique voluptatum quisquam? 
            Ea, commodi corrupti deleniti quam natus, illum asperiores incidunt voluptas sequi quidem veritatis, provident unde non?
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae purus vel turpis posuere aliquet. Nunc in nulla tincidunt, 
            bibendum nibh in, imperdiet est. Etiam sapien arcu, fringilla sit amet sapien et, sodales faucibus neque. In erat dui, blandit
             vel euismod sit amet, fringilla in metus. Nam vel nisi non justo iaculis suscipit id non tortor. Sed et mi tellus. Vestibulum 
             id magna a urna malesuada eleifend. Vivamus convallis tristique arcu id malesuada. In ac rutrum diam. Phasellus eu 
             ipsum elementum, rutrum elit nec, condimentum augue. Nulla eget enim at massa blandit gravida. Duis consectetur dolor at 
             libero dignissim ornare. Nam tristique nunc non volutpat rhoncus. Aliquam id lobortis odio.
            Nunc et est mattis, venenatis arcu maximus, varius massa. Duis euismod convallis odio, id convallis tellus dapibus in. 
            Mauris a faucibus mi. Donec eget felis lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas
            </p>

            </Container>

            <Container ref={lastSectionRef} className={`last-section ${isLastSectionVisible ? 'active' : ''}`}>

            <Container>
            <h2 className='mb-5'>Fai un tour dei miei Murales</h2>
                <Row>
                    <Col xs={12} md={12}>
                    <a href="murales"><Image className='map' src={VTMap} ></Image></a>   
                    </Col>
                </Row>        
            </Container>

            <Container className="preventivi position-relative"> 
        <Row className="justify-content-center position-relative">
          <Col md={6} className="preventivo">
            <h2 className="mb-5">Vuoi un preventivo?</h2>
            <Button href="preventivi">Accedi al tool dedicato</Button>
          </Col>
        </Row>

        
        <div className="images-collabs">
          <Image src={Collab1} alt="Immagine 1" className="collabs-image" />
          <Image src={Collab2} alt="Immagine 2" className="collabs-image" />
          <Image src={Collab3} alt="Immagine 3" className="collabs-image" />
        </div>
        </Container>

        </Container>

        
        

        </div>

    
    )
}

export default LaMiaArte;