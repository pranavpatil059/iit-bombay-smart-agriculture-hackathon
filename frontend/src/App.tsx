import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PriceEstimation from "./pages/PriceEstimation";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import CropHealth from "./pages/CropHealth";
import DirectMarket from "./pages/DirectMarket";
import Landselling from "./pages/Landselling";
import SellerManagement from "./pages/SellerManagement";
import FarmerForm from "./pages/FarmerForm";
import Enhanced3DWeather from "./components/Enhanced3DWeather";
import Weather from "./pages/Weather";
import FarmShieldPage from "./pages/FarmShieldPage";
import FarmerDetails from "./pages/FarmerDetails";
import Sarthi from "./pages/Sarthi";
import FloatingChatbot from "./pages/Sarthi";
import VoiceControl from "./pages/voiceControl";
import UpdateCrop from "./pages/UpdateCrop";
import TokenForm from "./pages/TokenForm";
import TokenAllotment from "./pages/TokenAllotment";
import Workplace from "./pages/workplace";
import FarmLoans from "./pages/FarmLoans";
import Transportation from "./pages/Transportation";
const queryClient = new QueryClient();
import Prices from "./pages/Prices";
const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="agri-aide-theme">
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/price-estimation" element={<PriceEstimation />} />
            <Route path="/government-schemes" element={<GovernmentSchemes />} />
            <Route path="/crop-health" element={<CropHealth />} />
            <Route path="/direct-market" element={<DirectMarket />} />
            <Route path="/landselling" element={<Landselling />} />
            <Route path="/sellermanagement" element={<SellerManagement />} />
            <Route path="/wether" element={<Weather />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/farmshield" element={<FarmShieldPage />} />
            <Route path="/farmerform" element={<FarmerForm />} />
            <Route path="/tokenform" element={<TokenForm />} />
            <Route path="/details/:phone" element={<FarmerDetails />} />
            <Route path="/sarthi" element={<Sarthi />} />
            <Route path="/prices" element={<Prices />} />
            {/* <Route path="/cropupdate" element={<UpdateCrop cropId={""} updatedCropData={undefined} />} /> */}
            <Route path="/updatecrop" element={<UpdateCrop />}/>
            <Route path="/allottoken" element={<TokenAllotment />}/>
            <Route path='/workplace' element={<Workplace></Workplace>}></Route>
            <Route path="/farm-loans" element={<FarmLoans />} />
            <Route path="/transportation" element={<Transportation />} />
            <Route path="/live-tracking" element={<Transportation />} />
            {/* <Route path="/voice-control" element={<VoiceControl />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <FloatingChatbot />
        {/* Replace the simple button with the chatbot component */}
      </TooltipProvider>
    </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
