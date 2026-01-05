import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Search, Settings2, Rocket } from 'lucide-react';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

const Engagement = () => {
    const steps = [
        {
            title: "Discovery & Strategy",
            desc: "Comprehensive stakeholder alignment and technical feasibility assessments.",
            icon: <Search className="w-6 h-6" />
        },
        {
            title: "Platform Engineering",
            desc: "Architecting modular, scalable systems with automated governance.",
            icon: <Settings2 className="w-6 h-6" />
        },
        {
            title: "Verified Deployment",
            desc: "Continuous integration with rigorous automated quality assurance cycles.",
            icon: <Rocket className="w-6 h-6" />
        },
        {
            title: "Persistent Evolution",
            desc: "Service level management and proactive infrastructure optimization.",
            icon: <CheckCircle2 className="w-6 h-6" />
        }
    ];

    return (
        <Section className="bg-[#FAFAFA] border-y border-gray-100 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-secondary/10 to-transparent hidden lg:block pointer-events-none"></div>

            <div className="relative z-10">
                <SectionHeader
                    title="Strategic Partnership Process"
                    subtitle="Operational Framework"
                    align="center"
                    className="max-w-2xl mx-auto"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="relative z-10 text-center group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-50 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-bg-light text-primary border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-secondary group-hover:text-white group-hover:border-transparent transition-all duration-500">
                                {step.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-primary tracking-tight">{step.title}</h3>
                            <p className="text-sm text-text-muted leading-relaxed opacity-90 mx-auto max-w-[220px] font-medium">{step.desc}</p>
                            <div className="mt-6 text-[10px] font-black text-secondary/40 tracking-[0.2em] uppercase group-hover:text-secondary transition-colors">Phase 0{i + 1}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-10 lg:p-14 bg-primary rounded-3xl text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none"></div>

                    <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
                        <div className="lg:w-1/3 text-left">
                            <h3 className="text-3xl font-black mb-6 tracking-tight leading-tight">Flexible Engagement<br /><span className="text-secondary">Models</span></h3>
                            <p className="text-sm text-gray-300 leading-relaxed font-medium">
                                We adapt our collaborative frameworks to align with your specific enterprise governance and delivery culture, ensuring seamless integration from day one.
                            </p>
                        </div>
                        <div className="lg:w-2/3 grid sm:grid-cols-3 gap-6 w-full">
                            {[
                                { name: "Fixed Scope", desc: "Predictable outcomes for defined projects." },
                                { name: "Dedicated Hub", desc: "Long-term co-innovation teams." },
                                { name: "Strategic Advisory", desc: "On-demand technical leadership." }
                            ].map((m, i) => (
                                <div key={i} className="p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl backdrop-blur-sm">
                                    <h4 className="font-black text-secondary text-xs uppercase tracking-widest mb-3">{m.name}</h4>
                                    <p className="text-xs text-gray-300 leading-relaxed opacity-90">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Engagement;
