import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, getAllUsers } from '../services/api';
import Chat from './Chat';

const AdminDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [err, setError] = useState('');
    const [activeUserId, setActiveUserId] = useState(null);
    const [users, setUsers] = useState([]);
    

    // const users = [
    //     { id: '46bf9cbf-cc9e-4ba2-97fd-a14533f48161', name: 'User 1' },
    //     { id: 'user2', name: 'User 2' },
    // ]; // Replace with a fetch call to get active users.
    
    useEffect(() => {
            loadUsers();
        }, []);

    const loadUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data);
                setError('');
            } catch (err) {
                setError('Failed to load devices');
                console.error('Error:', err);
            } 
        };

    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const handleViewUsers = () => {
        navigate('/user-list');
    };

    const handleViewDevices = () => {
        navigate('/device-list');
    };

     useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        setError('Authentication token not found. Please log in again.');
                        return;
                    }
    
                    const response = await getUserDetails('me');
                    console.log("Fetched user data:", response.data);
                    setUserData(response.data);
                    setError('');
                } catch (err) {
                    setError('Failed to load user data');
                    console.error('Error fetching user data:', err);
                }
            };
    
            fetchUserData();
        }, []);

    if (!userData) {
        return <p>Loading...</p>; // Show loading state until userData is fetched
    }

    return (
        <div>
            <h1>Welcome,  {userData.firstName}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleLogout}>Log Out</button>
                <button onClick={handleViewUsers}>View All Users</button>
                <button onClick={handleViewDevices}>View All Devices</button>
            </div>
            <h2>Active Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <button onClick={() => setActiveUserId(user.id)}>
                            Chat with {user.name}
                        </button>
                    </li>
                ))}
            </ul>

            {activeUserId && <Chat userId={activeUserId} />}
        </div>
    );
};

export default AdminDashboard;
