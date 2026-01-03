import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
        primary: 'bg-secondary text-white hover:bg-secondary-dark shadow-sm hover:shadow-secondary/20',
        secondary: 'bg-white text-primary border border-accent-light hover:border-secondary hover:text-secondary shadow-sm',
        outline: 'bg-transparent border border-white/20 text-white hover:bg-white/10',
        ghost: 'bg-transparent text-primary hover:bg-accent-light/30',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm font-medium',
        md: 'px-6 py-2.5 text-base font-medium',
        lg: 'px-8 py-3.5 text-lg font-semibold tracking-tight',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-sm transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export { Button };
