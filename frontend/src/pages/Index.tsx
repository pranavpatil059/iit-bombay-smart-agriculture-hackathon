
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { BarChart3, FileText, Image, ShoppingBag, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { FarmerCard, ResponsiveGrid, FarmerButton, useDeviceInfo } from '@/components/FarmerResponsive';


const Index = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { isBasicPhone, isMidRange } = useDeviceInfo();

  useEffect(() => {
    toast({
      title: `🌾 ${t('common.welcome')} Smart Agriculture Hub`,
      description: t('messages.welcomeMessage'),
      duration: 5000,
    });
  }, [toast, t]);

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: t('priceEstimation.title'),
      description: t('priceEstimation.subtitle'),
      chip: t('chips.aiPowered'),
      link: "/price-estimation",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: t('governmentSchemes.title'),
      description: t('governmentSchemes.subtitle'),
      chip: t('chips.updatedWeekly'),
      link: "/government-schemes",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: t('cropHealth.title'),
      description: t('cropHealth.uploadImage') + " " + t('cropHealth.analyzeHealth'),
      chip: t('chips.computerVision'),
      link: "/crop-health",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: t('directMarket.title'),
      description: t('directMarket.subtitle'),
      chip: t('chips.marketplace'),
      link: "/direct-market",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: t('farmLoans.title'),
      description: t('farmLoans.subtitle'),
      chip: t('chips.banking'),
      link: "/farm-loans",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className={`${isBasicPhone ? 'py-12' : 'py-24'} px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50`}>
        <div className="container mx-auto text-center">
          <Badge className={`mb-6 bg-green-600 text-white px-4 py-2 ${isBasicPhone ? 'text-base' : 'text-lg'}`}>
            🏆 {t('homepage.hackathonBadge')}
          </Badge>
          <h1 className={`font-bold text-gray-800 mb-6 ${isBasicPhone ? 'text-3xl' : 'text-6xl'}`}>
            🌾 {t('homepage.mainTitle')}
          </h1>
          <p className={`text-gray-600 max-w-4xl mx-auto mb-12 ${isBasicPhone ? 'text-lg' : 'text-2xl'}`}>
            {t('homepage.mainSubtitle')}
          </p>
          
          <ResponsiveGrid className="mb-12">
            <div className={`p-6 bg-white rounded-lg shadow-lg ${isBasicPhone ? 'p-4' : 'p-6'}`}>
              <div className={`mb-4 ${isBasicPhone ? 'text-3xl' : 'text-4xl'}`}>🤖</div>
              <h3 className={`font-bold mb-2 ${isBasicPhone ? 'text-lg' : 'text-xl'}`}>{t('homepage.aiPowered')}</h3>
              <p className={`text-gray-600 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>{t('homepage.aiDescription')}</p>
            </div>
            <div className={`p-6 bg-white rounded-lg shadow-lg ${isBasicPhone ? 'p-4' : 'p-6'}`}>
              <div className={`mb-4 ${isBasicPhone ? 'text-3xl' : 'text-4xl'}`}>🌤️</div>
              <h3 className={`font-bold mb-2 ${isBasicPhone ? 'text-lg' : 'text-xl'}`}>{t('homepage.liveWeather')}</h3>
              <p className={`text-gray-600 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>{t('homepage.weatherDescription')}</p>
            </div>
            <div className={`p-6 bg-white rounded-lg shadow-lg ${isBasicPhone ? 'p-4' : 'p-6'}`}>
              <div className={`mb-4 ${isBasicPhone ? 'text-3xl' : 'text-4xl'}`}>🐆</div>
              <h3 className={`font-bold mb-2 ${isBasicPhone ? 'text-lg' : 'text-xl'}`}>{t('homepage.wildlifeProtection')}</h3>
              <p className={`text-gray-600 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>{t('homepage.wildlifeDescription')}</p>
            </div>
          </ResponsiveGrid>

          <div className={`flex gap-4 justify-center ${isBasicPhone ? 'flex-col' : 'flex-col sm:flex-row'}`}>
            <FarmerButton size="large" variant="primary">
              <Link to="/farmshield" className="flex items-center gap-2">🐆 {t('homepage.farmShieldPro')}</Link>
            </FarmerButton>
            <FarmerButton size="large" variant="secondary">
              <Link to="/wether" className="flex items-center gap-2">🌤️ {t('homepage.liveWeatherBtn')}</Link>
            </FarmerButton>
            <FarmerButton size="large" variant="success">
              <Link to="/crop-health" className="flex items-center gap-2">🔬 {t('homepage.cropAnalysis')}</Link>
            </FarmerButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`${isBasicPhone ? 'py-12' : 'py-24'} px-4 sm:px-6 lg:px-8`}>
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`font-bold text-gray-800 mb-4 ${isBasicPhone ? 'text-2xl' : 'text-4xl'}`}>{t('messages.ourFeatures')}</h2>
            <p className={`text-gray-600 ${isBasicPhone ? 'text-base' : 'text-xl'}`}>
              {t('messages.comprehensiveSolutions')}
            </p>
          </div>

          <ResponsiveGrid>
            {features.map((feature, index) => (
              <FarmerCard
                key={index}
                title={feature.title}
                content={feature.description}
                icon={feature.icon}
                href={feature.link}
              />
            ))}
          </ResponsiveGrid>
        </div>
      </section>

      {/* FarmShield Pro Section */}
      <section className={`${isBasicPhone ? 'py-8' : 'py-16'} bg-gradient-to-br from-orange-50 to-red-50`}>
        <div className="container mx-auto px-4 text-center">
          <Badge className={`mb-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 ${isBasicPhone ? 'text-base' : 'text-lg'}`}>
            🐆 {t('homepage.newWildlifeAI')}
          </Badge>
          <h2 className={`font-bold text-gray-800 mb-6 ${isBasicPhone ? 'text-2xl' : 'text-4xl'}`}>
            {t('homepage.farmShieldTitle')}
          </h2>
          <p className={`text-gray-600 max-w-3xl mx-auto mb-8 ${isBasicPhone ? 'text-base' : 'text-xl'}`}>
            {t('homepage.farmShieldDescription')}
          </p>
          <ResponsiveGrid className="mb-8">
            <div className={`p-6 bg-white rounded-lg border-2 border-orange-200 ${isBasicPhone ? 'p-4' : 'p-6'}`}>
              <div className={`mb-3 ${isBasicPhone ? 'text-2xl' : 'text-3xl'}`}>🚨</div>
              <h3 className={`font-bold mb-2 ${isBasicPhone ? 'text-base' : 'text-lg'}`}>{t('homepage.realTimeAlerts')}</h3>
              <p className={`text-gray-600 ${isBasicPhone ? 'text-xs' : 'text-sm'}`}>{t('homepage.alertsDescription')}</p>
            </div>
            <div className={`p-6 bg-white rounded-lg border-2 border-red-200 ${isBasicPhone ? 'p-4' : 'p-6'}`}>
              <div className={`mb-3 ${isBasicPhone ? 'text-2xl' : 'text-3xl'}`}>🎯</div>
              <h3 className={`font-bold mb-2 ${isBasicPhone ? 'text-base' : 'text-lg'}`}>{t('homepage.aiAccuracy')}</h3>
              <p className={`text-gray-600 ${isBasicPhone ? 'text-xs' : 'text-sm'}`}>{t('homepage.accuracyDescription')}</p>
            </div>
            <div className={`p-6 bg-white rounded-lg border-2 border-yellow-200 ${isBasicPhone ? 'p-4' : 'p-6'}`}>
              <div className={`mb-3 ${isBasicPhone ? 'text-2xl' : 'text-3xl'}`}>📍</div>
              <h3 className={`font-bold mb-2 ${isBasicPhone ? 'text-base' : 'text-lg'}`}>{t('homepage.districtsCoverage')}</h3>
              <p className={`text-gray-600 ${isBasicPhone ? 'text-xs' : 'text-sm'}`}>{t('homepage.coverageDescription')}</p>
            </div>
          </ResponsiveGrid>
          <FarmerButton 
            size="large" 
            variant="warning"
          >
            <Link to="/farmshield" className="flex items-center gap-2">🐆 {t('homepage.launchFarmShield')}</Link>
          </FarmerButton>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`${isBasicPhone ? 'py-12' : 'py-24'} px-4 sm:px-6 lg:px-8 bg-green-600 text-white`}>
        <div className="container mx-auto text-center">
          <h2 className={`font-bold mb-6 ${isBasicPhone ? 'text-2xl' : 'text-4xl'}`}>{t('messages.readyToTransform')}</h2>
          <p className={`mb-8 max-w-3xl mx-auto ${isBasicPhone ? 'text-base' : 'text-xl'}`}>
            {t('messages.joinThousands')}
          </p>
          <FarmerButton size="large" className="bg-white text-green-600 hover:bg-gray-100">
            <Link to="/price-estimation">{t('messages.startJourney')}</Link>
          </FarmerButton>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
