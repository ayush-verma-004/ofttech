import React from 'react';
import { Container } from './Layout';
import { useSettings } from '../../context/SettingsContext';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

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
        <footer className="bg-primary-dark text-white pt-20 pb-10 border-t border-white/5">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <img src="/logo.svg" alt="OFT TECH" className="h-8 w-auto" />
                            <span className="text-2xl font-bold tracking-tight">OFT TECH</span>
                        </div>
                        <p className="text-accent text-sm leading-relaxed max-w-xs">
                            Pioneering enterprise software solutions and strategic IT consulting to accelerate global business transformation.
                        </p>
                        <div className="flex gap-4">
                            {settings.socials?.linkedin && <a href={settings.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-secondary transition-colors"><Linkedin size={18} /></a>}
                            {settings.socials?.twitter && <a href={settings.socials.twitter} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-secondary transition-colors"><Twitter size={18} /></a>}
                            {settings.socials?.github && <a href={settings.socials.github} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-secondary transition-colors"><Github size={18} /></a>}
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Company</h4>
                        <ul className="space-y-4">
                            {links.company.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-accent hover:text-white transition-colors text-sm">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Services</h4>
                        <ul className="space-y-4">
                            {links.services.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-accent hover:text-white transition-colors text-sm">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-accent">
                                <MapPin size={18} className="text-secondary shrink-0" />
                                <span>{settings.address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-accent">
                                <Mail size={18} className="text-secondary shrink-0" />
                                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-accent">
                                <Phone size={18} className="text-secondary shrink-0" />
                                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-accent">
                    <p>© {currentYear} OFT TECH Consulting Group. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                        <a href="#" className="hover:text-white transition-colors">Accessibility</a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
