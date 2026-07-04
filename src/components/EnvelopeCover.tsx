import React from 'react';
import { motion } from 'motion/react';
import { Mail, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUPLE_DATA } from '../data/weddingData';
import { ThemeConfig } from '../types';

interface EnvelopeCoverProps {
  guestName: string;
  theme: ThemeConfig;
  onOpen: () => void;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({ guestName, theme, onOpen }) => {
  const handleOpenClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onOpen();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 ${theme.bgMain} ${theme.textPrimary} overflow-hidden`}>
      <div className="absolute inset-0 city-stripes opacity-70" />
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: theme.glowColor }} />
      <div className="absolute -bottom-24 right-0 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-30 pointer-events-none bg-[#b95838]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative grid w-full max-w-6xl overflow-hidden border ${theme.borderClass} bg-[#f7ead3] text-[#19251f] shadow-2xl md:grid-cols-[1.05fr_0.95fr]`}
      >
        <div className="relative min-h-[210px] overflow-hidden metro-panel p-6 md:min-h-[620px] md:p-12">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-8 top-8 h-32 w-32 border border-[#e0b66f]/50" />
            <div className="absolute bottom-10 right-10 h-44 w-44 rounded-full border border-[#e0b66f]/40" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-[#e0b66f]/25" />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="display-heritage text-xs text-[#d7aa67]">Jakarta Wedding</p>
              <h2 className="mt-5 max-w-lg font-serif-luxury text-4xl leading-[0.95] text-[#fff7e8] md:mt-10 md:text-7xl">
                You Are Invited
              </h2>
            </div>

            <div className="mt-8 md:mt-12">
              <p className="display-heritage text-[11px] text-[#d6c5a9]">Hammad & Fulanah</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#d8cab7]">
                Undangan digital bernuansa modern Jakarta untuk merayakan temu dua keluarga dalam doa, hangat, dan bahagia.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[420px] flex-col justify-between p-6 text-center md:min-h-[520px] md:p-12">
          <div className="absolute inset-4 border border-[#7a4a28]/20" />
          <div className="relative z-10">
            <p className="display-heritage text-[11px] text-[#8a6338]">Wedding Invitation</p>
            <h1 className="mt-5 font-serif-luxury text-4xl font-semibold leading-tight text-[#1f4b3a] md:mt-8 md:text-7xl">
              {COUPLE_DATA.groom.nickname}
              <span className="block text-2xl italic text-[#b95838] md:text-5xl">&</span>
              {COUPLE_DATA.bride.nickname}
            </h1>
            <p className="mt-5 font-serif-luxury text-xl italic text-[#6b3f22]">
              {COUPLE_DATA.weddingDateDisplay}
            </p>
          </div>

          <div className="relative z-10 my-5 border-y border-[#7a4a28]/25 py-4 md:my-8 md:py-6">
            <p className="display-heritage text-[10px] text-[#627064]">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <h2 className="mt-2 font-serif-luxury text-2xl font-bold text-[#b95838] md:text-3xl">
              {guestName || 'Tamu Kehormatan'}
            </h2>
            <p className="mt-1 text-xs italic text-[#75675f]">
              Mohon maaf apabila ada kesalahan penulisan nama/gelar
            </p>
          </div>

          <div className="relative z-10">
            <p className="mx-auto mb-5 max-w-sm text-sm leading-relaxed text-[#4f5c52] md:mb-7">
              Dengan hormat, kami mengundang Anda untuk hadir dan mengiringi hari bahagia kami dengan doa restu.
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenClick}
              className={`w-full py-4 px-6 rounded-none flex items-center justify-center gap-3 font-bold tracking-wide transition-all ${theme.btnPrimary} group`}
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Buka Galeri Undangan</span>
              <Sparkles className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
