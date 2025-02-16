//Login.js
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const userData = await login(email, password);
            // localStorage.setItem('userId', userData.id);
            // localStorage.setItem('userType', userData.type); // Store user role
            // localStorage.setItem('userFirstName', userData.firstName);
            // localStorage.setItem('userLastName', userData.lastName);
            // localStorage.setItem('userEmail', userData.email);

            console.log("handleLogin invoked");
            e.preventDefault();
            const token = await login(email, password);
        
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken);
            const userType = decodedToken.role;
            console.log("User Role:", userType);
            // Store JWT token in local storage
            localStorage.setItem('token', token);

            // Store token and redirect user (role-based redirect logic will need token decoding)
            console.log("JWT Tokennnn HERE:", token);
            //navigate('/dashboard'); // Update based on user role decoding later

            // Redirect based on user role
            if (userType === 'admin') {
                console.log("hello admin");
                navigate('/admin-dashboard');
            } else {
                console.log("hello user");
                navigate('/user-dashboard');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
