import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, ListGroup, Modal } from 'react-bootstrap';



interface Murales {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  imageUrl: string;
}

const AdminDashboard: React.FC = () => {
  const [muralesList, setMuralesList] = useState<Murales[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();


const [showEditModal, setShowEditModal] = useState(false);
const [currentMurale, setCurrentMurale] = useState<Murales | null>(null);
const [newImage, setNewImage] = useState<File | null>(null);


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

    console.log('Token:', token);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('lat', lat);
    formData.append('lng', lng);
    if (image) {
      formData.append('image', image); // Aggiunge l'immagine al form data
    }

    try {
      const response = await fetch('http://localhost:3001/admin/murales', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // JWT token
          // Nota: Non impostiamo 'Content-Type' quando usiamo FormData
        },
        body: formData,
      });

      if (response.ok) {
        alert('Murale aggiunto con successo!');
        setName(''); // Reset del form
        setDescription('');
        setLat('');
        setLng('');
        setImage(null);
        fetchMurales(); // Ricarica la lista dei murales
      } else {
        alert('Errore durante l\'aggiunta del murale');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta del murale:', error);
    }
  };

  const handleDeleteMurale = async (id: number) => {
    const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo murale?");
    if (!confirmDelete) return;
  
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`http://localhost:3001/admin/murales/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        alert('Murale eliminato con successo!');
        fetchMurales(); 
      } else {
        alert('Errore durante l\'eliminazione del murale');
      }
    } catch (error) {
      console.error('Errore durante l\'eliminazione del murale:', error);
    }
  };

  const handleEditMurale = (murale: Murales) => {
    setCurrentMurale(murale);
    setShowEditModal(true);
  };

  const handleUpdateMurale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMurale) return;
  
    const token = localStorage.getItem('token');
  
    const formData = new FormData();
    formData.append('name', currentMurale.name);
    formData.append('description', currentMurale.description);
    formData.append('lat', currentMurale.lat.toString());
    formData.append('lng', currentMurale.lng.toString());
    if (newImage) {
      formData.append('image', newImage);
    }
  
    try {
      const response = await fetch(`http://localhost:3001/admin/murales/${currentMurale.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          // Non impostare 'Content-Type' quando usi FormData
        },
        body: formData,
      });
  
      if (response.ok) {
        alert('Murale aggiornato con successo!');
        setShowEditModal(false);
        setCurrentMurale(null);
        setNewImage(null);
        fetchMurales(); // Ricarica la lista dei murales
      } else {
        alert('Errore durante l\'aggiornamento del murale');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del murale:', error);
    }
  };

  useEffect(() => {
    fetchMurales();
  }, []);

  return (
    <>
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

                <Form.Group controlId="formLat" className="mb-3">
                  <Form.Label>Latitudine</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci la latitudine"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formLng" className="mb-3">
                  <Form.Label>Longitudine</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci la longitudine"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formImage" className="mb-3">
                  <Form.Label>Carica Immagine</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setImage((e.target as HTMLInputElement).files?.[0] || null)
                    }
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

          {/* Visualizza elenco dei murales */}
          <h2 className="mt-4">Murales Esistenti</h2>
          <ListGroup>
  {muralesList.map((murale) => (
    <ListGroup.Item key={murale.id}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <strong>{murale.name}</strong> - {murale.description}
        </div>
        <div>
          <Button variant="warning" size="sm" onClick={() => handleEditMurale(murale)}>
            Modifica
          </Button>{' '}
          <Button variant="danger" size="sm" onClick={() => handleDeleteMurale(murale.id)}>
            Elimina
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  ))}
</ListGroup>
        </Col>
      </Row>
    </Container>
     {/* Modale per modificare un murale */}
     <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Murale</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentMurale && (
          <Form onSubmit={handleUpdateMurale}>
            <Form.Group controlId="editFormName" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome"
                value={currentMurale.name}
                onChange={(e) =>
                  setCurrentMurale({ ...currentMurale, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="editFormDescription" className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci la descrizione"
                value={currentMurale.description}
                onChange={(e) =>
                  setCurrentMurale({ ...currentMurale, description: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Campi per latitudine e longitudine */}
            <Form.Group controlId="editFormLat" className="mb-3">
              <Form.Label>Latitudine</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la latitudine"
                value={currentMurale.lat.toString()}
                onChange={(e) =>
                  setCurrentMurale({ ...currentMurale, lat: parseFloat(e.target.value) })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="editFormLng" className="mb-3">
              <Form.Label>Longitudine</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la longitudine"
                value={currentMurale.lng.toString()}
                onChange={(e) =>
                  setCurrentMurale({ ...currentMurale, lng: parseFloat(e.target.value) })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="editFormImage" className="mb-3">
              <Form.Label>Carica Nuova Immagine (opzionale)</Form.Label>
              <Form.Control
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewImage(e.target.files?.[0] || null)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Salva Modifiche
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  </>

  );
};

export default AdminDashboard;