import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/Button';
import { useSettings } from '../context/SettingsContext';

const Contact = () => {
    const { settings } = useSettings();

    return (
        <Section id="contact" className="bg-white">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Engagement Hub</span>
                        <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter mb-10 leading-[1.1]">
                            Let's Architect <br />Your Success Flow
                        </h2>

                        <div className="space-y-12">
                            {[
                                { icon: <MapPin size={22} />, title: "Headquarters", info: settings.address },
                                { icon: <Mail size={22} />, title: "Global Sales", info: settings.email },
                                { icon: <Phone size={22} />, title: "Technical Inquiry", info: settings.phone }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 bg-bg-base rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0 shadow-sm border border-slate-100">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{item.title}</h4>
                                        <p className="text-lg font-bold text-primary tracking-tight">{item.info}</p>
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
                        className="bg-bg-base p-12 lg:p-16 rounded-[3rem] border border-slate-100 relative shadow-[0_40px_100px_rgba(15,23,27,0.04)]"
                    >
                        <form className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                                    <input type="text" className="w-full bg-white border border-slate-100 focus:border-secondary/30 outline-none p-5 rounded-2xl text-primary font-bold placeholder:text-slate-200 transition-all text-sm" placeholder="Enter name..." />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Work Email</label>
                                    <input type="email" className="w-full bg-white border border-slate-100 focus:border-secondary/30 outline-none p-5 rounded-2xl text-primary font-bold placeholder:text-slate-200 transition-all text-sm" placeholder="email@company.com" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Engagement Type</label>
                                <select className="w-full bg-white border border-slate-100 focus:border-secondary/30 outline-none p-5 rounded-2xl text-primary font-bold transition-all appearance-none cursor-pointer text-sm">
                                    <option>Strategic Transformation</option>
                                    <option>Platform Engineering</option>
                                    <option>Security Audit</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Detailed Inquiry</label>
                                <textarea className="w-full bg-white border border-slate-100 focus:border-secondary/30 outline-none p-5 rounded-2xl text-primary font-bold placeholder:text-slate-200 transition-all h-32 resize-none text-sm" placeholder="Describe your technical vision..."></textarea>
                            </div>

                            <Button className="w-full bg-primary hover:bg-secondary text-white rounded-2xl py-8 font-black flex items-center justify-center gap-3 transition-all text-sm uppercase tracking-[0.1em]">
                                <span>Transmit Inquiry</span>
                                <Send size={18} />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
};

export default Contact;
