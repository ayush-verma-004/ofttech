import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { CheckCircle2, Search, Settings2, Rocket } from 'lucide-react';

const Engagement = () => {
    const steps = [
        {
            title: "Discovery & Strategy",
            desc: "Comprehensive stakeholder alignment and technical feasibility assessments.",
            icon: <Search className="w-5 h-5" />
        },
        {
            title: "Platform Engineering",
            desc: "Architecting modular, scalable systems with automated governance.",
            icon: <Settings2 className="w-5 h-5" />
        },
        {
            title: "Verified Deployment",
            desc: "Continuous integration with rigorous automated quality assurance cycles.",
            icon: <Rocket className="w-5 h-5" />
        },
        {
            title: "Persistent Evolution",
            desc: "Service level management and proactive infrastructure optimization.",
            icon: <CheckCircle2 className="w-5 h-5" />
        }
    ];

    return (
        <Section className="bg-[#FAFAFA] border-y border-accent-light/30">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <span className="text-secondary font-bold uppercase tracking-[0.25em] text-[11px] mb-6 block">Operational Framework</span>
                    <h2 className="heading-lg mb-8 text-primary">Strategic Partnership Process</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    {/* Subtle connecting line for desktop */}
                    <div className="absolute top-[40px] left-0 w-full h-px bg-accent-light/50 hidden lg:block z-0"></div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="relative z-10 text-center group"
                        >
                            <div className="w-16 h-16 bg-white text-primary border border-accent-light/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:border-secondary/50 transition-all duration-500">
                                {step.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-4 text-primary tracking-tight">{step.title}</h3>
                            <p className="text-sm text-accent leading-relaxed opacity-90 mx-auto max-w-[220px]">{step.desc}</p>
                            <div className="mt-8 text-[11px] font-bold text-secondary/30 tracking-widest uppercase">Phase 0{i + 1}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 p-12 lg:p-16 bg-primary rounded-sm text-white overflow-hidden relative shadow-xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full"></div>
                    <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
                        <div className="lg:w-1/3">
                            <h3 className="text-2xl font-bold mb-6 tracking-tight">Flexible Engagement</h3>
                            <p className="text-sm text-accent leading-relaxed opacity-70">
                                We adapt our collaborative frameworks to align with your specific enterprise governance and delivery culture.
                            </p>
                        </div>
                        <div className="lg:w-2/3 grid sm:grid-cols-3 gap-8 w-full">
                            {[
                                { name: "Fixed Scope", desc: "Predictable outcomes for defined projects." },
                                { name: "Dedicated Hub", desc: "Long-term co-innovation teams." },
                                { name: "Strategic Advisory", desc: "On-demand technical leadership." }
                            ].map((m, i) => (
                                <div key={i} className="p-8 border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-500 rounded-sm">
                                    <h4 className="font-bold text-secondary text-sm uppercase tracking-widest mb-3">{m.name}</h4>
                                    <p className="text-[12px] text-accent leading-relaxed opacity-70">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Engagement;
