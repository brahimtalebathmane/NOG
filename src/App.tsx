import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Works } from './pages/Works';
import { Advertisements } from './pages/Advertisements';
import { Legal } from './pages/Legal';
import { Donate } from './pages/Donate';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
}

export default App;
