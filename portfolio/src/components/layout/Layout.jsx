import React from 'react';
import { cn } from '../../utils/cn';

export const Container = ({ children, className }) => {
    return (
        <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
            {children}
        </div>
    );
};

export const Section = ({ children, className, id, dark = false }) => {
    return (
        <section
            id={id}
            className={cn(
                'py-16 md:py-32',
                dark ? 'bg-primary text-white' : 'bg-white text-primary',
                className
            )}
        >
            {children}
        </section>
    );
};
