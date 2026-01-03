import { useState, useEffect, useRef } from 'react';
import api from '../utils/api';

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            // Cancel previous request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // Create new controller
            abortControllerRef.current = new AbortController();

            setLoading(true);
            setError(null);

            try {
                const response = await api.get(url, {
                    ...options,
                    signal: abortControllerRef.current.signal
                });

                if (response.data.success) {
                    setData(response.data.data);
                } else {
                    setData(response.data); // Fallback for APIs not wrapping in .data
                }
            } catch (err) {
                if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
                    // Ignore abort errors
                    return;
                }
                console.error(`Error fetching ${url}:`, err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchData();
        }

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
