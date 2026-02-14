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

export const Home = ({ onNavigate }: HomeProps) => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [homeContent, setHomeContent] = useState<any>(null);
  const [featuredWorks, setFeaturedWorks] = useState<Work[]>([]);
  const revealRefs = useRef<HTMLDivElement[]>([]);

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

  // IntersectionObserver for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach(el => el && observer.observe(el));

    return () => observer.disconnect();
  }, [revealRefs.current]);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const stats = [
    { icon: Heart, numberAr: '١٠٠+', numberFr: '100+', labelAr: 'مشروع خيري', labelFr: 'Projets caritatifs', animation: 'reveal-up' },
    { icon: Users, numberAr: '٥٠٠٠+', numberFr: '5000+', labelAr: 'أسرة مستفيدة', labelFr: 'Familles bénéficiaires', animation: 'reveal-left' },
    { icon: Droplet, numberAr: '٣٨', numberFr: '38', labelAr: 'بئر محفور', labelFr: 'Puits creusés', animation: 'reveal-right' },
    { icon: HandHeart, numberAr: '٢٠٠+', numberFr: '200+', labelAr: 'متطوع', labelFr: 'Bénévoles', animation: 'reveal-zoom' },
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
        <div ref={addRef} className="reveal-down relative text-center px-4 max-w-3xl">
          <img
            src="https://i.postimg.cc/J07msSyW/oiljpoml.png"
            alt="Logo"
            className="h-28 w-28 md:h-36 md:w-36 object-contain mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight" style={{ color: '#c05321' }}>
            مانقص مال من صدقة
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 font-medium">
            {language === 'ar' ? homeContent.heroSloganAr : homeContent.heroSloganFr}
          </p>
          <button
            onClick={handleWhatsApp}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-transform transform hover:scale-105 shadow-xl"
          >
            {t.home.donate}
          </button>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 ref={addRef} className="reveal-left text-3xl font-bold text-gray-900">{t.home.latestWorks}</h2>
            <button
              onClick={() => onNavigate('works')}
              ref={addRef}
              className="reveal-right text-[#1b4f63] hover:text-[#163f50] font-medium transition-colors"
            >
              {t.home.viewAll} ←
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Intro Video */}
            <div ref={addRef} className="reveal-up bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-52">
                <iframe
                  className="w-full h-full rounded-t-2xl"
                  src="https://www.youtube.com/embed/JK68OciASMM"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'تقسيمات على الأسر المتعففة' : 'Vidéo de présentation'}
                </h3>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'تعرف على أنشطة الجمعية وجهودها في خدمة المجتمع' : 'Découvrez les activités et les efforts de l’association'}
                </p>
              </div>
            </div>

            {featuredWorks.map((work, idx) => {
              const animations = ['reveal-left', 'reveal-right', 'reveal-rotate'];
              const animationClass = animations[idx % animations.length];
              return (
                <div
                  key={idx}
                  ref={addRef}
                  className={`${animationClass} reveal-base bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer`}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Advertisements */}
      <section className="py-12 bg-[#e6f2f5]">
        <Advertisements />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  ref={addRef}
                  className={`${stat.animation} reveal-base bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow`}
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
