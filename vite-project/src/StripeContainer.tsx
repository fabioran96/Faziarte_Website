import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QAAxtBFEcNkWaE6iIFEKEnMkOJVnEEv2U66wglGS9ttNEXYv6UROToV2PnDrWngeZUMTNlqDgYxd5fxN3CnBnog00KiAd2RlV'); // Inserisci la tua chiave pubblica

const StripeContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeContainer;