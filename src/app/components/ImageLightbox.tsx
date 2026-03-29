import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; caption: string }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ isOpen, onClose, images, currentIndex, onNavigate }: ImageLightboxProps) {
  const currentImage = images[currentIndex];

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!currentImage) return null;

  // แยกข้อความ caption ออกเป็น 2 ส่วน
  const captionParts = currentImage.caption.split(' - ');
  const title = captionParts[0];
  const description = captionParts[1];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop: ปรับความเข้มเป็น bg-black/80 และใส่ blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-md cursor-zoom-out"
          />

          {/* Lightbox Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10 pointer-events-auto"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <div className="contents pointer-events-auto">
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            )}

            {/* Content Area */}
            <div className="max-w-5xl w-full flex flex-col items-center justify-center pointer-events-auto">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full flex flex-col items-center"
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.caption}
                  className="max-h-[65vh] md:max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
                />
                
                {/* Caption: ปรับเป็น 2 บรรทัด */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  {/* บรรทัดที่ 1: ชื่อกิจกรรม (ตัวหนา) */}
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                    {title}
                  </h3>
                  
                  {/* บรรทัดที่ 2: คำอธิบาย (ตัวจางลง) */}
                  {description && (
                    <p className="text-gray-300 text-base md:text-lg mt-1 font-light">
                      {description}
                    </p>
                  )}
                  
                  {/* ลำดับภาพตัวเลขด้านล่างสุด */}
                  <p className="text-white/40 text-xs mt-3 font-mono tracking-widest uppercase">
                    {currentIndex + 1} / {images.length}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}