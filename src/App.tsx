import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Works } from './pages/Works';
import Advertisements from './pages/Advertisements';
import { Legal } from './pages/Legal';
import { Donate } from './pages/Donate';
import { Admin } from './pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (window.location.pathname.includes('/manage')) {
      setCurrentPage('admin');
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'works':
        return <Works />;
      case 'advertisements':
        return <Advertisements />;
      case 'legal':
        return <Legal />;
      case 'donate':
        return <Donate />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  const isAdminPage = currentPage === 'admin';

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {!isAdminPage && <Header currentPage={currentPage} onNavigate={setCurrentPage} />}
        <main className="flex-grow">
          {renderPage()}
        </main>
        {!isAdminPage && (
          <Footer
            onNavigate={setCurrentPage}
            className="bg-[#1b4f63] text-white"
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;
