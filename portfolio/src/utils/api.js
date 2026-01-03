import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // For handling cookies (refresh token)
});

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL || '/api/v1'}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                if (res.data.success) {
                    const newAccessToken = res.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);

                    // Update header and retry original request
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed (token expired or invalid) -> Logout user
                console.error("Session expired", refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.href = '/login'; // Force redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
