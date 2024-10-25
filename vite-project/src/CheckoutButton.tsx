import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QAAxtBFEcNkWaE6iIFEKEnMkOJVnEEv2U66wglGS9ttNEXYv6UROToV2PnDrWngeZUMTNlqDgYxd5fxN3CnBnog00KiAd2RlV'); // Inserisci la tua chiave pubblica Stripe

const CheckoutButton = () => {
  const carrello = useSelector((state: RootState) => state.cart.items);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3001/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: carrello.map((product) => ({
            name: product.name,
            price: product.price,
            quantity: 1,
          })),
        }),
      });
  
      if (!response.ok) {
        const message = `Errore nella richiesta: ${response.status} ${response.statusText}`;
        console.error(message);
        throw new Error(message);
      }
  
      const data = await response.json();
      setSessionId(data.id);
    } catch (error) {
      console.error('Errore durante la creazione della sessione di pagamento:', error);
    }
  };

  useEffect(() => {
    const redirectToCheckout = async () => {
      if (sessionId) {
        const stripe = await stripePromise;
        if (stripe) {
          const result = await stripe.redirectToCheckout({ sessionId });

          if (result.error) {
            console.error('Errore durante il redirect al checkout:', result.error.message);
          }
        } else {
          console.error('Stripe non è stato caricato correttamente.');
        }
      }
    };

    redirectToCheckout();
  }, [sessionId]);

  return (
    <button onClick={handleCheckout} className="btn btn-success">
      Procedi al Checkout
    </button>
  );
};

export default CheckoutButton;