import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfileQuery, useEditProfileMutation } from '../features/usersAPI';
import { showSuccessAlert, showErrorAlert } from '../utils/alertsUtils';
import '../styles/Contact.css';

export default function Profile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: user, isLoading, error } = useProfileQuery(id);
    const [editProfile, { isLoading: isEditing }] = useEditProfileMutation();

    const [profileData, setProfileData] = useState({
        name: '',
        lastname: '',
        email: '',
        country: ''
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                country: user.country
            });
        }
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await editProfile({ ID: parseInt(id), ...profileData }).unwrap();
            showSuccessAlert('Profile updated successfully');
        } catch (error) {
            showErrorAlert('Error updating profile');
        }
    };

    // Navegar si el ID del usuario no coincide con el ID en los parámetros
    useEffect(() => {
        if (user && user.ID !== parseInt(id)) {
            navigate('/*'); // Navegar a la página deseada si el ID no coincide
        }
    }, [user, id, navigate]);

    // Manejar error de carga de perfil
    if (error) {
        navigate('/*'); // Redirigir a la página deseada si hay un error
        return null; // Otra opción es renderizar un componente de error aquí
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading profile</p>;

    return (
        <div className='contact-body'>
            <div className="container-contact">
                <h3>Profile</h3>
                <h5 className='mt-5 mb-3'>My dates</h5>
                <form className='contact-form' onSubmit={handleSubmit}>
                    <label htmlFor="name" className="label-contact-form">
                        Name:
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label htmlFor="lastname" className="label-contact-form">
                        Lastname:
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={profileData.lastname}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label htmlFor="email" className="label-contact-form">
                        Email:
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label htmlFor="country" className="label-contact-form">
                        Country:
                        <select
                            id="country"
                            name="country"
                            value={profileData.country}
                            onChange={handleInputChange}
                        >
                            <option value="">Select a country</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Brasil">Brasil</option>
                            <option value="Chile">Chile</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                        </select>
                    </label>
                    <div className='btn-send-message'>
                        <button type="submit" disabled={isEditing}>
                            {isEditing ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </div>
            <div className='contact-img'>
                <img src="/contact.jpg" alt="contact"></img>
            </div>
        </div >
    );
}