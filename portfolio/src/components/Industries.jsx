import React from 'react';
import { Section } from './layout/Layout';
import SectionHeader from './ui/SectionHeader';
import Card from './ui/Card';
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
            <SectionHeader
                title="Specialized Industry Solutions"
                subtitle="Industry Domain"
                align="left"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {industries.map((ind, i) => (
                    <Card
                        key={i}
                        delay={i * 0.05}
                        className="group flex flex-col items-start gap-4 hover:shadow-xl hover:border-accent/40 shadow-lg border-gray-100"
                    >
                        <div className="text-secondary/80 mb-2 group-hover:text-secondary group-hover:scale-110 transition-all duration-500 origin-left">
                            {React.cloneElement(ind.icon, { size: 36, strokeWidth: 1.5 })}
                        </div>
                        <h3 className="text-lg font-bold text-primary tracking-tight transition-colors duration-300">
                            {ind.name}
                        </h3>
                        <p className="text-sm text-text-muted leading-relaxed opacity-90 font-medium">
                            {ind.desc}
                        </p>
                        <div className="mt-auto pt-4 w-full">
                            <div className="w-8 h-1 bg-secondary/20 group-hover:w-full group-hover:bg-secondary transition-all duration-700 rounded-full"></div>
                        </div>
                    </Card>
                ))}
                <div className="flex flex-col justify-center items-center p-8 border border-dashed border-gray-200 rounded-lg">
                    <h3 className="text-sm font-bold text-text-muted opacity-40 italic tracking-wider text-center">Advancing Global Borders</h3>
                </div>
            </div>
        </Section>
    );
};

export default Industries;
