import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const TechStack = () => {
  const technologies = [
    { name: "React + Vite", category: "Frontend", color: "bg-blue-100 text-blue-800" },
    { name: "Node.js + Express", category: "Backend", color: "bg-green-100 text-green-800" },
    { name: "Google Gemini AI", category: "AI/ML", color: "bg-purple-100 text-purple-800" },
    { name: "MongoDB Atlas", category: "Database", color: "bg-yellow-100 text-yellow-800" },
    { name: "Raspberry Pi 4", category: "IoT Hardware", color: "bg-red-100 text-red-800" },
    { name: "Pi Camera V2", category: "Computer Vision", color: "bg-indigo-100 text-indigo-800" },
    { name: "Vercel + Railway", category: "Cloud Deploy", color: "bg-gray-100 text-gray-800" },
    { name: "TensorFlow", category: "Deep Learning", color: "bg-orange-100 text-orange-800" }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">🛠️ Cutting-Edge Tech Stack</h3>
          <p className="text-gray-600">Built with modern technologies for scalable smart agriculture</p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <div key={index} className="text-center">
                  <Badge className={`${tech.color} mb-2 text-xs`}>
                    {tech.category}
                  </Badge>
                  <div className="font-semibold text-sm text-gray-800">{tech.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechStack;