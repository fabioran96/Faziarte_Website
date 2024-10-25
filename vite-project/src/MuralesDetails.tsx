import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

interface Murales {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  imageUrl: string;
}

const MuralesDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [murales, setMurales] = useState<Murales | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMurale = async () => {
      try {
        const response = await fetch(`http://localhost:3001/murales/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMurales(data);
        } else {
          console.error('Errore nel recupero del murale');
        }
      } catch (error) {
        console.error('Errore durante il fetch del murale:', error);
      }
    };

    fetchMurale();
  }, [name]);

  if (!murales) {
    return <p>Murale non trovato!</p>;
  }

  return (
    <Container>
      <Row className='my-5'>
        <Col xs={12} md={6}>
          <h1>{murales.name}</h1>
          <p>{murales.description}</p>
        </Col>
        <Col xs={12} md={6}>
          {murales.imageUrl && (
            <Image src={murales.imageUrl} alt={murales.name} fluid />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MuralesDetail;