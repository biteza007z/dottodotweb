import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { Search, Calendar, X } from 'lucide-react';
import { TimelineModal } from './TimelineModal';

const portfolioItems = [
  {
    image: 'https://images.unsplash.com/photo-1629822908853-b1d2a39ece98?w=600',
    title: 'Art & Design',
    category: '2026',
    color: '#ED1C24',
    link: '#art-design',
  },
  {
    image: 'https://images.unsplash.com/photo-1658584124309-768111d9c5db?w=600',
    title: 'Robotics Lab',
    category: '2025',
    color: '#21409A',
    link: '#robotics',
  },
  {
    image: 'https://images.unsplash.com/photo-1758685734201-72662f1a368d?w=600',
    title: 'Science Experiments',
    category: '2024',
    color: '#FEB902',
    link: '#science',
  },
  {
    image: 'https://images.unsplash.com/photo-1646756089735-487709743361?w=600',
    title: 'Digital Design',
    category: '2023',
    color: '#F26522',
    link: '#digital-design',
  },
  {
    image: 'https://images.unsplash.com/photo-1758687126741-86737c57c210?w=600',
    title: 'Music Production',
    category: '2022',
    color: '#10b981',
    link: '#music',
  },
  {
    image: 'https://images.unsplash.com/photo-1758270705317-3ef6142d306f?w=600',
    title: 'Team Collaboration',
    category: '2026',
    color: '#ED1C24',
    link: '#collaboration',
  },
  {
    image: 'https://images.unsplash.com/photo-1698895685696-ac619ef9b202?w=600',
    title: 'Photography Workshop',
    category: '2025',
    color: '#21409A',
    link: '#photography',
  },
  {
    image: 'https://images.unsplash.com/photo-1623976250156-4598d1f58dc7?w=600',
    title: 'Creative Sessions',
    category: '2024',
    color: '#FEB902',
    link: '#creative-sessions',
  },
  {
    image: 'https://images.unsplash.com/photo-1629822908853-b1d2a39ece98?w=600&h=900&fit=crop', // รูปยาวไปตกคิวช่องขวา
    title: 'Creative Studio',
    category: '2026',
    color: '#ED1C24',
    link: '#creative-studio',
  },
  // --- แทรกกล่องล่องหน เพื่อให้มันกินที่คิวช่องซ้ายสุด ---
  {
    image: '',
    title: 'dummy',
    category: '',
    color: 'transparent',
    link: '',
  },
  // --- Digital Workspace จะโดนดันมาตกคิวช่องกลางพอดี! ---
  {
    image: 'https://images.unsplash.com/photo-1646756089735-487709743361?w=600&h=400&fit=crop', // รูปเล็ก
    title: 'Digital Workspace',
    category: '2023',
    color: '#10b981',
    link: '#digital-workspace',
  }
];

export function PortfolioSection() {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const scrollToCenter = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenTimeline = () => {
    scrollToCenter(); 
    setIsTimelineOpen(true); 
  };

  const handleImageClick = (img: string) => {
    scrollToCenter(); 
    setSelectedImg(img);
  };

  useEffect(() => {
    if (isTimelineOpen || selectedImg) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`; 
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isTimelineOpen, selectedImg]);

  return (
    <>
      <section 
        id="portfolio" 
        className={`py-20 bg-[#F5F5F5] relative overflow-hidden transition-all duration-500 ${isTimelineOpen ? 'blur-sm' : ''}`}
      >
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#ED1C24] opacity-10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
             <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 flex items-center justify-center gap-x-4">
              
              {/* Container สำหรับ "Our" และวงกลมพื้นหลัง */}
              <span className="relative inline-block leading-none">
                {/* วงกลมสีเหลืองพื้นหลัง ปรับตำแหน่งด้วย absolute และ translate */}
                <span 
                  className="absolute -left-4.5 -top-3 w-16 h-16 md:w-20 md:h-20 bg-[#10b981] rounded-full z-0 opacity-100"
                  aria-hidden="true"
                ></span>
                
                {/* คำว่า "Our" ต้องอยู่ z-10 เพื่อทับวงกลม */}
                <span className="relative z-10 text-black">Our</span>
              </span>

              {/* คำว่า "Workshops" */}
              <span className="text-black">Workshops</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              ผลงานของพวกเรา Dot to Dot ที่เดินทางมายาวนานเกือบ 10 ปี กับพาร์ทเนอร์ที่หลากหลาย
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Masonry columnsCount={3} gutter="20px">
              {portfolioItems.map((item, index) => {
                // เช็คว่าเป็นกล่องล่องหนหรือไม่ ถ้าใช่ให้ render เป็น div เปล่าๆ ไม่ต้องโชว์
                if (item.title === 'dummy') {
                  return <div key={index} style={{ display: 'none' }}></div>;
                }

                return (
                  <motion.div
                    key={index}
                    onClick={() => handleImageClick(item.image)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative group cursor-zoom-in rounded-2xl overflow-hidden shadow-lg block border-4"
                    style={{ borderColor: item.color }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <div
                          className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2 w-fit"
                          style={{ backgroundColor: item.color, color: 'white' }}
                        >
                          {item.category}
                        </div>
                        <h3 className="text-white text-xl font-bold">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </Masonry>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenTimeline}
              className="px-8 py-4 bg-[#000000] text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-shadow flex items-center gap-3 mx-auto"
            >
              <Calendar className="w-6 h-6" />
              View Full Gallery
            </motion.button>
          </motion.div>
        </div>
      </section>

      <TimelineModal isOpen={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} />

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[200] bg-[#F5F5F5]/80 backdrop-blur-xl flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImg} 
                className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl border border-gray-200 object-contain mb-6" 
                alt="Selected Portfolio"
              />

              <div className="text-center text-gray-900 max-w-2xl px-4">
                {portfolioItems.filter(item => item.image === selectedImg && item.title !== 'dummy').map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-lg font-medium leading-relaxed">
                      รู้จักตัวเองและผู้อื่นผ่านมุมมองมานุษยวิทยา
                    </p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute -top-12 right-0 md:-right-12 text-gray-500 hover:text-[#ED1C24] transition-colors p-2"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}