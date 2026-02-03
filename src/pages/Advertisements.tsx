import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadAllAdvertisements } from '../lib/contentLoader';

interface Advertisement {
  id?: string;
  titleAr: string;
  titleFr: string;
  images: string[];
  date: string;
  active: boolean;
}

export const Advertisements = () => {
  const { language, isRTL } = useLanguage();
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    try {
      const loadedAds = loadAllAdvertisements();
      setAdvertisements(loadedAds);
    } catch (err) {
      console.error('Error loading advertisements:', err);
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ar'
      ? date.toLocaleDateString('ar-EG')
      : date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'الإعلانات' : 'Annonces'}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'آخر إعلاناتنا وحملاتنا الخيرية'
              : 'Nos dernières annonces et campagnes caritatives'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements.map((ad, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              onClick={() => setSelectedAd(ad)}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={ad.images[0]}
                  alt={language === 'ar' ? ad.titleAr : ad.titleFr}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(ad.date)}
                </div>
                <h3 className={`text-xl font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? ad.titleAr : ad.titleFr}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAd && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAd(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? selectedAd.titleAr : selectedAd.titleFr}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedAd.date)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAd(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {selectedAd.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${language === 'ar' ? selectedAd.titleAr : selectedAd.titleFr} - ${idx + 1}`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
