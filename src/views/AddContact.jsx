import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import Swal from 'sweetalert2';

export const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let contacto = {
      name: name,
      email: email,
      phone: phone,
      address: address
    };

    let response = await actions.createContact(contacto);
    if (response) {
      Swal.fire('Contacto agregado con éxito!');
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
    } else {
      Swal.fire('Error al agregar contacto');
      
    }
  };

  return (
    <div className="container">
      <h1>Add New Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Agregar contacto</button>
      </form>
      <Link to="/">
        <button className="btn btn-warning">Volver</button>
      </Link>
    </div>
  );
};

export default AddContact;
