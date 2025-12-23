import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, User, MapPin, Wheat, Phone, Calendar, TrendingUp, BarChart3, Users, Filter } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";
import { useFeedback } from '@/contexts/FeedbackContext';
import { FarmerButton, useDeviceInfo } from '@/components/FarmerResponsive';

interface FeedbackItem {
  id: string;
  rating: number;
  category: string;
  message: string;
  name: string;
  location: string;
  cropType: string;
  phoneModel: string;
  timestamp: string;
  status: string;
}

const FeedbackDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { isBasicPhone } = useDeviceInfo();
  const { feedbacks, getFeedbackStats, updateFeedbackStatus } = useFeedback();
  
  const stats = getFeedbackStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading feedbacks...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`font-bold text-gray-800 mb-4 ${isBasicPhone ? 'text-2xl' : 'text-3xl'}`}>
            📊 Feedback Dashboard - फीडबैक डैशबोर्ड
          </h1>
          <p className="text-gray-600 mb-6">
            किसान फीडबैक और सुझाव देखें - View farmer feedback and suggestions
          </p>
        </div>

        <div className={`grid gap-4 mb-8 ${isBasicPhone ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Feedbacks</p>
                  <p className={`font-bold text-green-600 ${isBasicPhone ? 'text-xl' : 'text-2xl'}`}>
                    {stats.total}
                  </p>
                </div>
                <MessageCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className={`font-bold text-yellow-600 ${isBasicPhone ? 'text-xl' : 'text-2xl'}`}>
                    {stats.averageRating} ⭐
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Happy Farmers</p>
                  <p className={`font-bold text-blue-600 ${isBasicPhone ? 'text-xl' : 'text-2xl'}`}>
                    {stats.happyFarmers}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className={`font-bold text-purple-600 ${isBasicPhone ? 'text-xl' : 'text-2xl'}`}>
                    {stats.categories}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`${isBasicPhone ? 'space-y-4' : 'flex justify-between items-start mb-4'}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <StarRating rating={feedback.rating} />
                      <Badge className={getStatusColor(feedback.status)}>
                        {feedback.status}
                      </Badge>
                      <Badge variant="outline">
                        {feedback.category}
                      </Badge>
                    </div>
                    
                    <p className={`text-gray-800 mb-4 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>
                      "{feedback.message}"
                    </p>
                    
                    <div className={`grid gap-2 text-sm text-gray-600 ${isBasicPhone ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'}`}>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {feedback.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {feedback.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Wheat className="h-4 w-4" />
                        {feedback.cropType}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {feedback.phoneModel}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${isBasicPhone ? 'mt-2' : 'ml-4'} text-right`}>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(feedback.timestamp).toLocaleDateString('hi-IN')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <FarmerButton
            onClick={() => {
              toast({
                title: "🔄 Dashboard Refreshed",
                description: `Showing ${feedbacks.length} total feedbacks with real-time updates`,
                duration: 3000
              });
            }}
            variant="primary"
          >
            🔄 Refresh Data ({feedbacks.length})
          </FarmerButton>
          
          <FarmerButton
            onClick={() => {
              toast({
                title: "✨ Real-time Updates Active",
                description: "New feedbacks will appear automatically in this dashboard",
                duration: 4000
              });
            }}
            variant="secondary"
          >
            📡 Live Updates ON
          </FarmerButton>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackDashboard;