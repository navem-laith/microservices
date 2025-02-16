import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser, getAllUsers } from '../services/api';

const UpdateUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        type: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Load user data for the given ID
        const loadUserData = async () => {
            try {
                const response = await getAllUsers();
                const user = response.data.find((d) => d.id === userId);
                if (user) {
                    setUserData(user);
                } else {
                    setError('User not found');
                }
            } catch (err) {
                setError('Failed to load user data');
            }
        };
        loadUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userId, userData);
            setSuccess('User updated successfully');
            setTimeout(() => navigate('/user-list'), 500); // Redirect after 1 second
        } catch (error) {
            setError('Failed to update user');
            console.error('Error updating user:', error);
        }
    };

    const handleManageDevices = () => {
        navigate(`/manage-user-devices/${userId}`);
    };

    return (
        <div className="update-user-container">
            <h2>Update User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="text"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Type</label>
                    <input
                        type="text"
                        name="type"
                        value={userData.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update User</button>
                <button 
                    type="button" 
                    onClick={handleManageDevices}
                    style={{ marginLeft: '10px' }}
                >
                    Manage Devices
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;
