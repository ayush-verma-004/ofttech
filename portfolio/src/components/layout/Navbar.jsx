import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Container } from './Layout';
import { Button } from '../ui/Button';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''; // Revert to stylesheet default (hidden-x is applied there)
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Solutions', href: '#solutions' },
        { name: 'Industries', href: '#industries' },
        { name: 'About', href: '#about' },
        { name: 'Careers', href: '#careers' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                isScrolled
                    ? 'bg-white/80 backdrop-blur-xl py-3 border-b border-black/5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
                    : 'bg-transparent py-6 border-b border-transparent'
            )}
        >
            <Container className="flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <img src="/logo.svg" alt="OFT TECH Logo" className="h-10 w-auto transition-transform group-hover:scale-105" />
                    <span className={cn(
                        "text-xl font-bold tracking-tight transition-colors duration-500",
                        isScrolled ? "text-primary" : "text-[#FDFDFD]"
                    )}>
                        OFT TECH
                    </span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-all duration-300 hover:text-secondary relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-secondary after:transition-all hover:after:w-full",
                                    isScrolled ? "text-primary/70" : "text-white/80"
                                )}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="/login" className={cn(
                            "text-sm font-bold",
                            isScrolled ? "text-gray-900" : "text-white"
                        )}>
                            Log In
                        </a>
                        <Button variant={isScrolled ? "primary" : "outline"} size="sm">
                            Contact Us
                        </Button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 transition-colors z-50 relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        null // Hide main toggle when open, use internal one
                    ) : (
                        <Menu className={isScrolled ? "text-primary" : "text-white"} />
                    )}
                </button>
            </Container>

            {/* Mobile Menu */}
            <div className={cn(
                "fixed inset-0 bg-primary z-[60] h-[100dvh] w-screen transition-all duration-500 md:hidden flex flex-col",
                isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}>
                {/* Mobile Menu Header with Close Button on Left (Per User Request) */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 -ml-2 text-white hover:text-secondary transition-colors"
                        aria-label="Close Menu"
                    >
                        <X size={32} />
                    </button>
                    <img src="/logo.svg" alt="OFT TECH" className="h-8 w-auto" />
                </div>

                <div className="flex flex-col gap-2 pt-8 px-8">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "text-white text-3xl font-bold py-5 border-b border-white/5 flex items-center justify-between transition-all delay-[var(--delay)]",
                                isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                            )}
                            style={{ '--delay': `${i * 100}ms` }}
                        >
                            {link.name}
                            <ChevronRight className="text-secondary/50" />
                        </a>
                    ))}
                </div>
                <div className="mt-auto mb-12 px-8">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white" size="lg">Contact Us</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
