import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import Swal from 'sweetalert2';

export const UpdateContact = () => {
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const params = useParams();
  const navigate = useNavigate();

  const findContact = () => {
    const contactEdit = store.contactList.find((element) => element.id == params.id);
    if (contactEdit) {
      setContact(contactEdit);
    }
  };

  useEffect(() => {
    findContact();
  }, [store.contactList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await actions.updateContact(contact, params.id);
    
    if (response) {
      Swal.fire('¡Contacto actualizado con éxito!');
      navigate('/'); 
    } else {
      Swal.fire('Error al actualizar el contacto');
    }
  };

  return (
    <div className="container">
      <h1>Actualizar Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            className="form-control"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            className="form-control"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            className="form-control"
            value={contact.address}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar contacto</button>
      </form>
      <Link to="/">
        <button className="btn btn-warning mt-2">Volver</button>
      </Link>
    </div>
  );
};
