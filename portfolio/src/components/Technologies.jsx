import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe2, ShieldCheck, Zap } from 'lucide-react';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

const Technologies = () => {
    const techCategories = [
        {
            name: "Enterprise Backend",
            tools: ["Java (Spring)", "Node.js", "Python", "Go"],
            icon: <Cpu size={28} />
        },
        {
            name: "Next-Gen Frontend",
            tools: ["React", "TypeScript", "Next.js", "Vite"],
            icon: <Globe2 size={28} />
        },
        {
            name: "Cloud Ecosystem",
            tools: ["AWS", "Azure", "Docker", "Kubernetes"],
            icon: <Zap size={28} />
        },
        {
            name: "Cyber Resilience",
            tools: ["SecOps", "Zero-Trust", "OAuth 2.1", "Vault"],
            icon: <ShieldCheck size={28} />
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

            <div className="text-center mx-auto mb-16">
                <SectionHeader
                    title={<>Cutting-Edge <br /> Engineering Hub</>}
                    subtitle="Proven Stack"
                    align="center"
                    className="mb-8"
                />
                <p className="text-text-muted text-lg max-w-2xl mx-auto font-medium opacity-80 leading-relaxed">
                    Propelling digital transformation with a high-performance technology matrix and rigorous architectural oversight.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {techCategories.map((cat, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -8 }}
                        className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-lg hover:shadow-2xl hover:border-secondary/20 transition-all duration-500 group flex flex-col items-center text-center h-full"
                    >
                        <div className="w-16 h-16 bg-bg-light rounded-2xl mb-6 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white shadow-sm transition-all duration-500">
                            {cat.icon}
                        </div>

                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-primary border-b border-gray-100 pb-4 w-full">
                            {cat.name}
                        </h3>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {cat.tools.map((tool, j) => (
                                <span
                                    key={j}
                                    className="text-[11px] font-bold text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full group-hover:text-secondary group-hover:bg-secondary/5 transition-colors"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Performance HUD-style Footer (Light Showable Edition) */}
            <div className="mt-24 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 opacity-80">
                <div className="flex items-center gap-10">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Architectural Stability</span>
                        <span className="text-xl font-black text-primary leading-none mt-2">99.99<span className="text-secondary">%</span></span>
                    </div>
                    <div className="w-px h-10 bg-gray-200"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Efficiency Index</span>
                        <span className="text-xl font-black text-primary leading-none mt-2">&lt; 140<span className="text-secondary">ms</span></span>
                    </div>
                </div>

                <div className="text-center md:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-1">Ecosystem Index / v4.2.0</p>
                    <p className="text-[9px] text-gray-400 font-medium">REAL-TIME MONITORING ENABLED</p>
                </div>
            </div>
        </Section>
    );
};

export default Technologies;
