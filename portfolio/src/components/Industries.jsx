import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import {
    HeartPulse,
    CircleDollarSign,
    GraduationCap,
    ShoppingCart,
    Sprout,
    Truck,
    Rocket
} from 'lucide-react';

const Industries = () => {
    const industries = [
        { name: "Financial Services", icon: <CircleDollarSign />, desc: "Resilient fintech ecosystems and critical banking core migrations." },
        { name: "Global Healthcare", icon: <HeartPulse />, desc: "Scalable HIPAA-compliant digital health platforms." },
        { name: "Higher Education", icon: <GraduationCap />, desc: "Integrated learning ecosystems for global academic institutions." },
        { name: "Enterprise Retail", icon: <ShoppingCart />, desc: "Multi-channel commerce platforms with unified supply chain sync." },
        { name: "Modern Logistics", icon: <Truck />, desc: "Real-time global asset tracking and fleet optimization." },
        { name: "Public Sector", icon: <Sprout />, desc: "Strategic digitalization for government and public initiatives." },
        { name: "Scale & SaaS", icon: <Rocket />, desc: "Platform engineering for high-growth multi-tenant architectures." }
    ];

    return (
        <Section id="industries" className="bg-white">
            <Container>
                <div className="max-w-2xl mb-24">
                    <span className="text-secondary font-bold uppercase tracking-[0.25em] text-[11px] mb-6 block">Industry Domain</span>
                    <h2 className="heading-lg text-primary">Specialized Industry Solutions</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
                    {industries.map((ind, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            className="group cursor-default"
                        >
                            <div className="text-secondary/60 mb-8 group-hover:text-secondary group-hover:scale-110 transition-all duration-500 origin-left">
                                {React.cloneElement(ind.icon, { size: 32, strokeWidth: 1.5 })}
                            </div>
                            <h3 className="text-[17px] font-bold mb-4 text-primary tracking-tight transition-colors duration-300">
                                {ind.name}
                            </h3>
                            <p className="text-sm text-accent leading-relaxed opacity-80 font-normal">
                                {ind.desc}
                            </p>
                            <div className="mt-6 w-0 h-px bg-secondary/30 group-hover:w-full transition-all duration-700"></div>
                        </motion.div>
                    ))}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-sm font-bold text-accent-dark opacity-30 italic tracking-wider">Advancing Global Borders</h3>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Industries;
