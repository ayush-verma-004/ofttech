import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({
    title,
    subtitle,
    align = 'left',
    className,
    titleClassName,
    subtitleClassName
}) => {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto',
    };

    return (
        <div className={`mb-16 md:mb-24 max-w-4xl ${alignClasses[align]} ${className || ''}`}>
            {subtitle && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`text-secondary font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-4 block ${subtitleClassName || ''}`}
                >
                    {subtitle}
                </motion.span>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`heading-lg mb-6 ${titleClassName || ''}`}
            >
                {title}
            </motion.h2>
            {/* Decorative line for visual hierarchy */}
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`h-1 bg-accent/60 mt-4 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}
            />
        </div>
    );
};

export default SectionHeader;
