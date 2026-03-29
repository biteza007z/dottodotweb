import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

import krupound from './krupound.jpg'
import krumook from './krumook.jpg'

// เพิ่มฟิลด์ quote เข้าไปในข้อมูลแต่ละคน
const teamMembers = [
  {
    id: 1,
    name: 'P Pound',
    role: 'Founder & Head of Education',
    bio: 'ผู้เชี่ยวชาญด้านการออกแบบกระบวนการเรียนรู้ผ่านมุมมองมานุษยวิทยา เชื่อมั่นในการดึงศักยภาพของผู้คนออกมาผ่านการลงมือทำ',
    quote: 'xxxxxx',
    profileImg: krupound,
    activities: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800'
    ]
  },
  {
    id: 2,
    name: 'P Mook',
    role: 'Workshop Facilitator',
    bio: 'กระบวนกรผู้เต็มเปี่ยมไปด้วยพลังงานบวก ถนัดการสร้างบรรยากาศให้ทุกคนกล้าแสดงความคิดเห็นและเป็นตัวเองได้อย่างเต็มที่',
    quote: 'xxxxxx',
    profileImg: krumook,
    activities: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
      'https://images.unsplash.com/photo-1623976250156-4598d1f58dc7?w=800',
      'https://images.unsplash.com/photo-1658584124309-768111d9c5db?w=800'
    ]
  },
  {
    id: 3,
    name: 'ดอท ซี (Dot C)',
    role: 'Human Rights Specialist',
    bio: 'นักขับเคลื่อนด้านสิทธิมนุษยชนที่นำเอาเรื่องยากๆ มาย่อยให้เข้าใจง่ายผ่านกิจกรรมและเวิร์กชอปที่สนุกสนาน',
    quote: 'xxxxxx',
    profileImg: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=400',
    activities: [
      'https://images.unsplash.com/photo-1698895685696-ac619ef9b202?w=800',
      'https://images.unsplash.com/photo-1758685734201-72662f1a368d?w=800',
      'https://images.unsplash.com/photo-1758270705317-3ef6142d306f?w=800'
    ]
  },
  {
    id: 4,
    name: 'ดอท ดี (Dot D)',
    role: 'Creative Director',
    bio: 'ดูแลภาพลักษณ์และการสื่อสารทั้งหมดขององค์กร เปลี่ยนข้อมูลวิชาการให้กลายเป็นงานศิลปะที่เข้าถึงใจคน',
    quote: 'xxxxxx',
    profileImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    activities: [
      'https://images.unsplash.com/photo-1646756089735-487709743361?w=800',
      'https://images.unsplash.com/photo-1629822908853-b1d2a39ece98?w=800',
      'https://images.unsplash.com/photo-1758687126741-86737c57c210?w=800'
    ]
  },
  {
    id: 5,
    name: 'ดอท อี (Dot E)',
    role: 'Climate Action Lead',
    bio: 'ผู้นำทีมด้านสิ่งแวดล้อม ออกแบบเวิร์กชอปที่เชื่อมโยงผู้คนเข้ากับธรรมชาติเพื่อรับมือกับการเปลี่ยนแปลงของโลก',
    quote: 'xxxxxx',
    profileImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    activities: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'
    ]
  },
  {
    id: 6,
    name: 'ดอท เอฟ (Dot F)',
    role: 'Community Manager',
    bio: 'ผู้ประสานสิบทิศที่คอยดูแลทุกคนในคอมมูนิตี้ให้รู้สึกปลอดภัยและเป็นส่วนหนึ่งของครอบครัว Dot to Dot',
    quote: 'xxxxxx',
    profileImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    activities: [
      'https://images.unsplash.com/photo-1758270705317-3ef6142d306f?w=800',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
      'https://images.unsplash.com/photo-1698895685696-ac619ef9b202?w=800'
    ]
  }
];

const MemberCard = ({ member }: { member: typeof teamMembers[0] }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      
      {/* ส่วนซ้าย: รูปโปรไฟล์ ชื่อ ตำแหน่ง และ Bio */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
        <img 
          src={member.profileImg} 
          alt={member.name} 
          className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover mb-6 shadow-lg border-4 border-[#F5F5F5] mx-auto md:mx-0"
        />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
        <p className="text-[#ED1C24] font-bold text-sm mb-4 bg-red-50 px-3 py-1 rounded-full inline-block">
          {member.role}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed font-text">
          {member.bio}
        </p>
      </div>

      {/* ส่วนขวา: คำพูดประจำตัว และ รูปผลงาน 3 รูป */}
      <div className="w-full md:w-2/3 flex flex-col justify-between gap-6">
        
        {/* ตรงกลาง: คำพูดประจำตัว */}
        <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100 relative mt-4 md:mt-0">
          <span className="text-5xl text-[#FEB902] absolute -top-2 left-2 opacity-40 font-serif">"</span>
          <p className="text-gray-700 italic text-lg text-center px-8 relative z-10 font-medium">
            {member.quote}
          </p>
          <span className="text-5xl text-[#FEB902] absolute -bottom-6 right-4 opacity-40 font-serif">"</span>
        </div>

        {/* ด้านล่าง: รูปผลงาน 3 รูป (วางเรียงกัน) */}
        <div className="mt-auto">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Activities & Highlights</h4>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {member.activities.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm group">
                <img 
                  src={img} 
                  alt={`${member.name} Activity ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export function TeamModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#F9FAFB] w-full max-w-5xl rounded-[2rem] shadow-2xl relative my-auto overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 px-8 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Our Core <span className="text-[#ED1C24]">Team</span>
                </h2>
                <p className="text-gray-500 font-text mt-1">ผู้อยู่เบื้องหลังการขับเคลื่อนพื้นที่แห่งการเรียนรู้</p>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8 overflow-y-auto max-h-[75vh]">
              {teamMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}