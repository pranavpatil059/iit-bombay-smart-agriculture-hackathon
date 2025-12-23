# 🌐 LOCALHOST DEPLOYMENT - COMPLETE GUIDE

## 🎯 YOUR LOCALHOST LINKS (Copy & Paste)

```
Frontend:    http://localhost:5173
FarmShield:  http://localhost:5173/farmshield
Backend:     http://localhost:3000
API Health:  http://localhost:3000/
```

---

## ⚡ FASTEST START (Just 1 Click!)

### Windows Users:
```
Double-click: quick-start.bat
```

That's it! The script will:
1. ✅ Install all dependencies automatically
2. ✅ Start backend server (port 3000)
3. ✅ Start frontend server (port 5173)
4. ✅ Open browser automatically

---

## 📋 WHAT I CHANGED FOR LOCAL DEPLOYMENT

### 1. Backend Configuration (`backend/index.js`)
**Changed:**
- Port from 10001 → 3000
- Server now starts in all environments
- Added detailed startup logs

**Result:**
```
🚀 Server running on http://localhost:3000
📍 Environment: development
🌐 Access the API at: http://localhost:3000
✅ Ready to accept requests!
```

### 2. Frontend Configuration (`frontend/vite.config.ts`)
**Changed:**
- Port from 8080 → 5173 (Vite standard)
- Host from "::" → "localhost"
- Added auto-open browser

**Result:**
- Opens automatically at http://localhost:5173
- Hot reload works perfectly
- Fast refresh enabled

### 3. API Configuration (`frontend/src/config/api.ts`)
**Changed:**
- Default API URL from Railway → localhost:3000
- Now connects to local backend automatically

**Result:**
- Frontend talks to local backend
- No CORS issues
- Fast development

### 4. Environment Files
**Created:**
- `backend/.env` - Pre-configured for local dev
- `frontend/.env` - Points to localhost:3000

**Result:**
- Works out of the box
- Just add Gemini API key (optional)

---

## 🚀 ALL AVAILABLE SCRIPTS

| Script | What It Does |
|--------|--------------|
| `quick-start.bat` | ⚡ Install everything & start (ONE CLICK!) |
| `start-local.bat` | 🚀 Start both servers |
| `setup-local.bat` | 📦 Install dependencies only |

---

## 🌐 ACCESS YOUR APPLICATION

### After Running quick-start.bat:

1. **Two terminal windows will open:**
   - Backend Server (Port 3000)
   - Frontend Server (Port 5173)

2. **Browser opens automatically to:**
   ```
   http://localhost:5173
   ```

3. **All features work:**
   - AI Chatbot ✅
   - Crop Health Detection ✅
   - Weather Analytics ✅
   - FarmShield Pro ✅
   - All other features ✅

---

## 📱 PAGES YOU CAN ACCESS

### Main Application
```
http://localhost:5173
```
- Dashboard
- AI Chatbot (Sarthi)
- Crop Health Detection
- Price Estimation
- Weather Analytics
- Land Marketplace
- Government Schemes
- Direct Market

### FarmShield Pro
```
http://localhost:5173/farmshield
```
- Real-time wildlife alerts
- Risk assessment
- Live tracking
- Emergency notifications

### Backend API
```
http://localhost:3000
```
- API documentation
- All endpoints
- Health check

---

## 🔧 CONFIGURATION (Optional)

### Backend Environment (`backend/.env`)

**Already configured! But you can customize:**

```env
# Server Port (default: 3000)
PORT=3000

# Database (works without MongoDB too!)
MONGO_URI=mongodb://localhost:27017/smart-agriculture

# AI Features (optional - get free key)
GEMINI_API_KEY=your-key-here
```

**Get Gemini API Key (Free):**
1. Go to: https://makersuite.google.com/app/apikey
2. Create API key
3. Paste in `.env` file

### Frontend Environment (`frontend/.env`)

**Already configured perfectly!**

```env
# Points to local backend
VITE_API_URL=http://localhost:3000
```

---

## 🛠️ TROUBLESHOOTING

### Issue: Port 3000 already in use

**Solution 1:** Stop other apps using port 3000

**Solution 2:** Change port in `backend/.env`:
```env
PORT=3001
```
Then update `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

### Issue: Port 5173 already in use

**Solution:** Edit `frontend/vite.config.ts`:
```typescript
server: {
  port: 5174,
}
```

### Issue: Dependencies won't install

**Solution:**
```bash
# Backend
cd backend
rmdir /s /q node_modules
npm install

# Frontend
cd frontend
rmdir /s /q node_modules
npm install
```

### Issue: MongoDB connection error

**Solution:** It's optional! The app works without MongoDB.

**Or use MongoDB Atlas (Free):**
1. Go to https://mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Update `backend/.env`

---

## 📊 WHAT YOU'LL SEE

### Backend Terminal (Port 3000)
```
🚀 Server running on http://localhost:3000
📍 Environment: development
🌐 Access the API at: http://localhost:3000
✅ Ready to accept requests!
```

### Frontend Terminal (Port 5173)
```
VITE v5.4.1  ready in 1234 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Browser
- Opens automatically to http://localhost:5173
- Full application loads
- All features work perfectly

---

## 🎯 DEVELOPMENT WORKFLOW

### 1. Start Development
```bash
quick-start.bat
```

### 2. Make Changes
- Edit files in `frontend/src/` or `backend/`
- Frontend: Changes appear instantly (hot reload)
- Backend: Restart server to see changes

### 3. View Changes
- Frontend: Automatic refresh
- Backend: Check terminal for logs

### 4. Stop Servers
- Press `Ctrl+C` in each terminal window

### 5. Restart
```bash
start-local.bat
```

---

## 📁 PROJECT STRUCTURE

```
iit-bombay-smart-agriculture-hackathon/
│
├── backend/                    # Backend API (Port 3000)
│   ├── .env                   # Configuration (PORT, API keys)
│   ├── index.js               # Main server file
│   ├── routes/                # API routes
│   └── package.json           # Dependencies
│
├── frontend/                   # Frontend App (Port 5173)
│   ├── .env                   # API URL configuration
│   ├── vite.config.ts         # Vite configuration
│   ├── src/                   # Source code
│   └── package.json           # Dependencies
│
├── quick-start.bat            # ⚡ ONE-CLICK START
├── start-local.bat            # Start servers
├── setup-local.bat            # Install dependencies
├── LOCALHOST-LINKS.html       # Visual link page
└── README-LOCALHOST.md        # This file
```

---

## 🌟 FEATURES AVAILABLE LOCALLY

All features work perfectly in local development:

### ✅ Core Features
- AI Chatbot (Sarthi) - Hindi/English
- Crop Health Detection
- Price Estimation
- Weather Analytics (3D)
- Government Schemes
- Direct Market Platform

### ✅ FarmShield Pro
- Wildlife Protection System
- Real-time Risk Assessment
- Live Alerts
- GPS Tracking
- Emergency Notifications

### ✅ Advanced Features
- Computer Vision Analysis
- Voice Recognition
- Blockchain Verification
- IoT Integration
- AR Wildlife Identification

---

## 🔐 SECURITY NOTES

### Local Development (Current Setup)
- ✅ Default settings are fine
- ✅ No security concerns
- ✅ Safe for development

### Production Deployment
- ⚠️ Change JWT_SECRET
- ⚠️ Use secure MongoDB credentials
- ⚠️ Enable HTTPS
- ⚠️ Use production API keys

---

## 📞 NEED MORE HELP?

### Quick Guides
- `START-HERE.md` - Quick start guide
- `LOCAL-DEPLOYMENT.md` - Complete guide
- `LOCAL-SETUP-GUIDE.md` - Step-by-step
- `LOCALHOST-INFO.txt` - Text summary

### Visual Interface
- Open `LOCALHOST-LINKS.html` in browser
- Shows all links with status checks
- Pretty UI with quick actions

---

## 🌐 PRODUCTION VS LOCAL

### Production (Live Website)
```
https://iit-bombay-agriculture-frontend-pw2314i5w.vercel.app
```
- Deployed on Vercel
- Uses Railway backend
- Production database
- Public access

### Local Development (Your Machine)
```
http://localhost:5173
```
- Runs on your computer
- Local backend (port 3000)
- Optional database
- Private access

---

## 🎉 YOU'RE ALL SET!

### Quick Recap:

1. **Run:** `quick-start.bat`
2. **Wait:** 10-20 seconds
3. **Access:** http://localhost:5173
4. **Enjoy:** All features work!

### Your Localhost Links:

```
Main App:     http://localhost:5173
FarmShield:   http://localhost:5173/farmshield
Backend:      http://localhost:3000
```

---

## 🏆 IIT BOMBAY AWS X IMPACT HACKATHON 2025

**Smart Agriculture & Wildlife Protection Platform**

Empowering 600M+ Indian Farmers with AI & Technology

---

**Happy Coding! 🚀**

Your local development environment is ready!
