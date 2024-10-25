import { useParams } from 'react-router-dom';
import { muralesData, normalizeName } from './Murales'; 
import { Container, Row, Col, Image } from 'react-bootstrap';

const MuralesDetail = () => {
  const { name } = useParams<{ name: string }>(); // Ottieni il nome dal parametro dell'URL
  const murales = muralesData.find((m) => normalizeName(m.name) === name); // Trova il murales corrispondente

  if (!murales) {
    return <p>Murales non trovato!</p>;
  }

  return (
    <Container>
      <Row className="my-5">
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