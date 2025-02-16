import React, { useEffect, useState } from 'react';
import { getUserDetails, getUserDevices, getDeviceDetails } from '../services/api';
import Chat from './Chat';


const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [userDevices, setUserDevices] = useState([]);
    const [error, setError] = useState('');

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

    useEffect(() => {
        if (userData?.id) {
            const fetchUserDevices = async () => {
                try {
                    const deviceLinks = await getUserDevices(userData.id);
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

            fetchUserDevices();
        }
    }, [userData]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!userData) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h1>Welcome, {userData.firstName}!</h1>
            <div>
                <p>Name: {userData.firstName} {userData.lastName}</p>
                <p>Email: {userData.email}</p>
                <p>Role: {userData.type}</p>
            </div>
            <h3>User's Current Devices</h3>
            {userDevices.length > 0 ? (
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
            ) : (
                <p>No devices found for this user</p>
            )}
            <h1>User Dashboard</h1>
            <Chat userId={userData.id} />
        </div>
    );
};

export default UserDashboard;

