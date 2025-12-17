import React, { useState } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLangInfo = SUPPORTED_LANGUAGES[currentLanguage as keyof typeof SUPPORTED_LANGUAGES];

  const handleLanguageChange = (code: string) => {
    console.log('Changing language to:', code);
    setLanguage(code);
    setIsOpen(false);
    // Force page refresh to ensure translations load
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 bg-white/90 backdrop-blur-sm border-green-200 hover:bg-green-50 transition-all duration-300"
        >
          <Globe className="h-3 w-3 text-green-600" />
          <span className="text-xs font-medium hidden sm:inline">
            {currentLangInfo?.flag} {currentLangInfo?.nativeName}
          </span>
          <span className="text-xs font-medium sm:hidden">
            {currentLangInfo?.flag}
          </span>
          <ChevronDown className="h-3 w-3 text-green-600" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 max-h-96 overflow-y-auto bg-white/95 backdrop-blur-md border-green-200 shadow-xl"
        align="end"
      >
        <div className="p-2">
          <div className="text-xs font-semibold text-green-800 mb-2 px-2">
            🌍 Select Language
          </div>
          
          {Object.entries(SUPPORTED_LANGUAGES).map(([code, info]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`
                flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200
                ${currentLanguage === code 
                  ? 'bg-green-100 text-green-800 font-medium' 
                  : 'hover:bg-green-50 text-gray-700'
                }
              `}
            >
              <span className="text-lg">{info.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{info.nativeName}</span>
                <span className="text-xs text-gray-500">{info.name}</span>
              </div>
              {currentLanguage === code && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </div>
        
        <div className="border-t border-green-200 p-2 mt-2">
          <div className="text-xs text-gray-500 text-center">
            🌾 Farmer Friendly Interface
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;