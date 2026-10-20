import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Twitter, Youtube, Linkedin, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProfileCardProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  className?: string;
  onClose?: () => void;
}

export function ProfileCard(props: ProfileCardProps) {
  const {
    name = "Auravine",
    title = "AI-first software studio",
    description = "AI-first software development from Dhaka, Bangladesh.",
    imageUrl = "/grid.svg",
    twitterUrl = "#",
    youtubeUrl = "#",
    className,
    onClose
  } = props;

  const socialIcons = [
    { icon: Github, label: "GitHub" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Mail, label: "Email" },
  ];

  return (
    <div className={cn("w-full max-w-7xl mx-auto px-4 relative", className)}>
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute -top-12 right-4 md:-top-4 md:-right-4 z-50 p-2 bg-white dark:bg-zinc-900 rounded-full shadow-xl border border-border hover:scale-110 transition-transform"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Desktop */}
      <div className='hidden md:flex relative items-center'>
        {/* Square Image */}
        <div className='w-[480px] h-[480px] rounded-[2.5rem] overflow-hidden bg-gray-200 dark:bg-gray-800 flex-shrink-0 shadow-2xl relative z-0'>
          <Image
            src={imageUrl}
            alt={name}
            width={480}
            height={480}
            className='w-full h-full object-cover'
            draggable={false}
            priority
          />
        </div>
        {/* Overlapping Card - Rectangular & Centered */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className='bg-white dark:bg-[#161616] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 ml-[-100px] z-10 w-[600px] border border-black/5 dark:border-white/5 flex flex-col justify-center'
        >
          <div className='mb-6'>
            <h2 className='text-3xl font-bold text-black dark:text-white mb-1 tracking-tight'>
              {name}
            </h2>

            <p className='text-sm font-medium text-zinc-500 tracking-wide'>
              {title}
            </p>
          </div>

          <p className='text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-10'>
            {description}
          </p>

          <div className='flex space-x-4'>
            {socialIcons.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className='w-11 h-11 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg group'
                aria-label={label}
              >
                <Icon className='w-5 h-5 text-white dark:text-black group-hover:scale-110 transition-transform' />
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='md:hidden max-w-sm mx-auto text-center bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] shadow-2xl border border-white/5'
      >
        {/* Square Mobile Image */}
        <div className='w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden mb-6 flex items-center justify-center'>
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className='w-full h-full object-cover'
            draggable={false}
            priority
          />
        </div>

        <div className='px-4'>
          <h2 className='text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter'>
            {name}
          </h2>

          <p className='text-[10px] font-bold text-primary mb-4 uppercase tracking-widest'>
            {title}
          </p>

          <p className='text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6'>
            {description}
          </p>

          <div className='flex justify-center space-x-4'>
            {socialIcons.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className='w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110'
                aria-label={label}
              >
                <Icon className='w-5 h-5 text-white dark:text-black' />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
