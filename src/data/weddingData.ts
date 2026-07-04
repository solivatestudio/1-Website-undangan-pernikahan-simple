import { ThemeConfig, PhotoItem, LoveStoryStep, BankAccount, RSVPWish } from '../types';

export const COUPLE_DATA = {
  groom: {
    nickname: 'Hammad',
    fullName: 'Hammad Al-Fatih, S.T.',
    father: 'Bapak H. Ahmad Fauzi',
    mother: 'Ibu Hj. Siti Nurhaliza',
    bio: 'Software Engineer & Designer yang mencintai fotografi, alam, dan secangkir kopi pagi.',
    instagram: 'hammad_fatih',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
  bride: {
    nickname: 'Fulanah',
    fullName: 'Fulanah Az-Zahra, S.Ds.',
    father: 'Bapak H. Abdullah Hakim',
    mother: 'Ibu Hj. Khadijah Aminah',
    bio: 'Creative Art Director yang menyukai seni ilustrasi, literasi sastra, dan keindahan senja.',
    instagram: 'fulanah_zahra',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  weddingDate: '2026-10-24T08:00:00+07:00',
  weddingDateDisplay: 'Sabtu, 24 Oktober 2026',
  akadTime: '08:00 - 10:00 WIB',
  akadVenue: 'Masjid Agung Al-Ikhlas',
  akadAddress: 'Jl. Sultan Hasanuddin No. 45, Kebayoran Baru, Jakarta Selatan',
  akadMapsUrl: 'https://maps.google.com/?q=Masjid+Agung+Al-Ikhlas+Jakarta',
  receptionTime: '11:00 - 14:00 WIB',
  receptionVenue: 'Grand Ballroom Hotel Mulia Senayan',
  receptionAddress: 'Jl. Asia Afrika Senayan, Gelora, Tanah Abang, Jakarta Pusat',
  receptionMapsUrl: 'https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta',
  quote: {
    text: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21'
  }
};

export const THEMES: Record<string, ThemeConfig> = {
  champagne: {
    id: 'champagne',
    name: 'Jakarta Ivory',
    badge: '◆ Ivory',
    bgMain: 'bg-[#f5efe4]',
    bgSecondary: 'bg-[#e9dccb]/70',
    bgCard: 'city-panel text-[#151817]',
    textPrimary: 'text-[#19251f]',
    textSecondary: 'text-[#5e6d61]',
    accentGold: 'text-[#8a6338]',
    borderClass: 'border-[#48514d]/25',
    btnPrimary: 'bg-[#275448] text-[#fbf7ef] shadow-lg shadow-[#275448]/25 hover:bg-[#1e4037]',
    glowColor: 'rgba(39, 84, 72, 0.16)'
  },
  emerald: {
    id: 'emerald',
    name: 'City Garden',
    badge: '▥ Garden',
    bgMain: 'bg-[#17211f]',
    bgSecondary: 'bg-[#202927]',
    bgCard: 'metro-panel border-[#d4a45f]/25',
    textPrimary: 'text-[#fff7e8]',
    textSecondary: 'text-[#d6c5a9]',
    accentGold: 'text-[#e0b66f]',
    borderClass: 'border-[#d4a45f]/30',
    btnPrimary: 'bg-[#d99a4a] text-[#13251d] shadow-lg shadow-black/25 hover:bg-[#edb467]',
    glowColor: 'rgba(217, 154, 74, 0.2)'
  },
  rose: {
    id: 'rose',
    name: 'Sunset Clay',
    badge: '✺ Sunset',
    bgMain: 'bg-[#f3dfcf]',
    bgSecondary: 'bg-[#d8a184]/35',
    bgCard: 'bg-[#fff4e6]/90 text-[#2a1c17] backdrop-blur-md',
    textPrimary: 'text-[#2a1c17]',
    textSecondary: 'text-[#7b5b50]',
    accentGold: 'text-[#a4412c]',
    borderClass: 'border-[#a4412c]/25',
    btnPrimary: 'bg-[#a4412c] text-[#fff7e8] shadow-lg shadow-[#a4412c]/20 hover:bg-[#853321]',
    glowColor: 'rgba(164, 65, 44, 0.16)'
  },
  velvet: {
    id: 'velvet',
    name: 'Skyline Indigo',
    badge: '☷ Skyline',
    bgMain: 'bg-[#111f2a]',
    bgSecondary: 'bg-[#172b35]',
    bgCard: 'bg-[#10202a]/90 text-[#f7ead3] backdrop-blur-md',
    textPrimary: 'text-[#f7ead3]',
    textSecondary: 'text-[#c7b795]',
    accentGold: 'text-[#d29b50]',
    borderClass: 'border-[#d29b50]/25',
    btnPrimary: 'bg-[#d29b50] text-[#10202a] font-bold shadow-lg shadow-black/25 hover:bg-[#e2b36e]',
    glowColor: 'rgba(82, 120, 125, 0.22)'
  }
};

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    title: 'Senja di Kala Itu',
    category: 'prewedding',
    caption: 'Tawa ringan yang mengawali ribuan cerita indah bersama.',
    aspectRatio: 'aspect-[3/4]'
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    title: 'Ikatan Cincin Pertunangan',
    category: 'lamaran',
    caption: 'Mengikat janji di hadapan kedua keluarga yang penuh restu.',
    aspectRatio: 'aspect-square'
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    title: 'Keanggunan & Harapan',
    category: 'prewedding',
    caption: 'Menatap masa depan dengan keyakinan dan doa.',
    aspectRatio: 'aspect-[4/5]'
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    title: 'Tawa & Bahagia',
    category: 'bts',
    caption: 'Di balik layar pemotretan yang penuh canda tawa ceria.',
    aspectRatio: 'aspect-video'
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    title: 'Langkah Menuju Satu Arah',
    category: 'prewedding',
    caption: 'Berjalan seiringan melewati setiap fase kehidupan.',
    aspectRatio: 'aspect-[3/4]'
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    title: 'Restu Keluarga',
    category: 'lamaran',
    caption: 'Sujud syukur atas dipertemukannya dua keluarga besar.',
    aspectRatio: 'aspect-square'
  }
];

export const LOVE_TIMELINE: LoveStoryStep[] = [
  {
    year: '2023',
    dateStr: '15 Agustus 2023',
    title: 'Pertama Bertemu',
    description: 'Takdir mempertemukan kami di sebuah konferensi teknologi & desain di Jakarta. Percakapan sederhana tentang buku dan fotografi membuka jalan pertemanan yang hangat.',
    location: 'Jakarta Selatan',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2024',
    dateStr: '10 Juni 2024',
    title: 'Komitmen & Ta\'aruf',
    description: 'Menyadari adanya keselarasan visi, prinsip kehidupan, dan impian masa depan, kami memutuskan untuk saling menjaga komitmen dengan restu kedua orang tua.',
    location: 'Bandung',
    image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2025',
    dateStr: '18 Mei 2025',
    title: 'Khitbah / Lamaran Resmi',
    description: 'Pada sore yang syahdu di bulan Mei, keluarga besar berkumpul. Ikatan pertunangan resmi dilangsungkan dalam suasana haru dan bahagia.',
    location: 'Bogor',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2026',
    dateStr: '24 Oktober 2026',
    title: 'Menuju Halal & Selamanya',
    description: 'InsyaAllah, hari di mana janji suci diucapkan di hadapan Allah SWT, keluarga, dan para sahabat, memulai pelayaran ibadah seumur hidup.',
    location: 'Jakarta',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_WISHES: RSVPWish[] = [
  {
    id: 'w-1',
    name: 'Reza Rahadian & Keluarga',
    relation: 'Sahabat Kuliah Hammad',
    attendance: 'hadir',
    guestCount: 2,
    wish: 'Selamat menempuh hidup baru Hammad & Fulanah! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah until jannah. Ditunggu resepsinya bro!',
    createdAt: '2 jam yang lalu',
    likes: 14,
    vipTicketCode: 'VIP-HM-0081'
  },
  {
    id: 'w-2',
    name: 'Anisa & Dimas',
    relation: 'Rekan Kerja Fulanah',
    attendance: 'hadir',
    guestCount: 2,
    wish: 'Happy wedding kak Fulanah! Akhirnya berlayar ke pelaminan. Semoga selalu harmonis dan diberkahi kebahagiaan tiada henti.',
    createdAt: '5 jam yang lalu',
    likes: 9,
    vipTicketCode: 'VIP-FL-0092'
  },
  {
    id: 'w-3',
    name: 'Bapak dr. Hendro & Ibu',
    relation: 'Kerabat Keluarga Besar',
    attendance: 'hadir',
    guestCount: 2,
    wish: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair. Semoga kebahagiaan melingkupi kalian berdua selamanya.',
    createdAt: '1 hari yang lalu',
    likes: 21,
    vipTicketCode: 'VIP-KB-0103'
  },
  {
    id: 'w-4',
    name: 'Kevin & Timothy',
    relation: 'Teman Komunitas Desain',
    attendance: 'ragu',
    guestCount: 1,
    wish: 'Congrats guys! Websitenya keren banget sumpah. InsyaAllah usahakan hadir kalau jadwal proyek aman ya!',
    createdAt: '1 hari yang lalu',
    likes: 7
  },
  {
    id: 'w-5',
    name: 'Nabila Az-Zahra',
    relation: 'Sahabat SMA',
    attendance: 'hadir',
    guestCount: 1,
    wish: 'MasyaAllah terharu banget liat perjalanan cinta kalian dari awal. Semoga dilancarkan sampai hari H sayangku!',
    createdAt: '2 hari yang lalu',
    likes: 18,
    vipTicketCode: 'VIP-SMA-0115'
  }
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bca',
    bankName: 'Bank BCA',
    accountNumber: '8720192837',
    accountHolder: 'Hammad Al-Fatih',
    type: 'bank',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'mandiri',
    bankName: 'Bank Mandiri',
    accountNumber: '1220009876543',
    accountHolder: 'Fulanah Az-Zahra',
    type: 'bank',
    color: 'from-amber-600 to-yellow-700'
  },
  {
    id: 'gopay',
    bankName: 'GoPay / OVO / DANA',
    accountNumber: '081234567890',
    accountHolder: 'Hammad Al-Fatih',
    type: 'ewallet',
    color: 'from-emerald-600 to-teal-700'
  }
];
