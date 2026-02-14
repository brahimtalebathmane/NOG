// src/pages/Home.tsx

import { useEffect, useState, useRef } from 'react';
import { Heart, Users, Droplet, HandHeart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import Advertisements from './Advertisements';

interface HomeProps {
  onNavigate: (page: string) => void;
}

interface Work {
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  images: string[];
  featured: boolean;
}

/* ===== 3D Reveal Hook ===== */
const useReveal3D = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-active');
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};

export const Home = ({ onNavigate }: HomeProps) => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [homeContent, setHomeContent] = useState<any>(null);
  const [featuredWorks, setFeaturedWorks] = useState<Work[]>([]);

  const heroRef = useReveal3D();
  const worksRef = useReveal3D();
  const statsRef = useReveal3D();

  useEffect(() => {
    fetch('/content/pages/home.json')
      .then(res => res.json())
      .then(data => setHomeContent(data))
      .catch(err => console.error('Error loading home content:', err));

    fetch('/content/works/index.json')
      .then(res => res.json())
      .then(fileNames =>
        Promise.all(fileNames.map((fileName: string) =>
          fetch(`/content/works/${fileName}.json`).then(res => res.json())
        ))
      )
      .then(works => setFeaturedWorks(works.filter(w => w.featured).slice(0, 3)))
      .catch(err => console.error('Error loading works:', err));
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/22244444455', '_blank');
  };

  const stats = [
    { icon: Heart, numberAr: '١٠٠+', numberFr: '100+', labelAr: 'مشروع خيري', labelFr: 'Projets caritatifs' },
    { icon: Users, numberAr: '٥٠٠٠+', numberFr: '5000+', labelAr: 'أسرة مستفيدة', labelFr: 'Familles bénéficiaires' },
    { icon: Droplet, numberAr: '٣٨', numberFr: '38', labelAr: 'بئر محفور', labelFr: 'Puits creusés' },
    { icon: HandHeart, numberAr: '٢٠٠+', numberFr: '200+', labelAr: 'متطوع', labelFr: 'Bénévoles' },
  ];

  if (!homeContent) return null;

  return (
    <div>

      {/* Hero Section */}
      <section
        className="relative text-white py-24 md:py-36 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://i.postimg.cc/9fNkQznk/180944489-2711536482471444-1968639298452916963-n.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b4f63]/90 via-[#1b4f63]/70 to-[#1b4f63]/80"></div>

        <div
          ref={heroRef}
          className="relative text-center px-4 max-w-3xl reveal-3d"
        >
          <img
            src="https://i.postimg.cc/J07msSyW/oiljpoml.png"
            alt="Logo"
            className="h-28 w-28 md:h-36 md:w-36 object-contain mx-auto mb-6 drop-shadow-lg"
          />

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            {language === 'ar' ? homeContent.heroTitleAr : homeContent.heroTitleFr}
          </h1>

          <p className="text-xl md:text-2xl mb-8 opacity-95 font-medium">
            {language === 'ar' ? homeContent.heroSloganAr : homeContent.heroSloganFr}
          </p>

          <button
            onClick={handleWhatsApp}
            className="bg-[#c05321] hover:bg-[#a7441a] text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105"
          >
            {t.home.donate}
          </button>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-16">
        <div ref={worksRef} className="container mx-auto px-4 reveal-3d">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {t.home.latestWorks}
            </h2>

            <button
              onClick={() => onNavigate('works')}
              className="text-[#1b4f63] hover:text-[#163f50] font-medium transition-colors"
            >
              {t.home.viewAll} ←
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Video Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-52">
                <iframe
                  className="w-full h-full rounded-t-2xl"
                  src="https://www.youtube.com/embed/JK68OciASMM"
                  title="YouTube video"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar'
                    ? 'تقسيمات على الأسر المتعففة'
                    : 'Vidéo de présentation'}
                </h3>
              </div>
            </div>

            {featuredWorks.map((work, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => onNavigate('works')}
              >
                <img
                  src={work.images[0]}
                  alt={language === 'ar' ? work.titleAr : work.titleFr}
                  className="w-full h-52 object-cover"
                />
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? work.titleAr : work.titleFr}
                  </h3>
                  <p className={`text-gray-600 line-clamp-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? work.descriptionAr : work.descriptionFr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advertisements */}
      <section className="py-12 bg-[#e6f2f5]">
        <Advertisements />
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div ref={statsRef} className="container mx-auto px-4 reveal-3d">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-[#1b4f63]" />
                  <div className="text-3xl font-bold text-[#1b4f63] mb-2">
                    {language === 'ar' ? stat.numberAr : stat.numberFr}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {language === 'ar' ? stat.labelAr : stat.labelFr}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};
