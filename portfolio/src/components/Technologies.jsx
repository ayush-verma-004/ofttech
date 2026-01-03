import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { Cpu, Globe2, ShieldCheck, Zap } from 'lucide-react';

const Technologies = () => {
    const techCategories = [
        {
            name: "Enterprise Backend",
            tools: ["Java (Spring)", "Node.js", "Python", "Go"],
            icon: <Cpu size={24} />
        },
        {
            name: "Next-Gen Frontend",
            tools: ["React", "TypeScript", "Next.js", "Vite"],
            icon: <Globe2 size={24} />
        },
        {
            name: "Cloud Ecosystem",
            tools: ["AWS", "Azure", "Docker", "Kubernetes"],
            icon: <Zap size={24} />
        },
        {
            name: "Cyber Resilience",
            tools: ["SecOps", "Zero-Trust", "OAuth 2.1", "Vault"],
            icon: <ShieldCheck size={24} />
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <Section className="bg-white relative overflow-hidden">
            {/* Subtle tech geometric background accent */}
            <div className="absolute top-0 right-[-10%] w-[40%] h-[40%] bg-secondary/[0.03] blur-[120px] rounded-full -translate-y-1/2"></div>

            <Container className="relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Proven Stack</span>
                    <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter mb-8 leading-none">
                        Cutting-Edge <br /> Engineering Hub
                    </h2>
                    <p className="text-text-muted text-base max-w-lg mx-auto font-medium opacity-80">
                        Propelling digital transformation with a high-performance technology matrix and rigorous architectural oversight.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {techCategories.map((cat, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="bg-bg-base border border-slate-100 p-10 rounded-[2.5rem] hover:bg-white hover:shadow-[0_40px_100px_rgba(15,23,27,0.08)] hover:border-secondary/20 transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl mb-8 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white shadow-sm transition-all duration-500">
                                {cat.icon}
                            </div>

                            <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-primary border-b border-white pb-4">
                                {cat.name}
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {cat.tools.map((tool, j) => (
                                    <span
                                        key={j}
                                        className="text-[11px] font-bold text-slate-500 bg-white border border-slate-50 px-3 py-1.5 rounded-full group-hover:text-secondary transition-colors"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Performance HUD-style Footer (Light Showable Edition) */}
                <div className="mt-32 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-10">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Architectural Stability</span>
                            <span className="text-xl font-black text-primary leading-none mt-2">99.99<span className="text-secondary">%</span></span>
                        </div>
                        <div className="w-px h-10 bg-slate-100"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Efficiency Index</span>
                            <span className="text-xl font-black text-primary leading-none mt-2">&lt; 140<span className="text-secondary">ms</span></span>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-1">Ecosystem Index / v4.2.0</p>
                        <p className="text-[9px] text-slate-300 font-medium">REAL-TIME MONITORING ENABLED</p>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Technologies;
