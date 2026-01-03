import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { Shield, Zap, Users, Globe } from 'lucide-react';
import api from '../utils/api';

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    const iconMap = {
        'Shield': <Shield className="w-5 h-5" />,
        'Zap': <Zap className="w-5 h-5" />,
        'Users': <Users className="w-5 h-5" />,
        'Globe': <Globe className="w-5 h-5" />
    };

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await api.get('/about');
                setAboutData(res.data.data);
            } catch (error) {
                console.error("Failed to fetch About data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAbout();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] }
        },
    };

    if (loading) return null; // Or a loading skeleton

    const { heading, overview, stats, values } = aboutData || {};

    // Fallback if API fails or data is missing (optional, keeps UI intact while developing)
    const displayValues = values || [
        { icon: 'Shield', title: "Strategic Trust", description: "Building long-term governance..." },
        { icon: 'Zap', title: "Value Engineering", description: "Optimizing technology investments..." },
        { icon: 'Users', title: "Global Collaboration", description: "Seamlessly integrating expert talent..." },
        { icon: 'Globe', title: "Absolute Stability", description: "Architecting for zero-downtime..." }
    ];

    return (
        <Section id="about" className="bg-white overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    >
                        <span className="text-secondary font-bold uppercase tracking-[0.25em] text-[10px] mb-4 md:mb-6 block">Our Identity</span>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-10 text-primary leading-tight" dangerouslySetInnerHTML={{ __html: heading?.replace(/\n/g, '<br/>') || "Reliability at <br class='hidden md:block' /> Every Layer of Scale" }}></h2>
                        <p className="text-sm md:text-lg text-primary/80 mb-8 leading-relaxed">
                            {overview || "OFT TECH stands at the intersection..."}
                        </p>
                        <div className="flex gap-16 py-8 border-y border-accent-light/50 border-dashed">
                            {stats && stats.map((stat, i) => (
                                <div key={i}>
                                    <div className="text-4xl font-bold text-primary tracking-tight">{stat.value}</div>
                                    <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mt-2">{stat.label}</div>
                                </div>
                            ))}
                            {!stats && (
                                <>
                                    <div>
                                        <div className="text-4xl font-bold text-primary tracking-tight">150+</div>
                                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mt-2">Architects</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-secondary tracking-tight">10yr+</div>
                                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mt-2">Excellence</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid sm:grid-cols-2 gap-8"
                    >
                        {displayValues.map((v, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className="p-8 bg-white border border-accent-light/40 rounded-sm hover:border-secondary/30 transition-all duration-500 group"
                            >
                                <div className="w-10 h-10 bg-accent-light/10 text-secondary flex items-center justify-center mb-6 rounded-sm group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                    {iconMap[v.icon] || <Shield className="w-5 h-5" />}
                                </div>
                                <h3 className="font-bold text-lg mb-3 tracking-tight text-primary">{v.title}</h3>
                                <p className="text-sm text-accent leading-relaxed font-normal">{v.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
};

export default About;
