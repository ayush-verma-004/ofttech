import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';
import api from '../utils/api';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import { Button } from './ui/Button'; // Assuming Button exists in ui/Button as imported before, if not I need check. 
// Wait, the previous file read showed `import { Button } from './ui/Button';` so it exists.

const Careers = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const res = await api.get('/careers');
                setRoles(res.data.data);
            } catch (error) {
                console.error("Failed to fetch Careers", error);
            }
        };
        fetchCareers();
    }, []);

    // Fallback data
    const displayRoles = roles.length > 0 ? roles : [
        { title: "Lead Systems Architect", location: "Singapore / Hybrid", type: "Full-time" },
        { title: "Senior Cloud Security Engineer", location: "London / Remote", type: "Full-time" },
        { title: "Principal Backend Engineer (Java)", location: "San Francisco / Remote", type: "Full-time" }
    ];

    return (
        <Section id="careers" className="bg-bg-light">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                <div className="sticky top-32">
                    <SectionHeader
                        title="Advance the Future of Enterprise Tech"
                        subtitle="Talent Hub"
                        align="left"
                    />
                    <p className="text-text-muted text-lg mb-10 opacity-80 max-w-lg leading-relaxed">
                        We seek exceptional minds to architect systems for the world's most influential organizations. At OFT TECH, your impact scales across global borders.
                    </p>
                    <div className="p-8 border-l-4 border-secondary bg-white shadow-sm italic text-primary/80 text-sm leading-relaxed rounded-r-lg">
                        "Our culture is built on technical absolute-ism and strategic foresight. We partner with innovators, not just employees."
                    </div>
                </div>

                <div className="space-y-6">
                    {displayRoles.map((role, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group p-8 md:p-10 bg-white border border-gray-100 rounded-xl hover:shadow-xl hover:border-secondary/30 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                            <div>
                                <h3 className="font-bold text-xl text-primary group-hover:text-secondary transition-colors duration-300">{role.title}</h3>
                                <div className="flex items-center gap-4 mt-3 text-xs md:text-sm text-text-muted font-medium uppercase tracking-wider">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {role.location}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {role.type}</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 border border-secondary/20 rounded-full flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shrink-0">
                                <ArrowUpRight size={20} />
                            </div>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pt-8"
                    >
                        {/* Fallback button if Button component is simple, but using standard button here just in case */}
                        <button className="btn-primary w-full md:w-auto uppercase tracking-widest text-xs font-bold">
                            View Global Opportunities
                        </button>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

export default Careers;
