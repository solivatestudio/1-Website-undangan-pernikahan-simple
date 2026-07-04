import React from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { LOVE_TIMELINE } from '../data/weddingData';
import { ThemeConfig } from '../types';

interface LoveStorySectionProps {
  theme: ThemeConfig;
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ theme }) => {
  return (
    <section id="kisah" className="relative overflow-hidden px-4 py-16 sm:py-20 md:py-24">
      <div className="absolute left-0 top-0 h-full w-1/3 bg-[#1f4b3a]/10 hidden sm:block" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="display-heritage text-xs font-bold text-[#7a4a28]">
            Perjalanan Cinta
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            Timeline Kisah Cinta Kami
          </h2>
          <p className="text-sm opacity-75 mt-2 max-w-lg mx-auto">
            Setiap cerita memiliki permulaan. Berikut adalah jejak langkah takdir yang membawa kami menuju pelaminan.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7a4a28]/10 via-[#1f4b3a]/60 to-[#b95838]/10 -translate-x-1/2" />

          <div className="space-y-12">
            {LOVE_TIMELINE.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} relative group`}
                >
                  {/* Center Dot Icon */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 z-10 border-2 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">
                    <Heart className="w-4 h-4 fill-white" />
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                    <div className={`city-frame overflow-hidden bg-[#f8efdf]/90 p-4 sm:p-6 transition-colors group-hover:border-[#275448]/50 md:p-8`}>
                      <div className={`flex items-center gap-1.5 sm:gap-2 mb-2 text-[10px] sm:text-xs font-semibold text-amber-600 dark:text-amber-400 flex-wrap ${isEven ? 'md:justify-end' : ''}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{step.dateStr}</span>
                        <span className="opacity-40">•</span>
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{step.location}</span>
                      </div>

                      <span className="mb-2 inline-block bg-[#1f4b3a] px-3 py-0.5 font-serif-luxury text-lg font-bold text-[#fff7e8]">
                        {step.year}
                      </span>

                      <h3 className="font-serif-luxury font-bold text-xl sm:text-2xl mb-2">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                        {step.description}
                      </p>

                      {step.image && (
                        <div className="mt-4 rounded-lg overflow-hidden border border-amber-500/20 shadow-md aspect-video">
                          <img
                            src={step.image}
                            alt={step.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
