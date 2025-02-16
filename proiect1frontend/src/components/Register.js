import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(firstName, lastName, email, password, type);
            setSuccess('Registration successful');
            setError('');
            setTimeout(() => navigate('/login'), 2000); // Redirect to Login after registration
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" required />

                <button type="submit">Register</button>
            </form>
        </div>
    );
    
}

export default Register;
