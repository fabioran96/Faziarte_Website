import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Preventivi = () => {
  const [serviceType, setServiceType] = useState('');
  const [material, setMaterial] = useState('');
  const [size, setSize] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const service = e.target.value;
    setServiceType(service);

    if (service === 'Murales' || service === 'Altro') {
      navigate('/scrivimi');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = { serviceType, material, size, message, email };

    try {
      const response = await fetch('http://localhost:3001/preventivi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'invio del preventivo');
      }

      const data = await response.json();
      alert('Preventivo inviato con successo! Verrai contattato via email.');
      console.log('Preventivo inviato:', data);
    } catch (error) {
      console.error('Errore durante l\'invio del preventivo:', error);
    }
  };

  return (
    <div className="form container card mt-5 mx-auto">
      <h3 className='mb-4'>Richiedi un preventivo</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Che tipo di servizio desideri?</label>
          <select className="form-control" value={serviceType} onChange={handleServiceChange}>
            <option value="">Seleziona un servizio</option>
            <option value="Murales">Murales</option>
            <option value="Quadro">Quadro</option>
            <option value="Altro">Altro</option>
          </select>
        </div>

        {serviceType === 'Quadro' && (
          <>
            <div className="form-group mt-3">
              <label>Materiale del quadro</label>
              <select className="form-control" value={material} onChange={(e) => setMaterial(e.target.value)}>
                <option value="">Seleziona il materiale</option>
                <option value="Legno">Legno</option>
                <option value="Tela opaca">Tela opaca</option>
                <option value="Tela lucida">Tela lucida</option>
              </select>
            </div>

            <div className="form-group mt-3">
              <label>Dimensione del quadro</label>
              <input
                type="text"
                className="form-control"
                placeholder="Inserisci la dimensione (es: 50x70 cm)"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </>
        )}

<div className="form-group mt-3">
  <label>Messaggio aggiuntivo</label>
  <textarea
    className="form-control"
    rows={4}  
    placeholder="Inserisci un messaggio o una descrizione"
    value={message}
    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
  />
</div>

        <div className="form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Invia preventivo
        </button>
      </form>
    </div>
  );
};

export default Preventivi;