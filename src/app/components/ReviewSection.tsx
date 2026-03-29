import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// 1. สร้างรูปจำลอง 300 รูป
const baseImages = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
  'https://images.unsplash.com/photo-1623976250156-4598d1f58dc7?w=800',
  'https://images.unsplash.com/photo-1658584124309-768111d9c5db?w=800',
  'https://images.unsplash.com/photo-1646756089735-487709743361?w=800',
  'https://images.unsplash.com/photo-1758687126741-86737c57c210?w=800',
  'https://images.unsplash.com/photo-1698895685696-ac619ef9b202?w=800',
  'https://images.unsplash.com/photo-1758270705317-3ef6142d306f?w=800',
];

const reviewImages = Array.from({ length: 300 }).map((_, idx) => ({
  id: idx,
  src: baseImages[idx % baseImages.length],
  alt: `Review ${idx + 1}`
}));

export function ReviewSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % reviewImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + reviewImages.length) % reviewImages.length);
    }
  };

  return (
    <>
      <section id="reviews" className="py-20 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
           <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 flex items-center justify-center gap-x-4">
              
              {/* Container สำหรับ "Our" และวงกลมพื้นหลัง */}
              <span className="relative inline-block leading-none">
                {/* วงกลมสีเหลืองพื้นหลัง ปรับตำแหน่งด้วย absolute และ translate */}
                <span 
                  className="absolute -left-4.5 -top-3 w-16 h-16 md:w-20 md:h-20 bg-[#FCBA02] rounded-full z-0 opacity-100"
                  aria-hidden="true"
                ></span>
                
                {/* คำว่า "Our" ต้องอยู่ z-10 เพื่อทับวงกลม */}
                <span className="font-sans relative z-10 text-black">รีวิวจากผู้เข้าร่วมเวิร์กชอป</span>
              </span>

              {/* คำว่า "Workshops" */}
              <span className="text-black"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              เสียงจากผู้เข้าร่วมเวิร์กชอปของ Dot to Dot จากหลากหลายกิจกรรมของพวกเรา
            </p>
          </motion.div>
        </div>

        <div className="w-full overflow-x-auto hide-scrollbar">
          {/* แก้ไข: ย้ายแอนิเมชันตอนเลื่อนจอมาไว้ที่กล่องคลุมกล่องเดียว เพื่อลดภาระเบราว์เซอร์ */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-w-max mx-auto p-16" 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(30, minmax(60px, 80px))', 
              gridTemplateRows: 'repeat(10, minmax(60px, 80px))',
              gap: '6px' 
            }}
          >
            {reviewImages.map((img, index) => (
              <motion.div
                key={img.id}
                onClick={() => setSelectedIndex(index)}
                className="relative cursor-pointer aspect-square rounded-md overflow-hidden bg-gray-800"
                
                // รูปทั้ง 300 จะตอบสนองแค่ตอนโดน Hover เท่านั้น
                whileHover={{ 
                  scale: 2.2, 
                  zIndex: 50, 
                  borderRadius: "12px",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ duration: 0.15 }} // ปรับความไวให้ติดนิ้ว ไม่หน่วง
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy" // โหลดรูปเท่าที่แสดงผล ช่วยลดอาการกระตุกได้มาก
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox / รูปใหญ่ตอนคลิก */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-[#ED1C26] text-white rounded-full flex items-center justify-center transition-all z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#ED1C26] text-white rounded-full flex items-center justify-center transition-all z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} 
            >
              <img 
                src={reviewImages[selectedIndex].src} 
                alt={reviewImages[selectedIndex].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border-4 border-white/10"
              />
              
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 font-medium tracking-wider">
                {selectedIndex + 1} / {reviewImages.length}
              </div>
            </motion.div>

            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#ED1C26] text-white rounded-full flex items-center justify-center transition-all z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}