import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Globe, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Card from './ui/Card';

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    const iconMap = {
        'Shield': <Shield className="w-8 h-8" />,
        'Zap': <Zap className="w-8 h-8" />,
        'Users': <Users className="w-8 h-8" />,
        'Globe': <Globe className="w-8 h-8" />
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

    // Fallback data
    const values = aboutData?.values || [
        { icon: 'Shield', title: "Strategic Trust", description: "Building long-term governance and secure foundations for your enterprise." },
        { icon: 'Zap', title: "Value Engineering", description: "Optimizing technology investments to deliver maximum ROI and efficiency." },
        { icon: 'Users', title: "Global Collaboration", description: "Seamlessly integrating expert talent across borders for unified success." },
        { icon: 'Globe', title: "Absolute Stability", description: "Architecting for zero-downtime and resilient scalability." }
    ];

    const stats = aboutData?.stats || [
        { value: "150+", label: "Architects" },
        { value: "10yr+", label: "Excellence" },
        { value: "500+", label: "Projects" },
        { value: "98%", label: "Retention" }
    ];

    return (
        <Section id="about" variant="light">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Left Column: Content */}
                <div>
                    <SectionHeader
                        title="Reliability at Every Layer of Scale"
                        subtitle="Our Identity"
                        align="left"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="prose prose-lg text-text-muted mb-10"
                    >
                        <p>
                            {aboutData?.overview || "Oft Tech stands at the intersection of innovation and reliability. We don't just build software; we engineer digital ecosystems that empower businesses to thrive in a volatile market. Our commitment to excellence is woven into every line of code."}
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-200">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="text-4xl lg:text-5xl font-black text-secondary tracking-tight">{stat.value}</div>
                                <div className="text-xs uppercase font-bold tracking-[0.2em] text-primary/60 mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Values Grid */}
                <div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {values.map((v, i) => (
                            <Card
                                key={i}
                                delay={0.2 + (i * 0.1)}
                                className="h-full border-t-4 border-t-accent hover:border-t-secondary transition-colors"
                            >
                                <div className="w-14 h-14 bg-secondary/10 text-secondary flex items-center justify-center mb-6 rounded-xl group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                    {iconMap[v.icon] || <CheckCircle2 className="w-8 h-8" />}
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-primary">{v.title}</h3>
                                <p className="text-sm text-text-muted leading-relaxed color-text-muted">
                                    {v.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
