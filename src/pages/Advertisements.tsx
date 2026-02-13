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
    <div className="container mx-auto px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-[#1b4f63]">
          {language === 'ar' ? 'الإعلانات' : 'Annonces'}
        </h2>
        <div className="w-20 h-1 bg-[#c05321] mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ads.map((ad, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
          >
            <img
              src={ad.image}
              alt={language === 'ar' ? ad.titleAr : ad.titleFr}
              className="w-full h-48 object-cover"
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
                className={`text-gray-600 mb-4 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                {language === 'ar'
                  ? ad.descriptionAr
                  : ad.descriptionFr}
              </p>

              {ad.link && (
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#c05321] hover:bg-[#a7441a] text-white px-4 py-2 rounded-lg transition-colors"
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
