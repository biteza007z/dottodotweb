import { X, Calendar, Clock, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// 1. เพิ่มฟังก์ชันสำหรับดึงสี Hover ให้ตรงกับสีกล่อง
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

interface Workshop {
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  time: string;
  duration: string;
  capacity: string;
  location: string;
  description: string;
  thumbnail: string;
}

interface AllWorkshopsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshops: Workshop[];
  onSelectWorkshop: (workshop: Workshop) => void;
}

export function AllWorkshopsModal({ isOpen, onClose, workshops, onSelectWorkshop }: AllWorkshopsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
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
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    All <span className="text-[]">Workshops</span>
                  </h2>
                  <p className="text-gray-600 mt-1">{workshops.length} workshops available</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#ED1C26] hover:text-white flex items-center justify-center transition-all flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Workshop Grid */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workshops.map((workshop, index) => (
                    <motion.div
                      key={workshop.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ y: -4 }}
                      onClick={() => {
                        onSelectWorkshop(workshop);
                        
                      }}
                      // เพิ่ม flex flex-col h-full เพื่อให้กล่องมีความสูงเท่ากันและจัดปุ่มให้อยู่ล่างสุด
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-gray-200 flex flex-col h-full"
                    >
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden shrink-0">
                        <img
                          src={workshop.thumbnail}
                          alt={workshop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* เอา Category ออกจากตรงนี้แล้ว */}
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-grow">
                        {/* Title */}
                        <h3 className={`text-lg font-bold text-gray-900 mb-2 transition-colors line-clamp-1 ${getHoverTextClass(workshop.categoryColor)}`}>
                          {workshop.title}
                        </h3>

                        {/* ย้าย Category มาไว้ตรงนี้ ใต้ title */}
                        <div className="mb-3">
                           <span 
                              className="inline-block px-3 py-1 rounded-full text-white font-semibold text-xs" 
                              style={{ backgroundColor: workshop.categoryColor }}
                           >
                              {workshop.category}
                           </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-1.5 mb-3 flex-grow">
                          <div className="flex items-center gap-2 text-gray-600 text-xs">
                            <Calendar className="w-3.5 h-3.5" style={{ color: workshop.categoryColor }} />
                            <span>{workshop.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 text-xs">
                            <Clock className="w-3.5 h-3.5" style={{ color: workshop.categoryColor }} />
                            <span>{workshop.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 text-xs">
                            <Users className="w-3.5 h-3.5" style={{ color: workshop.categoryColor }} />
                            <span>{workshop.capacity}</span>
                          </div>
                        </div>

                        {/* Button */}
                        <button
                          className="w-full text-white py-2 rounded-lg font-semibold text-xs transition-all mt-auto"
                          style={{ backgroundColor: workshop.categoryColor }}
                        >
                          View Details →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}