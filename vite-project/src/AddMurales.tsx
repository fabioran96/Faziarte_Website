import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMurales = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/admin/murales', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Murales aggiunto con successo!');
        navigate('/dashboard');
      } else {
        alert('Errore durante l\'aggiunta del murales');
      }
    } catch (error) {
      console.error('Errore nel caricamento del murales:', error);
    }
  };

  return (
    <div className="add-murale">
      <h1>Aggiungi Nuovo Murales</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrizione"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          required
        />
        <button type="submit">Aggiungi Murales</button>
      </form>
    </div>
  );
};

export default AddMurales;