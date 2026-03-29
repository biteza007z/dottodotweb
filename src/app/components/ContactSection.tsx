import { useState } from 'react';
import { motion } from 'framer-motion'; // แก้ตรงนี้ให้เป็น framer-motion จะได้ไม่จอขาวครับ!
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from 'lucide-react';

export function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-100/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
           <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 flex items-center justify-center gap-x-4">
              
              {/* Container สำหรับ "Our" และวงกลมพื้นหลัง */}
              <span className="relative inline-block leading-none">
                {/* วงกลมสีเหลืองพื้นหลัง ปรับตำแหน่งด้วย absolute และ translate */}
                <span 
                  className="absolute -left-3 -top-3 w-16 h-16 md:w-20 md:h-20 bg-[#0B9B55] rounded-full z-0 opacity-100"
                  aria-hidden="true"
                ></span>
                
                {/* คำว่า "Our" ต้องอยู่ z-10 เพื่อทับวงกลม */}
                <span className="font-sans relative z-10 text-black">ติดต่อเรา</span>
              </span>

              {/* คำว่า "Workshops" */}
              <span className="text-black"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              หากคุณมีข้อสงสัย อยากแลกเปลี่ยน หรืออยากปรึกษาพวกเราถึง <br />
การออกแบบกระบวนการเรียนรู้ ติดต่อหาเราได้ทันที
            </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ED1C24]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#ED1C24]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600">hello@dottodot.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#21409A]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#21409A]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-gray-600">+66 12 345 6789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FEB902]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#FEB902]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-600">Bangkok, Thailand</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex flex-wrap gap-4 pt-2">
                  {/* ปุ่ม Facebook */}
                  <motion.a
                    href="https://web.facebook.com/dottodotTH/?locale=th_TH&_rdc=1&_rdr#"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white transition-all shadow-md hover:shadow-lg"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="font-semibold text-sm">Facebook</span>
                  </motion.a>

                  {/* ปุ่ม Instagram */}
                  <motion.a
                    href="https://www.instagram.com/dottodot_thailand?igsh=MWtzaGM3ZXBqYXhoYg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90 text-white transition-all shadow-md hover:shadow-lg"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="font-semibold text-sm">Instagram</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">First Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-colors"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Last Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 focus:border-[#ED1C24] transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all ${
                  formSubmitted ? 'bg-[#00A14B]' : 'bg-[#ED1C24] hover:bg-[#d11920]'
                }`}
              >
                {formSubmitted ? (
                  <>Message Sent Successfully!</>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600">
            © 2026 Dot to Dot. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}