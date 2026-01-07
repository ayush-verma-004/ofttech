import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

// Custom wide container for Navbar to push content to edges
const NavbarContainer = ({ children, className }) => (
    <div className={cn("mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8", className)}>
        {children}
    </div>
);

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
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Solutions', href: '#projects' },
        { name: 'Industries', href: '#industries' },
        { name: 'About', href: '#about' },
        { name: 'Careers', href: '#careers' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                isScrolled
                    ? 'bg-white/90 backdrop-blur-xl py-4 border-b border-black/5 shadow-sm'
                    : 'bg-transparent py-6 border-b border-transparent'
            )}
        >
            <NavbarContainer className="flex items-center justify-between">
                <div className="flex items-center gap-4 group cursor-pointer -ml-2">
                    {/* Logo Circle */}
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
                        style={{
                            background: 'linear-gradient(268deg, rgba(240, 227, 199, 1) 10%, rgba(166, 211, 224, 1) 100%)'
                        }}
                    >
                        <img src="/logo.svg" alt="OFT TECH Logo" className="h-10 w-auto" />
                    </div>

                    <span className={cn(
                        "text-2xl font-bold tracking-tight transition-colors duration-500",
                        isScrolled ? "text-primary" : "text-[#FDFDFD]"
                    )}>
                        Oft Tech
                    </span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-12">
                    <div className="flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-base font-bold transition-all duration-300 hover:text-secondary relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-secondary after:transition-all hover:after:w-full",
                                    isScrolled ? "text-primary/80" : "text-white/90"
                                )}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Contact Us - Now a Link (Text) */}
                        <a href="#contact" className={cn(
                            "text-base font-bold transition-colors hover:text-secondary",
                            isScrolled ? "text-primary" : "text-white"
                        )}>
                            Contact Us
                        </a>

                        {/* Log In - Now the Box (Button) */}
                        <Button
                            variant={isScrolled ? "primary" : "outline"}
                            size="default"
                            className={cn(
                                "font-bold px-8",
                                !isScrolled && "bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
                            )}
                            onClick={() => window.location.href = '/login'}
                        >
                            Log In
                        </Button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 transition-colors z-50 relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        null
                    ) : (
                        <Menu className={isScrolled ? "text-primary" : "text-white"} size={28} />
                    )}
                </button>
            </NavbarContainer>

            {/* Mobile Menu */}
            <div className={cn(
                "fixed inset-0 bg-primary z-[60] h-[100dvh] w-screen transition-all duration-500 md:hidden flex flex-col",
                isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}>
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
                <div className="mt-auto mb-12 px-8 flex flex-col gap-4">
                    <a href="#contact" className="text-white text-center text-lg font-medium py-3 border-b border-white/10 hover:text-secondary transition-colors mb-4">
                        Contact Us
                    </a>
                    <Button
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold"
                        size="lg"
                        onClick={() => window.location.href = '/login'}
                    >
                        Log In
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
