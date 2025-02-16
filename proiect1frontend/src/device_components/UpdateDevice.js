import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDevice, getAllDevices } from '../services/api';

const UpdateDevice = () => {
    const { deviceId } = useParams();
    const navigate = useNavigate();
    const [deviceData, setDeviceData] = useState({
        name: '',
        description: '',
        address: '',
        maxHrConsumption: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Load device data for the given ID
        const loadDeviceData = async () => {
            try {
                const response = await getAllDevices();
                const device = response.data.find((d) => d.id === deviceId);
                if (device) {
                    setDeviceData(device);
                } else {
                    setError('Device not found');
                }
            } catch (err) {
                setError('Failed to load device data');
            }
        };
        loadDeviceData();
    }, [deviceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeviceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDevice(deviceId, deviceData);
            setSuccess('Device updated successfully');
            setTimeout(() => navigate('/device-list'), 500); // Redirect after 1 second
        } catch (error) {
            setError('Failed to update device');
            console.error('Error updating device:', error);
        }
    };

    return (
        <div className="update-device-container">
            <h2>Update Device</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={deviceData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={deviceData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={deviceData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Max Hourly Consumption</label>
                    <input
                        type="text"
                        name="maxHrConsumption"
                        value={deviceData.maxHrConsumption}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Device</button>
            </form>
        </div>
    );
};

export default UpdateDevice;
