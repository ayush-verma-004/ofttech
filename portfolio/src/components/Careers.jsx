import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { Button } from './ui/Button';
import { ArrowUpRight } from 'lucide-react';
import api from '../utils/api';

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

    // Fallback data if API returns empty/fail (optional)
    const displayRoles = roles.length > 0 ? roles : [
        { title: "Lead Systems Architect", location: "Singapore / Hybrid", type: "Full-time" },
        { title: "Senior Cloud Security Engineer", location: "London / Remote", type: "Full-time" },
        { title: "Principal Backend Engineer (Java)", location: "San Francisco / Remote", type: "Full-time" }
    ];

    return (
        <Section id="careers" className="bg-white">
            <Container>
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    <div className="sticky top-32">
                        <span className="text-secondary font-bold uppercase tracking-[0.25em] text-[11px] mb-6 block">Talent Hub</span>
                        <h2 className="heading-lg mb-8 text-primary font-bold">Advance the Future <br />of Enterprise Tech</h2>
                        <p className="text-body mb-10 opacity-80 max-w-lg">
                            We seek exceptional minds to architect systems for the world's most influential organizations. At OFT TECH, your impact scales across global borders.
                        </p>
                        <div className="p-8 border-l-2 border-secondary bg-[#FAFAFA] italic text-accent-dark text-sm leading-relaxed">
                            "Our culture is built on technical absolute-ism and strategic foresight. We partner with innovators, not just employees."
                        </div>
                    </div>

                    <div className="space-y-4">
                        {displayRoles.map((role, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group p-8 border border-accent-light/40 hover:border-secondary/30 flex items-center justify-between cursor-pointer transition-all duration-500 bg-white hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] rounded-sm"
                            >
                                <div>
                                    <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition-colors duration-300 tracking-tight">{role.title}</h3>
                                    <p className="text-[12px] text-accent uppercase tracking-widest font-bold mt-2 opacity-60">{role.location} • {role.type}</p>
                                </div>
                                <div className="w-10 h-10 border border-accent-light/50 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all duration-500">
                                    <ArrowUpRight className="text-accent group-hover:text-white transition-colors duration-500" size={18} />
                                </div>
                            </motion.div>
                        ))}
                        <div className="pt-10">
                            <Button variant="secondary" className="w-full py-4 tracking-widest uppercase text-xs font-bold">View Global Opportunities</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Careers;
