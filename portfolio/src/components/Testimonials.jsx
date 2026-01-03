import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { Quote } from 'lucide-react';

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
        <Section className="bg-primary text-white py-32 overflow-hidden">
            <Container>
                <div className="text-left mb-24 max-w-2xl">
                    <span className="text-secondary font-bold uppercase tracking-[0.25em] text-[11px] mb-6 block">Consensus</span>
                    <h2 className="heading-lg text-white">Trusted by Global <br />Technology Leaders</h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {reviews.map((rev, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="relative p-12 bg-white/[0.03] border border-white/5 rounded-sm hover:bg-white/[0.06] transition-all duration-700"
                        >
                            <Quote className="text-secondary/30 mb-8" size={32} />
                            <p className="text-lg text-accent italic mb-12 leading-relaxed opacity-90 font-light">
                                "{rev.text}"
                            </p>
                            <div className="pt-8 border-t border-white/5">
                                <div className="font-bold text-white tracking-tight">{rev.name}</div>
                                <div className="text-secondary text-[11px] font-bold uppercase tracking-widest mt-2">{rev.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default Testimonials;
