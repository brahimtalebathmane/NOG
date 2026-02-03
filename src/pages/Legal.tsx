import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';

export const Legal = () => {
  const { language, isRTL } = useLanguage();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch('/content/pages/legal.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Error loading legal content:', err));
  }, []);

  if (!content) return null;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? content.titleAr : content.titleFr}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className={`prose prose-lg max-w-none ${isRTL ? 'text-right' : 'text-left'}`}>
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-primary mb-6 mt-8" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-gray-700 mb-3 mt-4" {...props} />,
                  p: ({ node, ...props }) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                }}
              >
                {language === 'ar' ? content.contentAr : content.contentFr}
              </ReactMarkdown>
            </div>
          </div>

          <div className="mt-8 bg-primary/5 rounded-xl p-6 text-center">
            <p className="text-gray-700">
              {language === 'ar'
                ? 'للمزيد من المعلومات أو الاستفسارات، يرجى التواصل معنا'
                : 'Pour plus d\'informations ou de questions, veuillez nous contacter'}
            </p>
            <button
              onClick={() => window.open('https://wa.me/22244444455', '_blank')}
              className="mt-4 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              {language === 'ar' ? 'تواصل معنا' : 'Contactez-nous'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
