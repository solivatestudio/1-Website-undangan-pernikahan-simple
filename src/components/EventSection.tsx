import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, Navigation, Shirt, Sparkles } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import { ThemeConfig } from '../types';

interface EventSectionProps {
  theme: ThemeConfig;
}

export const EventSection: React.FC<EventSectionProps> = ({ theme }) => {
  return (
    <section id="acara" className={`py-20 px-4 ${theme.bgSecondary}`}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="display-heritage text-xs font-bold text-[#7a4a28]">
            Rangkaian Acara
          </span>
          <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold mt-2">
            Waktu & Tempat Pelaksanaan
          </h2>
          <p className="text-sm opacity-75 mt-2 max-w-xl mx-auto">
            Dengan memohon rahmat dan ridho Allah SWT, insyaAllah acara pernikahan kami akan diselenggarakan pada:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Akad Nikah Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`city-frame bg-[#f8efdf]/90 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group text-left`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="inline-flex items-center gap-2 border border-[#7a4a28]/25 bg-[#7a4a28]/10 px-4 py-1 text-[11px] font-bold text-[#7a4a28] uppercase tracking-widest mb-6">
                <span>🌸 Akad Nikah</span>
              </div>

              <h3 className="font-serif-luxury text-3xl font-bold mb-4">
                Prosesi Akad Suci
              </h3>

              <div className="space-y-4 text-left my-6 py-6 border-t border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-start gap-3.5">
                  <Calendar className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-60">Tanggal</p>
                    <p className="font-semibold text-sm mt-0.5">{COUPLE_DATA.weddingDateDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-60">Waktu</p>
                    <p className="font-semibold text-sm mt-0.5">{COUPLE_DATA.akadTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-60">Lokasi</p>
                    <p className="font-bold text-sm mt-0.5 text-amber-600 dark:text-amber-400">{COUPLE_DATA.akadVenue}</p>
                    <p className="text-xs opacity-75 mt-1 leading-relaxed">{COUPLE_DATA.akadAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={COUPLE_DATA.akadMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center gap-2 font-bold text-sm transition-all mt-4"
            >
              <Navigation className="w-4 h-4 text-amber-500" />
              <span>Buka Petunjuk Arah (Google Maps)</span>
            </a>
          </motion.div>

          {/* Resepsi Pernikahan Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`city-frame metro-panel p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group text-left`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="inline-flex items-center gap-2 border border-[#e0b66f]/30 bg-[#e0b66f]/10 px-4 py-1 text-[11px] font-bold text-[#e0b66f] uppercase tracking-widest mb-6">
                <span>✨ Resepsi Pernikahan</span>
              </div>

              <h3 className="font-serif-luxury text-3xl font-bold mb-4">
                Perayaan & Ramah Tamah
              </h3>

              <div className="space-y-4 text-left my-6 py-6 border-t border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-start gap-3.5">
                  <Calendar className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-60">Tanggal</p>
                    <p className="font-semibold text-sm mt-0.5">{COUPLE_DATA.weddingDateDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-60">Waktu</p>
                    <p className="font-semibold text-sm mt-0.5">{COUPLE_DATA.receptionTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-60">Lokasi</p>
                    <p className="font-bold text-sm mt-0.5 text-amber-600 dark:text-amber-400">{COUPLE_DATA.receptionVenue}</p>
                    <p className="text-xs opacity-75 mt-1 leading-relaxed">{COUPLE_DATA.receptionAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={COUPLE_DATA.receptionMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3.5 px-5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all mt-4 ${theme.btnPrimary}`}
            >
              <Navigation className="w-4 h-4" />
              <span>Buka Petunjuk Arah (Google Maps)</span>
            </a>
          </motion.div>
        </div>

        {/* Dress Code Recommendation Guide */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`city-frame city-stripes mt-12 p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Shirt className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-serif-luxury font-bold text-xl">Dress Code & Busana Tamu</h4>
              <p className="text-xs opacity-75 mt-0.5">Rekomendasi palet warna busana formal untuk kenyamanan dan keanggunan momen foto bersama.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#d5c2a5] border-2 border-white shadow-md" title="Champagne Cream" />
              <span className="text-[10px] opacity-70 mt-1">Champagne</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#71836c] border-2 border-white shadow-md" title="Sage Green" />
              <span className="text-[10px] opacity-70 mt-1">Sage Green</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#3d2f2b] border-2 border-white shadow-md" title="Deep Mocha" />
              <span className="text-[10px] opacity-70 mt-1">Mocha</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#e8ded1] border-2 border-white shadow-md" title="Soft Ivory" />
              <span className="text-[10px] opacity-70 mt-1">Ivory</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
