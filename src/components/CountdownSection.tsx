import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar as CalendarIcon, Download, CheckCircle2 } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';
import { ThemeConfig } from '../types';

interface CountdownSectionProps {
  theme: ThemeConfig;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ theme }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [copiedCal, setCopiedCal] = useState(false);

  useEffect(() => {
    const targetDate = new Date(COUPLE_DATA.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`Pernikahan ${COUPLE_DATA.groom.nickname} & ${COUPLE_DATA.bride.nickname}`);
    const details = encodeURIComponent(`Acara Akad & Resepsi Pernikahan ${COUPLE_DATA.groom.fullName} & ${COUPLE_DATA.bride.fullName}.\n\nLokasi Resepsi: ${COUPLE_DATA.receptionVenue}\nAlamat: ${COUPLE_DATA.receptionAddress}`);
    const location = encodeURIComponent(`${COUPLE_DATA.receptionVenue}, ${COUPLE_DATA.receptionAddress}`);
    // Start 20261024T010000Z (08:00 WIB), End 20261024T070000Z (14:00 WIB)
    const dates = '20261024T010000Z/20261024T070000Z';

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadICal = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Hammad Fulanah Wedding//ID',
      'BEGIN:VEVENT',
      'UID:wedding-hammad-fulanah-2026@wedding.id',
      'DTSTAMP:20260701T000000Z',
      'DTSTART:20261024T010000Z',
      'DTEND:20261024T070000Z',
      `SUMMARY:Pernikahan ${COUPLE_DATA.groom.nickname} & ${COUPLE_DATA.bride.nickname}`,
      `DESCRIPTION:Undangan Pernikahan ${COUPLE_DATA.groom.fullName} & ${COUPLE_DATA.bride.fullName}.`,
      `LOCATION:${COUPLE_DATA.receptionVenue}, ${COUPLE_DATA.receptionAddress}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding-hammad-fulanah.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCopiedCal(true);
    setTimeout(() => setCopiedCal(false), 3000);
  };

  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="absolute inset-0 bg-[#10231c]" />
      <div className="absolute inset-0 opacity-20 city-stripes" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border border-[#d4a45f]/30 bg-[#f4ead8] p-8 text-[#19251f] shadow-2xl md:p-12"
        >
          {/* Subtle gold ribbon top header */}
          <div className="inline-flex items-center gap-2 border border-[#7a4a28]/30 bg-[#7a4a28]/10 px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase mb-4 font-bold text-[#7a4a28]">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Menuju Hari Bahagia</span>
          </div>

          <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold mb-3">
            Hitung Mundur Pernikahan
          </h2>
          <p className="text-sm opacity-80 mb-8 max-w-lg mx-auto">
            Waktu terus berputar menuju momen terindah dalam hidup kami. Kami sangat menantikan kehadiran Anda.
          </p>

          {/* Countdown Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center justify-center border border-[#7a4a28]/25 bg-[#ead8b9]/70 p-5 shadow-md"
              >
                <span className="font-serif-luxury font-bold text-4xl sm:text-5xl text-amber-600 dark:text-amber-400">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-xs uppercase tracking-widest mt-1 opacity-75 font-semibold">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Calendar Save Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGoogleCalendar}
              className={`w-full sm:w-auto py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all ${theme.btnPrimary}`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Simpan ke Google Calendar</span>
            </button>

            <button
              onClick={handleDownloadICal}
              className="w-full sm:w-auto py-3.5 px-6 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center gap-2 font-bold text-sm transition-all"
            >
              {copiedCal ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>File iCal Diunduh!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-500" />
                  <span>Unduh iCal (.ics)</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
