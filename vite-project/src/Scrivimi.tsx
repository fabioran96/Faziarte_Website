
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const Scrivimi = () => {
  const [contactData, setContactData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/scrivimi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
  
      if (!response.ok) {
        throw new Error('Errore durante l\'invio del messaggio');
      }
  
      const data = await response.json();
      alert('Messaggio inviato con successo! Ti abbiamo inviato un’email di conferma.');
      console.log('Richiesta salvata:', data);
    } catch (error) {
      console.error('Errore durante l\'invio del messaggio:', error);
      alert('C\'è stato un problema. Riprova più tardi.');
    }
  };

  return (
    <Container className="form">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <h3 className="mb-5 text-center">Ispirazioni particolari? Scrivimi</h3>
          <Form onSubmit={handleContactSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Inserisci il tuo nome"
                value={contactData.name}
                onChange={handleContactChange}
              />
            </Form.Group>

            <Form.Group controlId="formSurname" className="mt-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                placeholder="Inserisci il tuo cognome"
                value={contactData.surname}
                onChange={handleContactChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                value={contactData.email}
                onChange={handleContactChange}
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Label>Messaggio</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                placeholder="Scrivi il tuo messaggio"
                value={contactData.message}
                onChange={handleContactChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Invia
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Scrivimi;