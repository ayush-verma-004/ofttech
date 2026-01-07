import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { Trophy, Star, ShieldCheck, TrendingUp } from 'lucide-react';

const WhyOFT = () => {
    const points = [
        {
            icon: <Trophy className="text-secondary w-5 h-5" />,
            title: "Proven Tenure",
            desc: "A history of successful transitions for Fortune 500 and global government entities."
        },
        {
            icon: <Star className="text-secondary w-5 h-5" />,
            title: "Architectural Depth",
            desc: "Our engineers are specialists in high-scale distributed systems and compliance."
        },
        {
            icon: <ShieldCheck className="text-secondary w-5 h-5" />,
            title: "Standard Compliance",
            desc: "Bank-grade operational security and data integrity management."
        },
        {
            icon: <TrendingUp className="text-secondary w-5 h-5" />,
            title: "Performance ROI",
            desc: "Technology investment directly translated into business scalability."
        }
    ];

    return (
        <Section className="bg-white">
            <Container>
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="order-2"
                    >
                        <div className="relative">
                            <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-secondary/20"></div>
                            <div className="bg-[#FAFAFA] p-16 lg:p-24 border border-accent-light/30 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.03)]">
                                <div className="grid grid-cols-2 gap-y-16 gap-x-12">
                                    {[
                                        { val: "10yr+", lab: "Excellence" },
                                        { val: "100+", lab: "Global Deployments", accent: true },
                                        { val: "30+", lab: "Region Access", accent: true },
                                        { val: "98%", lab: "Client Retention" }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-4">
                                            <div className={`text-5xl font-bold tracking-tighter ${stat.accent ? 'text-secondary' : 'text-primary'}`}>{stat.val}</div>
                                            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent opacity-70 leading-relaxed">{stat.lab}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="order-1">
                        <span className="text-secondary font-bold uppercase tracking-[0.25em] text-[11px] mb-6 block">The Oft Tech Standard</span>
                        <h2 className="heading-lg mb-10 text-primary">Strategic Advantage, <br />Global Reliability</h2>
                        <p className="text-body mb-12 opacity-80 max-w-lg">
                            We move beyond traditional vendor-client dynamics to establish deep strategic partnerships that focus on long-term technological stability and foresight.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-10">
                            {points.map((p, i) => (
                                <div key={i} className="flex gap-5 group">
                                    <div className="pt-1 group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
                                    <div>
                                        <h4 className="font-bold mb-2 text-primary text-[16px] tracking-tight">{p.title}</h4>
                                        <p className="text-sm text-accent leading-relaxed opacity-80">{p.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default WhyOFT;
