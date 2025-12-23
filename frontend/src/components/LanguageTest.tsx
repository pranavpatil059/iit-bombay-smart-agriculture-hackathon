import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageTest: React.FC = () => {
  const { currentLanguage, t } = useLanguage();

  return (
    <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg p-3 shadow-lg z-50">
      <div className="text-xs text-gray-600">
        <div>Current Language: <strong>{currentLanguage}</strong></div>
        <div>Welcome Text: <strong>{t('common.welcome')}</strong></div>
        <div>Home Text: <strong>{t('navigation.home')}</strong></div>
      </div>
    </div>
  );
};

export default LanguageTest;