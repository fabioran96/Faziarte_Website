import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from './store/cartslice';
import { Product } from './store/cartslice';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  // Fetch dei prodotti dal backend
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
                <Card.Text>{product.description}</Card.Text>
                <h5>{product.price} €</h5>
                <Button onClick={() => handleAddToCart(product)} variant="primary">
                  Aggiungi al carrello
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