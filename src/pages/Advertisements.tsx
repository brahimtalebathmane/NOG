import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface Advertisement {
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  image: string;
  link?: string;
}

const Advertisements = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const [ads, setAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    fetch('/content/advertisements/index.json')
      .then(res => res.json())
      .then((fileNames: string[]) => {
        return Promise.all(
          fileNames.map((fileName: string) =>
            fetch(`/content/advertisements/${fileName}.json`).then(res => res.json())
          )
        );
      })
      .then(data => setAds(data))
      .catch(err => console.error('Error loading advertisements:', err));
  }, []);

  if (!ads.length) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-[#1b4f63]">
          {language === 'ar' ? 'الإعلانات' : 'Annonces'}
        </h2>
        <div className="w-24 h-1 bg-[#c05321] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ads.map((ad, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <img
              src={ad.image}
              alt={language === 'ar' ? ad.titleAr : ad.titleFr}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/ads/fallback.png';
              }}
              className="w-full h-52 object-cover"
            />

            <div className="p-6">
              <h3
                className={`text-xl font-bold mb-2 text-[#1b4f63] ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                {language === 'ar' ? ad.titleAr : ad.titleFr}
              </h3>

              <p
                className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {language === 'ar' ? ad.descriptionAr : ad.descriptionFr}
              </p>

              {ad.link && (
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#c05321] hover:bg-[#a7441a] text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  {language === 'ar' ? 'عرض المزيد' : 'Voir plus'}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
