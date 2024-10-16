import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

interface Murales {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const AdminDashboard = () => {
  const [muralesList, setMuralesList] = useState<Murales[]>([]);
  const [newMurale, setNewMurale] = useState({ name: '', description: '', imageUrl: '' });
  const navigate = useNavigate();

  // Fetch dei murales esistenti
  const fetchMurales = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/admin/murales', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMuralesList(data);
      } else {
        alert('Errore nel caricamento dei murales');
      }
    } catch (error) {
      console.error('Errore nel fetch dei murales:', error);
    }
  };

  // Funzione per gestire l'invio del nuovo murale
  const handleAddMurale = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3001/admin/add-murale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // JWT token
        },
        body: JSON.stringify(newMurale),
      });

      if (response.ok) {
        alert('Murale aggiunto con successo!');
        setNewMurale({ name: '', description: '', imageUrl: '' }); // Resetta il form
        fetchMurales(); // Aggiorna la lista dei murales
      } else {
        alert('Errore durante l\'aggiunta del murale');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta del murale:', error);
    }
  };

  useEffect(() => {
    fetchMurales();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Gestione Murales</h1>
          
          {/* Form per aggiungere nuovi murales */}
          <Card className="mb-4">
            <Card.Body>
              <h2>Aggiungi Nuovo Murales</h2>
              <Form onSubmit={handleAddMurale}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Inserisci il nome"
                    value={newMurale.name}
                    onChange={(e) => setNewMurale({ ...newMurale, name: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Inserisci la descrizione"
                    value={newMurale.description}
                    onChange={(e) => setNewMurale({ ...newMurale, description: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formImageUrl" className="mb-3">
                  <Form.Label>URL Immagine</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Inserisci URL dell'immagine"
                    value={newMurale.imageUrl}
                    onChange={(e) => setNewMurale({ ...newMurale, imageUrl: e.target.value })}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Aggiungi Murale
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;