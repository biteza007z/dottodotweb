import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { FeatureLinks } from './components/FeatureLinks'; 
import { BioSection } from './components/BioSection';
import { PortfolioSection } from './components/PortfolioSection';
import { WorkshopSection } from './components/WorkshopSection';
import { ReviewSection } from './components/ReviewSection'; // ย้ายขึ้นมาไว้ก่อนหน้า Partner
import { PartnerSection } from './components/PartnerSection';
import { ContactSection } from './components/ContactSection';
import { ImageLightbox } from './components/ImageLightbox';

export default function App() {
  // 1. เพิ่ม State สำหรับควบคุม Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<{ src: string; caption: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. ฟังก์ชันเปิดรูป (รองรับทั้งแบบ String และ Object)
  const handleOpenLightbox = (images: any[], index: number) => {
    const formattedImages = images.map(img => 
      typeof img === 'string' ? { src: img, caption: 'Workshop Activity' } : img
    );
    setCurrentImages(formattedImages);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Navigation />
      <HeroSection />
      
      {/* 3. นำ FeatureLinks (หน้าตัวอย่างที่กดลิงก์ได้) มาวางคั่นไว้ตรงนี้ */}
      <FeatureLinks />
      
      {/* ส่งฟังก์ชันไปให้ WorkshopSection */}
      <WorkshopSection onImageClick={handleOpenLightbox} />
      
      <PortfolioSection />
      <BioSection />

      {/* --- ย้ายหน้ากำแพงรีวิวมาตรงนี้ ก่อน PartnerSection --- */}
      <ReviewSection />
      
      <PartnerSection />
      
      <ContactSection />

      {/* 4. Lightbox ตัวหลักที่คุมทั้งหน้า */}
      <ImageLightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={currentImages}
        currentIndex={currentIndex}
        onNavigate={setCurrentIndex}
      />
    </div>
  );
}