/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { THEMES, COUPLE_DATA } from './data/weddingData';
import { ThemeId } from './types';
import { weddingAudio } from './utils/audioSynth';
import { EnvelopeCover } from './components/EnvelopeCover';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { EventSection } from './components/EventSection';
import { LoveStorySection } from './components/LoveStorySection';
import { GallerySection } from './components/GallerySection';
import { RSVPSection } from './components/RSVPSection';
import { GiftSection } from './components/GiftSection';
import { FloatingControls } from './components/FloatingControls';
import { Heart } from 'lucide-react';

export default function App() {
  const [isCoverOpened, setIsCoverOpened] = useState(() =>
    typeof window !== 'undefined' ? Boolean(window.location.hash) : false
  );
  const [themeId, setThemeId] = useState<ThemeId>('champagne');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Kehormatan');

  const currentTheme = THEMES[themeId] || THEMES.champagne;

  useEffect(() => {
    // Parse guest name from URL parameter ?to=Nama+Tamu
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('guest');
    if (toParam) {
      setGuestName(toParam);
    }

    if (window.location.hash) {
      const scrollToHash = () => {
        document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' });
      };
      window.setTimeout(scrollToHash, 0);
      window.setTimeout(scrollToHash, 450);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsCoverOpened(true);
    weddingAudio.start();
    setIsAudioPlaying(true);
  };

  const handleToggleAudio = () => {
    const playing = weddingAudio.toggle();
    setIsAudioPlaying(playing);
  };

  return (
    <div className={`paper-grain min-h-screen transition-colors duration-500 ${currentTheme.bgMain} ${currentTheme.textPrimary} relative pb-20 sm:pb-28`}>
      <AnimatePresence>
        {!isCoverOpened && (
          <EnvelopeCover
            guestName={guestName}
            theme={currentTheme}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* Floating Audio & Theme Controls + Navigation */}
      <FloatingControls
        currentTheme={currentTheme}
        onSelectTheme={setThemeId}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Sections */}
      <main className="overflow-x-hidden">
        <HeroSection theme={currentTheme} />
        <CoupleSection theme={currentTheme} />
        <CountdownSection theme={currentTheme} />
        <EventSection theme={currentTheme} />
        <LoveStorySection theme={currentTheme} />
        <GallerySection theme={currentTheme} />
        <RSVPSection theme={currentTheme} />
        <GiftSection theme={currentTheme} />
      </main>

      {/* Elegant Footer */}
      <footer className={`relative z-10 border-t ${currentTheme.borderClass} ${currentTheme.bgSecondary} px-4 py-10 sm:py-14 text-center`}>
        <div className="mx-auto max-w-xl space-y-3">
          <p className="display-heritage text-[10px] text-[#8a6338]">With Gratitude</p>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1f4b3a]">
            {COUPLE_DATA.groom.nickname} & {COUPLE_DATA.bride.nickname}
          </h3>
          <p className="font-serif-luxury italic text-sm opacity-80">
            "Atas kehadiran dan doa restunya, kami ucapkan terima kasih yang sebesar-besarnya."
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs opacity-60 pt-4">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Hammad & Fulanah • 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
