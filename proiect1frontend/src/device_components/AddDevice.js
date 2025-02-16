import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDevice } from '../services/api';
import '../device_components_style/DeviceList.css';

function AddDevice() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [maxHrConsumption, setMaxHrConsumption] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDevice(name, description, address, maxHrConsumption);
            setSuccess('Device added successfully');
            setError('');
            setTimeout(() => navigate('/device-list'), 2000);
        } catch (err) {
            setError('Failed to add device');
            console.error('Error:', err);
        }
    };

    return (
        <div className="add-device-container">
            <h2>Add New Device</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            
            <form className="add-device-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Device Name"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Device Description"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Device Address"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        value={maxHrConsumption}
                        onChange={(e) => setMaxHrConsumption(e.target.value)}
                        placeholder="Max Hourly Consumption"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="submit-button">
                        Add Device
                    </button>
                    <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => navigate('/deviceList')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddDevice;