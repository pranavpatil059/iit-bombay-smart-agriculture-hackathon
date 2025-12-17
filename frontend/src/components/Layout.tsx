
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { Toaster } from "@/components/ui/toaster";
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white relative overflow-x-hidden">
      {/* Enhanced Background patterns */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-purple-400/30 to-pink-400/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-cyan-400/30 to-teal-400/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <Navbar />
      

      
      <main className="flex-1 page-transition relative z-10">
        {children}
      </main>
      
      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                🌾 {t('footer.brandTitle')}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {t('footer.brandDescription')}
              </p>
              <div className="flex space-x-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <span className="text-sm font-semibold">🏆 {t('footer.iitBombayWinner')}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <span className="text-sm font-semibold">⚡ {t('footer.aiAccuracy')}</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                <li><a href="/crop-health" className="text-gray-300 hover:text-green-400 transition-colors">{t('footer.cropHealthScanner')}</a></li>
                <li><a href="/price-estimation" className="text-gray-300 hover:text-green-400 transition-colors">{t('footer.priceCalculator')}</a></li>
                <li><a href="/government-schemes" className="text-gray-300 hover:text-green-400 transition-colors">{t('footer.governmentSchemes')}</a></li>
                <li><a href="/direct-market" className="text-gray-300 hover:text-green-400 transition-colors">{t('footer.marketAccess')}</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📧 support@smartagri.in</li>
                <li>📱 +91 98765 43210</li>
                <li>🌐 {t('footer.panIndiaSupport')}</li>
                <li>🕒 {t('footer.aiAssistance')}</li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} {t('footer.copyright')}
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{t('footer.privacyPolicy')}</a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{t('footer.termsOfService')}</a>
                <a href="https://github.com/pranavpatil059/iit-bombay-smart-agriculture" className="text-gray-400 hover:text-green-400 transition-colors text-sm">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Layout;
