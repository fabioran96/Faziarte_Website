import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Murales {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const AdminDashboard = () => {
  const [muralesList, setMuralesList] = useState<Murales[]>([]);
  const [newMurale, setNewMurale] = useState({ name: '', description: '', imageUrl: '' });
  const navigate = useNavigate();

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

    try {
      const response = await fetch('http://localhost:3001/admin/add-murale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // JWT token
        },
        body: JSON.stringify(newMurale),
      });

      if (response.ok) {
        alert('Murale aggiunto con successo!');
        setNewMurale({ name: '', description: '', imageUrl: '' }); // Resetta il form
        fetchMurales(); // Aggiorna la lista dei murales
      } else {
        alert('Errore durante l\'aggiunta del murale');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta del murale:', error);
    }
  };

  useEffect(() => {
    fetchMurales();
  }, []);

  return (
    <div className="dashboard">
      <h1>Gestione Murales</h1>
      
      {/* Form per aggiungere nuovi murales */}
      <form onSubmit={handleAddMurale}>
        <input
          type="text"
          placeholder="Nome"
          value={newMurale.name}
          onChange={(e) => setNewMurale({ ...newMurale, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Descrizione"
          value={newMurale.description}
          onChange={(e) => setNewMurale({ ...newMurale, description: e.target.value })}
          required
        ></textarea>
        <input
          type="text"
          placeholder="URL Immagine"
          value={newMurale.imageUrl}
          onChange={(e) => setNewMurale({ ...newMurale, imageUrl: e.target.value })}
          required
        />
        <button type="submit">Aggiungi Murale</button>
      </form>

      {/* Elenco murales */}
      <ul>
        {muralesList.map((murales) => (
          <li key={murales.id}>
            <img src={murales.imageUrl} alt={murales.name} width={100} />
            <p>{murales.name}</p>
            <p>{murales.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;