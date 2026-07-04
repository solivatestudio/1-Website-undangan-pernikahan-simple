export type ThemeId = 'champagne' | 'emerald' | 'rose' | 'velvet';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  badge: string;
  bgMain: string;
  bgSecondary: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  accentGold: string;
  borderClass: string;
  btnPrimary: string;
  glowColor: string;
}

export interface RSVPWish {
  id: string;
  name: string;
  relation: string;
  attendance: 'hadir' | 'tidak' | 'ragu';
  guestCount: number;
  wish: string;
  createdAt: string;
  likes: number;
  vipTicketCode?: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  category: 'semua' | 'prewedding' | 'lamaran' | 'bts';
  caption: string;
  aspectRatio: string;
}

export interface LoveStoryStep {
  year: string;
  dateStr: string;
  title: string;
  description: string;
  location: string;
  image?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  type: 'bank' | 'ewallet';
  color: string;
}
