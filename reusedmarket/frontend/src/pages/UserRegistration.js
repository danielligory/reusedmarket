import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Authentication.css';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/users/register', formData);
            console.log(response.data);
            window.alert('Registration Successful');
        } catch (error) {
            console.error(error.response.data);
            window.alert('Registration Failed. Please try again');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Registration Page</p>
            <input 
                type = 'text'
                name = 'username'
                placeholder = 'Username'
                value = {formData.username}
                onChange = {handleChange}
            />
            <input 
                type = 'email'
                name = 'email'
                placeholder = 'Email'
                value = {formData.email}
                onChange = {handleChange}
            />
            <input 
                type = 'password'
                name = 'password'
                placeholder = 'Password'
                value = {formData.password}
                onChange = {handleChange}
            />
            <button type='submit'>Register</button>
        </form>
    );
};

export default UserRegistration;
