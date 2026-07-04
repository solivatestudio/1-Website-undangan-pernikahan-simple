<div align="center">

# 💍 The Wedding of Hammad & Fulanah

### Undangan Pernikahan Digital — *Simple, Elegant & Fully Customizable*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-green?style=for-the-badge)](LICENSE)

---

> *"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."*
> — **QS. Ar-Rum: 21**

</div>

---

## ✨ Fitur Unggulan

| Fitur | Keterangan |
|---|---|
| 🎬 **Amplop Interaktif** | Cover amplop animasi yang dibuka oleh tamu sebelum masuk ke konten |
| 🎨 **4 Tema Visual** | Jakarta Ivory, City Garden, Sunset Clay, Skyline Indigo — bisa ganti real-time |
| ⏱️ **Countdown Timer** | Hitung mundur live menuju hari H |
| 💌 **RSVP + Ucapan** | Form konfirmasi kehadiran + dinding ucapan interaktif dengan fitur "like" |
| 🗺️ **Info Acara & Maps** | Detail akad & resepsi lengkap dengan tautan Google Maps |
| 🖼️ **Galeri Foto** | Galeri pre-wedding dengan filter kategori & lightbox |
| 📖 **Love Story Timeline** | Perjalanan cinta dari pertama bertemu hingga hari pernikahan |
| 🎵 **Musik Latar Sintetis** | Audio synthesizer bawaan — tanpa membutuhkan file audio eksternal |
| 💝 **Wedding Gift** | Info rekening bank & e-wallet dengan tombol salin cepat |
| 👤 **Nama Tamu Dinamis** | Personalisasi nama tamu via URL parameter `?to=Nama+Tamu` |
| 📱 **Responsif** | Tampilan optimal di mobile, tablet, dan desktop |

---

## 🖼️ Tampilan Tema

<table>
<tr>
<td align="center"><b>🪙 Jakarta Ivory</b><br/><sub>Krem elegan, nuansa vintage warm</sub></td>
<td align="center"><b>🌿 City Garden</b><br/><sub>Dark emerald, aksen emas premium</sub></td>
</tr>
<tr>
<td align="center"><b>🌅 Sunset Clay</b><br/><sub>Rose warm, kalem & romantis</sub></td>
<td align="center"><b>🌌 Skyline Indigo</b><br/><sub>Deep navy, mewah & dramatic</sub></td>
</tr>
</table>

---

## 🚀 Cara Menjalankan Lokal

### Prasyarat

- **Node.js** v18+ ([download](https://nodejs.org/))
- **npm** v9+ (sudah termasuk dengan Node.js)

### Instalasi

```bash
# 1. Clone repositori ini
git clone https://github.com/solivatestudio/1-Website-undangan-pernikahan-simple.git
cd 1-Website-undangan-pernikahan-simple

# 2. Install dependensi
npm install

# 3. Salin file konfigurasi environment
cp .env.example .env.local
```

### Konfigurasi `.env.local`

```env
# Opsional: API Key Gemini (untuk fitur AI jika dipakai)
GEMINI_API_KEY="your_gemini_api_key"

# Opsional: Endpoint Google Apps Script untuk penyimpanan RSVP ke Google Sheets
VITE_RSVP_ENDPOINT="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

> **💡 Tip:** Jika tidak mengonfigurasi `VITE_RSVP_ENDPOINT`, data RSVP tetap bisa dilihat di halaman (tersimpan sementara di state lokal). Untuk produksi, sambungkan ke Google Sheets via Apps Script.

### Jalankan Dev Server

```bash
npm run dev
```

Buka browser di: **http://localhost:3000**

---

## 📂 Struktur Proyek

```
📁 the-wedding-of-hammad-&-fulanah/
├── 📁 src/
│   ├── 📁 components/         # Komponen UI per-seksi
│   │   ├── EnvelopeCover.tsx  # Halaman pembuka amplop
│   │   ├── HeroSection.tsx    # Hero banner & ayat
│   │   ├── CoupleSection.tsx  # Profil mempelai
│   │   ├── CountdownSection.tsx  # Timer hitung mundur
│   │   ├── EventSection.tsx   # Detail akad & resepsi
│   │   ├── LoveStorySection.tsx  # Timeline perjalanan cinta
│   │   ├── GallerySection.tsx # Galeri foto
│   │   ├── RSVPSection.tsx    # Form RSVP & ucapan
│   │   ├── GiftSection.tsx    # Info wedding gift
│   │   └── FloatingControls.tsx  # Kontrol tema & audio
│   ├── 📁 data/
│   │   └── weddingData.ts     # ⭐ Semua data konfigurasi undangan
│   ├── 📁 utils/
│   │   └── audioSynth.ts      # Web Audio API synthesizer
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles & design tokens
│   └── types.ts               # TypeScript interfaces
├── index.html                 # HTML entry point
├── vite.config.ts             # Konfigurasi Vite & Tailwind
├── tsconfig.json              # Konfigurasi TypeScript
├── .env.example               # Template konfigurasi environment
└── package.json
```

---

## ⚙️ Kustomisasi Undangan

Seluruh data undangan dapat diubah dari satu file: **`src/data/weddingData.ts`**

### Data Mempelai (`COUPLE_DATA`)

```typescript
export const COUPLE_DATA = {
  groom: {
    nickname: 'Hammad',
    fullName: 'Hammad Al-Fatih, S.T.',
    father: 'Bapak H. Ahmad Fauzi',
    mother: 'Ibu Hj. Siti Nurhaliza',
    bio: '...',
    instagram: 'hammad_fatih',
    photo: 'URL_FOTO_MEMPELAI_PRIA',
  },
  bride: {
    // ... (sama seperti groom)
  },
  weddingDate: '2026-10-24T08:00:00+07:00',  // <-- Format ISO 8601
  akadVenue: 'Masjid Agung Al-Ikhlas',
  receptionVenue: 'Grand Ballroom Hotel Mulia Senayan',
  // ...
};
```

### Personalisasi Nama Tamu via URL

Tambahkan parameter `?to=` di URL untuk menyapa tamu secara personal:

```
https://namadomain.com/?to=Pak+Budi
https://namadomain.com/?to=Keluarga+Rahmat
```

Nama tamu otomatis muncul di halaman pembuka amplop.

---

## 🛠️ Scripts

| Command | Keterangan |
|---|---|
| `npm run dev` | Jalankan development server (port 3000) |
| `npm run build` | Build untuk produksi ke folder `/dist` |
| `npm run preview` | Preview hasil build produksi |
| `npm run lint` | Cek type errors TypeScript |

---

## 🧰 Tech Stack

- **[React 19](https://react.dev/)** — UI library
- **[TypeScript 5.8](https://www.typescriptlang.org/)** — Type safety
- **[Vite 6](https://vitejs.dev/)** — Build tool & dev server
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling
- **[Motion (Framer Motion)](https://motion.dev/)** — Animasi halus & transisi
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[Canvas Confetti](https://github.com/catdad/canvas-confetti)** — Efek konfeti saat RSVP
- **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** — Musik latar sintetis tanpa file eksternal

---

## 🚢 Deploy ke Produksi

### Vercel (Rekomendasi)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload folder /dist ke Netlify
```

### GitHub Pages

```bash
npm run build
# Push isi folder /dist ke branch gh-pages
```

> **Catatan:** Pastikan environment variable `VITE_RSVP_ENDPOINT` sudah diset di platform hosting Anda.

---

## 🤝 Kontribusi

Pull request dan saran sangat disambut! Untuk perubahan besar, harap buka *issue* terlebih dahulu untuk mendiskusikan apa yang ingin diubah.

1. Fork repositori ini
2. Buat branch fitur: `git checkout -b feat/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur keren'`
4. Push ke branch: `git push origin feat/nama-fitur`
5. Buat Pull Request

---

## 👤 Authors & Credits

**Dibuat dengan ❤️ oleh:**

- **[hmad28](https://github.com/hmad28)** — Developer & Designer
- **email:** email1.hammad@gmail.com

---

## 📄 Lisensi

Distributed under the **Apache 2.0 License**. See `LICENSE` for more information.

---

<div align="center">

*Crafted with* ❤️ *for* **Hammad & Fulanah** *• 2026*

⭐ **Jika proyek ini bermanfaat, berikan bintang ya!** ⭐

</div>
