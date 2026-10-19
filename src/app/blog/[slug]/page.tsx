'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { Copy, Linkedin, Github, BookOpen, ArrowLeft, Check } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const t = useTranslations('blog');
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    const post = portfolioData.blogs.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const linkedIn = portfolioData.personal.socialLinks.find((s) => s.platform === 'LinkedIn')?.url ?? '#';
    const github = portfolioData.personal.socialLinks.find((s) => s.platform === 'GitHub')?.url ?? '#';

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 2) {
            router.back();
        } else {
            router.push('/blog');
        }
    };

    // Article bodies are plain text: blank lines separate paragraphs and lines starting with "## " become headings.
    const blocks = post.content.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);

    return (
        <main className="min-h-screen bg-background pb-24 pt-32">
            {/* Header Section */}
            <div className="container max-w-7xl mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium hover:text-primary transition-colors">
                            <button onClick={handleBack} className="flex items-center gap-2 focus:outline-none">
                                <ArrowLeft className="w-4 h-4" />
                                <span>{t('back')}</span>
                            </button>
                        </div>
                    </div>

                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-foreground mb-6 leading-[1.1]">
                            {post.title}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
                            {post.excerpt}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Hero Image */}
            <div className="container max-w-7xl mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative w-full aspect-[21/9] md:aspect-[2/1] rounded-3xl overflow-hidden border border-border/40 shadow-2xl"
                >
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
            </div>

            {/* Metadata Bar */}
            <div className="container max-w-7xl mx-auto px-6 mb-16">
                <div className="flex flex-col md:flex-row items-center justify-between border-y border-border/40 py-6 gap-6">
                    <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-start">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Written by</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-foreground">{post.author.name}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Published on</span>
                            <span className="font-bold text-foreground">{post.date}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                        <button
                            onClick={handleCopy}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 transition-all text-xs font-bold uppercase tracking-wider rounded-lg",
                                copied
                                    ? "bg-primary text-background"
                                    : "bg-secondary/10 hover:bg-secondary/20 text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" /> <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" /> <span className="hidden sm:inline">Copy link</span>
                                </>
                            )}
                        </button>
                        <div className="w-px h-6 bg-border/40 hidden sm:block" />
                        <Link href={linkedIn} target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors bg-secondary/10 rounded-lg hover:bg-primary/10">
                            <Linkedin className="w-4 h-4" />
                        </Link>
                        <Link href={github} target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors bg-secondary/10 rounded-lg hover:bg-primary/10">
                            <Github className="w-4 h-4" />
                        </Link>
                        <Link href="/projects" className="p-2 text-muted-foreground hover:text-primary transition-colors bg-secondary/10 rounded-lg hover:bg-primary/10">
                            <BookOpen className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container max-w-4xl mx-auto px-6">
                <article className="prose prose-lg prose-invert prose-primary max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-loose prose-p:text-muted-foreground">
                    {blocks.map((block, i) =>
                        block.startsWith('## ') ? (
                            <h2 key={i} className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">
                                {block.replace(/^##\s+/, '')}
                            </h2>
                        ) : (
                            <p key={i} className="mb-8">
                                {block}
                            </p>
                        )
                    )}
                </article>

                <div className="mt-12 pt-12 border-t border-border/40">
                    <h3 className="text-lg font-bold mb-6">Related Topics</h3>
                    <div className="flex flex-wrap gap-3">
                        {post.tags.map(tag => (
                            <Link key={tag} href={`/blog?q=${tag}`} className="px-4 py-2 bg-secondary/10 hover:bg-primary/10 text-muted-foreground hover:text-primary border border-transparent hover:border-primary/20 rounded-lg text-sm font-medium transition-all">
                                #{tag}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Latest From Blog Section */}
            <div className="container max-w-7xl mx-auto px-6 mt-16 border-t border-border/40 pt-16">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-black tracking-tight">From the blog</h3>
                    <Link href="/blog" className="px-6 py-2 rounded-lg bg-secondary/10 border border-border/40 text-sm font-bold hover:bg-secondary/20 transition-all">
                        View all posts
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {portfolioData.blogs.filter(b => b.slug !== slug).slice(0, 2).map((b) => (
                        <div key={b.slug} className="group">
                            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-secondary/5 border border-border/40">
                                <Image src={b.image} alt={b.title} fill sizes="(max-width: 768px) 100vw, 300px" loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                                        {t(`categories.${b.category}`)}
                                    </span>
                                </div>
                            </div>
                            <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                                {b.title}
                            </h4>
                            <p className="text-muted-foreground line-clamp-2 mb-4">{b.excerpt}</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <div className="w-6 h-6 rounded-full bg-secondary/20 relative overflow-hidden">
                                    <Image src={b.author.avatar} alt={b.author.name} loading="lazy" fill sizes="32px" className="object-cover" />
                                </div>
                                {b.author.name} · {b.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
