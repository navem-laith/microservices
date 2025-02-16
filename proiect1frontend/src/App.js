import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import DeviceList from './device_components/DeviceList';
import AddDevice from './device_components/AddDevice';
import UpdateDevice from './device_components/UpdateDevice';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

import UserList from './user_components/UserList';
import UpdateUser from './user_components/UpdateUser';
import ManageUserDevices from './user_components/ManageUserDevices';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* Protected routes element={<ProtectedRoute allowedRoles={['user']}> <UserDashboard /> </ProtectedRoute>}/> */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />}/>
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    
                    <Route path="/device-list" element={<DeviceList />} />
                    <Route path="/add-device" element={<AddDevice />} />
                    <Route path="/update-device/:deviceId" element={<UpdateDevice /> } /> 
                    
                    <Route path="/user-list" element={<UserList />} />
                    <Route path="/update-user/:userId" element={<UpdateUser />} />
                    <Route path="/manage-user-devices/:userId" element={<ManageUserDevices />} />


                    {/* Redirect any other route to /login */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
