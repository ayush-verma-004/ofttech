import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn'; // Assuming cn utility exists, if not I will default to template literals or simple join

// Simple utility if cn doesn't exist yet, but I'll check for it. 
// Actually, let's just make it robust.

const Section = ({
    children,
    id,
    className,
    variant = 'default',
    noPadding = false
}) => {
    const variants = {
        default: 'bg-white',
        light: 'bg-bg-light',
        alternate: 'bg-brand-cream/10',
        dark: 'bg-primary text-white',
    };

    return (
        <section
            id={id}
            className={`relative overflow-hidden ${variants[variant] || variants.default} ${className || ''}`}
        >
            <div className={`${noPadding ? '' : 'py-20 lg:py-32'} section-container relative z-10`}>
                {children}
            </div>
        </section>
    );
};

export default Section;
