import { useEffect, useState } from 'react';
import { Heart, Users, Droplet, HandHeart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

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
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative container mx-auto px-4 text-center">
          <img
            src="https://i.postimg.cc/J07msSyW/oiljpoml.png"
            alt="Logo"
            className="h-24 md:h-32 w-24 md:w-32 object-contain mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
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
      </section>

      {/* 🎬 Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            {language === 'ar'
              ? 'فيديو تعريفي بالجمعية'
              : 'Vidéo de présentation'}
          </h2>

          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/JK68OciASMM"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* بقية الأقسام تبقى كما هي */}
      
    </div>
  );
};
