import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Container } from './layout/Layout';
import { Button } from './ui/Button';
import { useSettings } from '../context/SettingsContext';

const Hero = () => {
    const { settings } = useSettings();

    // Helper to render newlines
    const renderTitle = (title) => {
        if (!title) return null;
        return title.split('\\n').map((line, i) => (
            <React.Fragment key={i}>
                {line} <br />
            </React.Fragment>
        ));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }
        },
    };

    return (
        <section className="relative min-h-[100dvh] flex items-center hero-custom-gradient pt-20 overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05]">
                <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100" height="100" filter="url(#noise)" />
                </svg>
            </div>

            <Container className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-2 mb-6 md:mb-8"
                    >
                        <Terminal size={12} className="text-primary md:w-4 md:h-4" />
                        <span className="text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs">
                            {settings.hero?.tagline}
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-primary text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 md:mb-8 leading-[1.1] md:leading-[1.05]"
                    >
                        {renderTitle(settings.hero?.title) || 'Navigating Complex Horizons'}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-primary/80 text-lg md:text-xl lg:text-2xl mb-12 max-w-xl leading-relaxed font-bold"
                    >
                        {settings.hero?.subtitle}
                    </motion.p>

                    {/* Buttons... */}

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <Button size="lg" className="bg-primary hover:bg-white hover:text-primary text-white rounded-full px-12 transition-all shadow-2xl border border-primary/20 font-black text-sm">
                            {settings.hero?.ctaPrimary || 'Start The Shift'}
                        </Button>
                        <Button variant="outline" size="lg" className="border-primary/30 text-primary rounded-full px-12 hover:bg-white/20 transition-colors font-bold text-sm">
                            {settings.hero?.ctaSecondary || 'Explore Vision'}
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Dynamic Glass Visual - Reflective of the new palette */}
                <div className="hidden lg:flex justify-center relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative z-20 w-[500px] h-[500px] bg-white/10 backdrop-blur-2xl border border-white/30 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden"
                    >
                        {/* Internal Gradient Globe */}
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rotate-45 animate-pulse"></div>

                        <div className="relative z-10 w-64 h-64 bg-gradient-to-tr from-bg-light to-white rounded-full shadow-inner flex items-center justify-center">
                            <div className="w-48 h-48 bg-primary rounded-full flex items-center justify-center relative overflow-hidden">
                                <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                <span className="text-accent font-black text-3xl tracking-tighter z-10">OFT</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Metallic / Fluid Accents */}
                    <motion.div
                        animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-accent to-white rounded-full shadow-xl opacity-80"
                    ></motion.div>
                    <motion.div
                        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-5 -left-5 w-40 h-40 bg-primary/80 backdrop-blur-md rounded-full shadow-2xl skew-x-5"
                    ></motion.div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;
