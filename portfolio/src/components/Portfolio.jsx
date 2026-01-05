import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import api from '../utils/api';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

const Portfolio = () => {
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
            problem: "A major European bank faced critical downtime during peak trading hours due to legacy monolithic systems.",
            solution: "Implemented an event-driven microservices architecture using Kafka and Kubernetes.",
            outcome: "99.995% uptime achievement and 40% reduction in operational costs.",
            color: "bg-primary"
        },
        {
            title: "AI-Driven Supply Chain Synchronization",
            industry: "Logistics & Retail",
            problem: "A Fortune 500 retailer suffered from localized inventory blindspots affecting regional distribution.",
            solution: "Developed an IoT-integrated AI model to predict stock levels in real-time.",
            outcome: "Inventory accuracy improved by 35% within the first quarter of deployment.",
            color: "bg-secondary"
        }
    ];

    return (
        <Section id="projects" variant="light">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                <SectionHeader
                    title="Case Studies: Global Success"
                    subtitle="Strategic Impact"
                    className="mb-0 max-w-2xl"
                />
                <p className="text-text-muted max-w-sm text-lg mb-8 md:mb-0">
                    Delivering measurable value through technical excellence and strategic partnership.
                </p>
            </div>

            <div className="space-y-20">
                {displayCases.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="group grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white"
                    >
                        {/* Left Colour Check */}
                        <div className={`lg:col-span-5 p-10 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden ${project.color === 'bg-secondary' ? 'bg-secondary' : 'bg-primary'}`}>
                            {/* Decorative Circle */}
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>

                            <div className="relative z-10">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 mb-4 block">{project.industry}</span>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">{project.title}</h3>
                            </div>

                            <div className="mt-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/90 group-hover:text-white group-hover:gap-4 transition-all duration-300">
                                View Case Study <ArrowUpRight size={16} />
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="lg:col-span-7 p-10 lg:p-14 bg-white flex flex-col justify-center">
                            <div className="grid md:grid-cols-2 gap-10 mb-10">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">The Challenge</h4>
                                    <p className="text-sm text-text-muted leading-relaxed font-medium">{project.problem}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Our Approach</h4>
                                    <p className="text-sm text-text-muted leading-relaxed font-medium">{project.solution}</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 pt-8">
                                <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Business Outcome</h4>
                                <p className="text-lg md:text-xl font-bold text-primary tracking-tight leading-relaxed">{project.outcome}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Portfolio;
