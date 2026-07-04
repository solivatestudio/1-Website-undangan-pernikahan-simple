import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Heart, MapPin } from 'lucide-react';
import { COUPLE_DATA, INITIAL_PHOTOS } from '../data/weddingData';
import { ThemeConfig } from '../types';

interface HeroSectionProps {
  theme: ThemeConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme }) => {
  const heroPhoto = INITIAL_PHOTOS[0]?.url;

  return (
    <section id="hero" className="relative min-h-[96vh] overflow-hidden bg-[#151817] px-4 py-16 text-[#fff8ee]">
      <img
        src={heroPhoto}
        alt={`${COUPLE_DATA.groom.nickname} dan ${COUPLE_DATA.bride.nickname}`}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,245,225,0.20),transparent_34rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#151817] to-transparent" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Heart className="animate-love-drift absolute left-[12%] top-[20%] h-5 w-5 fill-[#f3c1b4] text-[#f3c1b4]" />
        <Heart className="animate-love-drift absolute right-[16%] top-[30%] h-4 w-4 fill-[#f8dfc5] text-[#f8dfc5]" style={{ animationDelay: '1.7s' }} />
        <Heart className="animate-love-drift absolute bottom-[24%] left-[20%] h-4 w-4 fill-[#d8a184] text-[#d8a184]" style={{ animationDelay: '3s' }} />
        <div className="animate-soft-glow absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 mx-auto flex min-h-[82vh] max-w-5xl flex-col items-center justify-center text-center"
      >
        <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.32em] text-[#f8dfc5] backdrop-blur-md">
          <Heart className="h-3.5 w-3.5 fill-[#f3c1b4] text-[#f3c1b4]" />
          <span>The Wedding of</span>
        </div>

        <h3 className="mt-8 font-serif-luxury text-sm uppercase tracking-[0.38em] text-[#f8dfc5]/90">
          Bismillahirrahmannirrahim
        </h3>

        <h1 className="font-wedding-names mt-5 text-[5.8rem] font-normal leading-[0.82] text-[#fff8ee] drop-shadow-2xl sm:text-[8rem] md:text-[11rem]">
          {COUPLE_DATA.groom.nickname}
          <span className="mx-auto my-1 block font-serif-luxury text-3xl italic leading-none text-[#f3c1b4] sm:text-5xl md:text-6xl">
            &
          </span>
          {COUPLE_DATA.bride.nickname}
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#fff8ee]/86 md:text-lg">
          Dengan penuh syukur dan bahagia, kami mengundang Anda untuk hadir dan menjadi bagian dari hari istimewa kami.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="flex min-w-64 items-center justify-center gap-3 border border-white/25 bg-white/12 px-5 py-3 text-sm font-bold backdrop-blur-md">
            <Calendar className="h-4 w-4 text-[#f3c1b4]" />
            <span>{COUPLE_DATA.weddingDateDisplay}</span>
          </div>
          <div className="flex min-w-64 items-center justify-center gap-3 border border-white/25 bg-white/12 px-5 py-3 text-sm font-bold backdrop-blur-md">
            <MapPin className="h-4 w-4 text-[#f3c1b4]" />
            <span>Jakarta, Indonesia</span>
          </div>
        </div>

        <a
          href="#acara"
          className="mt-10 inline-flex items-center justify-center border border-[#f8dfc5]/50 bg-[#f8dfc5] px-7 py-3 text-sm font-extrabold text-[#202927] shadow-2xl shadow-black/25 transition hover:-translate-y-0.5 hover:bg-white"
        >
          Lihat Detail Acara
        </a>
      </motion.div>
    </section>
  );
};
