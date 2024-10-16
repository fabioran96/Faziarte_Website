import {  MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Container, Row, Col, Image, ListGroup} from 'react-bootstrap'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './Murales.css';
import elementigrafici1 from './assets/elementi grafici1.png';
import duaturbante from './assets/DuaTurbante.png';
import ciambragina from './assets/faziarteCiambragina.png';
import speranza from './assets/Speranza.png';
import infinito from './assets/Infinito.png';
import pieta from './assets/Pietà.png';
import sophia from './assets/Sophia08.png';
import gelsomina from './assets/Gelsomina.png';
import fenice from './assets/Fenice.png';
import athena from './assets/Athena.png';
import latuarosa from './assets/La tua rosa.png';


const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const normalizeName = (name: string) => {
  const normalized = name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Rimuove accenti
    .replace(/\s+/g, '-') // Sostituisce spazi con trattini
    .replace(/[^\w-]/g, ''); // Rimuove caratteri speciali non alfanumerici

  console.log(`Nome original: ${name}, Normalizzato: ${normalized}`);
  return normalized;
};



interface Murales {
  name: string;
  description: string;
  location: { lat: number; lng: number };
  imageUrl?: string;
}

export const muralesData: Murales[] = [
  {
    name: "La tua Rosa",
    description: "Descrizione del murales",
    location: { lat: 42.42905, lng: 12.10575 }, 
    imageUrl: latuarosa
  },
  {
    name: "Gelsomina",
    description: "Descrizione del murales",
    location: { lat: 42.57331560804351, lng: 12.204244813129902}, 
    imageUrl: gelsomina
  },
  {
    name: "Dua col Turbante",
    description: "Descrizione del murales",
    location: { lat: 42.42460559583422, lng: 12.107466930772121 },  
    imageUrl: duaturbante
  },
  {
    name: "Speranza",
    description: "Descrizione del murales",
    location: { lat: 42.41579666602217, lng:  12.104770366065344}, 
    imageUrl: speranza
  },
  {
    name: "Athena",
    description: "Descrizione del murales",
    location: { lat: 40.56082419078109, lng: 14.905455654330781 }, 
    imageUrl: athena
  },
  {
    name: "Infinito",
    description: "Descrizione del murales",
    location: { lat: 42.424034884522264, lng: 12.09834046976717 }, 
    imageUrl: infinito
  },
  {
    name: "Pietà",
    description: "Descrizione del murales",
    location: { lat: 42.38082859869841, lng: 12.234602952571045}, 
    imageUrl: pieta
  },
  {
    name: "Sophia",
    description: "Descrizione del murales",
    location: { lat: 42.57345018625952, lng: 12.203745127446455}, 
    imageUrl: sophia
  },
  {
    name: "Fenice",
    description: "Descrizione del murales",
    location: { lat: 42.42890, lng: 12.14785 }, 
    imageUrl: fenice
  },
  {
    name: "Ciambragina",
    description: "Descrizione del murales",
    location: { lat: 43.25846559012639, lng: 11.615766363801924}, 
    imageUrl: ciambragina
  }
];

const MuralesMap = () => {
  const center: [number, number] = [42.41796, 12.10455]; 

  return (
    <>
    <Container>
      
        
<h1 className='title'>Scopri i miei murales</h1>
       <Row>
       <Col xs={12} md={11}>
    
      <MapContainer className='muralesmap' center={center} zoom={13} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {muralesData.map((murales, index) => (
  <Marker
    key={index}
    position={[murales.location.lat, murales.location.lng]}
    icon={customMarkerIcon}
  >
    <Popup>
  <h3>{murales.name}</h3>
  <p>{murales.description}</p>
  {murales.imageUrl && (
    <img src={murales.imageUrl} alt={murales.name} style={{ width: '100px' }} />
  )}
  <p>
    <a
      href={`/murales/${normalizeName(murales.name)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Scopri di più
    </a>
  </p>
</Popup>
  </Marker>
))}
      </MapContainer>

      </Col>

      <Col xs={12} md={1}>
      <Image className='elementigrafici1' src={elementigrafici1}></Image>
      </Col>

      </Row>
    </Container>

    <h2 className="mt-5">Lista dei Murales</h2>
        <ListGroup>
          {muralesData.map((murales, index) => (
           <ListGroup.Item
           key={index}
           action
           href={`/murales/${normalizeName(murales.name)}`}
         >
           #{String(index + 1).padStart(2, '0')} - {murales.name}
      </ListGroup.Item>
          ))}
        </ListGroup>
    


    </>
  );
};

export default MuralesMap;