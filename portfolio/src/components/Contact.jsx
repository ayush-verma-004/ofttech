import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/Button';
import { useSettings } from '../context/SettingsContext';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

const Contact = () => {
    const { settings } = useSettings();

    return (
        <Section id="contact" className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <SectionHeader
                        title="Let's Architect Your Success Flow"
                        subtitle="Engagement Hub"
                        align="left"
                    />

                    <div className="space-y-12 mt-12">
                        {[
                            { icon: <MapPin size={24} />, title: "Headquarters", info: settings.address },
                            { icon: <Mail size={24} />, title: "Global Sales", info: settings.email },
                            { icon: <Phone size={24} />, title: "Technical Inquiry", info: settings.phone }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-6 group cursor-default">
                                <div className="w-14 h-14 bg-bg-light rounded-2xl flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shrink-0 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-2 opacity-70">{item.title}</h4>
                                    <p className="text-xl font-bold text-primary tracking-tight">{item.info}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-bg-light p-10 lg:p-14 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden"
                >
                    {/* Decorative background blob */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

                    <form className="space-y-8 relative z-10 block">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Full Name</label>
                                <input type="text" className="w-full bg-white border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none p-4 rounded-xl text-primary font-semibold placeholder:text-gray-300 transition-all shadow-sm" placeholder="Enter name..." />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Work Email</label>
                                <input type="email" className="w-full bg-white border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none p-4 rounded-xl text-primary font-semibold placeholder:text-gray-300 transition-all shadow-sm" placeholder="email@company.com" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Engagement Type</label>
                            <select className="w-full bg-white border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none p-4 rounded-xl text-primary font-semibold transition-all appearance-none cursor-pointer shadow-sm">
                                <option>Strategic Transformation</option>
                                <option>Platform Engineering</option>
                                <option>Security Audit</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Detailed Inquiry</label>
                            <textarea className="w-full bg-white border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none p-4 rounded-xl text-primary font-semibold placeholder:text-gray-300 transition-all h-32 resize-none shadow-sm" placeholder="Describe your technical vision..."></textarea>
                        </div>

                        <Button className="w-full bg-primary hover:bg-secondary text-white rounded-xl py-4 font-bold flex items-center justify-center gap-3 transition-all uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1">
                            <span>Transmit Inquiry</span>
                            <Send size={18} />
                        </Button>
                    </form>
                </motion.div>
            </div>
        </Section>
    );
};

export default Contact;
