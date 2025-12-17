import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Animated Particle Background */}
      <ParticleBackground className="opacity-50" />
      
      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-200 mb-6">🌾 {t('notFound.title')}</p>
        <p className="text-gray-300 mb-8">{t('notFound.description')}</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          🏠 {t('notFound.returnHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
