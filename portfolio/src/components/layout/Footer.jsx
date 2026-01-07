import React from 'react';
import { Container } from './Layout';
import { useSettings } from '../../context/SettingsContext';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ArrowRight, Briefcase } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { settings } = useSettings();

    const links = {
        company: [
            { name: 'About Us', href: '#about' },
            { name: 'Careers', href: '#careers' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Privacy Policy', href: '#' },
        ],
        services: [
            { name: 'Software Development', href: '#' },
            { name: 'Cloud Solutions', href: '#' },
            { name: 'Enterprise IT', href: '#' },
            { name: 'Consulting', href: '#' },
        ],
    };

    return (
        <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-secondary opacity-50"></div>

            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
                    {/* Brand - 4 Cols */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-3">
                            <img src="/logo.svg" alt="Oft Tech" className="h-10 w-auto brightness-0 invert" />
                            <span className="text-2xl font-black tracking-tighter">Oft Tech</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
                            Pioneering enterprise software solutions and strategic IT consulting to accelerate global business transformation.
                        </p>
                        <div className="flex gap-4">
                            {settings.socials?.linkedin && <a href={settings.socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-secondary hover:text-white text-gray-400 transition-all duration-300 border border-white/10"><Linkedin size={18} /></a>}
                            {settings.socials?.twitter && <a href={settings.socials.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-secondary hover:text-white text-gray-400 transition-all duration-300 border border-white/10"><Twitter size={18} /></a>}
                            {settings.socials?.github && <a href={settings.socials.github} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-secondary hover:text-white text-gray-400 transition-all duration-300 border border-white/10"><Github size={18} /></a>}

                            {/* Freelancing Platforms */}
                            {settings.socials?.freelancer && <a href={settings.socials.freelancer} target="_blank" rel="noreferrer" title="Freelancer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-secondary hover:text-white text-gray-400 transition-all duration-300 border border-white/10"><Briefcase size={18} /></a>}
                            {settings.socials?.upwork && <a href={settings.socials.upwork} target="_blank" rel="noreferrer" title="Upwork" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-secondary hover:text-white text-gray-400 transition-all duration-300 border border-white/10"><Briefcase size={18} /></a>}
                            {settings.socials?.fiverr && <a href={settings.socials.fiverr} target="_blank" rel="noreferrer" title="Fiverr" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-secondary hover:text-white text-gray-400 transition-all duration-300 border border-white/10"><Briefcase size={18} /></a>}
                        </div>
                    </div>

                    {/* Spacer - 1 Col */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* Links 1 - 2 Cols */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-white">Company</h4>
                        <ul className="space-y-4">
                            {links.company.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-secondary transition-colors text-sm font-medium block hover:translate-x-1 duration-300">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links 2 - 2 Cols */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-white">Services</h4>
                        <ul className="space-y-4">
                            {links.services.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-secondary transition-colors text-sm font-medium block hover:translate-x-1 duration-300">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact - 3 Cols */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-white">Contact</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 text-sm text-gray-400 group">
                                <MapPin size={20} className="text-secondary shrink-0 group-hover:text-white transition-colors" />
                                <span className="leading-relaxed">{settings.address}</span>
                            </li>
                            <li className="flex items-center gap-4 text-sm text-gray-400 group">
                                <Mail size={20} className="text-secondary shrink-0 group-hover:text-white transition-colors" />
                                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors font-medium border-b border-transparent hover:border-white pb-0.5">{settings.email}</a>
                            </li>
                            <li className="flex items-center gap-4 text-sm text-gray-400 group">
                                <Phone size={20} className="text-secondary shrink-0 group-hover:text-white transition-colors" />
                                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors font-medium border-b border-transparent hover:border-white pb-0.5">{settings.phone}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-medium uppercase tracking-wider">
                    <p>© {currentYear} Oft Tech Consulting Group. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                        <a href="#" className="hover:text-white transition-colors">Accessibility</a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
