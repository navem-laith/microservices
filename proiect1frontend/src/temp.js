

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getUserById, updateUser, getDeviceUserLinksByUserId, deleteDeviceUserLink, createDeviceUserLink } from '../services/api';

// const UpdateUser = () => {
//     const { userId } = useParams();
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);
//     const [devices, setDevices] = useState([]);
//     const [newDeviceId, setNewDeviceId] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         fetchUserData();
//         fetchUserDevices();
//     }, [userId]);

//     // Fetch user data by ID
//     const fetchUserData = async () => {
//         try {
//             const response = await getUserById(userId);
//             setUserData(response.data);
//         } catch (err) {
//             setError('Failed to load user data');
//             console.error('Error fetching user data:', err);
//         }
//     };

//     // Fetch devices linked to the user
//     const fetchUserDevices = async () => {
//         try {
//             const response = await getDeviceUserLinksByUserId(userId);
//             setDevices(response.data);
//         } catch (err) {
//             setError('Failed to load devices');
//             console.error('Error fetching user devices:', err);
//         }
//     };

//     // Handle user update submission
//     const handleUpdateUser = async (e) => {
//         e.preventDefault();
//         try {
//             await updateUser(userId, userData);
//             setSuccess('User updated successfully');
//             setError('');
//         } catch (err) {
//             setError('Failed to update user');
//             console.error('Error updating user:', err);
//         }
//     };

//     // Handle adding a new device link
//     const handleAddDevice = async () => {
//         try {
//             await createDeviceUserLink(newDeviceId, userId);
//             setNewDeviceId('');
//             fetchUserDevices(); // Refresh the list of devices
//         } catch (err) {
//             console.error('Error adding device:', err);
//             setError('Failed to add device bruh');
//         }
//     };

//     // Handle deleting a device link
//     const handleDeleteDevice = async (deviceId) => {
//         try {
//             await deleteDeviceUserLink(deviceId, userId);
//             fetchUserDevices(); // Refresh the list of devices
//         } catch (err) {
//             console.error('Error deleting device:', err);
//             setError('Failed to delete device');
           
//         }
//     };
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUserData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     return (
//         <div>
//             <h2>Update User</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {success && <p style={{ color: 'green' }}>{success}</p>}
//             {userData ? (
//                 <form onSubmit={handleUpdateUser}>
//                    <div>
//                     <label>First Name</label>
//                     <input
//                         type="text"
//                         name="firstName"
//                         value={userData.firstName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Last Name</label>
//                     <input
//                         type="text"
//                         name="lastName"
//                         value={userData.lastName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Email</label>
//                     <input
//                         type="text"
//                         name="email"
//                         value={userData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input
//                         type="text"
//                         name="password"
//                         value={userData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>type</label>
//                     <input
//                         type="text"
//                         name="type"
//                         value={userData.type}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                     <button type="submit">Update User</button>
//                 </form>
//             ) : (
//                 <p>Loading user data...</p>
//             )}

//             <h3>User's Devices</h3>
//             <div>
//                 <label>Add Device ID:</label>
//                 <input
//                     type="text"
//                     value={newDeviceId}
//                     onChange={(e) => setNewDeviceId(e.target.value)}
//                     placeholder="Enter Device ID"
//                 />
//                 <button onClick={handleAddDevice}>Add Device</button>
//             </div>
//             {devices.length > 0 ? (
//                 <ul>
//                     {devices.map((device) => (
//                         <li key={device.deviceId}>
//                             Device ID: {device.deviceId}
//                             <button onClick={() => handleDeleteDevice(device.deviceId)}>Delete</button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No devices linked to this user.</p>
//             )}
//         </div>
//     );
// };

// export default UpdateUser;
