import React, { createContext, useContext, useState, useEffect } from 'react';

// 21 Major Indian Languages
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  te: { name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  mr: { name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  ur: { name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  ml: { name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  or: { name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  as: { name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  bh: { name: 'Bhojpuri', nativeName: 'भोजपुरी', flag: '🇮🇳' },
  mai: { name: 'Maithili', nativeName: 'मैथिली', flag: '🇮🇳' },
  mag: { name: 'Magahi', nativeName: 'मगही', flag: '🇮🇳' },
  ne: { name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵' },
  sa: { name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳' },
  sd: { name: 'Sindhi', nativeName: 'سنڌي', flag: '🇮🇳' },
  ks: { name: 'Kashmiri', nativeName: 'कॉशुर', flag: '🇮🇳' },
  kok: { name: 'Konkani', nativeName: 'कोंकणी', flag: '🇮🇳' }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState<Record<string, any>>({});

  // RTL languages (Right-to-Left)
  const rtlLanguages = ['ur', 'sd'];
  const isRTL = rtlLanguages.includes(currentLanguage);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && SUPPORTED_LANGUAGES[savedLanguage as keyof typeof SUPPORTED_LANGUAGES]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Load translations for current language
    loadTranslations(currentLanguage);
  }, [currentLanguage]);

  const loadTranslations = async (lang: string) => {
    try {
      console.log('Loading translations for:', lang);
      const translationModule = await import(`../translations/${lang}.json`);
      console.log('Loaded translations:', translationModule.default);
      setTranslations(translationModule.default);
    } catch (error) {
      console.warn(`Failed to load translations for ${lang}, falling back to English`);
      if (lang !== 'en') {
        const englishModule = await import('../translations/en.json');
        setTranslations(englishModule.default);
      }
    }
  };

  const setLanguage = (lang: string) => {
    console.log('Setting language to:', lang);
    setCurrentLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    
    // Update document direction for RTL languages
    document.documentElement.dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Force reload translations immediately
    loadTranslations(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};