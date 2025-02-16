import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    getUserDevices,
    getDeviceDetails,
    getAllDevices,
    addDeviceUserLink,
    getUserDetails
} from '../services/api';

const ManageDevices = () => {
    const { userId } = useParams();
    const [userDevices, setUserDevices] = useState([]);
    const [allDevices, setAllDevices] = useState([]);
    const [error, setError] = useState('');
    const [userDetails, setUserDetails] = useState(null);  // Start as null for easier conditional rendering

    // Load user's linked devices and all devices
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userResponse = await getUserDetails(userId);
                setUserDetails(userResponse.data); // Save user details after fetch
            } catch (err) {
                setError('Failed to load user details');
                console.error('Error fetching user details:', err);
            }
        };

        const fetchUserDevices = async () => {
            try {
                const deviceLinks = await getUserDevices(userId); // Linked device IDs
                const deviceDetails = await Promise.all(
                    deviceLinks.data.map((link) => getDeviceDetails(link.deviceId))
                );
                setUserDevices(deviceDetails.map((response) => response.data));
                setError('');
            } catch (err) {
                setError('Failed to load user devices');
                console.error('Error fetching user devices:', err);
            }
        };

        const fetchAllDevices = async () => {
            try {
                const response = await getAllDevices();
                setAllDevices(response.data);
            } catch (err) {
                setError('Failed to load all devices');
                console.error('Error fetching all devices:', err);
            }
        };

        fetchUserDetails();
        fetchUserDevices();
        fetchAllDevices();
    }, [userId]);

    // Add device to user
    const handleAddDevice = async (deviceId) => {
        try {
            await addDeviceUserLink(deviceId, userId);
            //Reload user devices to reflect the added device
            const updatedDeviceLinks = await getUserDevices(userId);
            const updatedDeviceDetails = await Promise.all(
                updatedDeviceLinks.data.map((link) => getDeviceDetails(link.deviceId))
            );
            setUserDevices(updatedDeviceDetails.map((response) => response.data));
        } catch (err) {
            setError('Failed to add device');
            console.error('Error adding device:', err);
        }
    };

    return (
        <div className="manage-devices-container">
            <h2>Manage Devices for {userDetails ? userDetails.firstName : 'Loading...'}</h2> {/* Conditionally render firstName */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h3>User's Current Devices</h3>
            {userDevices.length === 0 ? (
                <p>No devices found for this user</p>
            ) : (
                <table className="device-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Max Hr Consumption</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDevices.map((device) => (
                            <tr key={device.id}>
                                <td>{device.name}</td>
                                <td>{device.description}</td>
                                <td>{device.address}</td>
                                <td>{device.maxHrConsumption}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h3>All Available Devices</h3>
            {allDevices.length === 0 ? (
                <p>No devices available</p>
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
                        {allDevices
                            .filter(
                                (device) =>
                                    !userDevices.some(
                                        (userDevice) => userDevice.id === device.id
                                    )
                            )
                            .map((device) => (
                                <tr key={device.id}>
                                    <td>{device.name}</td>
                                    <td>{device.description}</td>
                                    <td>{device.address}</td>
                                    <td>{device.maxHrConsumption}</td>
                                    <td>
                                        <button onClick={() => handleAddDevice(device.id)}>
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageDevices;
