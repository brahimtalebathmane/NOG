import { useEffect, useState } from 'react';
import { Heart, Users, Droplet, HandHeart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { Advertisements } from './Advertisements';

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

  useEffect(() => {
    fetch('/content/pages/home.json')
      .then(res => res.json())
      .then(data => setHomeContent(data))
      .catch(err => console.error('Error loading home content:', err));

    fetch('/content/works/index.json')
      .then(res => res.json())
      .then(fileNames => {
        return Promise.all(
          fileNames.map((fileName: string) =>
            fetch(`/content/works/${fileName}.json`).then(res => res.json())
          )
        );
      })
      .then(works => {
        setFeaturedWorks(works.filter(w => w.featured).slice(0, 3));
      })
      .catch(err => console.error('Error loading works:', err));
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/22244444455', '_blank');
  };

  const stats = [
    {
      icon: Heart,
      numberAr: '١٠٠+',
      numberFr: '100+',
      labelAr: 'مشروع خيري',
      labelFr: 'Projets caritatifs'
    },
    {
      icon: Users,
      numberAr: '٥٠٠٠+',
      numberFr: '5000+',
      labelAr: 'أسرة مستفيدة',
      labelFr: 'Familles bénéficiaires'
    },
    {
      icon: Droplet,
      numberAr: '٣٨',
      numberFr: '38',
      labelAr: 'بئر محفور',
      labelFr: 'Puits creusés'
    },
    {
      icon: HandHeart,
      numberAr: '٢٠٠+',
      numberFr: '200+',
      labelAr: 'متطوع',
      labelFr: 'Bénévoles'
    }
  ];

  if (!homeContent) return null;

  return (
    <div>

      {/* Hero Section */}
      <section
        className="relative text-white py-20 md:py-32"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/9fNkQznk/180944489-2711536482471444-1968639298452916963-n.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#1b4f63]/85"></div>

        <div className="relative container mx-auto px-4 text-center">
          <img
            src="https://i.postimg.cc/J07msSyW/oiljpoml.png"
            alt="Logo"
            className="h-24 md:h-32 w-24 md:w-32 object-contain mx-auto mb-6 drop-shadow-lg"
          />

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {language === 'ar' ? homeContent.heroTitleAr : homeContent.heroTitleFr}
          </h1>

          <p className="text-xl md:text-2xl mb-8 opacity-95 font-medium">
            {language === 'ar' ? homeContent.heroSloganAr : homeContent.heroSloganFr}
          </p>

          <button
            onClick={handleWhatsApp}
            className="bg-[#c05321] hover:bg-[#a8441c] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-xl"
          >
            {t.home.donate}
          </button>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#1b4f63]">
              {t.home.latestWorks}
            </h2>

            <button
              onClick={() => onNavigate('works')}
              className="text-[#1b4f63] hover:text-[#c05321] font-medium transition-colors"
            >
              {t.home.viewAll} ←
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Video Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
              <div className="relative h-48">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/JK68OciASMM"
                  title="YouTube video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 text-[#1b4f63] ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'تقسيمات على الأسر المتعففة' : 'Vidéo de présentation'}
                </h3>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar'
                    ? 'تعرف على أنشطة الجمعية وجهودها في خدمة المجتمع'
                    : 'Découvrez les activités et les efforts de l’association'}
                </p>
              </div>
            </div>

            {/* Dynamic Works */}
            {featuredWorks.map((work, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
                onClick={() => onNavigate('works')}
              >
                <img
                  src={work.images[0]}
                  alt={language === 'ar' ? work.titleAr : work.titleFr}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 text-[#1b4f63] ${isRTL ? 'text-right' : 'text-left'}`}>
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
      <section className="py-12 bg-[#f0f7f9]">
        <Advertisements />
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-[#1b4f63]" />

                  <div className="text-3xl font-bold text-[#c05321] mb-2">
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

      {/* Footer */}
      <footer className="bg-[#1b4f63] text-white mt-16">
        <div className="container mx-auto px-4 py-12">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://i.postimg.cc/J07msSyW/oiljpoml.png"
                  alt="Logo"
                  className="h-12 w-12 object-contain"
                />
                <h3 className="text-xl font-bold">{t.footer.associationName}</h3>
              </div>

              <p className="text-gray-200 leading-relaxed">
                {language === 'ar'
                  ? 'جمعية خيرية إنسانية تعمل في جميع مناطق موريتانيا'
                  : 'Association caritative opérant dans toutes les régions de Mauritanie'}
              </p>
            </div>

            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-lg font-bold mb-4">{t.footer.quickLinks}</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => onNavigate('home')} className="hover:text-[#c05321] transition-colors">
                  {t.nav.home}
                </button>
                <button onClick={() => onNavigate('about')} className="hover:text-[#c05321] transition-colors">
                  {t.nav.about}
                </button>
                <button onClick={() => onNavigate('works')} className="hover:text-[#c05321] transition-colors">
                  {t.nav.works}
                </button>
                <button onClick={() => onNavigate('legal')} className="hover:text-[#c05321] transition-colors">
                  {t.nav.legal}
                </button>
              </div>
            </div>

            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-lg font-bold mb-4">{t.footer.contact}</h3>
              <button
                onClick={handleWhatsApp}
                className="bg-[#c05321] text-white px-6 py-3 rounded-lg hover:bg-[#a8441c] transition-colors font-medium w-full"
              >
                {t.nav.contact}
              </button>
            </div>
          </div>

          <div className="border-t border-[#163f50] mt-8 pt-8 text-center">
            <p className="text-gray-200">
              {t.footer.rights} © 2024 {t.footer.associationName}{' '}
              <Heart className="w-4 h-4 text-[#c05321] inline" />
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
