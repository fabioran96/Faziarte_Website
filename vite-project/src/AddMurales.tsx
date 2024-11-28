import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './AddMurales.css'

const AddMurales = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/admin/murales', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Murales aggiunto con successo!');
        navigate('/dashboard');
      } else {
        alert('Errore durante l\'aggiunta del murales');
      }
    } catch (error) {
      console.error('Errore nel caricamento del murales:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h1 className="text-center mb-4">Aggiungi Nuovo Murales</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nome del Murales</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Inserisci il nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Inserisci la descrizione" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Carica Immagine</Form.Label>
              <Form.Control 
                type="file"
                onChange={(e) => setImage((e.target as HTMLInputElement).files?.[0] || null)} 
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Aggiungi Murales
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddMurales;