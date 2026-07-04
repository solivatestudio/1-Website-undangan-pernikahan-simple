import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Palette, Home, Heart, Calendar, Image as ImageIcon, Send, Gift, Clock } from 'lucide-react';
import { THEMES } from '../data/weddingData';
import { ThemeConfig, ThemeId } from '../types';
import { weddingAudio } from '../utils/audioSynth';

interface FloatingControlsProps {
  currentTheme: ThemeConfig;
  onSelectTheme: (id: ThemeId) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  currentTheme,
  onSelectTheme,
  isAudioPlaying,
  onToggleAudio
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const navItems = [
    { href: '#', label: 'Home', icon: Home },
    { href: '#mempelai', label: 'Mempelai', icon: Heart },
    { href: '#acara', label: 'Acara', icon: Calendar },
    { href: '#kisah', label: 'Kisah', icon: Clock },
    { href: '#galeri', label: 'Galeri', icon: ImageIcon },
    { href: '#rsvp', label: 'RSVP', icon: Send },
    { href: '#angpao', label: 'Angpao', icon: Gift }
  ];

  return (
    <>
      {/* Top/Side Theme & Music Buttons */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {/* Audio Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleAudio}
          className={`flex items-center justify-center border p-3 shadow-xl transition-all ${
            isAudioPlaying
              ? 'bg-amber-600 text-white border-amber-400 animate-pulse'
              : `${currentTheme.bgCard} ${currentTheme.borderClass}`
          }`}
          title={isAudioPlaying ? 'Matikan Musik Romantis' : 'Putar Musik Romantis'}
        >
          {isAudioPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5 opacity-60" />
          )}
        </motion.button>

        {/* Theme Switch Button */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className={`flex items-center gap-2 border px-3.5 py-2.5 text-xs font-bold shadow-xl ${currentTheme.bgCard} ${currentTheme.borderClass}`}
          >
            <Palette className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">{currentTheme.badge}</span>
          </motion.button>

          <AnimatePresence>
            {showThemeMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={`absolute right-0 mt-2 w-56 space-y-1 border p-2 ${currentTheme.borderClass} ${currentTheme.bgCard} shadow-2xl`}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold opacity-60 border-b border-stone-200/40">
                  Pilih Nuansa Tema
                </div>
                {Object.values(THEMES).map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTheme(t.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-left text-xs font-medium flex items-center justify-between transition-colors ${
                      currentTheme.id === t.id
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold'
                        : 'hover:bg-stone-500/10'
                    }`}
                  >
                    <span>{t.name}</span>
                    <span className="text-sm">{t.badge.split(' ')[0]}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Floating Navigation Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-2">
        <div className={`flex items-center gap-1 border ${currentTheme.borderClass} ${currentTheme.bgCard} px-3 py-2 shadow-2xl backdrop-blur-xl sm:gap-2`}>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-all hover:bg-[#1f4b3a]/15 hover:text-[#1f4b3a]"
              >
                <Icon className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
