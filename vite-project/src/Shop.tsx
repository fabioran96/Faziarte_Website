import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from './store/cartslice';
import { Product } from './store/cartslice';
import { useNavigate } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

 
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Errore nel caricamento dei prodotti:', error));
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    alert(`${product.name} aggiunto al carrello!`);
  };

  const handleViewDetails = (productId: number) => {
    navigate(`/products/${productId}`); 
  };

  return (
    <Container>
      <h1 className="my-5 text-center">Negozio</h1>
      <Row>
        {products.map(product => (
          <Col key={product.id} xs={12} md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                
                <h5>{product.price} €</h5>
                <Button onClick={() => handleAddToCart(product)} variant="primary" className="me-2">
                  Aggiungi al carrello
                </Button>
                <Button onClick={() => handleViewDetails(product.id)} variant="secondary" className='me-2'>
                  Dettagli
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shop;