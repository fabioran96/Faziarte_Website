import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { clearCart } from './store/cartslice';
import CheckoutButton from './CheckoutButton';


const Carrello = () => {
  const carrello = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    alert('Carrello svuotato!');
  };


  return (
    <Container className="mt-5">
      <h1>Il tuo Carrello</h1>
      {carrello.length === 0 ? (
        <p>Il carrello è attualmente vuoto.</p>
      ) : (
        <>
          <ListGroup>
            {carrello.map((product, index) => (
              <ListGroup.Item key={index}>
                {product.name} - {product.price}€
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-4 d-flex justify-content-between">
            <Button variant="danger" onClick={handleClearCart}>
              Svuota Carrello
            </Button>

            
            <CheckoutButton />
          </div>
        </>
      )}
      <Button variant="primary" href="/shop" className="mt-4">
        Torna allo Shop
      </Button>
    </Container>
  );
};

export default Carrello;