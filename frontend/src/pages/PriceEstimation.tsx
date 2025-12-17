
import { BarChart, TrendingUp, LineChart, DollarSign } from 'lucide-react';
import Layout from '@/components/Layout';
import PriceCalculator from '@/components/PriceCalculator';
import RotatingCube from '@/components/RotatingCube';
import { useLanguage } from '@/contexts/LanguageContext';

const PriceEstimation = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 z-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1503139739043-2a47d2f1fea1?w=1920&auto=format&fit=crop&q=20" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-down">
            <h1 className="text-4xl font-semibold mb-4">{t('priceEstimation.title')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('priceEstimation.subtitle')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-2xl font-medium mb-6">{t('priceEstimation.howItWorks')}</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{t('priceEstimation.marketAnalysis')}</h3>
                    <p className="text-muted-foreground">
                      {t('priceEstimation.marketAnalysisDesc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{t('priceEstimation.resourceEvaluation')}</h3>
                    <p className="text-muted-foreground">
                      {t('priceEstimation.resourceEvaluationDesc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{t('priceEstimation.yieldPrediction')}</h3>
                    <p className="text-muted-foreground">
                      {t('priceEstimation.yieldPredictionDesc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{t('priceEstimation.priceRangeGeneration')}</h3>
                    <p className="text-muted-foreground">
                      {t('priceEstimation.priceRangeGenerationDesc')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border/50 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 opacity-50">
                  <RotatingCube />
                </div>
                <h3 className="font-medium mb-3">{t('priceEstimation.didYouKnow')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('priceEstimation.profitTip')}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center animate-fade-in">
              <PriceCalculator />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PriceEstimation;
