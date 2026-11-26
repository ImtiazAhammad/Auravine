"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { useContent } from '@/providers/ContentProvider';
import Link from "next/link";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCT_SCREENS } from '@/data/showcase';

export default function StatsSection({ scrollYProgress, showOnly }: { scrollYProgress?: any, showOnly?: 'top' | 'bottom' }) {
    const portfolioData = useContent();
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const t = useTranslations('blog');
    const track = useRef<HTMLUListElement>(null);

    const blogs = portfolioData.blogs.slice(0, 6);

    useEffect(() => {
        const galleryImages = PRODUCT_SCREENS.map(({ src, alt }) => ({ src, alt }));
        // Shuffle images randomly
        const shuffledImages = [...galleryImages].sort(() => 0.5 - Math.random());
        setImages(shuffledImages);
        setLoading(false);
    }, []);

    // Scroll the row by one card; the browser handles snapping and touch.
    const scrollByCard = (dir: 1 | -1) => {
        const el = track.current;
        const card = el?.firstElementChild as HTMLElement | null;
        if (!el || !card) return;
        el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' });
    };

    if (loading || images.length === 0) return (
        <div className="h-[400px] w-full flex items-center justify-center bg-background">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    );

    return (
        <section className="relative z-20 bg-background overflow-visible flex flex-col items-center transition-colors duration-500">
            {/* Header for the Gallery Section */}
            {(showOnly === 'top' || !showOnly) && (
                <>
                    <div className="max-w-6xl mx-auto px-6 w-full pt-32 pb-16 text-center space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight"
                        >
                            Inside the products
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground/80 text-lg md:text-xl font-medium max-w-2xl mx-auto"
                        >
                            Screens from the systems we build: hospital call desks, shuttle tracking, store operations, and buying-house dashboards.
                        </motion.p>
                    </div>

                    {/* Immersive Zoom Parallax Component */}
                    <div className="w-full">
                        <ZoomParallax images={images}>
                            <Link 
                                href="/projects" 
                                className="group flex items-center gap-3 px-6 py-3.5 bg-foreground text-background rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl border border-border/10"
                            >
                                Explore solutions
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </ZoomParallax>
                    </div>
                </>
            )}

            {/* Latest insights */}
            {(showOnly === 'bottom' || !showOnly) && (
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 min-h-[100svh] py-24 flex flex-col justify-center gap-10">
                    <div className="flex items-end justify-between gap-6 border-b border-border/50 pb-6">
                        <div className="space-y-1.5">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Latest insights</h3>
                            <p className="text-sm text-muted-foreground">Practical guides for business owners</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/blog" className="mr-2 hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                                All insights
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                            <button
                                onClick={() => scrollByCard(-1)}
                                aria-label="Previous insights"
                                className="grid place-items-center size-10 rounded-full border border-border text-foreground transition-colors hover:border-emerald-500 hover:text-emerald-500 focus-visible:outline-2 focus-visible:outline-emerald-500"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollByCard(1)}
                                aria-label="Next insights"
                                className="grid place-items-center size-10 rounded-full border border-border text-foreground transition-colors hover:border-emerald-500 hover:text-emerald-500 focus-visible:outline-2 focus-visible:outline-emerald-500"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <ul
                        ref={track}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-pl-6 md:scroll-pl-0 pb-2 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {blogs.map((blog) => (
                            <li key={blog.id} className="snap-start shrink-0 basis-[82%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]">
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    className="group/card flex h-full flex-col gap-5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted">
                                        <Image
                                            src={blog.image}
                                            alt=""
                                            fill
                                            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3">
                                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                                            <span className="font-medium text-foreground/80">{t(`categories.${blog.category}`)}</span>
                                            <span aria-hidden className="text-border">/</span>
                                            <time dateTime={blog.date}>
                                                {new Date(blog.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}
                                            </time>
                                        </p>
                                        <h4 className="text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover/card:text-emerald-500">
                                            {blog.title}
                                        </h4>
                                        <p className="text-[15px] leading-relaxed text-muted-foreground line-clamp-2">
                                            {blog.excerpt}
                                        </p>
                                        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-foreground">
                                            {t('readMore')}
                                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center sm:hidden">
                        <Link href="/blog" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            All insights
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
}
