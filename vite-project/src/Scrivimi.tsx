
import{Container, Row, Col, Image, Button, Form} from 'react-bootstrap'
import { useState } from 'react';

const Scrivimi = () => {

  const [contactData, setContactData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form data:', contactData);
  };

 return (
 <Container className=" form">
 <Row className="justify-content-center">
 <Col xs={12} md={8} lg={6} className="mx-auto">
    <h3 className="mb-5 text-center">Ispirazioni particolari? Scrivimi</h3>
    <Form onSubmit={handleContactSubmit}>
      {/* Nome */}
      <Form.Group controlId="formName">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter your name"
          value={contactData.name}
          onChange={handleContactChange}
        />
      </Form.Group>

      {/*  Cognome */}
      <Form.Group controlId="formSurname" className="mt-3">
        <Form.Label>Cognome</Form.Label>
        <Form.Control
          type="text"
          name="surname"
          placeholder="Enter your surname"
          value={contactData.surname}
          onChange={handleContactChange}
        />
      </Form.Group>

      {/*  Email */}
      <Form.Group controlId="formEmail" className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your email"
          value={contactData.email}
          onChange={handleContactChange}
        />
      </Form.Group>

      {/*  Messaggio */}
      <Form.Group controlId="formMessage" className="mt-3">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="message"
          placeholder="Write your message"
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
 )
}

export default Scrivimi;