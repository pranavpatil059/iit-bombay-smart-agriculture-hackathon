import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from 'lucide-react';

const DemoSection = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-white text-green-600">Live Demo</Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            🎥 See Our Solution in Action
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Watch how our Smart Agriculture Assistant transforms farming with AI and IoT
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Demo Video Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center mb-4">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white/90 text-green-600 hover:bg-white"
                  onClick={() => window.open("https://youtu.be/hchkXucDuB8", "_blank")}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo Video
                </Button>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Project Presentation</h3>
              <p className="text-green-100 text-sm">Complete walkthrough of our Smart Agriculture platform</p>
            </CardContent>
          </Card>

          {/* Live Links Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">🚀 Try Live Features</h3>
              <div className="space-y-3">
                <Button 
                  variant="secondary" 
                  className="w-full bg-white/90 text-green-600 hover:bg-white justify-between"
                  onClick={() => window.open("https://crop-recommendation-system-16.streamlit.app/", "_blank")}
                >
                  Crop Recommendation AI
                  <ExternalLink className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="w-full bg-white/90 text-green-600 hover:bg-white justify-between"
                  onClick={() => window.open("/sarthi", "_blank")}
                >
                  AI Chatbot (Sarthi)
                  <ExternalLink className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="w-full bg-white/90 text-green-600 hover:bg-white justify-between"
                  onClick={() => window.open("/price-estimation", "_blank")}
                >
                  Price Estimation Tool
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <h4 className="text-white font-semibold mb-2">📊 Project Stats</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24hrs</div>
                    <div className="text-green-100">Development Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">8+</div>
                    <div className="text-green-100">Technologies Used</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;