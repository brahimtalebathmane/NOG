import { Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const handleWhatsApp = () => {
    window.open('https://wa.me/22244444455', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://i.postimg.cc/J07msSyW/oiljpoml.png"
                alt="Logo"
                className="h-12 w-12 object-contain"
              />
              <h3 className="text-xl font-bold">{t.footer.associationName}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {language === 'ar'
                ? 'جمعية خيرية إنسانية تعمل في جميع مناطق موريتانيا'
                : 'Association caritative opérant dans toutes les régions de Mauritanie'}
            </p>
          </div>

          {/* Quick Links */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-bold mb-4">{t.footer.quickLinks}</h3>
            <div className="flex flex-col gap-2">
              <button onClick={() => onNavigate('home')} className="text-gray-300 hover:text-white transition-colors">
                {t.nav.home}
              </button>
              <button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-white transition-colors">
                {t.nav.about}
              </button>
              <button onClick={() => onNavigate('works')} className="text-gray-300 hover:text-white transition-colors">
                {t.nav.works}
              </button>
              <button onClick={() => onNavigate('legal')} className="text-gray-300 hover:text-white transition-colors">
                {t.nav.legal}
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-bold mb-4">{t.footer.contact}</h3>
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4"
            >
              <MessageCircle className="w-5 h-5" />
              <span>+222 44 44 44 55</span>
            </button>
            <button
              onClick={handleWhatsApp}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2 w-full justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              {t.nav.contact}
            </button>
          </div>
        </div>

        {/* Financial Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <h3 className="text-center text-lg font-bold mb-4">
            {language === 'ar' ? 'المعلومات المالية' : 'Informations financières'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-gray-300 text-sm">
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <p><span className="font-semibold">{language === 'ar' ? 'الترخيص:' : 'Licence:'}</span> FA 010000211309202203328</p>
              <p><span className="font-semibold">{language === 'ar' ? 'رقم الحساب البنكي الدولي:' : 'IBAN:'}</span> MR1300018000082100067620171</p>
            </div>
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <p><span className="font-semibold">{language === 'ar' ? 'بنكيلي:' : 'Bank:'}</span> 016288</p>
              <p><span className="font-semibold">{language === 'ar' ? 'مصرفي:' : 'Bank ID:'}</span> 44444555</p>
              <p><span className="font-semibold">{language === 'ar' ? 'السداد:' : 'Payment:'}</span> 03650</p>
            </div>
          </div>
        </div>

        {/* Rights */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300 flex items-center justify-center gap-2">
            {t.footer.rights} © 2024 {t.footer.associationName}
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};
