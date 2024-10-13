import {  MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Container, Row, Col, Image} from 'react-bootstrap'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './Murales.css'
import elementigrafici1 from './assets/elementi grafici1.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


interface Murales {
  name: string;
  description: string;
  location: { lat: number; lng: number };
  imageUrl?: string;
}

const muralesData: Murales[] = [
  {
    name: "La tua Rosa",
    description: "Descrizione del murales",
    location: { lat: 42.42905, lng: 12.10575 }, 
    imageUrl: "https://streetartcities.com/media/8/8006848e-f143-4b49-9a61-2a6545f51ee7/orig.jpg"
  },
  {
    name: "Fenice",
    description: "Descrizione del murales",
    location: { lat: 42.42890, lng: 12.14785 }, 
    imageUrl: "https://example.com/murales2.jpg"
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
        <Marker key={index} position={[murales.location.lat, murales.location.lng]}>
          <Popup>
            <h3>{murales.name}</h3>
            <p>{murales.description}</p>
            {murales.imageUrl && <img src={murales.imageUrl} alt={murales.name} style={{ width: '100px' }} />}
            <p>
                <a href={`/murales/${encodeURIComponent(murales.name)}`} target="_blank" rel="noopener noreferrer">
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

    <h2>#01 - La tua Rosa</h2>
    


    </>
  );
};

export default MuralesMap;