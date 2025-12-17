import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, MapPin, Phone, ExternalLink, Building2, Percent, Clock, FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import EnhancedParticleBackground from '@/components/EnhancedParticleBackground';
import { useLanguage } from '@/contexts/LanguageContext';

interface Bank {
  id: string;
  name: string;
  interestRate: string;
  loanTypes: string[];
  processingTime: string;
  maxAmount: string;
  eligibility: string[];
  contactNumber: string;
  website: string;
  nearestBranch: string;
  address: string;
  specialFeatures: string[];
}

const FarmLoans = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await axios.get('http://localhost:10001/api/farm-loans/banks');
      setBanks(response.data);
      setLoading(false);
      toast({
        title: "🏦 Banks Loaded",
        description: "Latest loan information fetched successfully",
      });
    } catch (error) {
      console.error('Error fetching banks:', error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to load bank information",
        variant: "destructive",
      });
    }
  };

  const calculateEMI = () => {
    try {
      // Validate inputs
      if (!loanAmount || !interestRate || !tenure) {
        toast({
          title: "Missing Information",
          description: "Please fill in all fields (Loan Amount, Interest Rate, and Tenure)",
          variant: "destructive",
        });
        return;
      }

      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 100 / 12;
      const time = parseFloat(tenure) * 12;

      // Validate parsed values
      if (isNaN(principal) || principal <= 0) {
        toast({
          title: "Invalid Loan Amount",
          description: "Please enter a valid loan amount greater than 0",
          variant: "destructive",
        });
        return;
      }

      if (isNaN(rate) || rate <= 0) {
        toast({
          title: "Invalid Interest Rate",
          description: "Please enter a valid interest rate greater than 0",
          variant: "destructive",
        });
        return;
      }

      if (isNaN(time) || time <= 0) {
        toast({
          title: "Invalid Tenure",
          description: "Please enter a valid tenure greater than 0 years",
          variant: "destructive",
        });
        return;
      }

      // Calculate EMI
      const emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      const calculatedEMI = Math.round(emiValue);
      
      setEmi(calculatedEMI);
      
      toast({
        title: "EMI Calculated",
        description: `Monthly EMI: ₹${calculatedEMI.toLocaleString()}`,
      });
    } catch (error) {
      console.error('Error calculating EMI:', error);
      toast({
        title: "Calculation Error",
        description: "Failed to calculate EMI. Please check your inputs.",
        variant: "destructive",
      });
    }
  };

  const handleApplyOnline = (bank: Bank) => {
    try {
      // Check if website URL exists and is valid
      if (!bank.website || bank.website.trim() === '') {
        toast({
          title: "Error",
          description: "Bank website URL not available",
          variant: "destructive",
        });
        return;
      }

      // Ensure URL has proper protocol
      let url = bank.website;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      // Try to open the URL
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      if (newWindow) {
        toast({
          title: "🏦 Bank Website Opened",
          description: `Visit ${bank.name} and look for "Agricultural Loans" or "Rural Banking" section`,
        });
      } else {
        // Popup blocked or failed to open
        toast({
          title: "Popup Blocked",
          description: `Please allow popups or manually visit: ${bank.name}`,
          variant: "destructive",
        });
        
        // Fallback: try to navigate in same window
        setTimeout(() => {
          if (confirm(`Popup was blocked. Open ${bank.name} loan page in current tab?`)) {
            window.location.href = url;
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error opening bank website:', error);
      toast({
        title: "Error",
        description: `Failed to open ${bank.name} website. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleCallBank = (phoneNumber: string, bankName: string) => {
    try {
      if (!phoneNumber || phoneNumber.trim() === '') {
        toast({
          title: "Error",
          description: "Phone number not available",
          variant: "destructive",
        });
        return;
      }

      // Clean phone number (remove spaces, dashes, etc.)
      const cleanNumber = phoneNumber.replace(/[^\d-+]/g, '');
      
      // Try to initiate call
      window.open(`tel:${cleanNumber}`);
      
      toast({
        title: "Calling Bank",
        description: `Dialing ${bankName} loan department: ${phoneNumber}`,
      });
    } catch (error) {
      console.error('Error initiating call:', error);
      toast({
        title: "Error",
        description: `Failed to call ${bankName}. Please dial ${phoneNumber} manually.`,
        variant: "destructive",
      });
    }
  };

  const handleFindBranch = (address: string, bankName: string) => {
    try {
      if (!address || address.trim() === '') {
        toast({
          title: "Error",
          description: "Branch address not available",
          variant: "destructive",
        });
        return;
      }

      const searchQuery = `${address} ${bankName}`;
      const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
      
      const newWindow = window.open(mapsUrl, '_blank', 'noopener,noreferrer');
      
      if (newWindow) {
        toast({
          title: "Finding Branch",
          description: `Opening Google Maps for ${bankName}`,
        });
      } else {
        toast({
          title: "Popup Blocked",
          description: `Please allow popups or search manually: ${searchQuery}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error opening maps:', error);
      toast({
        title: "Error",
        description: `Failed to open maps. Please search manually for ${bankName}`,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        {/* Enhanced Animated Background */}
        <EnhancedParticleBackground theme="finance" className="opacity-90" />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center text-white">Loading bank information...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Enhanced Animated Background */}
      <EnhancedParticleBackground theme="finance" className="opacity-90" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">🏦 {t('farmLoans.title')}</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            {t('farmLoans.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="banks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="banks">Available Banks</TabsTrigger>
            <TabsTrigger value="calculator">EMI Calculator</TabsTrigger>
            <TabsTrigger value="guide">Loan Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="banks" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {banks.map((bank) => (
                <Card key={bank.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-green-700">{bank.name}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {bank.interestRate}% Interest
                      </Badge>
                    </div>
                    <CardDescription>{bank.nearestBranch}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Percent className="h-4 w-4 text-green-600" />
                        <span>Rate: {bank.interestRate}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>{bank.processingTime}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Loan Types:</p>
                      <div className="flex flex-wrap gap-1">
                        {bank.loanTypes.map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Special Features:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {bank.specialFeatures.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        onClick={() => handleApplyOnline(bank)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                        title={`Apply online at ${bank.name}`}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Apply Online
                      </Button>
                      <Button 
                        onClick={() => handleCallBank(bank.contactNumber, bank.name)}
                        variant="outline"
                        size="sm"
                        title={`Call ${bank.name} at ${bank.contactNumber}`}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call Bank
                      </Button>
                    </div>

                    <Button 
                      onClick={() => handleFindBranch(bank.address, bank.name)}
                      variant="secondary"
                      className="w-full"
                      size="sm"
                      title={`Find ${bank.nearestBranch} on Google Maps`}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Find Branch: {bank.nearestBranch}
                    </Button>

                    {/* Manual URL display for backup */}
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs border border-blue-200">
                      <p className="text-blue-800 mb-1 font-medium">📋 Quick Access:</p>
                      <p className="break-all text-blue-600 mb-1">
                        <strong>Website:</strong> <a href={bank.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">{bank.website}</a>
                      </p>
                      <p className="text-blue-700">
                        <strong>Phone:</strong> <a href={`tel:${bank.contactNumber}`} className="underline hover:text-blue-800">{bank.contactNumber}</a>
                      </p>
                      <p className="text-blue-600 mt-1 text-xs">
                        💡 <em>Look for "Agricultural Loans" or "KCC" section on their website</em>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  EMI Calculator
                </CardTitle>
                <CardDescription>
                  Calculate your monthly EMI for agricultural loans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="e.g., 500000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 7.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenure">Tenure (Years)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      placeholder="e.g., 5"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={calculateEMI} className="w-full">
                  Calculate EMI
                </Button>
                {emi > 0 && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-700">₹{emi.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Monthly EMI</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Aadhaar Card & PAN Card</li>
                    <li>• Land ownership documents</li>
                    <li>• Income certificate</li>
                    <li>• Bank statements (6 months)</li>
                    <li>• Crop cultivation details</li>
                    <li>• Passport size photographs</li>
                    <li>• Caste certificate (if applicable)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Loan Types Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Kisan Credit Card (KCC):</strong> Flexible credit facility</li>
                    <li>• <strong>Crop Loan:</strong> Short-term cultivation loans</li>
                    <li>• <strong>Equipment Loan:</strong> Farm machinery purchase</li>
                    <li>• <strong>Land Development:</strong> Soil improvement loans</li>
                    <li>• <strong>Warehouse Loan:</strong> Storage facility financing</li>
                    <li>• <strong>Dairy Loan:</strong> Livestock and dairy farming</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>🎯 How to Apply for Agricultural Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium mb-2 text-green-800">📝 Step-by-Step Application Process:</h4>
                    <ol className="text-sm space-y-1 text-green-700">
                      <li><strong>1.</strong> Click "Apply Online" to visit bank website</li>
                      <li><strong>2.</strong> Look for "Agricultural Loans", "Rural Banking", or "KCC" section</li>
                      <li><strong>3.</strong> Fill the online application form</li>
                      <li><strong>4.</strong> Upload required documents (see list above)</li>
                      <li><strong>5.</strong> Submit and note your application reference number</li>
                      <li><strong>6.</strong> Visit nearest branch for verification</li>
                    </ol>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Before Applying:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Check your credit score</li>
                        <li>• Prepare all documents</li>
                        <li>• Compare interest rates</li>
                        <li>• Understand loan terms</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">During Application:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Be honest about income</li>
                        <li>• Provide accurate information</li>
                        <li>• Ask about subsidies</li>
                        <li>• Keep copies of all documents</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FarmLoans;