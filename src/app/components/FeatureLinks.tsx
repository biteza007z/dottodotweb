import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ข้อมูลของการ์ดทั้ง 3 ใบ (ปรับข้อความ, การเว้นบรรทัด และเพิ่มสีตามในรูปภาพ)
const features = [
  {
    id: 'workshop',
    title: 'สำรวจเวิร์กชอป\nของ Dot to Dot',
    subtitle: 'ค้นพบเวิร์กชอปหลากหลายประเด็นที่\nเหมาะกับความต้องการของคุณ',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800',
    titleColor: 'text-[#ED1C24]', // สีแดง
  },
  {
    id: 'design',
    title: 'รับออกแบบ\nกระบวนการเรียนรู้',
    subtitle: 'หากมีประเด็นที่สนใจแต่อยากสร้างอิมแพ็ค\nด้วยกระบวนการพิเศษ เรายินดีรับ\nออกแบบให้เหมาะกับงานของคุณ',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800',
    titleColor: 'text-[#FCBA02]', // สีเหลือง
  },
  {
    id: 'bio',
    title: 'รู้จักทีมงาน\nDot to Dot',
    subtitle: 'ทำความรู้จักทีมงาน\nมากประสบการณ์จาก Dot to Dot',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800',
    titleColor: 'text-[#23419B]', // สีน้ำเงิน
  }
];

export function FeatureLinks() {
  // สร้าง State สำหรับเก็บข้อมูลการ์ดที่ถูกคลิกเพื่อนำมาแสดงในหน้าจอย่อ (Modal)
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  return (
    // พื้นหลังสีขาว เพื่อให้ตัดกับสีเทาอ่อนของ Hero Section
    <section className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              // เปลี่ยนจากเลื่อนหน้า เป็นการเปิดหน้าจอย่อแทน
              onClick={() => setSelectedFeature(feature)}
              className="cursor-pointer group flex flex-col items-start"
            >
              {/* รูปภาพขอบมนแบบในรูปตัวอย่าง (aspect-[4/5] และ rounded-[2.5rem]) */}
              <div className="w-full aspect-[4/5] mb-6 overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* ข้อความ Title และ Subtitle (เพิ่ม whitespace-pre-line ให้รองรับ \n และดึงสีจาก object มาใช้) */}
              <h3 className={`font-sans text-2xl md:text-3xl font-extrabold mb-2 whitespace-pre-line ${feature.titleColor}`}>
                {feature.title}
              </h3>
              <p className="font-text text-lg text-gray-500 whitespace-pre-line">
                {feature.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* หน้าดูข้อมูลแบบย่อ (Popup/Modal) จะแสดงขึ้นมาเมื่อมีการคลิกการ์ด */}
      
    </section>
  );
}