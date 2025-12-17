
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { BarChart3, FileText, Image, ShoppingBag, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';


const Index = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-600 text-white text-lg px-4 py-2">
            🏆 {t('homepage.hackathonBadge')}
          </Badge>
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            🌾 {t('homepage.mainTitle')}
          </h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12">
            {t('homepage.mainSubtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">{t('homepage.aiPowered')}</h3>
              <p className="text-gray-600">{t('homepage.aiDescription')}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🌤️</div>
              <h3 className="text-xl font-bold mb-2">{t('homepage.liveWeather')}</h3>
              <p className="text-gray-600">{t('homepage.weatherDescription')}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🐆</div>
              <h3 className="text-xl font-bold mb-2">{t('homepage.wildlifeProtection')}</h3>
              <p className="text-gray-600">{t('homepage.wildlifeDescription')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link to="/farmshield">🐆 {t('homepage.farmShieldPro')}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/wether">🌤️ {t('homepage.liveWeatherBtn')}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/crop-health">🔬 {t('homepage.cropAnalysis')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('messages.ourFeatures')}</h2>
            <p className="text-xl text-gray-600">
              {t('messages.comprehensiveSolutions')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="block hover:no-underline">
                <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      {feature.icon}
                    </div>
                    <Badge className="bg-green-600 text-white text-xs">{feature.chip}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FarmShield Pro Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 text-white text-lg px-4 py-2">
            🐆 {t('homepage.newWildlifeAI')}
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {t('homepage.farmShieldTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('homepage.farmShieldDescription')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-lg border-2 border-orange-200">
              <div className="text-3xl mb-3">🚨</div>
              <h3 className="font-bold mb-2">{t('homepage.realTimeAlerts')}</h3>
              <p className="text-sm text-gray-600">{t('homepage.alertsDescription')}</p>
            </div>
            <div className="p-6 bg-white rounded-lg border-2 border-red-200">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold mb-2">{t('homepage.aiAccuracy')}</h3>
              <p className="text-sm text-gray-600">{t('homepage.accuracyDescription')}</p>
            </div>
            <div className="p-6 bg-white rounded-lg border-2 border-yellow-200">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-bold mb-2">{t('homepage.districtsCoverage')}</h3>
              <p className="text-sm text-gray-600">{t('homepage.coverageDescription')}</p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            asChild
          >
            <Link to="/farmshield">🐆 {t('homepage.launchFarmShield')}</Link>
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{t('messages.readyToTransform')}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('messages.joinThousands')}
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
            <Link to="/price-estimation">{t('messages.startJourney')}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
