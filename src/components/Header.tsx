import { useState } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const { language, setLanguage, isRTL } = useLanguage();
  const t = translations[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'works', label: t.nav.works },
    { id: 'advertisements', label: t.nav.advertisements },
    { id: 'legal', label: t.nav.legal },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
    setIsMenuOpen(false);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/22244444455', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1b4f63] to-[#163f50] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              src="https://i.postimg.cc/J07msSyW/oiljpoml.png"
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
            <div className={`${isRTL ? 'text-right text-white' : 'text-left text-white'}`}>
              <h1 className="text-lg font-bold leading-tight">
                {language === 'ar'
                  ? 'مانقص مال من صدقة'
                  : 'Manqass Mal Min Sadaqa'}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-yellow-400'
                    : 'text-white'
                } hover:text-yellow-300`}
              >
                {item.label}
              </button>
            ))}

            {/* 🔥 Donate Button - Brand Color */}
            <button
              onClick={handleWhatsApp}
              className="bg-[#c05321] hover:bg-[#a7441a] 
                         text-white px-6 py-2.5 
                         rounded-xl font-semibold 
                         shadow-md hover:shadow-lg 
                         transition-all duration-300 
                         hover:scale-105"
            >
              {t.nav.donate}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-white text-white hover:bg-white hover:text-[#1b4f63] transition-colors font-medium"
            >
              <Languages className="w-5 h-5" />
              {language === 'ar' ? 'FR' : 'عربي'}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen
              ? <X className="w-6 h-6" />
              : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-white/30 bg-gradient-to-r from-[#1b4f63] to-[#163f50]">
            <div className="flex flex-col gap-3">

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-yellow-400 text-[#163f50]'
                      : 'text-white hover:bg-white hover:text-[#1b4f63]'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* 🔥 Donate Button Mobile */}
              <button
                onClick={handleWhatsApp}
                className="bg-[#c05321] hover:bg-[#a7441a] 
                           text-white px-4 py-2.5 
                           rounded-xl font-semibold 
                           shadow-md hover:shadow-lg 
                           transition-all duration-300"
              >
                {t.nav.donate}
              </button>

              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-white text-white hover:bg-white hover:text-[#1b4f63] transition-colors font-medium"
              >
                <Languages className="w-5 h-5" />
                {language === 'ar' ? 'Français' : 'عربي'}
              </button>

            </div>
          </nav>
        )}

      </div>
    </header>
  );
};
