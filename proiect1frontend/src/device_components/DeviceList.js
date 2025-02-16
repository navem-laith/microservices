import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDevices, deleteDevice } from '../services/api';
import '../device_components_style/DeviceList.css';

function DeviceList() {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        try {
            const response = await getAllDevices();
            console.log('we retrieved all devices!')
            setDevices(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load devices');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (deviceId) => {
        navigate(`/update-device/${deviceId}`);
    };

    const handleDelete = async (deviceId) => {
        try {
            //delete user's devices and links first
            await deleteDevice(deviceId);
            loadDevices();
        } catch (error) {
            setError('Failed to delete device');
            console.error('Error deleting device:', error);
        }
    };

    if (loading) {
        return <div className="container">Loading devices...</div>;
    }

    return (
        <div className="device-list-container">
            <h2>Device List</h2>
            {error && <p className="error-message">{error}</p>}
            
            <button 
                className="add-device-button"
                onClick={() => navigate('/add-device')}
            >
                Add New Device
            </button>

            {devices.length === 0 ? (
                <p className="no-devices-message">No devices found</p>
            ) : (
                <table className="device-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Max Hr Consumption</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device) => (
                            <tr key={device.id}>
                                <td>{device.name}</td>
                                <td>{device.description}</td>
                                <td>{device.address}</td>
                                <td>{device.maxHrConsumption}</td>
                                <td className="action-buttons">
                                    <button 
                                        className="edit-button"
                                        onClick={() => handleEdit(device.id)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleDelete(device.id)}
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