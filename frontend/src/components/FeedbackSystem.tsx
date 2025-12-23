import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Send, MessageCircle, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { useFeedback } from '@/contexts/FeedbackContext';
import { FarmerButton, FarmerInput, useDeviceInfo } from './FarmerResponsive';

interface FeedbackData {
  rating: number;
  category: string;
  message: string;
  name: string;
  location: string;
  cropType: string;
  phoneModel: string;
}

export const FeedbackSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: 0,
    category: '',
    message: '',
    name: '',
    location: '',
    cropType: '',
    phoneModel: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { addFeedback } = useFeedback();
  const { isBasicPhone, screenWidth } = useDeviceInfo();

  const categories = [
    { id: 'ui', label: 'यूजर इंटरफेस', labelEn: 'User Interface', emoji: '📱' },
    { id: 'features', label: 'फीचर्स', labelEn: 'Features', emoji: '⚡' },
    { id: 'performance', label: 'परफॉर्मेंस', labelEn: 'Performance', emoji: '🚀' },
    { id: 'accuracy', label: 'एआई सटीकता', labelEn: 'AI Accuracy', emoji: '🎯' },
    { id: 'language', label: 'भाषा सपोर्ट', labelEn: 'Language Support', emoji: '🗣️' },
    { id: 'other', label: 'अन्य', labelEn: 'Other', emoji: '💭' }
  ];

  const handleSubmit = async () => {
    if (!feedback.rating || !feedback.category || !feedback.message) {
      toast({
        title: "कृपया सभी फील्ड भरें",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add device info automatically
      const deviceInfo = {
        screenWidth,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        language: navigator.language
      };

      const feedbackWithDevice = {
        ...feedback,
        deviceInfo,
        phoneModel: feedback.phoneModel || 'Auto-detected: ' + (isBasicPhone ? 'Basic Phone' : 'Smartphone')
      };

      // Add to context (real-time update)
      addFeedback(feedbackWithDevice);

      console.log('✅ Feedback added to dashboard:', feedbackWithDevice);

      // Try to send to backend as well
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://iit-bombay-agriculture-backend-b0bs5njbo.vercel.app';
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`${API_URL}/api/feedback`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(feedbackWithDevice),
          signal: controller.signal,
          mode: 'cors'
        });

        clearTimeout(timeoutId);
        
        if (response.ok) {
          console.log('✅ Feedback also sent to backend');
        }
      } catch (backendError) {
        console.log('⚠️ Backend not available, but feedback saved locally');
      }

      toast({
        title: "🙏 धन्यवाद! Feedback भेजा गया",
        description: "Thank you! Your feedback has been submitted and is now visible in dashboard",
        duration: 5000
      });
      
      // Show dashboard link with immediate update notification
      setTimeout(() => {
        toast({
          title: "📊 Feedback Added to Dashboard!",
          description: "Your feedback is now live in the dashboard. Check it out!",
          action: (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('/feedback-dashboard', '_blank')}
            >
              View Dashboard
            </Button>
          ),
          duration: 8000
        });
      }, 1000);
      
      // Reset form
      setFeedback({
        rating: 0,
        category: '',
        message: '',
        name: '',
        location: '',
        cropType: '',
        phoneModel: ''
      });
      setIsOpen(false);

    } catch (error) {
      console.error('Feedback submission error:', error);
      toast({
        title: "Error submitting feedback",
        description: `Please try again later. Error: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = () => (
    <div className="flex gap-2 justify-center mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
          className={`transition-all duration-200 ${isBasicPhone ? 'text-3xl' : 'text-2xl'}`}
        >
          <Star 
            className={`${feedback.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
          />
        </button>
      ))}
    </div>
  );

  const QuickFeedback = () => (
    <div className="flex gap-2 justify-center mb-4">
      <FarmerButton
        onClick={() => {
          const quickFeedback = {
            rating: 5, 
            category: 'features', 
            message: 'बहुत अच्छा ऐप है! Very good app!',
            name: 'Anonymous User',
            location: 'India',
            cropType: 'Mixed',
            phoneModel: 'Mobile Device',
            deviceInfo: { screenWidth, userAgent: navigator.userAgent }
          };
          addFeedback(quickFeedback);
          toast({
            title: "🙏 Quick Feedback Submitted!",
            description: "Thank you! Your positive feedback is now in dashboard",
            duration: 3000
          });
        }}
        variant="success"
        size="small"
      >
        <ThumbsUp className="h-4 w-4" />
        {isBasicPhone ? '👍 अच्छा' : '👍 Good'}
      </FarmerButton>
      
      <FarmerButton
        onClick={() => setIsOpen(true)}
        variant="warning"
        size="small"
      >
        <ThumbsDown className="h-4 w-4" />
        {isBasicPhone ? '👎 सुधार' : '👎 Improve'}
      </FarmerButton>
    </div>
  );

  if (!isOpen) {
    return (
      <div className={`fixed z-50 ${isBasicPhone ? 'bottom-20 right-2' : 'bottom-6 right-6'}`}>
        <div className="mb-2">
          <QuickFeedback />
        </div>
        <FarmerButton
          onClick={() => setIsOpen(true)}
          variant="primary"
          className="rounded-full shadow-lg animate-pulse"
        >
          <MessageCircle className="h-5 w-5" />
          {!isBasicPhone && 'Feedback'}
        </FarmerButton>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className={`w-full max-h-[90vh] overflow-y-auto ${isBasicPhone ? 'max-w-sm' : 'max-w-md'}`}>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className={`${isBasicPhone ? 'text-lg' : 'text-xl'}`}>
              📝 {isBasicPhone ? 'फीडबैक दें' : 'किसान फीडबैक - Farmer Feedback'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Rating */}
          <div>
            <label className={`block font-medium mb-2 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>
              ⭐ रेटिंग दें (Rating) *
            </label>
            <StarRating />
          </div>

          {/* Category */}
          <div>
            <label className={`block font-medium mb-2 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>
              📂 श्रेणी (Category) *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFeedback(prev => ({ ...prev, category: cat.id }))}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    feedback.category === cat.id 
                      ? 'bg-green-100 border-green-500' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  } ${isBasicPhone ? 'text-xs' : 'text-sm'}`}
                >
                  <div>{cat.emoji} {isBasicPhone ? cat.label : cat.labelEn}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className={`block font-medium mb-2 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>
              💬 आपका संदेश (Your Message) *
            </label>
            <Textarea
              value={feedback.message}
              onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
              placeholder={isBasicPhone ? "अपनी बात लिखें..." : "अपनी राय लिखें... Share your thoughts..."}
              className={`${isBasicPhone ? 'h-20 text-sm' : 'h-24'}`}
            />
          </div>

          {/* Farmer Details */}
          <div className="grid grid-cols-1 gap-3">
            <FarmerInput
              label="👤 नाम (Name)"
              value={feedback.name}
              onChange={(e) => setFeedback(prev => ({ ...prev, name: e.target.value }))}
              placeholder="आपका नाम"
            />
            
            <FarmerInput
              label="📍 स्थान (Location)"
              value={feedback.location}
              onChange={(e) => setFeedback(prev => ({ ...prev, location: e.target.value }))}
              placeholder="गांव, जिला, राज्य"
            />
            
            <FarmerInput
              label="🌾 फसल (Crop Type)"
              value={feedback.cropType}
              onChange={(e) => setFeedback(prev => ({ ...prev, cropType: e.target.value }))}
              placeholder="गेहूं, धान, मक्का..."
            />
            
            <FarmerInput
              label="📱 फोन मॉडल (Phone Model)"
              value={feedback.phoneModel}
              onChange={(e) => setFeedback(prev => ({ ...prev, phoneModel: e.target.value }))}
              placeholder="Jio Phone, Redmi Note..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-4">
            <FarmerButton
              onClick={() => setIsOpen(false)}
              variant="secondary"
              className="flex-1"
            >
              रद्द करें (Cancel)
            </FarmerButton>
            
            <FarmerButton
              onClick={handleSubmit}
              variant="primary"
              className="flex-1"
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'भेजा जा रहा...' : 'भेजें (Send)'}
            </FarmerButton>
          </div>

          {/* Privacy Note */}
          <p className={`text-gray-500 text-center ${isBasicPhone ? 'text-xs' : 'text-sm'}`}>
            🔒 आपकी जानकारी सुरक्षित है | Your data is secure
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackSystem;