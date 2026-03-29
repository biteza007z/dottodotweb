import { useState } from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import { TeamModal } from './TeamModal';

// ใช้รูปนี้เป็นรูปใหญ่รูปเดียว
import krupound from './krupound.jpg'

export function BioSection() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  return (
    <>
      <section id="bio" className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FEB902] opacity-10 rounded-full blur-3xl"></div>
        
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
                  className="absolute -left-3 -top-3 w-16 h-16 md:w-20 md:h-20 bg-[#EF6627] rounded-full z-0 opacity-100"
                  aria-hidden="true"
                ></span>
                
                {/* คำว่า "Our" ต้องอยู่ z-10 เพื่อทับวงกลม */}
                <span className="relative z-10 text-black">Meet</span>
              </span>

              {/* คำว่า "Workshops" */}
              <span className="text-black">Dot to Dot</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ทำความรู้จักกับทีมงาน Dot to Dot ที่เต็มไปด้วยประสบการณ์ที่หลากหลาย
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* ฝั่งซ้าย: เปลี่ยนจาก 6 รูป เป็น 1 รูปใหญ่ */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] w-full"
            >
              <div className="w-full h-full relative group overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-3xl">
                <img 
                  src={krupound} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Our Team" 
                />
                
                {/* Overlay แสดงชื่อ/ตำแหน่ง ตอน Hover (ถ้าไม่ต้องการลบออกได้ครับ) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <p className="text-white text-3xl font-bold mb-1">Our Core Team</p>
                  <p className="text-white/80 text-lg font-medium">The visionary minds behind Dot to Dot</p>
                </div>
              </div>


            </motion.div>

            {/* Story Content (ฝั่งขวา คงเดิมไว้) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#ED1C26]/10 to-[#FEB902]/10 p-8 rounded-3xl border-2 border-[#ED1C26]/20">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Founded in 2018, our organization began with a simple mission: 
                    to make creative education accessible and exciting for every young mind. 
                    What started in a small community center has grown into a vibrant 
                    network serving thousands of students worldwide.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We believe that creativity isn't just about art—it's about thinking 
                    differently, solving problems, and building confidence. Our workshops 
                    blend traditional skills with cutting-edge technology to prepare 
                    students for the future.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-lg text-center border-2 border-[#23419B]/20">
                    <div className="text-3xl font-bold text-[#ED1C26]">5K+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-lg text-center border-2 border-[#FCBA02]/20">
                    <div className="text-3xl font-bold text-[#23419B]">50+</div>
                    <div className="text-sm text-gray-600">Cities</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-lg text-center border-2 border-[#0B9B55]/20">
                    <div className="text-3xl font-bold text-[#0B9B55]">95%</div>
                    <div className="text-sm text-gray-600">Positive Feedback</div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsTeamModalOpen(true)}
                  className="w-full bg-[#000000] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1a3072] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  View Our Core Team
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TeamModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} />
    </>
  );
} 