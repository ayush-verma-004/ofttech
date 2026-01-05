import React from 'react';
import { cn } from '../../utils/cn';

export const Container = ({ children, className }) => {
    return (
        <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
            {children}
        </div>
    );
};

export const Section = ({ children, className, id, dark = false, noPadding = false }) => {
    return (
        <section
            id={id}
            className={cn(
                !noPadding && 'py-10 md:py-20', // Reduced from py-16 md:py-32
                dark ? 'bg-primary text-white' : 'bg-white text-primary',
                className
            )}
        >
            {children}
        </section>
    );
};
