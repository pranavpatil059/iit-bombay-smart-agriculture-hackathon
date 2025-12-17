const express = require('express');
const router = express.Router();

// Sample bank data - In production, this would come from a database
const banksData = [
  {
    id: 'sbi-001',
    name: 'State Bank of India',
    interestRate: '7.0',
    loanTypes: ['KCC', 'Crop Loan', 'Equipment Loan', 'Land Development'],
    processingTime: '7-10 days',
    maxAmount: '₹50 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Indian citizen'],
    contactNumber: '1800-11-2211',
    website: 'https://sbi.co.in/',
    nearestBranch: 'Main Branch',
    address: 'SBI Main Branch, City Center',
    specialFeatures: [
      'No processing fee for loans up to ₹3 lakhs',
      'Flexible repayment options',
      'Interest subsidy available',
      'Quick approval process'
    ]
  },
  {
    id: 'hdfc-001',
    name: 'HDFC Bank',
    interestRate: '8.5',
    loanTypes: ['KCC', 'Crop Loan', 'Dairy Loan', 'Equipment Loan'],
    processingTime: '5-7 days',
    maxAmount: '₹25 Lakhs',
    eligibility: ['Land ownership', 'Age 21-65', 'Good credit score'],
    contactNumber: '1800-266-4332',
    website: 'https://www.hdfcbank.com/',
    nearestBranch: 'Agricultural Branch',
    address: 'HDFC Agricultural Branch, Market Road',
    specialFeatures: [
      'Digital application process',
      'Competitive interest rates',
      'Doorstep service available',
      'Insurance coverage included'
    ]
  },
  {
    id: 'icici-001',
    name: 'ICICI Bank',
    interestRate: '8.0',
    loanTypes: ['KCC', 'Crop Loan', 'Equipment Loan', 'Warehouse Loan'],
    processingTime: '3-5 days',
    maxAmount: '₹30 Lakhs',
    eligibility: ['Land ownership', 'Age 18-70', 'Regular income'],
    contactNumber: '1860-120-7777',
    website: 'https://www.icicibank.com/',
    nearestBranch: 'Rural Branch',
    address: 'ICICI Rural Branch, Agricultural Market',
    specialFeatures: [
      'Fast processing',
      'Mobile banking support',
      'Seasonal payment options',
      'Government scheme integration'
    ]
  },
  {
    id: 'pnb-001',
    name: 'Punjab National Bank',
    interestRate: '7.5',
    loanTypes: ['KCC', 'Crop Loan', 'Equipment Loan', 'Land Development'],
    processingTime: '7-14 days',
    maxAmount: '₹40 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Farming experience'],
    contactNumber: '1800-180-2222',
    website: 'https://www.pnbindia.in/',
    nearestBranch: 'Agricultural Finance Branch',
    address: 'PNB Agricultural Finance Branch, Mandi Road',
    specialFeatures: [
      'Low interest rates',
      'Government subsidy support',
      'Flexible tenure options',
      'Crop insurance facility'
    ]
  },
  {
    id: 'canara-001',
    name: 'Canara Bank',
    interestRate: '7.25',
    loanTypes: ['KCC', 'Crop Loan', 'Dairy Loan', 'Equipment Loan'],
    processingTime: '5-10 days',
    maxAmount: '₹35 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Valid documents'],
    contactNumber: '1800-425-0018',
    website: 'https://canarabank.com/',
    nearestBranch: 'Krishi Branch',
    address: 'Canara Bank Krishi Branch, Agricultural Zone',
    specialFeatures: [
      'Specialized agricultural officers',
      'Seasonal repayment schedule',
      'Insurance coverage',
      'Digital loan tracking'
    ]
  },
  {
    id: 'bob-001',
    name: 'Bank of Baroda',
    interestRate: '7.75',
    loanTypes: ['KCC', 'Crop Loan', 'Equipment Loan', 'Warehouse Loan'],
    processingTime: '7-12 days',
    maxAmount: '₹45 Lakhs',
    eligibility: ['Land ownership', 'Age 18-65', 'Farming background'],
    contactNumber: '1800-258-4455',
    website: 'https://www.bankofbaroda.in/',
    nearestBranch: 'Rural Development Branch',
    address: 'BOB Rural Development Branch, Farmer Market',
    specialFeatures: [
      'Comprehensive rural banking',
      'Technology-enabled services',
      'Crop advisory services',
      'Government scheme linkage'
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