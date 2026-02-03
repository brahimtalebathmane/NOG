import { MessageCircle, Heart, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

export const Donate = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const handleWhatsApp = () => {
    window.open('https://wa.me/22244444455', '_blank');
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-primary fill-current" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.donate.title}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              {t.donate.description}
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl shadow-xl p-8 md:p-12 mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {language === 'ar'
                ? 'تبرع الآن وكن سبباً في الخير'
                : 'Faites un don maintenant et soyez une cause de bien'}
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'صدقتك تصل إلى مستحقيها بأمانة وشفافية كاملة'
                : 'Votre don parvient à ses bénéficiaires avec intégrité et transparence totale'}
            </p>
            <button
              onClick={handleWhatsApp}
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              {t.donate.whatsappButton}
            </button>
            <div className="mt-6 text-lg opacity-90">
              <span className="font-bold">+222 44 44 44 55</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <CreditCard className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t.donate.bankDetails}
              </h2>
            </div>
            <div className="flex justify-center">
              <img
                src="https://i.postimg.cc/XJ95xB7d/pojpoml.png"
                alt="Payment Information"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary fill-current" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                {language === 'ar' ? 'شفافية كاملة' : 'Transparence totale'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'ar'
                  ? 'نضمن وصول تبرعاتكم لمستحقيها'
                  : 'Nous garantissons que vos dons parviennent aux bénéficiaires'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                {language === 'ar' ? 'تواصل سريع' : 'Contact rapide'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'ar'
                  ? 'نرد على استفساراتكم فوراً'
                  : 'Nous répondons immédiatement à vos questions'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                {language === 'ar' ? 'تحويل آمن' : 'Transfert sécurisé'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'ar'
                  ? 'نستخدم قنوات آمنة للتحويلات'
                  : 'Nous utilisons des canaux sécurisés pour les transferts'}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-primary/5 rounded-xl p-8 text-center">
            <p className={`text-lg text-gray-700 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'ar'
                ? '﴿ مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَن يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ ﴾'
                : '﴿ L\'exemple de ceux qui dépensent leurs biens dans le sentier d\'Allah est semblable à une graine d\'où naissent sept épis, à cent grains l\'épi. Car Allah multiplie la récompense à qui Il veut et la grâce d\'Allah est immense et Il est Omniscient ﴾'}
            </p>
            <p className="text-sm text-gray-500">
              {language === 'ar' ? 'سورة البقرة - الآية 261' : 'Sourate Al-Baqara - Verset 261'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
