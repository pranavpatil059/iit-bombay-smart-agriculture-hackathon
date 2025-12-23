import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  deviceInfo?: {
    screenWidth: number;
    userAgent: string;
  };
}

interface FeedbackContextType {
  feedbacks: FeedbackItem[];
  addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'timestamp' | 'status'>) => void;
  updateFeedbackStatus: (id: string, status: string) => void;
  getFeedbackStats: () => {
    total: number;
    averageRating: string;
    happyFarmers: number;
    categories: number;
  };
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with demo data
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: '1',
      rating: 5,
      category: 'features',
      message: 'बहुत अच्छा ऐप है! FarmShield बहुत काम का है। Very good app! FarmShield is very useful.',
      name: 'राम कुमार',
      location: 'पुणे, महाराष्ट्र',
      cropType: 'गेहूं',
      phoneModel: 'Redmi Note 10',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'new',
      deviceInfo: { screenWidth: 393, userAgent: 'Mobile' }
    },
    {
      id: '2',
      rating: 4,
      category: 'ui',
      message: 'Interface अच्छा है लेकिन थोड़ा slow है। Interface is good but a bit slow.',
      name: 'सुनीता देवी',
      location: 'जयपुर, राजस्थान',
      cropType: 'बाजरा',
      phoneModel: 'Samsung Galaxy M12',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      status: 'reviewed',
      deviceInfo: { screenWidth: 360, userAgent: 'Mobile' }
    },
    {
      id: '3',
      rating: 5,
      category: 'accuracy',
      message: 'AI crop detection बहुत accurate है! मेरी फसल की बीमारी सही पकड़ी। AI crop detection is very accurate!',
      name: 'विकास पटेल',
      location: 'अहमदाबाद, गुजरात',
      cropType: 'कपास',
      phoneModel: 'Jio Phone Next',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'resolved',
      deviceInfo: { screenWidth: 240, userAgent: 'KaiOS' }
    }
  ]);

  const addFeedback = (newFeedback: Omit<FeedbackItem, 'id' | 'timestamp' | 'status'>) => {
    const feedback: FeedbackItem = {
      ...newFeedback,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    // Add to beginning of array (most recent first)
    setFeedbacks(prev => [feedback, ...prev]);
    
    // Also save to localStorage for persistence
    const existingLocal = JSON.parse(localStorage.getItem('allFeedbacks') || '[]');
    existingLocal.unshift(feedback);
    localStorage.setItem('allFeedbacks', JSON.stringify(existingLocal));
  };

  const updateFeedbackStatus = (id: string, status: string) => {
    setFeedbacks(prev => 
      prev.map(feedback => 
        feedback.id === id ? { ...feedback, status } : feedback
      )
    );
  };

  const getFeedbackStats = () => {
    const total = feedbacks.length;
    const averageRating = total > 0 
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
      : '0.0';
    const happyFarmers = feedbacks.filter(f => f.rating >= 4).length;
    const categories = new Set(feedbacks.map(f => f.category)).size;

    return { total, averageRating, happyFarmers, categories };
  };

  return (
    <FeedbackContext.Provider value={{
      feedbacks,
      addFeedback,
      updateFeedbackStatus,
      getFeedbackStats
    }}>
      {children}
    </FeedbackContext.Provider>
  );
};