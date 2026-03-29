import { X, ArrowLeft, Calendar, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ImageLightbox } from './ImageLightbox';

interface YearData {
  year: string;
  title: string;
  description: string;
  badgeColor: string;
  activities: string[];
  images: { src: string; caption: string }[];
}

interface YearGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  yearData: YearData | null;
}

export function YearGallery({ isOpen, onClose, yearData }: YearGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!yearData) return null;

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            >
              <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 md:px-8 py-6 flex items-center justify-between rounded-t-3xl z-20">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={onClose}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                      aria-label="Go back"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg"
                          style={{ backgroundColor: yearData.badgeColor }}
                        >
                          {yearData.year}
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{yearData.title}</h2>
                          <p className="text-gray-600 text-sm">{yearData.images.length} photos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#ED1C24] hover:text-white flex items-center justify-center transition-all flex-shrink-0"
                    aria-label="Close gallery"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Overview Section */}
                  <div className="mb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100">
                      <p className="text-gray-700 leading-relaxed mb-4">{yearData.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Year {yearData.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Activities & Milestones */}
                  {yearData.activities && yearData.activities.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Activities & Milestones</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {yearData.activities.map((activity, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-colors"
                          >
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                              style={{ backgroundColor: yearData.badgeColor }}
                            >
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed">{activity}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Photo Gallery Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">Photo Gallery</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <ImageIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">{yearData.images.length} images</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {yearData.images.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.03 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleImageClick(index)}
                          className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all"
                        >
                          <img
                            src={image.src}
                            alt={image.caption}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <p className="text-white text-sm font-medium line-clamp-2">{image.caption}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={yearData.images}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
      />
    </>
  );
}
