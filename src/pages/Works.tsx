import { useEffect, useState } from 'react';
import { Calendar, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Work {
  id?: string;
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  images: string[];
  date: string;
  featured: boolean;
}

export const Works = () => {
  const { language, isRTL } = useLanguage();
  const [works, setWorks] = useState<Work[]>([]);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  useEffect(() => {
    fetch('/content/works/index.json')
      .then(res => res.json())
      .then(fileNames => {
        return Promise.all(
          fileNames.map((fileName: string) =>
            fetch(`/content/works/${fileName}.json`)
              .then(res => res.json())
              .then(data => ({ id: fileName, ...data }))
          )
        );
      })
      .then(loadedWorks => {
        const sorted = loadedWorks.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setWorks(sorted);
      })
      .catch(err => console.error('Error loading works:', err));
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
            {language === 'ar' ? 'أعمالنا وأنشطتنا' : 'Nos activités'}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'جهودنا المستمرة في خدمة المجتمع ومساعدة المحتاجين'
              : 'Nos efforts continus au service de la communauté et des nécessiteux'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 🎬 Video Card - First */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
            <div className="relative h-56">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/JK68OciASMM"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className={`text-xl font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? 'فيديو تعريفي بالجمعية' : 'Vidéo de présentation de l’association'}
              </h3>
            </div>
          </div>

          {/* Existing Works */}
          {works.map((work, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              onClick={() => setSelectedWork(work)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={work.images[0]}
                  alt={language === 'ar' ? work.titleAr : work.titleFr}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
                {work.images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <ImageIcon className="w-4 h-4" />
                    {work.images.length}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(work.date)}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
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

      {selectedWork && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? selectedWork.titleAr : selectedWork.titleFr}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedWork.date)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <p className={`text-lg text-gray-700 mb-6 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? selectedWork.descriptionAr : selectedWork.descriptionFr}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedWork.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${language === 'ar' ? selectedWork.titleAr : selectedWork.titleFr} - ${idx + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
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
