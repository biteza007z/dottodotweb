import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import { YearGallery } from './YearGallery';
import { ImageLightbox } from './ImageLightbox'; // อย่าลืม Import ตัวนี้ด้วยครับ

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper Function (อยู่นอก Component ได้)
const generateYearImages = (baseImages: { src: string; caption: string }[]) => {
  const images = [];
  for (let i = 0; i < 16; i++) {
    images.push(baseImages[i % baseImages.length]);
  }
  return images;
};

const baseImagePool = [
  { src: 'https://images.unsplash.com/photo-1629822908853-b1d2a39ece98?w=600', caption: 'Art & Design Workshop - Creative Expression Session' },
  { src: 'https://images.unsplash.com/photo-1658584124309-768111d9c5db?w=600', caption: 'Robotics Lab - Building Future Innovators' },
  { src: 'https://images.unsplash.com/photo-1758685734201-72662f1a368d?w=600', caption: 'Science Experiments - Hands-On Learning' },
  { src: 'https://images.unsplash.com/photo-1646756089735-487709743361?w=600', caption: 'Digital Design - Technology Integration' },
  { src: 'https://images.unsplash.com/photo-1758687126741-86737c57c210?w=600', caption: 'Music Production - Audio Creation Workshop' },
  { src: 'https://images.unsplash.com/photo-1758270705317-3ef6142d306f?w=600', caption: 'Team Collaboration - Group Project Work' },
  { src: 'https://images.unsplash.com/photo-1698895685696-ac619ef9b202?w=600', caption: 'Photography Workshop - Visual Storytelling' },
  { src: 'https://images.unsplash.com/photo-1623976250156-4598d1f58dc7?w=600', caption: 'Creative Sessions - Mixed Media Art' },
  { src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600', caption: 'Student Presentations - Showcasing Talent' },
  { src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600', caption: 'Coding Workshop - Programming Skills' },
  { src: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600', caption: 'STEM Activities - Problem Solving' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', caption: 'Innovation Lab - Prototyping Projects' },
  { src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600', caption: 'Outdoor Learning - Nature Exploration' },
  { src: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600', caption: 'Drama Workshop - Performance Arts' },
  { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600', caption: 'Animation Studio - Digital Art Creation' },
  { src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600', caption: 'Community Events - Celebrating Success' },
];

const timelineData = [
  {
    year: '2026',
    title: 'AI-Powered Learning Lab', 
    description: 'Launched our most advanced workshop series integrating AI and machine learning for young creators.',
    badgeColor: '#ED1C24',
    images: generateYearImages(baseImagePool),
    activities: [
      'Introduced AI & Machine Learning curriculum for ages 12+',
      'Partnered with 5 major tech companies for resources',
      'Launched virtual reality creative labs in 10 locations',
      'Reached 15,000 students across 50+ cities',
      'Won Best Educational Innovation Award 2026',
      'Developed proprietary AI learning platform',
    ],
  },
  {
    year: '2025',
    title: 'Global Expansion',
    description: 'Expanded to 15 new countries, reaching over 10,000 students worldwide.',
    badgeColor: '#21409A',
    images: generateYearImages(baseImagePool.slice(2)),
    activities: [
      'Opened workshops in 15 new countries across 4 continents',
      'Established international curriculum standards',
      'Launched multilingual learning materials',
      'Created global student exchange program',
      'Partnered with UNESCO for educational initiatives',
      'Reached milestone of 10,000+ active students',
    ],
  },
  {
    year: '2024',
    title: 'Innovation Awards',
    description: 'Received top education innovation awards for our creative curriculum design.',
    badgeColor: '#FEB902',
    images: generateYearImages(baseImagePool.slice(4)),
    activities: [
      'Received Global Education Excellence Award',
      'Featured in top 10 innovative education programs',
      'Launched advanced STEAM curriculum',
      'Developed award-winning teaching methodology',
      'Published research on creative learning outcomes',
      'Expanded to 30 cities nationwide',
    ],
  },
  {
    year: '2023',
    title: 'Digital Transformation',
    description: 'Launched hybrid workshops combining in-person and online learning experiences.',
    badgeColor: '#F26522',
    images: generateYearImages(baseImagePool.slice(1)),
    activities: [
      'Developed comprehensive online learning platform',
      'Launched hybrid workshop model',
      'Created 50+ hours of digital content',
      'Trained 100+ educators in digital tools',
      'Established virtual mentorship program',
      'Reached 5,000 students through digital channels',
    ],
  },
  {
    year: '2022',
    title: 'Foundation Year',
    description: 'Established our core workshop programs and reached 1,000 students.',
    badgeColor: '#00A14B',
    images: generateYearImages(baseImagePool.slice(3)),
    activities: [
      'Founded Creative Workshops organization',
      'Launched first 6 signature workshop programs',
      'Established partnerships with 20+ schools',
      'Recruited team of 25 expert educators',
      'Reached first 1,000 students',
      'Developed core curriculum framework',
    ],
  },
];

export function TimelineModal({ isOpen, onClose }: TimelineModalProps) {
  const sliderRefs = useRef<{ [key: string]: Slider | null }>({});
  const [selectedYear, setSelectedYear] = useState<typeof timelineData[0] | null>(null);
  const [yearGalleryOpen, setYearGalleryOpen] = useState(false);

  // --- ย้าย State มาไว้ข้างในนี้ ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<{ src: string; caption: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (images: { src: string; caption: string }[], index: number) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  // ----------------------------

  const handleViewFullGallery = (yearData: typeof timelineData[0]) => {
    setSelectedYear(yearData);
    setYearGalleryOpen(true);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 z-[200]backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            >
              <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 md:px-8 py-6 flex items-center justify-between rounded-t-3xl z-20">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Creative Journey</h2>
                    <p className="text-gray-600 mt-1">A timeline of innovation and impact</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#ED1C24] hover:text-white flex items-center justify-center transition-all flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 md:p-8 pl-8 md:pl-12 relative">
                  <div className="absolute left-12 md:left-16 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ED1C24] via-[#21409A] to-[#00A14B]"></div>

                  {timelineData.map((yearData, yearIndex) => (
                    <motion.div
                      key={yearData.year}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: yearIndex * 0.1 }}
                      className="mb-16 last:mb-0 relative"
                    >
                      <div className="flex items-start gap-6 md:gap-8 mb-6">
                        <div
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg flex-shrink-0 relative z-10 cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: yearData.badgeColor }}
                        >
                          {yearData.year}
                        </div>
                        <div className="flex-1 pt-2 md:pt-4">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{yearData.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{yearData.description}</p>
                        </div>
                      </div>

                      <div className="ml-20 md:ml-28 relative px-8 md:px-12">
                        <button
                          onClick={() => sliderRefs.current[yearData.year]?.slickPrev()}
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-[#ED1C24] hover:text-white flex items-center justify-center transition-all hover:scale-110"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => sliderRefs.current[yearData.year]?.slickNext()}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-[#ED1C24] hover:text-white flex items-center justify-center transition-all hover:scale-110"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <Slider ref={(slider) => (sliderRefs.current[yearData.year] = slider)} {...sliderSettings}>
                          {yearData.images.slice(0, 8).map((image, imgIndex) => (
                            <div key={imgIndex} className="px-2">
                              <div 
                                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group relative"
                                onClick={() => handleImageClick(yearData.images, imgIndex)}
                              >
                                <img
                                  src={image.src}
                                  alt={image.caption}
                                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <p className="text-white text-xs font-medium px-2 text-center">{image.caption.split(' - ')[0]}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>

                        <div className="mt-6 flex justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewFullGallery(yearData)}
                            className="px-6 py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                            style={{ backgroundColor: yearData.badgeColor }}
                          >
                            <CalendarIcon className="w-5 h-5" />
                            View Full Gallery ({yearData.images.length} photos)
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <YearGallery
        isOpen={yearGalleryOpen}
        onClose={() => setYearGalleryOpen(false)}
        yearData={selectedYear}
      />

      {/* เพิ่ม Lightbox Component ตรงนี้ครับ */}
      <ImageLightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={currentImages}
        currentIndex={currentIndex}
        onNavigate={setCurrentIndex}
      />
    </>
  );
}