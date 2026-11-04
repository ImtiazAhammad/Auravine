'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUpRight, Code, Heart, Sparkles, Mail } from 'lucide-react';
import { LiquidOcean } from '@/components/ui/liquid-ocean';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { usePerformance } from '@/hooks/usePerformance';

export const MarqueeClosing = ({ isLowPowerMode: parentLowPowerMode }: { isLowPowerMode?: boolean }) => {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { isMobile } = usePerformance();

    // Use isMobile to strictly limit CSS fallback to mobile devices only.
    // Desktop (even in low power mode) should try to render the effect as per user request.
    const showOcean = !isMobile;

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    // Ocean Colors
    const oceanConfig = isDark ? {
        // Dark mode: black ocean with the brand mint accent
        bg: 0x000000,
        grid: 0x222222, // Increased visibility from 0x050505
        accent: 0x34d399, // brand (dark)
        opacity: 0.4
    } : {
        // Light Mode: White Ocean for seamless blending
        bg: 0xffffff,
        grid: 0x9ca3af, // Darker grid for light mode (gray-400)
        accent: 0x047857, // brand (light)
        opacity: 0.4 // Lowered from 0.6 to make wireframe lines much sharper and visible
    };

    if (!mounted) return null; // Prevent hydration mismatch

    return (
        // Added pb-32 to account for the overlay footer and position text lower
        <div className={cn(
            "relative w-full min-h-screen flex flex-col items-center justify-end overflow-hidden pb-5 transition-colors duration-500",
            isDark ? "bg-black text-white" : "bg-background text-foreground"
        )}>

            {/* Background Ocean - Full Immersive */}
            <div className="absolute inset-0 z-0">
                {!showOcean ? (
                    <div className={cn("absolute inset-0 transition-opacity duration-1000", isDark ? "bg-black" : "bg-white")}>
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 50% 120%, ${isDark ? '#34d399' : '#047857'}, transparent)` }} />
                    </div>
                ) : (
                    <LiquidOcean
                        key={isDark ? 'dark' : 'light'}
                        backgroundColor={oceanConfig.bg}
                        gridColor={oceanConfig.grid}
                        accentColor={oceanConfig.accent}
                        oceanSize={60}
                        oceanFragments={40}
                        waveAmplitude={isDark ? 0.8 : 0.5} // Calmer waves in light mode
                        waveSpeed={0.015}
                        showBoats={true}
                        boatCount={6}
                        boatSpread={20}
                        showWireframe={true}
                        showGrid={true}
                        oceanOpacity={oceanConfig.opacity}
                        isLowPowerMode={false}
                    />
                )}

                {/* Top Fade Only - Seamless Integration */}
                {/* Top Fade - Gradient Bridge from Page Background to Ocean */}
                <div className={cn(
                    "absolute top-0 left-0 w-full h-48 bg-gradient-to-b to-transparent pointer-events-none z-10",
                    isDark ? "from-black via-black/80" : "from-background via-background/80"
                )} />
            </div>

            {/* Main Content - Centered */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center container px-6 py-20 text-center space-y-12">

                <motion.div
                    initial={!showOcean ? { opacity: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: !showOcean ? 0.5 : 1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
                >
                    <h2 className={cn(
                        "text-6xl md:text-8xl font-black tracking-tighter drop-shadow-2xl pb-4 leading-tight",
                        isDark ? "text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60" : "text-foreground"
                    )}>
                        Ready to Build?
                    </h2>

                    <p className={cn(
                        "text-xl md:text-2xl font-light leading-relaxed max-w-2xl drop-shadow-md pb-2",
                        isDark ? "text-white/70" : "text-muted-foreground font-medium"
                    )}>
                        We are always open to new AI projects and partnerships. Let's create something extraordinary together.
                    </p>

                    {/* Action Area: Newsletter & Navigation */}
                    <div className="w-full max-w-md mx-auto flex flex-col gap-6">

                        {/* Primary action */}
                        <Link href="/contact" className={cn(
                            "relative group flex items-center justify-between gap-4 p-1.5 pl-6 rounded-full border-2 transition-all duration-300",
                            isDark
                                ? "bg-white/5 border-white/10 backdrop-blur-md hover:border-brand/50"
                                : "bg-card border-foreground/15 hover:border-brand/50 shadow-xl"
                        )}>
                            <span className={cn("flex items-center gap-3 text-sm font-medium", isDark ? "text-white/80" : "text-foreground")}>
                                <Mail className="w-5 h-5" />
                                Tell us what you want to automate
                            </span>
                            <span className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-[0.15em] transition-transform duration-200 group-active:scale-95",
                                isDark ? "bg-brand text-black" : "bg-foreground text-background"
                            )}>
                                Book a call
                            </span>
                        </Link>

                        {/* Secondary Navigation Links */}
                        <div className="flex items-center justify-center gap-6 text-sm font-medium tracking-wide">
                            <Link href="/contact" className={cn(
                                "flex items-center gap-2 transition-colors",
                                isDark ? "text-white/50 hover:text-brand" : "text-muted-foreground hover:text-primary"
                            )}>
                                <span>Contact us</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                            <Link href="/projects" className={cn(
                                "flex items-center gap-2 transition-colors",
                                isDark ? "text-white/50 hover:text-brand" : "text-muted-foreground hover:text-primary"
                            )}>
                                <span>View solutions</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div >
    );
};

// Social Pill Component - Minimalist Glass
const SocialPill = ({ href, icon, label, isDark }: { href: string; icon: React.ReactNode; label: string; isDark: boolean }) => {
    return (
        <Link
            href={href}
            target="_blank"
            className={`
                group relative flex items-center gap-3 px-8 py-4 
                rounded-full backdrop-blur-md 
                transition-all duration-300 transform hover:-translate-y-1
                ${isDark
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand/50 hover:shadow-[0_0_30px_hsl(var(--brand)/0.15)]'
                    : 'bg-white/80 hover:bg-white border border-gray-900/20 hover:border-brand hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]'
                }
            `}
        >
            <span className={`transition-colors ${isDark ? 'text-gray-300 group-hover:text-brand' : 'text-gray-800 group-hover:text-brand'}`}>
                {icon}
            </span>
            <span className={`font-semibold tracking-wide ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-900 group-hover:text-black'}`}>
                {label}
            </span>
            <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 ${isDark ? 'text-gray-500 group-hover:text-brand' : 'text-gray-500 group-hover:text-brand'}`} />
        </Link>
    );
};
