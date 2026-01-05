import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Cloud, Settings, CheckCircle2, ArrowRight } from 'lucide-react';
import api from '../utils/api';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Card from './ui/Card';

const Services = () => {
    const [services, setServices] = useState([]);

    const iconMap = {
        'Globe': <Globe className="w-8 h-8" />,
        'Cloud': <Cloud className="w-8 h-8" />,
        'Settings': <Settings className="w-8 h-8" />
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data.data);
            } catch (error) {
                console.error("Failed to fetch Services", error);
            }
        };
        fetchServices();
    }, []);

    // Fallback
    const displayServices = services.length > 0 ? services : [
        {
            title: "Resilient Systems",
            description: "Building architectures that withstand high-load environments and ensure continuous availability.",
            icon: 'Globe',
            tag: "Verification: Active"
        },
        {
            title: "Scalable Growth",
            description: "Horizontal expansion strategies that allow your infrastructure to grow seamlessly with your business.",
            icon: 'Cloud',
            tag: "Auto-Migration"
        },
        {
            title: "Secure Foundations",
            description: "Deep-rooted security protocols to protect sensitive data and ensure compliance across borders.",
            icon: 'Settings',
            tag: "Identity Secured"
        }
    ];

    return (
        <Section id="services" variant="default" className="bg-gradient-to-b from-white to-gray-50/50">
            <SectionHeader
                title="One Foundation To Meet All Performance Needs"
                subtitle="Engineered Ecosystem"
                align="center"
                className="max-w-2xl mx-auto"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {displayServices.map((service, i) => (
                    <Card
                        key={i}
                        delay={i * 0.1}
                        className="h-full flex flex-col items-center text-center p-8 md:p-10 border-t-4 border-t-transparent hover:border-t-secondary transition-all shadow-lg hover:shadow-2xl"
                    >
                        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                            <div className="absolute inset-0 bg-secondary/5 rounded-2xl rotate-12 group-hover:rotate-[30deg] group-hover:bg-secondary/10 transition-all duration-500"></div>
                            <div className="relative text-primary z-10 group-hover:text-secondary transition-colors duration-500">
                                {iconMap[service.icon] || <Globe className="w-8 h-8" />}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4 text-primary">
                            {service.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed font-medium mb-8 flex-grow">
                            {service.description}
                        </p>

                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-secondary transition-colors mt-auto">
                            <CheckCircle2 size={12} className="text-accent" />
                            {service.tag}
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
};

export default Services;
