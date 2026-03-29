import { motion } from 'framer-motion'; // หรือ 'motion/react' ตามที่คุณใช้
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const partners = [
  { name: 'Harvard University', icon: '🎓', color: '#ED1C24', link: 'https://www.harvard.edu' },
  { name: 'MIT Innovation Lab', icon: '🔬', color: '#21409A', link: 'https://www.mit.edu' },
  { name: 'Stanford Design School', icon: '💡', color: '#FEB902', link: 'https://www.stanford.edu' },
  { name: 'Oxford Academy', icon: '📚', color: '#F26522', link: 'https://www.ox.ac.uk' },
  { name: 'Google for Education', icon: '🚀', color: '#00A14B', link: 'https://edu.google.com' },
  { name: 'Microsoft Learn', icon: '💻', color: '#ED1C24', link: 'https://docs.microsoft.com/learn' },
  { name: 'Adobe Creative Cloud', icon: '🎨', color: '#21409A', link: 'https://www.adobe.com' },
  { name: 'Khan Academy', icon: '📖', color: '#FEB902', link: 'https://www.khanacademy.org' },
];

export function PartnerSection() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,     // <--- โชว์ 5 อัน
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="py-20 bg-[#F5F5F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
                       <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 flex items-center justify-center gap-x-4">
              
              {/* Container สำหรับ "Our" และวงกลมพื้นหลัง */}
              <span className="relative inline-block leading-none">
                {/* วงกลมสีเหลืองพื้นหลัง ปรับตำแหน่งด้วย absolute และ translate */}
                <span 
                  className="absolute -left-4.5 -top-3 w-16 h-16 md:w-20 md:h-20 bg-[#ED1C26] rounded-full z-0 opacity-100"
                  aria-hidden="true"
                ></span>
                
                {/* คำว่า "Our" ต้องอยู่ z-10 เพื่อทับวงกลม */}
                <span className="relative z-10 text-black">Our</span>
              </span>

              {/* คำว่า "Workshops" */}
              <span className="text-black">Partners</span>
            </h2>
        </motion.div>

        <div className="relative px-12">
          {/* Navigation Buttons */}
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#ED1C24] hover:text-white flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#ED1C24] hover:text-white flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Area */}
          <div className="py-4">
            <Slider ref={sliderRef} {...settings}>
              {partners.map((partner, index) => (
                <div key={index} className="px-3">
                  <div className="flex justify-center">
                    <motion.a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 hover:border-[#ED1C24] transition-all"
                    >
                      <span className="text-3xl md:text-4xl">{partner.icon}</span>
                    </motion.a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* แก้บัคตรงนี้: ปรับ overflow เป็น hidden เพื่อไม่ให้เห็นตัวที่ล้นออกมาข้างๆ */}
      <style>{`
        .slick-list {
          overflow: hidden !important; 
          margin: 0 -12px;
        }
        .slick-track {
          display: flex !important;
          align-items: center !important;
          padding: 20px 0;
        }
      `}</style>
    </section>
  );
}