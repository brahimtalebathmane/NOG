import { useEffect, useState } from 'react';
import { Heart, Users, Droplet, HandHeart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { loadHomePage, loadAllWorks } from '../lib/contentLoader';

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
    loadHomePage()
      .then(data => setHomeContent(data))
      .catch(err => console.error('Error loading home content:', err));

    try {
      const allWorks = loadAllWorks();
      setFeaturedWorks(allWorks.filter(w => w.featured).slice(0, 3));
    } catch (err) {
      console.error('Error loading works:', err);
    }
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
      <section
        className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20 md:py-32"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0,102,51,0.95) 0%, rgba(0,153,76,0.95) 100%)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
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
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              {t.home.donate}
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className={`text-lg md:text-xl text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'ar' ? homeContent.introTextAr : homeContent.introTextFr}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-2">
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t.home.latestWorks}</h2>
            <button
              onClick={() => onNavigate('works')}
              className="text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {t.home.viewAll} ←
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWorks.map((work, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => onNavigate('works')}
              >
                <img
                  src={work.images[0]}
                  alt={language === 'ar' ? work.titleAr : work.titleFr}
                  className="w-full h-48 object-cover"
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

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'ar'
              ? 'كن جزءاً من الخير'
              : 'Faites partie du bien'}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'مساهمتك تصنع الفرق في حياة المحتاجين'
              : 'Votre contribution fait la différence dans la vie des nécessiteux'}
          </p>
          <button
            onClick={handleWhatsApp}
            className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            {t.home.donate}
          </button>
        </div>
      </section>
    </div>
  );
};
