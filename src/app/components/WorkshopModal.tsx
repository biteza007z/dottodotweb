import { X, ChevronLeft, ChevronRight, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface Workshop {
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  time: string;
  duration: string;
  capacity: string;
  location: string;
  description: string;
  highlights: string[];
  outcomes: string[];
  images: string[];
}

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: Workshop | null;
}

export function WorkshopModal({ isOpen, onClose, workshop }: WorkshopModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  if (!workshop) return null;

  const nextImage = () => {
    setSlideDirection('right');
    setCurrentImageIndex((prev) => 
      prev === workshop.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSlideDirection('left');
    setCurrentImageIndex((prev) => 
      prev === 0 ? workshop.images.length - 1 : prev - 1
    );
  };

  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl grid md:grid-cols-2">
              {/* Left: Image Gallery */}
              <div className="relative bg-gray-900 flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    src={workshop.images[currentImageIndex]}
                    alt={`${workshop.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Image Navigation */}
                {workshop.images.length > 1 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-900" />
                    </motion.button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {workshop.images.map((_, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => {
                            setSlideDirection(index > currentImageIndex ? 'right' : 'left');
                            setCurrentImageIndex(index);
                          }}
                          className={`rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-6 h-2'
                              : 'bg-white/50 hover:bg-white/75 w-2 h-2'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Category Badge */}
                <div
                  className="absolute top-6 left-6 px-4 py-2 rounded-full text-white font-bold text-sm"
                  style={{ backgroundColor: workshop.categoryColor }}
                >
                  {workshop.category}
                </div>
              </div>

              {/* Right: Details */}
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-start justify-between z-10">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{workshop.title}</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#ED1C24] hover:text-white flex items-center justify-center transition-all flex-shrink-0 ml-4"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-8 py-6 space-y-6">
                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                      <Calendar className="w-5 h-5 text-[#ED1C24]" />
                      <div>
                        <div className="text-xs text-gray-500">Date</div>
                        <div className="font-semibold text-sm">{workshop.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                      <Clock className="w-5 h-5 text-[#21409A]" />
                      <div>
                        <div className="text-xs text-gray-500">Time</div>
                        <div className="font-semibold text-sm">{workshop.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                      <Users className="w-5 h-5 text-[#FEB902]" />
                      <div>
                        <div className="text-xs text-gray-500">Capacity</div>
                        <div className="font-semibold text-sm">{workshop.capacity}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                      <MapPin className="w-5 h-5 text-[#F26522]" />
                      <div>
                        <div className="text-xs text-gray-500">Location</div>
                        <div className="font-semibold text-sm">{workshop.location}</div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-gray-700 leading-relaxed">{workshop.description}</p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Workshop Highlights</h3>
                    <ul className="space-y-2">
                      {workshop.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: workshop.categoryColor }}
                          />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Learning Outcomes</h3>
                    <div className="space-y-2">
                      {workshop.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                            style={{ backgroundColor: workshop.categoryColor }}
                          >
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-white py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                    style={{ backgroundColor: workshop.categoryColor }}
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}