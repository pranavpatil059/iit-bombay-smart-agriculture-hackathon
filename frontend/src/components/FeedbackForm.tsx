import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Star, 
  Send, 
  User, 
  Mail, 
  Phone,
  MapPin,
  Heart,
  ThumbsUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import axios from 'axios';

const FeedbackForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    category: 'general',
    rating: 0,
    subject: '',
    message: '',
    features: []
  });

  const categories = [
    { id: 'general', name: 'सामान्य फीडबैक / General Feedback', icon: '💬' },
    { id: 'bug', name: 'बग रिपोर्ट / Bug Report', icon: '🐛' },
    { id: 'improvement', name: 'सुधार सुझाव / Improvement', icon: '🚀' },
    { id: 'support', name: 'सहायता / Support', icon: '🆘' },
    { id: 'appreciation', name: 'प्रशंसा / Appreciation', icon: '❤️' }
  ];

  const features = [
    'Crop Health Detection',
    'Weather Analytics', 
    'Farm Loans',
    'Transportation',
    'Wildlife Protection',
    'IoT Monitoring',
    'AI Chatbot (Sarthi)',
    'Multi-language Support',
    'Government Schemes',
    'Direct Market'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      fe