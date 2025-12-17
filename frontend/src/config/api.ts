// API Configuration
// For local development, use http://localhost:3000
// For production, use the deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  FARMERS: `${API_BASE_URL}/api/farmers`,
  SELLERS: `${API_BASE_URL}/api/sellers`,
  LAND: `${API_BASE_URL}/api/land`,
  EMAIL: `${API_BASE_URL}/api/email`,
  AI: `${API_BASE_URL}/api/ai`,
  TOKENS: `${API_BASE_URL}/api/tokens`,
  PAYMENT: `${API_BASE_URL}/api/payment`,
  WORK: `${API_BASE_URL}/api/work`
};

export default API_ENDPOINTS;