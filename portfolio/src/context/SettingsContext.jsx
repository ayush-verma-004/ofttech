import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        email: 'info@oft-tech.consulting',
        phone: '+1 (800) OFT-TECH',
        address: 'Level 24, Global Trade Center',
        socials: {},
        hero: {
            // Updated defaults to match user request
            tagline: "IT Services & Web Development Solutions",
            title: "Building Scalable Web Solutions for Modern Businesses",
            subtitle: "OFT TECH leverages deep architectural insight to guide enterprises through the gradient of digital transformation.",
            ctaPrimary: "Start The Shift",
            ctaSecondary: "Explore Vision"
        },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // Use imported api instance (assuming public access allowed for GET)
                const res = await api.get('/general');
                if (res.data.success && res.data.data) {
                    setSettings(res.data.data);
                }
            } catch (error) {
                console.error("Failed to load global settings", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};
