// API Configuration
// For local development, use http://localhost:10001
// For production, use the deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:10001';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  FARMERS: `${API_BASE_URL}/api/farmers`,
  SELLERS: `${API_BASE_URL}/api/sellers`,
  LAND: `${API_BASE_URL}/api/land`,
  EMAIL: `${API_BASE_URL}/api/email`,
  AI: `${API_BASE_URL}/api/ai`,
  TOKENS: `${API_BASE_URL}/api/tokens`,
  PAYMENT: `${API_BASE_URL}/api/payment`,
  WORK: `${API_BASE_URL}/api/work`,
  IOT: {
    SENSOR_DATA: `${API_BASE_URL}/api/iot/sensor-data`,
    LATEST: `${API_BASE_URL}/api/iot/sensor-data/latest`,
    HISTORY: `${API_BASE_URL}/api/iot/sensor-data/history`,
    HEALTH: `${API_BASE_URL}/api/iot/health`
  }
};

export default API_ENDPOINTS;