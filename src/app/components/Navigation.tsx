import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// ใช้แค่โลโก้สีแบบเดียว
import logoColor from './logo.png'; 

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'bio', 'portfolio', 'workshop', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // เพิ่ม 'หน้าแรก' กลับเข้ามาใน array
  const navItems = [
    { id: 'home', label: 'หน้าแรก' },
    { id: 'workshop', label: 'เวิร์กชอป' },
    { id: 'portfolio', label: 'ผลงานที่ผ่านมา' },
    { id: 'bio', label: 'เกี่ยวกับดอท' },
    { id: 'contact', label: 'ติดต่อดอท' },
  ];

  return (
    <>
      {/* โลโก้: แก้ไขจาก fixed เป็น absolute เพื่อให้อยู่ติดกับหน้าแรก ไม่ตามลงมา */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-6 left-6 md:left-10 z-50 flex items-center justify-center cursor-pointer"
        onClick={() => scrollToSection('home')}
      >
        <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
          <img 
            src={logoColor} 
            alt="Home" 
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* กล่องเมนู Navbar ชิดขวา ยังคงเป็น fixed (เลื่อนตาม) เหมือนเดิม */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 right-6 md:right-10 z-50 flex items-center justify-end w-max max-w-[80vw]"
      >
        <div className="bg-white rounded-full shadow-lg px-6 md:px-8 flex items-center h-[48px] md:h-[56px] gap-4 md:gap-8 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-sans whitespace-nowrap relative text-sm md:text-base transition-all duration-300 group flex items-center justify-center ${
                activeSection === item.id
                  ? 'text-[#ED1C24] font-semibold'
                  : 'text-gray-700 hover:text-[#21409A]'
              }`}
            >
              {item.label}

              {/* เส้นใต้ขีดแดงๆ สำหรับปุ่มที่กำลังใช้งานอยู่ */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ED1C24]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  );
}