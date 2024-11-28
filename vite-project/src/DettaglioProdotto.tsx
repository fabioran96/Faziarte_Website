import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from './store/cartslice';
import './DettaglioProdotto.css';



interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  details: string;
}

const DettaglioProdotto = () => {
  const { productId } = useParams<{ productId: string }>(); 
  const [product, setProduct] = useState<Product | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data); 
          setLoading(false);
        } else {
          setError('Errore nel recupero del prodotto');
          setLoading(false);
        }
      } catch (error) {
        console.error('Errore nel fetch:', error);
        setError('Errore nel fetch dei dettagli del prodotto');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); 

  if (loading) {
    return <p>Caricamento in corso...</p>;
  }

  if (error) {
    return <p>{error}</p>; 
  }

  if (!product) {
    return <p>Prodotto non trovato.</p>; 
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    alert(`${product.name} aggiunto al carrello!`);
  };

  return (
    <Container className="mt-5">
      <Button href="/shop" variant="link" className="mb-3">Torna al catalogo</Button>
      <Row>
        <Col xs={12} md={6}>
          <img src={product.imageUrl} alt={product.name} className="img-fluid" />
        </Col>
        <Col xs={12} md={6}>
          <h1>{product.name}</h1>
          <h2>{product.price} €</h2>
          <p>{product.description}</p>
          <h4>Dettagli del prodotto</h4>
          <p>{product.details}</p>
          <Button onClick={() => handleAddToCart(product)} variant="primary" className="me-2">
                  Aggiungi al carrello
                </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DettaglioProdotto;