import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

const Testimonials = () => {
    const reviews = [
        {
            name: "Marcus Thorne",
            role: "Chief Technology Officer — Global Logistics Corp",
            text: "OFT TECH’s capability to transform complex distributed systems while maintaining operational continuity was critical to our success during their 24-month engagement.",
        },
        {
            name: "Sarah Chen",
            role: "VP Engineering — FinStream Global",
            text: "Their strategic depth in microservices and platform engineering has set a new benchmark for what we expect from high-level technical consultancy partners.",
        },
        {
            name: "Robert J. Miller",
            role: "Managing Director — Horizon Academic",
            text: "The resilience architecture built by OFT TECH allowed us to scale seamlessly to five million concurrent users during our most critical expansion phase.",
        }
    ];

    return (
        <Section id="testimonials" variant="dark" className="relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-primary opacity-100 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(87,188,199,0.1),transparent_50%)]"></div>
            </div>

            <SectionHeader
                title="Trusted by Global Technology Leaders"
                subtitle="Consensus"
                align="left"
                titleClassName="text-white"
            />

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
                {reviews.map((rev, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="relative p-10 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.06] hover:border-accent/30 transition-all duration-500 flex flex-col justify-between"
                    >
                        <div>
                            <Quote className="text-secondary mb-8 opacity-80" size={40} />
                            <p className="text-lg text-gray-300 italic mb-10 leading-relaxed font-light font-sans">
                                "{rev.text}"
                            </p>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary border border-white/20 flex items-center justify-center text-xs font-bold text-white">
                                {rev.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-white tracking-tight">{rev.name}</div>
                                <div className="text-accent text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">{rev.role}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Testimonials;
