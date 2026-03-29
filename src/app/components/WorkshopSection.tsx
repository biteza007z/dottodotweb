import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Grid3x3 } from 'lucide-react';
import { WorkshopModal } from './WorkshopModal';
import { AllWorkshopsModal } from './AllWorkshopsModal';

// 1. เพิ่มฟังก์ชันสำหรับดึงสี Hover ตามสีของหมวดหมู่
const getHoverTextClass = (color: string) => {
  switch (color) {
    case '#ED1C26': return 'group-hover:text-[#ED1C26]'; // แดง
    case '#FCBA02': return 'group-hover:text-[#FCBA02]'; // เหลือง
    case '#23419B': return 'group-hover:text-[#23419B]'; // น้ำเงิน
    case '#0B9B55': return 'group-hover:text-[#0B9B55]'; // เขียว
    case '#EF6627': return 'group-hover:text-[#EF6627]'; // ส้ม
    case '#7A3B92': return 'group-hover:text-[#7A3B92]'; // ม่วง
    default: return 'group-hover:text-[#ED1C26]';
  }
};

const workshops = [
  {
    title: 'Digital Art & Design',
    category: 'Technology',
    categoryColor: '#ED1C26', // เปลี่ยนเป็นสีแดงใหม่
    date: 'Every Saturday',
    time: '2:00 PM - 5:00 PM',
    duration: '3 hours',
    capacity: 'Max 12 students',
    location: 'Innovation Lab',
    description: 'Learn to create stunning digital artwork using industry-standard tools and techniques. From graphic design to digital illustration, students will explore various creative digital media.',
    highlights: ['Introduction to Adobe Creative Suite', 'Digital illustration fundamentals', 'Graphic design principles', 'Portfolio-ready final projects'],
    outcomes: ['Master digital art tools and software', 'Understand design principles and composition', 'Create professional digital artwork', 'Build a creative portfolio'],
    images: [
      'https://images.unsplash.com/photo-1646756089735-487709743361?w=800',
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1646756089735-487709743361?w=600',
  },
  {
    title: 'Robotics & Coding',
    category: 'Technology',
    categoryColor: '#23419B', // เปลี่ยนเป็นสีน้ำเงินใหม่
    date: 'Every Sunday',
    time: '10:00 AM - 1:00 PM',
    duration: '4 hours',
    capacity: 'Max 10 students',
    location: 'Robotics Lab',
    description: 'Build and program your own robots! Students learn fundamentals of computer science and engineering while having fun creating amazing robotic projects.',
    highlights: ['Build robots from scratch', 'Learn Python programming', 'Engineering design process', 'Robot competition challenges'],
    outcomes: ['Understand robotics fundamentals', 'Apply coding to physical projects', 'Work effectively in teams', 'Problem-solve creatively'],
    images: [
      'https://images.unsplash.com/photo-1658584124309-768111d9c5db?w=800',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1658584124309-768111d9c5db?w=600',
  },
  {
    title: 'Creative Writing Lab',
    category: 'Arts',
    categoryColor: '#FCBA02', // เปลี่ยนเป็นสีเหลืองใหม่
    date: 'Wednesdays',
    time: '3:00 PM - 5:00 PM',
    duration: '2 hours',
    capacity: 'Max 15 students',
    location: 'Writing Studio',
    description: 'Unlock your storytelling potential through fun writing exercises and collaborative projects. Develop your unique voice and bring your creative ideas to life.',
    highlights: ['Creative storytelling techniques', 'Poetry and prose writing', 'Character development', 'Publishing your work'],
    outcomes: ['Develop writing skills and voice', 'Create compelling stories', 'Learn editing techniques', 'Publish a class anthology'],
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600',
  },
  {
    title: 'Music Production',
    category: 'Arts',
    categoryColor: '#0B9B55', // เปลี่ยนเป็นสีเขียวใหม่
    date: 'Fridays',
    time: '4:00 PM - 7:00 PM',
    duration: '3 hours',
    capacity: 'Max 8 students',
    location: 'Music Studio',
    description: 'Create your own beats and melodies using professional music production software. Learn the art of sound design, mixing, and producing complete tracks.',
    highlights: ['Digital audio workstation (DAW) basics', 'Beat making and composition', 'Sound design and mixing', 'Produce your own tracks'],
    outcomes: ['Master music production tools', 'Understand music theory basics', 'Create original compositions', 'Mix and master tracks'],
    images: [
      'https://images.unsplash.com/photo-1758687126741-86737c57c210?w=800',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1758687126741-86737c57c210?w=600',
  },
  {
    title: 'Photography Essentials',
    category: 'Visual Arts',
    categoryColor: '#EF6627', // เปลี่ยนเป็นสีส้มใหม่
    date: 'Bi-weekly',
    time: '1:00 PM - 4:00 PM',
    duration: '4 hours',
    capacity: 'Max 12 students',
    location: 'Media Center',
    description: 'Master the art of photography from composition to editing. Learn both digital and film photography techniques while developing your unique visual style.',
    highlights: ['Camera fundamentals', 'Composition and lighting', 'Photo editing with Lightroom', 'Build a photo portfolio'],
    outcomes: ['Understand camera settings', 'Capture professional photos', 'Edit and enhance images', 'Develop visual storytelling skills'],
    images: [
      'https://images.unsplash.com/photo-1698895685696-ac619ef9b202?w=800',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
      'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1698895685696-ac619ef9b202?w=600',
  },
  {
    title: 'Entrepreneurship Workshop',
    category: 'Business',
    categoryColor: '#7A3B92', // เปลี่ยนเป็นสีม่วงใหม่
    date: 'Monthly',
    time: '9:00 AM - 12:00 PM',
    duration: 'Full Day',
    capacity: 'Max 20 students',
    location: 'Innovation Hub',
    description: 'Turn your creative ideas into real projects. Learn business basics designed for young minds, from ideation to pitch presentation.',
    highlights: ['Business idea generation', 'Marketing and branding basics', 'Financial literacy', 'Pitch your startup idea'],
    outcomes: ['Develop entrepreneurial mindset', 'Create business plans', 'Learn marketing strategies', 'Present ideas confidently'],
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
  },
  {
    title: '3D Modeling & Animation',
    category: 'Technology',
    categoryColor: '#ED1C26', // เปลี่ยนเป็นสีแดงใหม่
    date: 'Tuesdays & Thursdays',
    time: '3:30 PM - 5:30 PM',
    duration: '2 hours',
    capacity: 'Max 10 students',
    location: 'Digital Lab',
    description: 'Dive into the world of 3D modeling and animation. Create stunning 3D objects and bring them to life with professional animation software.',
    highlights: ['Blender 3D basics', '3D modeling techniques', 'Animation fundamentals', 'Render high-quality scenes'],
    outcomes: ['Master 3D modeling tools', 'Create animated sequences', 'Understand lighting and texturing', 'Build a 3D portfolio'],
    images: [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
  },
  {
    title: 'Game Design & Development',
    category: 'Technology',
    categoryColor: '#23419B', // เปลี่ยนเป็นสีน้ำเงินใหม่
    date: 'Saturdays',
    time: '10:00 AM - 2:00 PM',
    duration: '4 hours',
    capacity: 'Max 12 students',
    location: 'Game Lab',
    description: 'Learn to create your own video games from concept to completion. Design gameplay, build levels, and code interactive experiences.',
    highlights: ['Unity game engine basics', 'Game design principles', 'Level design and testing', 'Publish your own game'],
    outcomes: ['Understand game development', 'Create playable game prototypes', 'Learn C# programming', 'Design engaging gameplay'],
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      'https://images.unsplash.com/photo-1600861195091-96ab9b56aab3?w=800',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600',
  },
  {
    title: 'Film Making & Cinematography',
    category: 'Visual Arts',
    categoryColor: '#EF6627', // เปลี่ยนเป็นสีส้มใหม่
    date: 'Sundays',
    time: '11:00 AM - 3:00 PM',
    duration: '4 hours',
    capacity: 'Max 10 students',
    location: 'Film Studio',
    description: 'Learn the art of visual storytelling through film. From scriptwriting to shooting and editing, create your own short films.',
    highlights: ['Scriptwriting and storyboarding', 'Camera techniques and composition', 'Video editing with Premiere Pro', 'Create a short film'],
    outcomes: ['Understand filmmaking process', 'Master camera operation', 'Edit professional videos', 'Tell stories visually'],
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
      'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
  },
  {
    title: 'Graphic Novel Creation',
    category: 'Arts',
    categoryColor: '#FCBA02', // เปลี่ยนเป็นสีเหลืองใหม่
    date: 'Wednesdays & Fridays',
    time: '4:00 PM - 6:00 PM',
    duration: '2 hours',
    capacity: 'Max 15 students',
    location: 'Art Studio',
    description: 'Combine storytelling with visual art to create your own graphic novels. Learn comic book art techniques and narrative structure.',
    highlights: ['Comic book art fundamentals', 'Character design and development', 'Panel layout and composition', 'Publish your graphic novel'],
    outcomes: ['Master comic art techniques', 'Create compelling characters', 'Understand visual narrative', 'Complete a graphic novel'],
    images: [
      'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800',
      'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800',
  },
  {
    title: 'Fashion Design & Sewing',
    category: 'Arts',
    categoryColor: '#0B9B55', // เปลี่ยนเป็นสีเขียวใหม่
    date: 'Saturdays',
    time: '1:00 PM - 5:00 PM',
    duration: '4 hours',
    capacity: 'Max 8 students',
    location: 'Fashion Studio',
    description: 'Express yourself through fashion design. Learn sketching, pattern making, and sewing to create your own unique garments.',
    highlights: ['Fashion illustration techniques', 'Pattern making basics', 'Sewing machine operation', 'Create wearable designs'],
    outcomes: ['Design original clothing', 'Master sewing skills', 'Understand fashion trends', 'Build a fashion portfolio'],
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600',
  },
  {
    title: 'Podcast Production',
    category: 'Media',
    categoryColor: '#7A3B92', // เปลี่ยนเป็นสีม่วงใหม่
    date: 'Thursdays',
    time: '5:00 PM - 7:00 PM',
    duration: '2 hours',
    capacity: 'Max 12 students',
    location: 'Audio Studio',
    description: 'Learn the art of audio storytelling and podcast production. From concept to publishing, create your own podcast series.',
    highlights: ['Podcast planning and scripting', 'Audio recording techniques', 'Sound editing and mixing', 'Launch your podcast'],
    outcomes: ['Develop podcast concepts', 'Master audio equipment', 'Edit professional audio', 'Publish to podcast platforms'],
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
      'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600',
  },
  {
    title: 'Web Design & Development',
    category: 'Technology',
    categoryColor: '#ED1C26', // เปลี่ยนเป็นสีแดงใหม่
    date: 'Mondays & Wednesdays',
    time: '4:00 PM - 6:00 PM',
    duration: '2 hours',
    capacity: 'Max 15 students',
    location: 'Tech Lab',
    description: 'Build beautiful and functional websites from scratch. Learn HTML, CSS, and JavaScript to bring your web designs to life.',
    highlights: ['HTML & CSS fundamentals', 'Responsive web design', 'JavaScript basics', 'Build a complete website'],
    outcomes: ['Create responsive websites', 'Master web technologies', 'Understand UX/UI principles', 'Launch your portfolio site'],
    images: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600',
  },
  {
    title: 'Environmental Science Lab',
    category: 'Science',
    categoryColor: '#0B9B55', // เปลี่ยนเป็นสีเขียวใหม่
    date: 'Bi-weekly',
    time: '10:00 AM - 1:00 PM',
    duration: '3 hours',
    capacity: 'Max 12 students',
    location: 'Science Center',
    description: 'Explore environmental science through hands-on experiments and field studies. Learn about sustainability and conservation.',
    highlights: ['Ecosystem studies', 'Water quality testing', 'Renewable energy projects', 'Environmental advocacy'],
    outcomes: ['Understand environmental issues', 'Conduct scientific research', 'Develop sustainability projects', 'Become eco-conscious leaders'],
    images: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600',
  },
  {
    title: 'Theater & Performance',
    category: 'Performing Arts',
    categoryColor: '#EF6627', // เปลี่ยนเป็นสีส้มใหม่
    date: 'Tuesdays',
    time: '5:00 PM - 7:30 PM',
    duration: '2.5 hours',
    capacity: 'Max 20 students',
    location: 'Theater Hall',
    description: 'Develop confidence and creativity through theatrical performance. Learn acting, improvisation, and stagecraft.',
    highlights: ['Acting fundamentals', 'Improvisation techniques', 'Script analysis', 'Live performance showcase'],
    outcomes: ['Build performance confidence', 'Master acting techniques', 'Collaborate in theater', 'Perform in live shows'],
    images: [
      'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
      'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800',
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600',
  },
];

export function WorkshopSection() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [showAllWorkshops, setShowAllWorkshops] = useState(false);

  useEffect(() => {
    if (selectedWorkshop || showAllWorkshops) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedWorkshop, showAllWorkshops]);

  return (
    <>
      <section id="workshop" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
<motion.div className="text-center mb-16 relative">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 flex items-center justify-center gap-x-4">
              
              {/* Container สำหรับ "Our" และวงกลมพื้นหลัง */}
              <span className="relative inline-block leading-none">
                {/* วงกลมสีเหลืองพื้นหลัง ปรับตำแหน่งด้วย absolute และ translate */}
                <span 
                  className="absolute -left-4.5 -top-3 w-16 h-16 md:w-20 md:h-20 bg-[#FCBA02] rounded-full z-0 opacity-100"
                  aria-hidden="true"
                ></span>
                
                {/* คำว่า "Our" ต้องอยู่ z-10 เพื่อทับวงกลม */}
                <span className="relative z-10 text-black">Our</span>
              </span>

              {/* คำว่า "Workshops" */}
              <span className="text-black">Workshops</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              
              หากคุณกำลังมองหาเวิร์กชอปเพื่อการเรียนรู้ไม่ว่าจะมีกลุ่มเป้าหมายเป็นเด็กๆ วัยรุ่น หรือผู้ใหญ่ 
<br />
                พวกเราขอนำเสนอเวิร์กชอป ออกแบบโดยกระบวนกรมากประสบการณ์ 
<br />
                  และออกแบบโดยมีผู้เรียนเป็นศูนย์กลาง และพาเรียนรู้ได้ทุกประเด็น
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {workshops.slice(0, 6).map((workshop, index) => (
              <motion.div
                key={workshop.title}
                onClick={() => setSelectedWorkshop(workshop)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img src={workshop.thumbnail} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  {/* ลบ category ออกจากตรงนี้ */}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  {/* 2. แทรกการทำงานเปลี่ยนสี Hover ตรงนี้ */}
                  <h3 className={`text-xl font-bold mb-2 ${getHoverTextClass(workshop.categoryColor)}`}>{workshop.title}</h3>
                  
                  {/* ย้าย Category มาไว้ตรงนี้ ใต้ title */}
                  <div className="mb-4">
                     <span 
                        className="inline-block px-3 py-1 rounded-full text-white font-semibold text-xs" 
                        style={{ backgroundColor: workshop.categoryColor }}
                     >
                        {workshop.category}
                     </span>
                  </div>

                  <div className="space-y-2 mb-4 flex-grow">
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><Calendar className="w-4 h-4" style={{ color: workshop.categoryColor }} /><span>{workshop.date}</span></div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><Clock className="w-4 h-4" style={{ color: workshop.categoryColor }} /><span>{workshop.duration}</span></div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><Users className="w-4 h-4" style={{ color: workshop.categoryColor }} /><span>{workshop.capacity}</span></div>
                  </div>
                  <button className="w-full text-white py-2.5 rounded-lg font-semibold text-sm transition-all mt-auto" style={{ backgroundColor: workshop.categoryColor }}>Click to view details →</button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setShowAllWorkshops(true)}
              className="px-8 py-4 bg-[#000000] text-white rounded-full font-bold shadow-lg flex items-center gap-3"
            >
              <Grid3x3 className="w-6 h-6" /> View All {workshops.length} Workshops
            </button>
          </div>
        </div>
      </section>

      {/* 1. หน้า All Workshops (ส่ง setSelectedWorkshop เข้าไปเพื่อเปิดทับ) */}
      <AllWorkshopsModal
        isOpen={showAllWorkshops}
        onClose={() => setShowAllWorkshops(false)}
        workshops={workshops}
        onSelectWorkshop={(workshop: any) => setSelectedWorkshop(workshop)}
      />

      {/* 2. หน้า WorkshopModal (เปิดทับหน้า AllWorkshops) */}
      <WorkshopModal
        isOpen={selectedWorkshop !== null}
        onClose={() => setSelectedWorkshop(null)}
        workshop={selectedWorkshop}
      />
    </>
  );
}