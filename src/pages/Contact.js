import React, { useRef } from 'react';
import '../styles/Contact.css'

function Input({ label, name, type }) {
  return (
    <label className="form-label">
      {label}
      <input name={name} type={type} />
    </label>
  );
}

export default function Contact() {

  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const formUser = {
      name: formData.get("name"),
      mail: formData.get("mail"),
      message: formData.get("message"),
      affair: formData.get("affair"),
    };

    form.current.reset();
  };

  return (
    <div className='contact-body'>
      <img src="contact.jpg" alt="contact"></img>
      <div>
        <h3>Contact</h3>
        <p>Do you have any questions, do you want to leave your products on consignment or place an order? Contact Us.</p>
        <form className='form' ref={form}>
          <div className='sign-in-input-container'>
            <Input label="Name:" name="name" />
            <Input label="Lastname:" name="lastname" />
            <Input label="Mail:" name="mail" />
            <Input label="Country:" name="country" />
            <div className='btn-login'>
              <button className='btn-action' onClick={handleSubmit}>Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
