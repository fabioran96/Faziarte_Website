import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Murales.css'; 

import Latuarosa from './assets/La tua rosa.png';
import Gelsomina from './assets/Gelsomina.png';
import DuaTurbante from './assets/DuaTurbante.png';
import Athena from './assets/Athena.png';
import Infinito from './assets/Infinito.png';
import Pieta from './assets/Pietà.png';
import Sophia from './assets/Sophia.png';
import Fenice from './assets/Fenice.png';
import Ciambragina from './assets/faziarteCiambragina.png';
import Speranza from './assets/Speranza.png';


import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xPng from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const customMarkerIcon = L.icon({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIcon2xPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const normalizeName = (name: string) => {
  const normalized = name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Rimuove accenti
    .replace(/\s+/g, '-') // Sostituisce spazi con trattini
    .replace(/[^\w-]/g, ''); // Rimuove caratteri speciali non alfanumerici

  return normalized;
};

 interface Murales {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  imageUrl: string;
}

const MuralesMap: React.FC = () => {
  const [muralesData, setMuralesData] = useState<Murales[]>([]);
  const center: [number, number] = [42.41796, 12.10455];

  const muralesImages = [
    { url: Latuarosa, position: '80% 25%' },
    { url: Gelsomina, position: '50% 50%' },
    { url: DuaTurbante, position: '80% 35%' },
    { url: Athena, position: '10% 50%' },
    { url: Infinito, position: '100% 30%' },
    { url: Pieta, position: '100% 40%' },
    { url: Sophia, position: '100% 25%' },
    { url: Fenice, position: '100% 20%' },
    { url: Ciambragina, position: '40% 35%' },
    { url: Speranza, position: '100% 70%' }
  ];

  useEffect(() => {
    const fetchMurales = async () => {
      try {
        const response = await fetch('http://localhost:3001/murales');
        if (response.ok) {
          const data = await response.json();
          setMuralesData(data);
        } else {
          console.error('Errore nel recupero dei murales dal backend');
        }
      } catch (error) {
        console.error('Errore durante il fetch dei murales:', error);
      }
    };

    fetchMurales();
  }, []);

  return (
    <>
    <Container className='murales-section'>
      <Container>
        <h1 className='title'>Scopri i miei murales</h1>
        <Row>
          <Col xs={12} md={12}>
            <MapContainer className='muralesmap' center={center} zoom={13}>
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; OpenStreetMap contributors'
              />
              {muralesData.map((murales) => (
                <Marker
                  key={murales.id}
                  position={[murales.lat, murales.lng]}
                  icon={customMarkerIcon}
                >
                  <Popup>
                    <h3>{murales.name}</h3>
                    <p>{murales.description}</p>
                    {murales.imageUrl && (
                      <img
                        src={murales.imageUrl}
                        alt={murales.name}
                        style={{ width: '100px' }}
                      />
                    )}
                    <p>
                    <Link to={`/murales/${murales.id}`}>
                      Scopri di più
                    </Link>
                    </p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Col>
          
          
        </Row>
      </Container>

      <h2 className='mt-5 mb-5'>Lista dei Murales</h2>
      <ListGroup className='lista'>
       {muralesData.map((murales, index) => (
     <ListGroup.Item
     key={murales.id}
     action
     as={Link}
     to={`/murales/${murales.id}`}
     className="murales-list-item"
      style={{
      backgroundImage: `url(${muralesImages[index % muralesImages.length].url})`,
      backgroundPosition: muralesImages[index % muralesImages.length].position,
      backgroundSize: 'cover',
      }}
      >
      #{String(index + 1).padStart(2, '0')} - {murales.name}
      </ListGroup.Item>
      ))}
      </ListGroup>
    </Container>
    </>
  );
};

export default MuralesMap;