# 🚀 Local Development Setup Guide

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
setup-local.bat
```
This will install all required packages for both frontend and backend.

### Step 2: Configure Environment Variables

#### Backend Configuration (`backend/.env`)
Already created! Update these values:

1. **MongoDB** (Choose one option):
   - **Option A - MongoDB Atlas (Free Cloud)**:
     - Go to https://mongodb.com/atlas
     - Create free account and cluster
     - Get connection string
     - Update `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-agriculture`
   
   - **Option B - Local MongoDB**:
     - Install MongoDB from https://www.mongodb.com/try/download/community
     - Keep default: `MONGO_URI=mongodb://localhost:27017/smart-agriculture`

2. **Gemini AI API Key** (Required for AI features):
   - Go to https://makersuite.google.com/app/apikey
   - Create API key
   - Update `GEMINI_API_KEY=your-actual-key-here`

3. **JWT Secret** (Optional - change for security):
   - Update `JWT_SECRET=your-random-secret-string`

#### Frontend Configuration (`frontend/.env`)
Already created! Optionally update:

1. **Google Maps API Key** (Optional - for map features):
   - Go to https://console.cloud.google.com/
   - Enable Maps JavaScript API
   - Create API key
   - Update `VITE_GOOGLE_MAPS_API_KEY=your-key-here`

### Step 3: Start Development Servers
```bash
start-local.bat
```

This will open two terminal windows:
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

## 🌐 Access Your Local Application

Once both servers are running:

- **Main Application**: http://localhost:5173
- **FarmShield Pro**: http://localhost:5173/farmshield
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health

## 📦 Manual Setup (Alternative)

If you prefer to run commands manually:

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use:

**Backend** - Edit `backend/.env`:
```
PORT=3001
```

**Frontend** - Edit `frontend/vite.config.ts` or run:
```bash
npm run dev -- --port 5174
```

### MongoDB Connection Error
- Make sure MongoDB is running (if using local)
- Check your connection string in `backend/.env`
- For Atlas, whitelist your IP address in MongoDB Atlas dashboard

### Missing Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### API Key Issues
- Gemini API: Get free key from https://makersuite.google.com/app/apikey
- Google Maps: Get key from https://console.cloud.google.com/

## 🎯 Features Available Locally

All features work locally:
- ✅ AI Chatbot (Sarthi) - Hindi/English
- ✅ Crop Health Detection
- ✅ Price Estimation
- ✅ Weather Analytics
- ✅ FarmShield Wildlife Protection
- ✅ Land Marketplace
- ✅ Government Schemes
- ✅ Direct Market Platform

## 📱 Development URLs

- Frontend Dev Server: http://localhost:5173
- Backend API Server: http://localhost:3000
- MongoDB (local): mongodb://localhost:27017

## 🛠️ Useful Commands

### Backend
```bash
cd backend
npm start          # Start server
npm run dev        # Start with nodemon (auto-reload)
```

### Frontend
```bash
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🔐 Security Notes

- Never commit `.env` files to Git
- Change default JWT_SECRET in production
- Use environment-specific API keys
- Keep your MongoDB credentials secure

## 📞 Need Help?

If you encounter issues:
1. Check the terminal logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check that ports 3000 and 5173 are available

---

**Happy Coding! 🚀**

Your local development environment is ready for the IIT Bombay Smart Agriculture Platform!
