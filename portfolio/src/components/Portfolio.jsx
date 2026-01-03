import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { ExternalLink } from 'lucide-react';
import api from '../utils/api';

const Solutions = () => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setCases(res.data.data);
            } catch (error) {
                console.error("Failed to fetch Projects", error);
            }
        };
        fetchProjects();
    }, []);

    // Fallback
    const displayCases = cases.length > 0 ? cases : [
        {
            title: "Global Financial Infrastructure Modernization",
            industry: "Financial Services",
            problem: "A major European bank faced critical downtime...",
            solution: "Implemented an event-driven microservices architecture...",
            outcome: "99.995% uptime achievement...",
            color: "border-blue-500/20"
        },
        {
            title: "AI-Driven Supply Chain Synchronization",
            industry: "Logistics & Retail",
            problem: "A Fortune 500 retailer suffered...",
            solution: "Developed an IoT-integrated...",
            outcome: "Inventory accuracy improved...",
            color: "border-emerald-500/20"
        }
    ];

    return (
        <Section id="solutions" className="bg-white">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <span className="text-secondary font-bold uppercase tracking-[0.25em] text-[11px] mb-6 block">Strategic Impact</span>
                        <h2 className="heading-lg text-primary">Case Studies: <br />Global Success</h2>
                    </div>
                    <p className="text-body max-w-sm opacity-80 text-[16px]">
                        Delivering measurable value through technical excellence and strategic partnership.
                    </p>
                </div>

                <div className="space-y-16">
                    {displayCases.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className={`group border ${project.color || 'border-gray-200'} bg-[#FAFAFA] p-0 overflow-hidden flex flex-col lg:flex-row shadow-[0_10px_40px_-15px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700`}
                        >
                            <div className="lg:w-[40%] p-12 lg:p-16 flex flex-col justify-between bg-primary text-white">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{project.industry}</span>
                                    <h3 className="text-2xl md:text-3xl font-bold mt-6 leading-tight tracking-tight">{project.title}</h3>
                                </div>
                                <div className="mt-12 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.15em] group-hover:gap-6 transition-all duration-500 cursor-pointer text-secondary">
                                    Read Impact Report <ExternalLink size={14} />
                                </div>
                            </div>

                            <div className="lg:w-[60%] p-12 lg:p-16 grid gap-12 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <h4 className="text-[11px] font-bold text-accent-dark uppercase tracking-[0.2em] mb-4">The Challenge</h4>
                                        <p className="text-[15px] text-accent leading-relaxed opacity-90">{project.problem}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold text-accent-dark uppercase tracking-[0.2em] mb-4">Our Approach</h4>
                                        <p className="text-[15px] text-accent leading-relaxed opacity-90">{project.solution}</p>
                                    </div>
                                </div>
                                <div className="border-t border-accent-light/30 pt-8">
                                    <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">Business Outcome</h4>
                                    <p className="text-lg md:text-xl font-bold text-primary tracking-tight leading-relaxed">{project.outcome}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default Solutions;
