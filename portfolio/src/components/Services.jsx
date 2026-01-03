import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { Globe, Cloud, Settings, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';

const Services = () => {
    const [services, setServices] = useState([]);

    const iconMap = {
        'Globe': <Globe className="w-6 h-6" />,
        'Cloud': <Cloud className="w-6 h-6" />,
        'Settings': <Settings className="w-6 h-6" />
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
            description: "Building architectures...",
            icon: 'Globe',
            tag: "Verification: Active"
        },
        {
            title: "Scalable Growth",
            description: "Horizontal expansion strategies...",
            icon: 'Cloud',
            tag: "Auto-Migration"
        },
        {
            title: "Secure Foundations",
            description: "Deep-rooted security protocols...",
            icon: 'Settings',
            tag: "Identity Secured"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "circOut" }
        },
    };

    return (
        <Section id="services" className="bg-bg-base">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Engineered Ecosystem</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 mt-2 text-primary tracking-tight">One Foundation To Meet <br /> All Performance Needs</h2>
                    <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed font-medium">
                        OFT TECH provides the high-performance technical ground and oversight that powers the next generation of global commerce.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                >
                    {displayServices.map((service, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="text-center p-8 md:p-12 bg-white border border-slate-100 rounded-[2rem] hover:shadow-[0_40px_100px_rgba(15,23,27,0.06)] hover:border-secondary/20 transition-all duration-500 group"
                        >
                            <div className="relative w-20 h-20 mx-auto mb-10 flex items-center justify-center">
                                <div className="absolute inset-0 bg-secondary/5 rounded-2xl rotate-12 group-hover:rotate-[30deg] group-hover:bg-secondary/10 transition-all duration-700"></div>
                                <div className="relative text-primary z-10 group-hover:text-secondary transition-colors duration-500">
                                    {iconMap[service.icon] || <Globe className="w-6 h-6" />}
                                </div>
                            </div>

                            <h3 className="text-base md:text-sm font-black uppercase tracking-widest mb-4 text-primary">
                                {service.title}
                            </h3>
                            <p className="text-sm text-text-muted leading-relaxed font-semibold mb-8 px-2 md:px-4 opacity-80">
                                {service.description}
                            </p>

                            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-secondary/50 transition-colors">
                                <CheckCircle2 size={12} className="text-secondary" />
                                {service.tag}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </Section>
    );
};

export default Services;
