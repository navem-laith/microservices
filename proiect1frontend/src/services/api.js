import axios from 'axios';

const API_URL_USER = 'http://user.localhost';
const API_URL_DEVICE = 'http://device.localhost'; //localhost:8081

// Create an Axios instance with interceptors
const API = axios.create();

// Request Interceptor to add JWT token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor to handle unauthorized errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized request! Redirecting to login...');
            // Clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const register = (firstName, lastName, email, password, type) => {
    return axios.post(`${API_URL_USER}/users/register`, { firstName, lastName, email, password, type});
};

export const login = async (email, password) => {
    try {
        console.log("Attempting login with:", email, password);
        const response = await axios.post(
            `${API_URL_USER}/users/login`,
             { email, password },
             { headers: { 'Content-Type': 'application/json' }});
        const token = response.data.token; // Extract JWT token
        console.log("Received token from server:", token);
        return token;
    } catch (error) {
        console.error("Login request failed:", error.response || error.message);
        throw new Error('Invalid email or password');
    }
};

// export const getUserById = (userId) => {
//     return API.get(`${API_URL_USER}/users/${userId}`);
// };
export const getUserDetails = () => {
    return API.get(`${API_URL_USER}/users/me`);
};


export const getAllUsers = () => {
    return API.get(`${API_URL_USER}/users`);
};

export const updateUser = (userId, updatedData) => {
    return API.put(`${API_URL_USER}/users/${userId}`, updatedData);
};

export const deleteUser = (userId) => {
    return API.delete(`${API_URL_USER}/users/${userId}`);
};

// export const getUserById = (userId) => {
//     return axios.get(`${API_URL_USER}/users/${userId}`);
// };

// export const getAllUsers = () => {
//     return axios.get(`${API_URL_USER}/users`);
// }

// export const updateUser = (userId, updatedData) => {
//     return axios.put(`${API_URL_USER}/users/${userId}`, updatedData);
// };

// export const deleteUser = (userId) => {
//     return axios.delete(`${API_URL_USER}/users/${userId}`);
// }

//device
//////////////////////////////
export const addDevice = (name, description, address, maxHrConsumption) => {
    return axios.post(`${API_URL_DEVICE}/devices/add`, {  name, description, address, maxHrConsumption });
};

export const deleteDevice = (deviceId) => {
    return axios.delete(`${API_URL_DEVICE}/devices/${deviceId}`);
};

export const getAllDevices = () => {
    return axios.get(`${API_URL_DEVICE}/devices`);
};

//device update
export const updateDevice = (deviceId, updatedData) => {
    return axios.put(`${API_URL_DEVICE}/devices/${deviceId}`, updatedData);
};

// GET details
export const getDeviceDetails = (deviceId) => {
    return axios.get(`${API_URL_DEVICE}/devices/${deviceId}`);
};

//links
///////////////////////////////
export const getUserDevices = (userId) => {
    return axios.get(`${API_URL_DEVICE}/links/user/${userId}`);
};

//POST link
// export const addDeviceUserLink = (deviceId, userId) => {
//     return axios.post(`${API_URL_DEVICE}/links?deviceId=${deviceId}&userId=${userId}`);
// };
export const addDeviceUserLink = (deviceId, userId) => {
    return axios.post(`${API_URL_DEVICE}/links`, {
        deviceId: deviceId,
        userId: userId
    });
};



// // GET: Get all DeviceUserLinks
// export const getAllDeviceUserLinks = () => {
//     return axios.get(`${API_URL_DEVICE}`);
// };

// // GET: Get DeviceUserLinks by Device ID
// export const getDeviceUserLinksByDeviceId = (deviceId) => {
//     return axios.get(`${API_URL_DEVICE}/links/device/${deviceId}`);
// };

// // Delete a device link by userId and deviceId
// export const deleteDeviceUserLink = (deviceId, userId) => {
//     return axios.delete(`${API_URL_DEVICE}/links`, {
//         data: { deviceId, userId },
//     });
// };
