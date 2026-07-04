import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Image as ImageIcon, X, Plus, Sparkles, UploadCloud, Heart } from 'lucide-react';
import { INITIAL_PHOTOS } from '../data/weddingData';
import { PhotoItem, ThemeConfig } from '../types';

interface GallerySectionProps {
  theme: ThemeConfig;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ theme }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [activeTab, setActiveTab] = useState<string>('semua');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState<'prewedding' | 'lamaran' | 'bts'>('bts');
  const [customImgUrl, setCustomImgUrl] = useState('');

  const filteredPhotos = activeTab === 'semua'
    ? photos
    : photos.filter(p => p.category === activeTab);

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const fallbackImages = [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80'
    ];

    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}`,
      url: customImgUrl.trim() || fallbackImages[Math.floor(Math.random() * fallbackImages.length)],
      title: newTitle,
      category: newCategory,
      caption: newCaption || 'Kiriman kenangan dari kerabat & sahabat.',
      aspectRatio: 'aspect-square'
    };

    setPhotos([newPhoto, ...photos]);
    setNewTitle('');
    setNewCaption('');
    setCustomImgUrl('');
    setShowUploadModal(false);
  };

  return (
    <section id="galeri" className={`render-contained relative overflow-hidden px-4 py-16 sm:py-20 md:py-24 ${theme.bgSecondary}`}>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#10231c]/10 to-transparent" />
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="display-heritage text-xs font-bold text-[#7a4a28]">
            Galeri Kenangan
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            Potret Kebahagiaan Kami
          </h2>
          <p className="text-sm opacity-75 mt-2 max-w-lg mx-auto">
            Setiap bingkai merekam senyuman, doa, dan langkah ikhlas yang mengiringi perjalanan cinta ini.
          </p>
        </motion.div>

        {/* Filter Tabs & Upload Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'semua', label: 'Semua Momen' },
            { id: 'prewedding', label: 'Pre-Wedding' },
            { id: 'lamaran', label: 'Lamaran' },
            { id: 'bts', label: 'Behind The Scenes' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold tracking-wide transition-all ${
                activeTab === tab.id
                  ? theme.btnPrimary
                  : `border ${theme.borderClass} ${theme.bgCard} opacity-80 hover:opacity-100`
              }`}
            >
              {tab.label}
            </button>
          ))}

          <button
            onClick={() => setShowUploadModal(true)}
            className="ml-1 sm:ml-2 flex items-center gap-1.5 border border-[#1f4b3a] bg-[#1f4b3a]/15 px-3 py-1.5 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold tracking-wide text-[#1f4b3a] transition-all hover:bg-[#1f4b3a]/25"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unggah Foto Memori</span>
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {filteredPhotos.map(photo => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative cursor-pointer overflow-hidden border-[5px] sm:border-[8px] md:border-[10px] border-[#f4ead8] bg-[#10231c] shadow-xl ${photo.aspectRatio}`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 text-left text-white">
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold mb-1">
                    {photo.category === 'bts' ? 'Behind the scenes' : photo.category}
                  </span>
                  <h4 className="font-serif-luxury font-bold text-xl leading-tight">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="max-w-4xl w-full bg-stone-900 rounded-lg overflow-hidden shadow-2xl border border-stone-800 flex flex-col md:flex-row"
            >
              <div className="md:w-2/3 bg-black flex items-center justify-center max-h-[50vh] md:max-h-[70vh]">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  decoding="async"
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
              <div className="md:w-1/3 p-5 sm:p-6 md:p-8 flex flex-col justify-center text-left text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-semibold uppercase tracking-widest mb-3 w-fit">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-serif-luxury text-3xl font-bold text-amber-200">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-stone-300 mt-4 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Memory Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`luxury-card max-w-md w-full p-5 sm:p-6 md:p-8 border ${theme.borderClass} ${theme.bgCard} text-left relative`}
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-6 right-6 p-2 rounded-lg hover:bg-stone-500/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-luxury font-bold text-2xl">Bagikan Kenangan</h3>
                  <p className="text-xs opacity-75">Simpan momen indah ke galeri digital pernikahan.</p>
                </div>
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold mb-1 opacity-80">
                    Judul Foto
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Contoh: Makan Malam Bersama"
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold mb-1 opacity-80">
                    Kategori
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="bts">Behind The Scenes / Sahabat</option>
                    <option value="lamaran">Momen Lamaran / Keluarga</option>
                    <option value="prewedding">Pre-Wedding / Romantic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold mb-1 opacity-80">
                    URL Foto (Opsional)
                  </label>
                  <input
                    type="url"
                    value={customImgUrl}
                    onChange={e => setCustomImgUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-[10px] opacity-60 mt-1">
                    *Biarkan kosong jika ingin menggunakan simulasi foto estetik berkualitas tinggi.
                  </p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold mb-1 opacity-80">
                    Cerita Singkat (Caption)
                  </label>
                  <textarea
                    rows={2}
                    value={newCaption}
                    onChange={e => setNewCaption(e.target.value)}
                    placeholder="Tuliskan kenangan manis di balik foto ini..."
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 px-6 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${theme.btnPrimary}`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambahkan ke Galeri</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
