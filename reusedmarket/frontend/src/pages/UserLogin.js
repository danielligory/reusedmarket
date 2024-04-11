import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Authentication.css';

// UserLogin component for handling user login functionality.
const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Function to handle changes in form inputs.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    // Function to handle form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/users/login', formData);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            window.alert('Login Successful');
        } catch (error) {
            console.error(error.response.data);
            window.alert('Login Failed. Please try again');
        }
    };

    // Rendering the login form.
    return (
        <form onSubmit={handleSubmit}>
            <p>Login Page</p>
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
            <button type='submit'>Login</button>
        </form>
    );
};

export default UserLogin;