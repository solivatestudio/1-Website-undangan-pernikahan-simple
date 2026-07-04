import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Copy, CheckCircle2, Wallet, Home, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BANK_ACCOUNTS, COUPLE_DATA } from '../data/weddingData';
import { ThemeConfig } from '../types';

interface GiftSectionProps {
  theme: ThemeConfig;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ theme }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <section id="angpao" className={`py-20 px-4 ${theme.bgSecondary}`}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="display-heritage text-xs font-bold text-[#7a4a28]">
            Tanda Kasih
          </span>
          <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold mt-2">
            Angpao & Kado Digital
          </h2>
          <p className="text-sm opacity-75 mt-2 max-w-lg mx-auto">
            Doa restu Anda adalah anugerah terindah bagi kami. Namun bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih secara cashless atau mengirimkan kado fisik, dapat melalui fasilitas berikut:
          </p>
        </motion.div>

        {/* Bank & E-Wallet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BANK_ACCOUNTS.map(account => (
            <motion.div
              whileHover={{ y: -6 }}
              key={account.id}
              className={`city-frame p-6 bg-[#f8efdf]/90 text-left relative overflow-hidden flex flex-col justify-between`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${account.color}`}>
                    {account.bankName}
                  </span>
                  <Wallet className="w-5 h-5 text-amber-500 opacity-60" />
                </div>

                <p className="font-mono text-2xl font-bold tracking-wider my-3 text-amber-600 dark:text-amber-400">
                  {account.accountNumber}
                </p>

                <p className="text-xs opacity-75">
                  a.n. <span className="font-semibold">{account.accountHolder}</span>
                </p>
              </div>

              <button
                onClick={() => handleCopy(account.id, account.accountNumber)}
                className="mt-6 w-full py-2.5 px-4 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                {copiedId === account.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Nomor Rekening Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-500" />
                    <span>Salin Rekening</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Physical Gift Address Box */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`city-frame metro-panel p-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-left`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury font-bold text-xl">Alamat Kirim Kado Fisik</h4>
              <p className="text-xs opacity-80 mt-1 leading-relaxed">
                Kediaman Mempelai Pria: Jl. Senopati Dalam II No. 18, Kebayoran Baru, Jakarta Selatan 12190 (Penerima: Hammad / 081234567890)
              </p>
            </div>
          </div>

          <button
            onClick={() => handleCopy('address', 'Jl. Senopati Dalam II No. 18, Kebayoran Baru, Jakarta Selatan 12190 (Penerima: Hammad / 081234567890)')}
            className="shrink-0 px-5 py-3 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            {copiedId === 'address' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-500" />
                <span>Salin Alamat</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
