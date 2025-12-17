import { useState } from 'react';
import { Leaf, Microscope, AlertTriangle, ThumbsUp, Gauge, Calendar, Sprout } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import ImageUploader from '@/components/ImageUploader';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AnalysisResult {
  health: number;
  disease: string | null;
  recommendations: string[];
  confidence: number;
}

interface SeasonalCrop {
  name: string;
  diseases: {
    name: string;
    symptoms: string;
    remedies: string[];
  }[];
  fertilizers: string[];
}

const CropHealth = () => {
  const { t } = useLanguage();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  const handleImageAnalyzed = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  const getHealthStatus = (health: number) => {
    if (health >= 90) return { label: t('cropHealth.excellent'), color: "text-green-600" };
    if (health >= 75) return { label: t('cropHealth.good'), color: "text-green-500" };
    if (health >= 60) return { label: t('cropHealth.fair'), color: "text-yellow-500" };
    if (health >= 40) return { label: t('cropHealth.poor'), color: "text-orange-500" };
    return { label: t('cropHealth.critical'), color: "text-red-500" };
  };
  
  const getHealthColor = (health: number) => {
    if (health >= 90) return "bg-green-600";
    if (health >= 75) return "bg-green-500";
    if (health >= 60) return "bg-yellow-500";
    if (health >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  // Current season in India (March)
  const currentSeason = t('cropHealth.spring') || "Spring";

  // Seasonal crops data for India in Spring
  const seasonalCrops: SeasonalCrop[] = [
    {
      name: "Wheat",
      diseases: [
        {
          name: "Leaf Rust",
          symptoms: "Orange-brown pustules on leaves",
          remedies: [
            "Apply fungicides like propiconazole or tebuconazole",
            "Plant rust-resistant varieties",
            "Maintain proper field sanitation"
          ]
        },
        {
          name: "Powdery Mildew",
          symptoms: "White powdery growth on leaves and stems",
          remedies: [
            "Apply sulfur-based fungicides",
            "Increase air circulation between plants",
            "Maintain proper spacing between plants"
          ]
        }
      ],
      fertilizers: [
        "NPK (12:32:16) during sowing",
        "Urea (46% N) at tillering stage",
        "DAP (18-46-0) for phosphorus needs"
      ]
    },
    {
      name: "Mustard",
      diseases: [
        {
          name: "White Rust",
          symptoms: "White pustules on leaves and stems",
          remedies: [
            "Apply mancozeb or metalaxyl-based fungicides",
            "Practice crop rotation",
            "Avoid overhead irrigation"
          ]
        },
        {
          name: "Alternaria Blight",
          symptoms: "Dark brown to black spots with concentric rings",
          remedies: [
            "Apply iprodione or difenoconazole fungicides",
            "Maintain field sanitation",
            "Use disease-free seeds"
          ]
        }
      ],
      fertilizers: [
        "NPK (15:15:15) as basal dose",
        "Sulfur-enriched fertilizers (important for oilseed crops)",
        "Foliar spray of 2% urea at flowering stage"
      ]
    },
    {
      name: "Onion",
      diseases: [
        {
          name: "Purple Blotch",
          symptoms: "Purple lesions on leaves with yellow halos",
          remedies: [
            "Apply chlorothalonil or mancozeb fungicides",
            "Maintain proper spacing",
            "Avoid excessive irrigation"
          ]
        },
        {
          name: "Downy Mildew",
          symptoms: "Pale green to yellow patches on leaves",
          remedies: [
            "Apply metalaxyl or fosetyl-aluminum fungicides",
            "Improve field drainage",
            "Practice crop rotation"
          ]
        }
      ],
      fertilizers: [
        "NPK (10:26:26) as basal application",
        "Calcium ammonium nitrate (25% N) as top dressing",
        "Micronutrient mixture containing zinc and boron"
      ]
    },
    {
      name: "Tomato",
      diseases: [
        {
          name: "Early Blight",
          symptoms: "Dark brown spots with concentric rings on lower leaves",
          remedies: [
            "Apply copper-based fungicides",
            "Remove infected leaves",
            "Ensure proper plant spacing"
          ]
        },
        {
          name: "Bacterial Spot",
          symptoms: "Small, dark, water-soaked spots on leaves and fruits",
          remedies: [
            "Apply copper-based bactericides",
            "Use disease-free seeds",
            "Avoid overhead irrigation"
          ]
        }
      ],
      fertilizers: [
        "Compost or well-rotted manure before planting",
        "NPK (19:19:19) at vegetative stage",
        "Calcium nitrate to prevent blossom end rot"
      ]
    },
    {
      name: "Potato",
      diseases: [
        {
          name: "Late Blight",
          symptoms: "Dark, water-soaked lesions on leaves and stems",
          remedies: [
            "Apply mancozeb or chlorothalonil fungicides",
            "Plant resistant varieties",
            "Ensure proper hilling"
          ]
        },
        {
          name: "Early Blight",
          symptoms: "Dark brown concentric rings on lower leaves",
          remedies: [
            "Apply azoxystrobin or difenoconazole fungicides",
            "Maintain proper spacing",
            "Practice crop rotation"
          ]
        }
      ],
      fertilizers: [
        "NPK (10:26:26) at planting",
        "Potassium sulfate for tuber development",
        "Calcium ammonium nitrate for top dressing"
      ]
    }
  ];

  return (
    <Layout>
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-down">
            <h1 className="text-4xl font-semibold mb-4">
              {t('cropHealth.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('cropHealth.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 animate-fade-in-left">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl">
                    <Leaf className="h-5 w-5 mr-2 text-primary" />
                    {t('cropHealth.howItWorks')}
                  </CardTitle>
                  <CardDescription>
                    {t('cropHealth.howItWorksDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full text-primary">
                      <Microscope className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{t('cropHealth.visualAnalysis')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('cropHealth.visualAnalysisDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full text-primary">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{t('cropHealth.diseaseDetection')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('cropHealth.diseaseDetectionDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full text-primary">
                      <Gauge className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{t('cropHealth.healthAssessment')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('cropHealth.healthAssessmentDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full text-primary">
                      <ThumbsUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        {t('cropHealth.personalizedRecommendations')}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t('cropHealth.personalizedRecommendationsDesc')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl">
                    <ImageUploader onImageAnalyzed={handleImageAnalyzed} />
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Best Results Card - Moved below the image uploader */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-base mb-2">
                      {t('cropHealth.forBestResults')}
                    </h3>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span>{t('cropHealth.takeClearPhotos')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span>{t('cropHealth.avoidShadows')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span>{t('cropHealth.includeHealthyParts')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span>{t('cropHealth.provideMultipleAngles')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {analysisResult && (
                <Card className="overflow-hidden">
                  <div
                    className={`h-2 ${getHealthColor(analysisResult.health)}`}
                  ></div>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span>{t('cropHealth.analysisResults')}</span>
                      <span
                        className={`text-sm ${
                          getHealthStatus(analysisResult.health).color
                        }`}
                      >
                        {getHealthStatus(analysisResult.health).label}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      {t('cropHealth.confidence')}: {analysisResult.confidence.toFixed(1)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {t('cropHealth.healthScore')}
                        </span>
                        <span className="text-sm">
                          {analysisResult.health.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={analysisResult.health} className="h-2" />
                    </div>

                    {analysisResult.disease && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <div className="flex items-center text-amber-700">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          <span className="font-medium">
                            {t('cropHealth.detectedIssue')}: {analysisResult.disease}
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-2">{t('cropHealth.recommendations')}</h4>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Seasonal Crops Section */}
          <div className="mt-16 animate-fade-in-up">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Calendar className="h-6 w-6 mr-2 text-primary" />
                  {t('cropHealth.seasonalCrops', { season: currentSeason })}
                </CardTitle>
                <CardDescription>
                  {t('cropHealth.seasonalCropsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Accordion type="single" collapsible className="w-full">
                  {seasonalCrops.map((crop, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="hover:bg-muted/30 px-4 py-2 rounded-lg">
                        <div className="flex items-center">
                          <Sprout className="h-5 w-5 mr-2 text-primary" />
                          <span>{crop.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pt-2 pb-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-800 dark:text-white mb-3">
                              {t('cropHealth.commonDiseases')}
                            </h4>
                            <div className="space-y-4">
                              {crop.diseases.map((disease, dIndex) => (
                                <div
                                  key={dIndex}
                                  className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900 border border-purple-100 dark:border-purple-700"
                                >
                                  <h5 className="font-medium text-purple-800 dark:text-purple-300 mb-1">
                                    {disease.name}
                                  </h5>
                                  <p className="text-sm text-gray-800 dark:text-white mb-2">
                                    <span className="font-medium">
                                      {t('cropHealth.symptoms')}
                                    </span>{" "}
                                    {disease.symptoms}
                                  </p>
                                  <div>
                                    <h6 className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-1">
                                      {t('cropHealth.remedies')}
                                    </h6>
                                    <ul className="space-y-1">
                                      {disease.remedies.map(
                                        (remedy, rIndex) => (
                                          <li
                                            key={rIndex}
                                            className="flex items-start text-xs text-gray-800 dark:text-white"
                                          >
                                            <span className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                                            <span>{remedy}</span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-800 dark:text-white mb-3">
                              {t('cropHealth.recommendedFertilizers')}
                            </h4>
                            <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900 border border-teal-100 dark:border-teal-700">
                              <ul className="space-y-2">
                                {crop.fertilizers.map((fertilizer, fIndex) => (
                                  <li
                                    key={fIndex}
                                    className="flex items-start text-sm text-gray-800 dark:text-white"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 mr-2"></span>
                                    <span>{fertilizer}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter className="pt-2 pb-4 px-6 bg-muted/20 border-t flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {t('cropHealth.dataUpdated', { season: currentSeason })}
                </p>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <p className="text-xs text-muted-foreground">
                    {t('cropHealth.consultExperts')}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CropHealth;