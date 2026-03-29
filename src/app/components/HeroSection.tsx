import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselItems = [
  { src: "https://images.unsplash.com/photo-1623976250156-4598d1f58dc7?q=80&w=1080" },
  { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1080" },
  { src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1080" },
  { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1080" },
  { src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1080" }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '20%' : '-20%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '20%' : '-20%',
    opacity: 0,
  }),
};

export function HeroSection() {
  const [[page, direction], setPage] = useState([0, 0]);
  const currentIndex = ((page % carouselItems.length) + carouselItems.length) % carouselItems.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F5F5F5] pt-40 pb-10">
      
 {/* Background Elements (Existing) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#ED1C24] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

      {/* Container ใหญ่ */}
      <div className="max-w-[100%] w-full px-6 lg:px-10 grid grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Content (ฝั่งข้อความ) - แก้ไข Tailwind classes */}
        <motion.div
          className="col-span-12 lg:col-span-5 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-sans text-xl lg:text-2xl text-gray-900 mb-2 font-medium">
    การเรียนรู้ที่จะพาไป...
  </p>
          {/* หัวข้อ */}
          <h1 className="font-sans text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-gray-900 whitespace-nowrap">
            เข้าใจ<span className="text-[#ED1C26]">ตัวเอง</span><br/>
            เข้าใจ<span className="text-[#FCBA02]">ผู้อื่น</span><br/>
            เข้าใจ<span className="text-[#23419B]">ความหลากหลาย</span>
          </h1>
          {/* ข้อความอธิบาย - แก้ไข Tailwind class เพื่อจัดระยะ */}
          <p className="font-text text-2xl text-gray-900 mb-8 leading-relaxed">
            ผ่านการออกแบบประสบการณ์การเรียนรู้<br/>ด้วยเครื่องมือสนุกๆ ที่ออกแบบโดยกระบวนกรมืออาชีพ
          </p>
        </motion.div>

        {/* Right Carousel Container - แก้ไข Tailwind classes เพื่อจัดตำแหน่ง */}
        <motion.div className="lg:col-span-7 relative group w-full lg:ml-10 xl:ml-20 lg:-mt-10 xl:-mt-20">
          
          {/*📍 แทรกวงกลม 3 อันตรงจุดนี้ครับ 📍*/}
          
          {/* วงกลมน้ำเงิน (บนซ้าย) */}
          <div className="absolute top-3 left-3 -translate-x-1/2 -translate-y-1/2 w-22 h-22 bg-[#1D3C9D] rounded-full z-200"></div>

          {/* วงกลมแดงใหญ่ (บนขวา) */}
          <div className="absolute top-[7%] right-[33%] translate-x-1/2 -translate-y-1/2 w-50 h-50 bg-[#ED1C24] rounded-full z-0"></div>

          {/* วงกลมเหลือง (ล่างกลาง) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-32 h-32 bg-[#FCBA02] rounded-full z-0 -ml-10, -ml-24 "></div>

          {/* กล่อง Carousel ของคุณ (ปรับ w และ z-index เพื่อให้วงกลมอยู่หลัง) */}
          {/* เพิ่ม z-10 เพื่อให้กรอบรูปอยู่เหนือวงกลม z-0 */}
          <div className="relative w-full lg:w-[70%]  max-w aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gray-200 z-10">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={page}
                custom={direction}
                src={carouselItems[currentIndex].src}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { duration: 1.2, ease: [0.33, 1, 0.68, 1] },
                  opacity: { duration: 0.8 }
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation Buttons (z-index สูงกว่ารูปภาพ) */}
            <button onClick={() => paginate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-[#ED1C24] hover:text-white rounded-full shadow-lg transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => paginate(1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-[#ED1C24] hover:text-white rounded-full shadow-lg transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}