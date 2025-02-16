import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../services/api';
import '../user_components_style/UserList.css';

function DeviceList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (userId) => {
        navigate(`/update-user/${userId}`);
    };

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            loadUsers();
        } catch (error) {
            setError('Failed to delete device');
            console.error('Error deleting device:', error);
        }
    };

    if (loading) {
        return <div className="container">Loading devices...</div>;
    }

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            {error && <p className="error-message">{error}</p>}

            {users.length === 0 ? (
                <p className="no-users-message">No users found</p>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.type}</td>
                                <td className="action-buttons">
                                    <button 
                                        className="edit-button"
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DeviceList;