import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className,
    onClick,
    hoverEffect = true,
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: delay }}
            onClick={onClick}
            className={`
            bg-bg-card rounded-lg p-8 
            border border-gray-100/50
            backdrop-blur-sm
            ${hoverEffect ? 'card-hover cursor-pointer group' : ''}
            ${className || ''}
        `}
        >
            {children}
        </motion.div>
    );
};

export default Card;
