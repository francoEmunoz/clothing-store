import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import '../styles/Contact.css';

function Input({ label, name, type }) {
  return (
    <label className="label-contact-form">
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
    Swal.fire({
      title: 'Your message has been sent !',
      icon: 'success',
      confirmButtonText: 'Ok',
      position: 'bottom-end',
      backdrop: false,
      toast: true,
      timer: 3000,
      timerProgressBar: true,
      confirmButtonColor: '#fd2f24',
      color: '#983275',
  })

    form.current.reset();
  };

  return (
    <div className='contact-body'>
      <div className='contact-img'>
        <img src="contact.jpg" alt="contact"></img>
      </div>
      <div className='container-contact'>
        <h3>Contact</h3>
        <p>Do you have any questions, do you want to leave your products on consignment or place an order? Contact Us.</p>
        <form className='contact-form' ref={form}>
          <Input label="Name:" name="name" />
          <Input label="Mail:" name="mail" />
          <Input label="Affair:" name="affair" />
          <label className='label-message'>
            Message:
            <textarea className="text-tarea" name="description" minLength='4' maxLength='3000' required />
          </label>
          <div className='btn-send-message'>
            <button onClick={handleSubmit}>Send message</button>
          </div>
        </form>
      </div>
    </div>
  )
}
