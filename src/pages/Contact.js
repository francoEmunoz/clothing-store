import React, { useState } from 'react';
import { showSuccessAlert } from '../utils/alertsUtils';
import '../styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    affair: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    showSuccessAlert('Your message has been sent !')

    setFormData({
      name: '',
      mail: '',
      affair: '',
      description: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className='contact-body'>
      <div className='contact-img'>
        <img src="contact.jpg" alt="contact"></img>
      </div>
      <div className='container-contact'>
        <h3>Contact</h3>
        <p>Do you have any questions, do you want to leave your products on consignment or place an order? Contact Us.</p>
        <form className='contact-form' onSubmit={handleSubmit}>
          <label className="label-contact-form">
            Name:
            <input name="name" type="text" value={formData.name} onChange={handleChange} required />
          </label>
          <label className="label-contact-form">
            Mail:
            <input name="mail" type="email" value={formData.mail} onChange={handleChange} required />
          </label>
          <label className="label-contact-form">
            Affair:
            <input name="affair" type="text" value={formData.affair} onChange={handleChange} required />
          </label>
          <label className='label-message'>
            Message:
            <textarea className="text-tarea" name="description" value={formData.description} onChange={handleChange} minLength='4' maxLength='3000' required />
          </label>
          <div className='btn-send-message'>
            <button type="submit">Send message</button>
          </div>
        </form>
      </div>
    </div>
  );
}