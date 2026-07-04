import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import { ThemeConfig } from '../types';

interface CoupleSectionProps {
  theme: ThemeConfig;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ theme }) => {
  return (
    <section id="mempelai" className={`relative overflow-hidden px-4 py-16 sm:py-20 md:py-24 ${theme.bgSecondary}`}>
      <div className="absolute inset-y-10 left-0 w-10 bg-[#1f4b3a]/10 hidden sm:block" />
      <div className="absolute inset-y-20 right-0 w-10 bg-[#b95838]/10 hidden sm:block" />
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="display-heritage text-xs font-bold text-[#7a4a28]">
            Mempelai Berbahagia
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            Putra & Putri Pengantin
          </h2>
          <p className="text-sm opacity-75 mt-2 max-w-xl mx-auto">
            Atas ridho dan kasih sayang Allah SWT, kami bermaksud menyelenggarakan resepsi pernikahan putra dan putri kami:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-center justify-center">
          {/* Groom Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`city-frame lg:col-span-5 bg-[#f8efdf]/85 p-5 sm:p-6 md:p-8 relative group flex flex-col items-center text-center`}
          >
            <div className="relative w-36 h-48 sm:w-48 sm:h-60 md:w-56 md:h-72 rounded-t-full overflow-hidden border-4 border-amber-500/30 shadow-lg mb-4 sm:mb-6 group-hover:scale-[1.03] transition-transform duration-500">
              <img
                src={COUPLE_DATA.groom.photo}
                alt={COUPLE_DATA.groom.fullName}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1f4b3a] mb-1 font-semibold">
              {COUPLE_DATA.groom.nickname}
            </h3>
            <h4 className="font-serif-luxury font-bold text-lg sm:text-xl md:text-2xl mb-3">
              {COUPLE_DATA.groom.fullName}
            </h4>

            <p className="text-xs opacity-80 mb-4 max-w-xs leading-relaxed italic">
              "{COUPLE_DATA.groom.bio}"
            </p>

            <div className="my-3 py-3 border-t border-b border-stone-200 dark:border-stone-800 w-full">
              <p className="text-xs uppercase tracking-widest opacity-60">Putra Tercinta Dari:</p>
              <p className="font-medium text-sm mt-1">{COUPLE_DATA.groom.father}</p>
              <p className="text-xs opacity-75">& {COUPLE_DATA.groom.mother}</p>
            </div>

            <a
              href={`https://instagram.com/${COUPLE_DATA.groom.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 border border-[#7a4a28]/30 bg-[#7a4a28]/10 px-4 py-2 text-xs font-bold transition-colors hover:bg-[#7a4a28]/20"
            >
              <Instagram className="w-4 h-4 text-rose-500" />
              <span>@{COUPLE_DATA.groom.instagram}</span>
            </a>
          </motion.div>

          {/* Center Ampersand / Heart Divider */}
          <div className="lg:col-span-1 flex justify-center py-4">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/20"
            >
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            </motion.div>
          </div>

          {/* Bride Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`city-frame lg:col-span-5 bg-[#275448] p-5 sm:p-6 md:p-8 relative group flex flex-col items-center text-center text-[#fff7e8]`}
          >
            <div className="relative w-36 h-48 sm:w-48 sm:h-60 md:w-56 md:h-72 rounded-t-full overflow-hidden border-4 border-amber-500/30 shadow-lg mb-4 sm:mb-6 group-hover:scale-[1.03] transition-transform duration-500">
              <img
                src={COUPLE_DATA.bride.photo}
                alt={COUPLE_DATA.bride.fullName}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#e0b66f] mb-1 font-semibold">
              {COUPLE_DATA.bride.nickname}
            </h3>
            <h4 className="font-serif-luxury font-bold text-lg sm:text-xl md:text-2xl mb-3">
              {COUPLE_DATA.bride.fullName}
            </h4>

            <p className="text-xs opacity-80 mb-4 max-w-xs leading-relaxed italic">
              "{COUPLE_DATA.bride.bio}"
            </p>

            <div className="my-3 py-3 border-t border-b border-stone-200 dark:border-stone-800 w-full">
              <p className="text-xs uppercase tracking-widest opacity-60">Putri Tercinta Dari:</p>
              <p className="font-medium text-sm mt-1">{COUPLE_DATA.bride.father}</p>
              <p className="text-xs opacity-75">& {COUPLE_DATA.bride.mother}</p>
            </div>

            <a
              href={`https://instagram.com/${COUPLE_DATA.bride.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 border border-[#e0b66f]/30 bg-[#e0b66f]/10 px-4 py-2 text-xs font-bold transition-colors hover:bg-[#e0b66f]/20"
            >
              <Instagram className="w-4 h-4 text-rose-500" />
              <span>@{COUPLE_DATA.bride.instagram}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
