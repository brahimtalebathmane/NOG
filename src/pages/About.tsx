import { useEffect, useState } from 'react';
import { Heart, Target, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';
import { loadAboutPage } from '../lib/contentLoader';

export const About = () => {
  const { language, isRTL } = useLanguage();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    loadAboutPage()
      .then(data => setContent(data))
      .catch(err => console.error('Error loading about content:', err));
  }, []);

  if (!content) return null;

  const features = [
    {
      icon: Heart,
      titleAr: 'الشفافية',
      titleFr: 'Transparence',
      descAr: 'نلتزم بالشفافية الكاملة في جميع عملياتنا',
      descFr: 'Nous nous engageons à une transparence totale dans toutes nos opérations'
    },
    {
      icon: Target,
      titleAr: 'الفعالية',
      titleFr: 'Efficacité',
      descAr: 'نعمل بفعالية لتحقيق أقصى استفادة من التبرعات',
      descFr: 'Nous travaillons efficacement pour maximiser les bénéfices des dons'
    },
    {
      icon: Award,
      titleAr: 'الاحترافية',
      titleFr: 'Professionnalisme',
      descAr: 'نتبع أعلى معايير الاحترافية في العمل الخيري',
      descFr: 'Nous suivons les plus hauts standards de professionnalisme dans le travail caritatif'
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? content.titleAr : content.titleFr}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
            <div className={`prose prose-lg max-w-none ${isRTL ? 'text-right' : 'text-left'}`}>
              <ReactMarkdown>
                {language === 'ar' ? content.contentAr : content.contentFr}
              </ReactMarkdown>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'ar' ? feature.titleAr : feature.titleFr}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' ? feature.descAr : feature.descFr}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-primary/5 rounded-xl p-8 text-center">
            <img
              src="https://i.postimg.cc/J07msSyW/oiljpoml.png"
              alt="Logo"
              className="h-20 w-20 object-contain mx-auto mb-4"
            />
            <p className="text-lg text-gray-700 leading-relaxed">
              {language === 'ar'
                ? 'نعمل بكل جد واجتهاد لتحقيق رسالتنا الإنسانية وخدمة المجتمع'
                : 'Nous travaillons avec sérieux et diligence pour réaliser notre mission humanitaire et servir la communauté'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
