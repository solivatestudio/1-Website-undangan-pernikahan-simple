import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Copy,
  Heart,
  MessageSquareHeart,
  Search,
  Send,
  Ticket,
  UserCheck,
} from 'lucide-react';
import { INITIAL_WISHES } from '../data/weddingData';
import { RSVPWish, ThemeConfig } from '../types';

interface RSVPSectionProps {
  theme: ThemeConfig;
}

type AttendanceFilter = 'all' | 'hadir' | 'ragu' | 'tidak';

const STORAGE_KEY = 'wedding_rsvps_hammad';
const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined;

const wishTemplates = {
  religi:
    "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khair. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
  hangat:
    'Selamat menempuh hidup baru. Semoga setiap langkah kalian dipenuhi kasih, rezeki, dan kebahagiaan yang tenang.',
  formal:
    'Selamat atas pernikahan Hammad & Fulanah. Semoga acara berjalan lancar dan rumah tangga senantiasa diberkahi.',
};

function loadSavedWishes() {
  if (typeof window === 'undefined') return INITIAL_WISHES;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_WISHES;

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : INITIAL_WISHES;
  } catch (error) {
    console.warn('Unable to load RSVP data', error);
    return INITIAL_WISHES;
  }
}

function saveWishes(wishes: RSVPWish[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  } catch (error) {
    console.warn('Unable to save RSVP data', error);
  }
}

function makeTicketCode() {
  const randomPart =
    typeof crypto !== 'undefined' && 'getRandomValues' in crypto
      ? crypto.getRandomValues(new Uint16Array(1))[0] % 9000
      : Math.floor(Math.random() * 9000);

  return `JKT-2026-${String(1000 + randomPart).padStart(4, '0')}`;
}

function toAttendance(value: string): RSVPWish['attendance'] {
  if (value === 'hadir' || value === 'ragu' || value === 'tidak') return value;
  return 'hadir';
}

function formatCreatedAt(value?: string) {
  if (!value) return 'Baru saja';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function normalizeRemoteWish(item: Record<string, unknown>, index: number): RSVPWish {
  const normalizedItem = Object.fromEntries(
    Object.entries(item).map(([key, value]) => [key.trim(), value])
  );
  const attendance = toAttendance(String(normalizedItem.attendance || 'hadir'));
  const guestCount = Number(normalizedItem.guestCount || 0);

  return {
    id: String(normalizedItem.id || normalizedItem.ticketCode || `sheet-${index}`),
    name: String(normalizedItem.name || 'Tamu'),
    relation: String(normalizedItem.relation || 'Tamu Undangan'),
    attendance,
    guestCount: attendance === 'hadir' ? Math.max(1, guestCount || 1) : 0,
    wish: String(normalizedItem.wish || 'Selamat menempuh hidup baru.'),
    createdAt: formatCreatedAt(String(normalizedItem.submittedAt || '')),
    likes: Number(item.likes || 0),
    vipTicketCode: normalizedItem.ticketCode ? String(normalizedItem.ticketCode) : undefined,
  };
}

async function loadSpreadsheetWishes() {
  if (!RSVP_ENDPOINT) return null;

  const response = await fetch(`${RSVP_ENDPOINT}?action=list`, {
    method: 'GET',
    cache: 'no-store',
  });
  const data = await response.json();
  const items = Array.isArray(data) ? data : data.items;

  if (!Array.isArray(items)) return null;
  return items.map((item, index) => normalizeRemoteWish(item, index)).reverse();
}

async function submitToSpreadsheet(wish: RSVPWish) {
  if (!RSVP_ENDPOINT) return;

  const payload = new URLSearchParams({
    submittedAt: new Date().toISOString(),
    name: wish.name,
    relation: wish.relation,
    attendance: wish.attendance,
    guestCount: String(wish.guestCount),
    wish: wish.wish,
    ticketCode: wish.vipTicketCode || '',
  });

  await fetch(RSVP_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: payload,
  });
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ theme }) => {
  const [wishes, setWishes] = useState<RSVPWish[]>(loadSavedWishes);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Sahabat / Teman Dekat');
  const [attendance, setAttendance] = useState<RSVPWish['attendance']>('hadir');
  const [guestCount, setGuestCount] = useState(2);
  const [wishText, setWishText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<AttendanceFilter>('all');
  const [latestTicket, setLatestTicket] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoadingSheet, setIsLoadingSheet] = useState(Boolean(RSVP_ENDPOINT));

  useEffect(() => {
    let isMounted = true;

    loadSpreadsheetWishes()
      .then(remoteWishes => {
        if (!isMounted || !remoteWishes || remoteWishes.length === 0) return;
        setWishes(remoteWishes);
        saveWishes(remoteWishes);
      })
      .catch(error => {
        console.warn('Unable to load spreadsheet RSVP data', error);
      })
      .finally(() => {
        if (isMounted) setIsLoadingSheet(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredWishes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return wishes.filter(wish => {
      const matchesFilter = filterType === 'all' || wish.attendance === filterType;
      const matchesSearch =
        !query ||
        wish.name.toLowerCase().includes(query) ||
        wish.wish.toLowerCase().includes(query) ||
        wish.relation.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [filterType, searchQuery, wishes]);

  const updateWishes = (nextWishes: RSVPWish[]) => {
    setWishes(nextWishes);
    saveWishes(nextWishes);
  };

  const handleSubmitRSVP = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitNotice(null);
    const ticketCode = attendance === 'hadir' ? makeTicketCode() : undefined;
    const nextWish: RSVPWish = {
      id: `wish-${Date.now()}`,
      name: trimmedName,
      relation,
      attendance,
      guestCount: attendance === 'hadir' ? guestCount : 0,
      wish: wishText.trim() || 'Selamat menempuh hidup baru. Semoga bahagia selalu.',
      createdAt: 'Baru saja',
      likes: 1,
      vipTicketCode: ticketCode,
    };

    try {
      await submitToSpreadsheet(nextWish);
      updateWishes([nextWish, ...wishes]);
      setName('');
      setWishText('');
      setLatestTicket(ticketCode || null);
      setCopiedTicket(false);
      setSubmitNotice('Terima kasih, konfirmasi Anda sudah tercatat.');

      try {
        confetti({
          particleCount: attendance === 'hadir' ? 80 : 36,
          spread: 58,
          origin: { y: 0.72 },
        });
      } catch (error) {
        console.warn('Confetti unavailable', error);
      }
    } catch (error) {
      console.warn('Unable to submit RSVP', error);
      setSubmitError('Konfirmasi belum terkirim. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeWish = (id: string) => {
    updateWishes(wishes.map(wish => (wish.id === id ? { ...wish, likes: wish.likes + 1 } : wish)));
  };

  const handleCopyTicket = async () => {
    if (!latestTicket) return;

    try {
      await navigator.clipboard.writeText(latestTicket);
      setCopiedTicket(true);
      window.setTimeout(() => setCopiedTicket(false), 2200);
    } catch (error) {
      console.warn('Clipboard unavailable', error);
    }
  };

  return (
    <section id="rsvp" className="render-contained relative overflow-hidden bg-[#f1e7d7] px-4 py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 city-stripes opacity-35" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <span className="display-heritage text-xs font-bold text-[#8a6338]">
              Konfirmasi Kehadiran
            </span>
            <h2 className="mt-2 max-w-xl font-serif-luxury text-3xl sm:text-4xl font-bold leading-tight text-[#202927] md:text-5xl lg:text-6xl">
              RSVP & Buku Tamu
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[#66706c] md:justify-self-end">
            Mohon bantu kami menyiapkan acara dengan mengisi konfirmasi kehadiran dan doa terbaik Anda.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <form onSubmit={handleSubmitRSVP} className="city-frame bg-[#fbf7ef]/95 p-4 sm:p-6 md:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-[#275448] text-[#fbf7ef]">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#202927]">Form RSVP</h3>
                <p className="text-xs text-[#66706c]">Butuh waktu kurang dari satu menit.</p>
              </div>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="display-heritage mb-1.5 block text-[10px] font-bold text-[#66706c]">
                  Nama Lengkap
                </span>
                <input
                  required
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full border border-[#48514d]/20 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-[#275448] focus:ring-2 focus:ring-[#275448]/15"
                />
              </label>

              <label className="block">
                <span className="display-heritage mb-1.5 block text-[10px] font-bold text-[#66706c]">
                  Hubungan
                </span>
                <select
                  value={relation}
                  onChange={event => setRelation(event.target.value)}
                  className="w-full border border-[#48514d]/20 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-[#275448] focus:ring-2 focus:ring-[#275448]/15"
                >
                  <option value="Sahabat / Teman Dekat">Sahabat / Teman Dekat</option>
                  <option value="Kerabat Keluarga">Kerabat Keluarga</option>
                  <option value="Rekan Kerja">Rekan Kerja</option>
                  <option value="Tetangga / Komunitas">Tetangga / Komunitas</option>
                </select>
              </label>

              <div>
                <span className="display-heritage mb-2 block text-[10px] font-bold text-[#66706c]">
                  Kehadiran
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hadir', label: 'Hadir' },
                    { id: 'ragu', label: 'Ragu' },
                    { id: 'tidak', label: 'Tidak' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAttendance(item.id as RSVPWish['attendance'])}
                      className={`border px-3 py-3 text-sm font-bold transition ${
                        attendance === item.id
                          ? 'border-[#275448] bg-[#275448] text-[#fbf7ef]'
                          : 'border-[#48514d]/20 bg-white/50 text-[#202927] hover:border-[#275448]/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {attendance === 'hadir' && (
                <div>
                  <span className="display-heritage mb-2 block text-[10px] font-bold text-[#66706c]">
                    Jumlah Tamu
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map(count => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setGuestCount(count)}
                        className={`border py-2.5 text-sm font-bold transition ${
                          guestCount === count
                            ? 'border-[#b86b4f] bg-[#b86b4f] text-white'
                            : 'border-[#48514d]/20 bg-white/50 hover:border-[#b86b4f]/50'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                  <span className="display-heritage text-[10px] font-bold text-[#66706c]">
                    Ucapan & Doa
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {Object.entries(wishTemplates).map(([key, value]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setWishText(value)}
                        className="border border-[#8a6338]/25 bg-[#8a6338]/10 px-2.5 py-1 text-[11px] font-bold capitalize text-[#8a6338] hover:bg-[#8a6338]/15"
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  required
                  rows={4}
                  value={wishText}
                  onChange={event => setWishText(event.target.value)}
                  placeholder="Tuliskan doa serta harapan terbaik..."
                  className="w-full resize-none border border-[#48514d]/20 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-[#275448] focus:ring-2 focus:ring-[#275448]/15"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex w-full items-center justify-center gap-2 px-6 py-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-70 ${theme.btnPrimary}`}
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Mengirim...' : 'Kirim RSVP'}
              </button>
            </div>

            {(submitNotice || submitError) && (
              <div
                className={`mt-5 border p-4 text-sm font-semibold ${
                  submitError
                    ? 'border-rose-400/40 bg-rose-50 text-rose-800'
                    : 'border-[#275448]/20 bg-[#275448]/10 text-[#275448]'
                }`}
              >
                {submitError || submitNotice}
              </div>
            )}

            {latestTicket && (
              <div className="mt-5 border border-[#275448]/20 bg-[#275448]/10 p-4">
                <div className="flex items-start gap-3">
                  <Ticket className="mt-1 h-5 w-5 text-[#275448]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#202927]">E-ticket berhasil dibuat</p>
                    <p className="mt-1 font-mono text-sm text-[#275448]">{latestTicket}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyTicket}
                    className="flex shrink-0 items-center gap-1 border border-[#275448]/20 px-2.5 py-1.5 text-xs font-bold text-[#275448]"
                  >
                    {copiedTicket ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedTicket ? 'Tersalin' : 'Salin'}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="metro-panel city-frame p-4 sm:p-6 md:p-8">
            <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <MessageSquareHeart className="h-6 w-6 text-[#d7aa67]" />
                <div>
                  <h3 className="font-serif-luxury text-2xl font-bold">Buku Tamu</h3>
                  {isLoadingSheet && (
                    <p className="text-xs text-[#d8cab7]/70">Memuat pesan terbaru...</p>
                  )}
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d8cab7]/70" />
                <input
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                  placeholder="Cari ucapan..."
                  className="w-full border border-white/10 bg-white/10 py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#d8cab7]/70 focus:border-[#d7aa67]/60 sm:w-56"
                />
              </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'hadir', label: 'Hadir' },
                { id: 'ragu', label: 'Ragu' },
                { id: 'tidak', label: 'Tidak' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilterType(item.id as AttendanceFilter)}
                  className={`border px-3 py-1.5 text-xs font-bold transition ${
                    filterType === item.id
                      ? 'border-[#d7aa67] bg-[#d7aa67] text-[#202927]'
                      : 'border-white/10 bg-white/5 text-[#fbf7ef] hover:border-[#d7aa67]/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
              {filteredWishes.length === 0 ? (
                <div className="border border-white/10 bg-white/5 p-8 text-center text-sm text-[#d8cab7]">
                  Belum ada ucapan yang cocok.
                </div>
              ) : (
                filteredWishes.map(wish => (
                  <article key={wish.id} className="border border-white/10 bg-white/7 p-4 text-left">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-white">{wish.name}</h4>
                        <p className="mt-0.5 text-xs text-[#d8cab7]/70">
                          {wish.relation} · {wish.createdAt}
                        </p>
                      </div>
                      <span className="shrink-0 border border-[#d7aa67]/25 bg-[#d7aa67]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#d7aa67]">
                        {wish.attendance === 'hadir'
                          ? `${wish.guestCount} tamu`
                          : wish.attendance === 'ragu'
                            ? 'ragu'
                            : 'tidak'}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#fbf7ef]/90">"{wish.wish}"</p>
                    <button
                      type="button"
                      onClick={() => handleLikeWish(wish.id)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#e79a8d]"
                    >
                      <Heart className="h-3.5 w-3.5 fill-[#e79a8d]" />
                      {wish.likes}
                    </button>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
