const express = require('express');
const router = express.Router();

// Comprehensive Bank Data - All Major Farmer Loan Banks in India
const banksData = [
  // 🏦 PUBLIC SECTOR BANKS (Government Banks)
  {
    id: 'sbi-001',
    name: 'State Bank of India (SBI) - कृषि ऋण',
    interestRate: '7.0',
    loanTypes: ['KCC', 'Crop Loan', 'Tractor Loan', 'Dairy Loan', 'Equipment Loan'],
    processingTime: '7-10 days',
    maxAmount: '₹50 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Indian citizen'],
    contactNumber: '1800-11-2211',
    website: 'https://sbi.co.in/web/agri-rural/agriculture/agricultural-banking/crop-loan',
    nearestBranch: 'SBI Agricultural Branch',
    address: 'SBI Agricultural Branch, Mandi Road',
    specialFeatures: [
      'Largest agricultural lender in India',
      'No processing fee for loans up to ₹3 lakhs',
      'PM-KISAN subsidy integration',
      'Digital KCC facility'
    ]
  },
  {
    id: 'pnb-001',
    name: 'Punjab National Bank (PNB) - कृषि ऋण',
    interestRate: '7.5',
    loanTypes: ['KCC', 'Crop Loan', 'Tractor Loan', 'Equipment Loan'],
    processingTime: '7-14 days',
    maxAmount: '₹40 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Farming experience'],
    contactNumber: '1800-180-2222',
    website: 'https://www.pnbindia.in/Agricultural-Advance.html',
    nearestBranch: 'PNB Agricultural Finance Branch',
    address: 'PNB Agricultural Finance Branch, Mandi Complex',
    specialFeatures: [
      'Strong presence in rural areas',
      'Government subsidy support',
      'Flexible repayment options',
      'Crop insurance facility'
    ]
  },
  {
    id: 'bob-001',
    name: 'Bank of Baroda (BOB) - ग्रामीण बैंकिंग',
    interestRate: '7.75',
    loanTypes: ['KCC', 'Crop Loan', 'Equipment Loan', 'Warehouse Loan'],
    processingTime: '7-12 days',
    maxAmount: '₹45 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Farming background'],
    contactNumber: '1800-258-4455',
    website: 'https://www.bankofbaroda.in/personal-banking/loans/rural-loans',
    nearestBranch: 'BOB Rural Development Branch',
    address: 'BOB Rural Development Branch, Farmer Market Complex',
    specialFeatures: [
      'Comprehensive rural banking',
      'Technology-enabled services',
      'Free crop advisory services',
      'Government scheme integration'
    ]
  },
  {
    id: 'boi-001',
    name: 'Bank of India (BOI) - कृषि वित्त',
    interestRate: '7.25',
    loanTypes: ['KCC', 'Crop Loan', 'Dairy Loan', 'Poultry Loan'],
    processingTime: '5-10 days',
    maxAmount: '₹35 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Valid documents'],
    contactNumber: '1800-103-1906',
    website: 'https://www.bankofindia.co.in/english/agricultural-advances',
    nearestBranch: 'BOI Agricultural Branch',
    address: 'BOI Agricultural Branch, Rural Center',
    specialFeatures: [
      'Specialized agricultural schemes',
      'Quick loan processing',
      'Insurance coverage included',
      'Mobile banking support'
    ]
  },
  {
    id: 'canara-001',
    name: 'Canara Bank - कृषि बैंकिंग',
    interestRate: '7.25',
    loanTypes: ['KCC', 'Crop Loan', 'Dairy Loan', 'Equipment Loan'],
    processingTime: '5-10 days',
    maxAmount: '₹35 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Valid KYC'],
    contactNumber: '1800-425-0018',
    website: 'https://canarabank.com/User_page.aspx?othlink=7',
    nearestBranch: 'Canara Bank Krishi Branch',
    address: 'Canara Bank Krishi Branch, Agricultural Zone',
    specialFeatures: [
      'Specialized agricultural officers',
      'Seasonal repayment schedule',
      'Digital loan tracking',
      'Insurance coverage'
    ]
  },
  {
    id: 'union-001',
    name: 'Union Bank of India - कृषि ऋण',
    interestRate: '7.50',
    loanTypes: ['KCC', 'Crop Loan', 'Tractor Loan', 'Fishery Loan'],
    processingTime: '7-10 days',
    maxAmount: '₹40 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Farming income'],
    contactNumber: '1800-22-2244',
    website: 'https://www.unionbankofindia.co.in/english/agricultural-advances.aspx',
    nearestBranch: 'Union Bank Agricultural Branch',
    address: 'Union Bank Agricultural Branch, Krishi Mandi',
    specialFeatures: [
      'Wide rural network',
      'Government scheme support',
      'Flexible loan terms',
      'Digital banking services'
    ]
  },
  {
    id: 'indian-001',
    name: 'Indian Bank - कृषि ऋण',
    interestRate: '7.40',
    loanTypes: ['KCC', 'Crop Loan', 'Equipment Loan', 'Horticulture Loan'],
    processingTime: '7-10 days',
    maxAmount: '₹35 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Farming background'],
    contactNumber: '1800-425-1461',
    website: 'https://www.indianbank.in/departments/agricultural-banking/',
    nearestBranch: 'Indian Bank Agricultural Branch',
    address: 'Indian Bank Agricultural Branch, Rural Market',
    specialFeatures: [
      'Strong South India presence',
      'Multilingual support',
      'Government scheme integration',
      'Crop insurance facility'
    ]
  },

  // 🏦 PRIVATE SECTOR BANKS
  {
    id: 'hdfc-001',
    name: 'HDFC Bank - किसान ऋण',
    interestRate: '8.5',
    loanTypes: ['KCC', 'Crop Loan', 'Dairy Loan', 'Equipment Loan'],
    processingTime: '5-7 days',
    maxAmount: '₹25 Lakhs',
    eligibility: ['Land ownership', 'Age 21-65', 'Good credit score'],
    contactNumber: '1800-266-4332',
    website: 'https://www.hdfcbank.com/personal/borrow/popular-loans/kisan-credit-card',
    nearestBranch: 'HDFC Agricultural Branch',
    address: 'HDFC Agricultural Branch, Krishi Market',
    specialFeatures: [
      'Digital KCC application',
      'Doorstep banking service',
      'Quick processing',
      'Insurance coverage'
    ]
  },
  {
    id: 'icici-001',
    name: 'ICICI Bank - कृषि वित्त',
    interestRate: '8.0',
    loanTypes: ['KCC', 'Crop Loan', 'Equipment Loan', 'Agri Gold Loan'],
    processingTime: '3-5 days',
    maxAmount: '₹30 Lakhs',
    eligibility: ['Land ownership', 'Age 18-70', 'Regular income'],
    contactNumber: '1860-120-7777',
    website: 'https://www.icicibank.com/personal-banking/loans/rural-and-agri-loans',
    nearestBranch: 'ICICI Rural Branch',
    address: 'ICICI Rural Branch, Agricultural Market',
    specialFeatures: [
      'Fastest processing (3-5 days)',
      'Mobile banking support',
      'Seasonal payment options',
      'Government subsidy integration'
    ]
  },
  {
    id: 'axis-001',
    name: 'Axis Bank - कृषि ऋण',
    interestRate: '8.25',
    loanTypes: ['KCC', 'Crop Loan', 'Tractor Loan', 'Dairy Loan'],
    processingTime: '5-7 days',
    maxAmount: '₹25 Lakhs',
    eligibility: ['Land ownership', 'Age 21-65', 'Income proof'],
    contactNumber: '1860-419-5555',
    website: 'https://www.axisbank.com/retail/loans/rural-loans',
    nearestBranch: 'Axis Bank Rural Branch',
    address: 'Axis Bank Rural Branch, Agricultural Zone',
    specialFeatures: [
      'Digital loan application',
      'Competitive interest rates',
      'Flexible repayment',
      'Insurance facility'
    ]
  },

  // 🏦 SMALL FINANCE BANKS
  {
    id: 'au-001',
    name: 'AU Small Finance Bank - कृषि ऋण',
    interestRate: '9.0',
    loanTypes: ['KCC', 'Crop Loan', 'Micro Loans', 'Equipment Loan'],
    processingTime: '3-5 days',
    maxAmount: '₹15 Lakhs',
    eligibility: ['Small farmers', 'Age 18-65', 'Basic documents'],
    contactNumber: '1800-1200-1500',
    website: 'https://www.aubank.in/rural-banking',
    nearestBranch: 'AU Bank Rural Branch',
    address: 'AU Bank Rural Branch, Village Center',
    specialFeatures: [
      'Focus on small farmers',
      'Minimal documentation',
      'Quick processing',
      'Local language support'
    ]
  },
  {
    id: 'ujjivan-001',
    name: 'Ujjivan Small Finance Bank - कृषि ऋण',
    interestRate: '9.25',
    loanTypes: ['KCC', 'Crop Loan', 'Micro Credit', 'Dairy Loan'],
    processingTime: '2-4 days',
    maxAmount: '₹10 Lakhs',
    eligibility: ['Small/marginal farmers', 'Age 18-65', 'Basic KYC'],
    contactNumber: '1800-208-2121',
    website: 'https://www.ujjivansfb.in/rural-banking',
    nearestBranch: 'Ujjivan Rural Branch',
    address: 'Ujjivan Rural Branch, Rural Center',
    specialFeatures: [
      'Micro finance expertise',
      'Doorstep service',
      'Group lending model',
      'Financial literacy programs'
    ]
  },

  // 🏦 REGIONAL RURAL BANKS (Sample)
  {
    id: 'mgb-001',
    name: 'Maharashtra Gramin Bank - ग्रामीण बैंक',
    interestRate: '6.5',
    loanTypes: ['KCC', 'Crop Loan', 'Small Loans', 'SHG Loans'],
    processingTime: '5-7 days',
    maxAmount: '₹20 Lakhs',
    eligibility: ['Rural farmers', 'Age 18-65', 'Local residence'],
    contactNumber: '1800-233-4526',
    website: 'https://www.mgb.co.in/agricultural-loans',
    nearestBranch: 'MGB Village Branch',
    address: 'MGB Village Branch, Gram Panchayat',
    specialFeatures: [
      'Lowest interest rates (6.5%)',
      'Government sponsored',
      'Village level banking',
      'Priority sector lending'
    ]
  }
];

// GET /api/farm-loans/banks - Get all available banks
router.get('/banks', (req, res) => {
  try {
    console.log('📊 Farm Loans API: Fetching banks data');
    console.log(`🏦 Total banks available: ${banksData.length}`);
    
    // Log each bank for debugging
    banksData.forEach((bank, index) => {
      console.log(`${index + 1}. ${bank.name} - ${bank.interestRate}% interest`);
    });

    res.json(banksData);
  } catch (error) {
    console.error('❌ Error fetching banks:', error);
    res.status(500).json({ 
      error: 'Failed to fetch banks data',
      message: error.message 
    });
  }
});

// GET /api/farm-loans/banks/:id - Get specific bank details
router.get('/banks/:id', (req, res) => {
  try {
    const bankId = req.params.id;
    console.log(`🔍 Farm Loans API: Fetching bank details for ID: ${bankId}`);
    
    const bank = banksData.find(b => b.id === bankId);
    
    if (!bank) {
      console.log(`❌ Bank not found: ${bankId}`);
      return res.status(404).json({ 
        error: 'Bank not found',
        bankId: bankId 
      });
    }

    console.log(`✅ Bank found: ${bank.name}`);
    res.json(bank);
  } catch (error) {
    console.error('❌ Error fetching bank details:', error);
    res.status(500).json({ 
      error: 'Failed to fetch bank details',
      message: error.message 
    });
  }
});

// POST /api/farm-loans/calculate-emi - Calculate EMI
router.post('/calculate-emi', (req, res) => {
  try {
    const { loanAmount, interestRate, tenure } = req.body;
    
    console.log('🧮 Farm Loans API: Calculating EMI');
    console.log(`💰 Loan Amount: ₹${loanAmount}`);
    console.log(`📊 Interest Rate: ${interestRate}%`);
    console.log(`⏰ Tenure: ${tenure} years`);

    // Validate input
    if (!loanAmount || !interestRate || !tenure) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['loanAmount', 'interestRate', 'tenure']
      });
    }

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(tenure) * 12;

    // EMI calculation formula
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = emi * time;
    const totalInterest = totalAmount - principal;

    const result = {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: principal
    };

    console.log(`✅ EMI Calculated: ₹${result.emi}`);
    console.log(`💵 Total Amount: ₹${result.totalAmount}`);
    console.log(`📈 Total Interest: ₹${result.totalInterest}`);

    res.json(result);
  } catch (error) {
    console.error('❌ Error calculating EMI:', error);
    res.status(500).json({ 
      error: 'Failed to calculate EMI',
      message: error.message 
    });
  }
});

// GET /api/farm-loans/loan-types - Get available loan types
router.get('/loan-types', (req, res) => {
  try {
    console.log('📋 Farm Loans API: Fetching loan types');
    
    const loanTypes = [
      {
        type: 'KCC',
        fullName: 'Kisan Credit Card',
        description: 'Flexible credit facility for farmers',
        maxAmount: '₹3 Lakhs',
        tenure: '5 years',
        features: ['Flexible withdrawals', 'Interest subsidy', 'Insurance coverage']
      },
      {
        type: 'Crop Loan',
        fullName: 'Crop Cultivation Loan',
        description: 'Short-term loans for crop cultivation',
        maxAmount: '₹10 Lakhs',
        tenure: '1 year',
        features: ['Seasonal repayment', 'Low interest', 'Quick processing']
      },
      {
        type: 'Equipment Loan',
        fullName: 'Farm Equipment Loan',
        description: 'Loans for purchasing farm machinery',
        maxAmount: '₹25 Lakhs',
        tenure: '7 years',
        features: ['Asset-backed loan', 'Competitive rates', 'Easy EMI']
      },
      {
        type: 'Land Development',
        fullName: 'Land Development Loan',
        description: 'Loans for land improvement and development',
        maxAmount: '₹15 Lakhs',
        tenure: '10 years',
        features: ['Long tenure', 'Subsidized rates', 'Government support']
      }
    ];

    console.log(`📊 Total loan types: ${loanTypes.length}`);
    res.json(loanTypes);
  } catch (error) {
    console.error('❌ Error fetching loan types:', error);
    res.status(500).json({ 
      error: 'Failed to fetch loan types',
      message: error.message 
    });
  }
});

// GET /api/farm-loans/eligibility-check - Check loan eligibility
router.post('/eligibility-check', (req, res) => {
  try {
    const { age, landOwnership, income, creditScore, loanAmount } = req.body;
    
    console.log('🔍 Farm Loans API: Checking eligibility');
    console.log(`👤 Age: ${age}, Land: ${landOwnership}, Income: ₹${income}`);

    let eligible = true;
    let reasons = [];
    let recommendations = [];

    // Age check
    if (age < 18 || age > 70) {
      eligible = false;
      reasons.push('Age should be between 18-70 years');
    }

    // Land ownership check
    if (!landOwnership) {
      eligible = false;
      reasons.push('Land ownership documents required');
    }

    // Income check (minimum ₹50,000 annual income)
    if (income < 50000) {
      eligible = false;
      reasons.push('Minimum annual income of ₹50,000 required');
      recommendations.push('Consider applying for smaller loan amount');
    }

    // Credit score check
    if (creditScore && creditScore < 650) {
      eligible = false;
      reasons.push('Credit score should be above 650');
      recommendations.push('Improve credit score before applying');
    }

    // Loan amount vs income ratio
    if (loanAmount && income && (loanAmount > income * 10)) {
      eligible = false;
      reasons.push('Loan amount too high compared to income');
      recommendations.push('Consider reducing loan amount');
    }

    const result = {
      eligible,
      reasons,
      recommendations,
      suggestedBanks: eligible ? ['SBI', 'HDFC', 'ICICI'] : ['Cooperative Banks', 'Regional Rural Banks']
    };

    console.log(`✅ Eligibility Result: ${eligible ? 'Eligible' : 'Not Eligible'}`);
    res.json(result);
  } catch (error) {
    console.error('❌ Error checking eligibility:', error);
    res.status(500).json({ 
      error: 'Failed to check eligibility',
      message: error.message 
    });
  }
});

module.exports = router;