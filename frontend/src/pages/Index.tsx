
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Leaf, BarChart3, FileText, Image, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import HackathonFeatures from '@/components/HackathonFeatures';
import TechStack from '@/components/TechStack';
import DemoSection from '@/components/DemoSection';
import ImpactMetrics from '@/components/ImpactMetrics';

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast
    toast({
      title: "Welcome to KrishiAide Hub",
      description: "Explore our AI tools designed specifically for farmers.",
      duration: 5000,
    });
  }, [toast]);

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Crop Price Estimation",
      description:
        "Get accurate price forecasts based on your land, resources, and market trends using our AI algorithms.",
      chip: "AI-Powered",
      link: "/price-estimation",
      imageSrc:
        "https://blogs.isb.edu/iids/wp-content/blogs.dir/9/files/sites/9/2023/11/Real-Time-Price-Prediction-in-Agriculture.jpg",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Government Schemes",
      description:
        "Stay updated with the latest agricultural schemes, subsidies, and loan offers from government agencies.",
      chip: "Updated Weekly",
      link: "/government-schemes",
      imageSrc:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Crop Health Analysis",
      description:
        "Upload images of your crops and receive instant health assessments and treatment recommendations.",
      chip: "Computer Vision",
      link: "/crop-health",
      imageSrc:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=60",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Direct Market Access",
      description:
        "Connect directly with consumers and industries to sell your produce without intermediaries.",
      chip: "Marketplace",
      link: "/direct-market",
      imageSrc:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <Layout>
      <HeroSection />

      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Our Features</h2>
            <p className="section-subtitle">
              Comprehensive solutions designed to revolutionize farming
              operations and increase profitability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className="block hover:no-underline"
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  chip={feature.chip}
                  imageSrc={feature.imageSrc}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/50 relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1920&auto=format&fit=crop&q=20"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="glass-panel rounded-2xl p-8 animate-float">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Crop Analysis Dashboard</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time monitoring
                      </p>
                    </div>
                  </div>

                  <div className="relative h-32 bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden">
                    <img
                      src="https://www.agricensus.com/files/mf/1e7351450fe72dfac6509013dd6d4823_Data%20Dashboards%20Crop%20Forecast.png"
                      alt="Crop field analysis"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/70 flex items-end justify-end p-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/20">
                        <img
                          src="https://img.freepik.com/premium-photo/wheat-stalk-closeup-crop-closeup_325857-1454.jpg"
                          alt="Crop closeup"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-agri-green/10 flex flex-col items-center">
                      <div className="text-lg font-medium">84%</div>
                      <div className="text-xs text-muted-foreground">
                        Health
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-agri-blue/10 flex flex-col items-center">
                      <div className="text-lg font-medium">₹12.4</div>
                      <div className="text-xs text-muted-foreground">
                        Price/kg
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-agri-brown/10 flex flex-col items-center">
                      <div className="text-lg font-medium">+8%</div>
                      <div className="text-xs text-muted-foreground">Yield</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="section-title">Why Choose Agri-Aide Hub?</h2>
              <p className="text-lg text-muted-foreground">
                Our platform brings together cutting-edge AI technologies
                specifically designed for agricultural needs, helping farmers
                make data-driven decisions.
              </p>

              <ul className="space-y-4">
                {[
                  "Advanced AI algorithms for accurate price predictions",
                  "Real-time crop health monitoring through image processing",
                  "Comprehensive database of government schemes and subsidies",
                  "Direct marketplace connection to eliminate middlemen",
                  "User-friendly interface designed for farmers of all tech levels",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* <div className="pt-6">
                <Button asChild className="rounded-full">
                  <Link to="/price-estimation">Get Started Now</Link>
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 z-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&auto=format&fit=crop&q=20"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="section-title">Ready to Transform Your Farming?</h2>
          <p className="section-subtitle">
            Join thousands of farmers already using our platform to increase
            productivity and profitability
          </p>

          <div className="mt-10">
  <Button
    size="lg"
    className="rounded-full"
    onClick={() => window.open("https://crop-recommendation-system-16.streamlit.app/", "_blank")}
  >
    Start Your Journey
  </Button>
</div>

        </div>
      </section>

      {/* Demo Section */}
      <DemoSection />

      {/* Hackathon Features Section */}
      <HackathonFeatures />
      
      {/* Tech Stack Section */}
      <TechStack />

      {/* Impact Metrics Section */}
      <ImpactMetrics />

    </Layout>
  );
};

export default Index;
