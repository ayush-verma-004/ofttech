import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from './layout/Layout';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Team = () => {
    const [team, setTeam] = React.useState([]);

    React.useEffect(() => {
        const fetchTeam = async () => {
            try {
                const { default: api } = await import('../utils/api');
                const res = await api.get('/team');
                if (res.data.success) {
                    console.log('Team Data Received:', res.data.data);
                    setTeam(res.data.data);
                }
            } catch (e) {
                console.error("Failed to load team:", e);
            }
        };
        fetchTeam();
    }, []);

    return (
        <Section id="team" className="bg-bg-base border-t border-slate-100">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Leadership Core</span>
                    <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight mb-6">Built By Engineers</h2>
                    <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
                        The minds architecting the next diverse generation of digital infrastructure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-500 aspect-[4/5] mb-8 group">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="absolute inset-0 bg-slate-50 flex items-center justify-center flex-col gap-4 group-hover:bg-slate-100 transition-colors">
                                        <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-300">
                                            <span className="text-xs font-black uppercase tracking-widest">Photo</span>
                                        </div>
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                                    <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        {member.socialLinks?.linkedin && <a href={member.socialLinks.linkedin} className="text-white/80 hover:text-white transition-colors"><Linkedin size={20} /></a>}
                                        {member.socialLinks?.twitter && <a href={member.socialLinks.twitter} className="text-white/80 hover:text-white transition-colors"><Twitter size={20} /></a>}
                                        {member.socialLinks?.email && <a href={`mailto:${member.socialLinks.email}`} className="text-white/80 hover:text-white transition-colors"><Mail size={20} /></a>}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-black text-primary mb-2">{member.name}</h3>
                                <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                                <p className="text-text-muted text-sm leading-relaxed opacity-80">{member.bio}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section >
    );
};

export default Team;
