# 🚀 LOCAL DEPLOYMENT GUIDE

## ⚡ FASTEST WAY TO START (One Command!)

Just double-click this file:
```
quick-start.bat
```

This will:
1. ✅ Install all dependencies (if needed)
2. ✅ Start backend server
3. ✅ Start frontend server
4. ✅ Open your browser automatically

---

## 🌐 YOUR LOCAL WEBSITE LINKS

Once the servers are running, access your application at:

### 🏠 Main Application
```
http://localhost:5173
```

### 🐆 FarmShield Pro (Wildlife Protection)
```
http://localhost:5173/farmshield
```

### 🔌 Backend API
```
http://localhost:3000
```

### 📊 API Health Check
```
http://localhost:3000/
```

---

## 📋 STEP-BY-STEP SETUP (If you prefer manual control)

### Step 1: Install Dependencies
```bash
setup-local.bat
```

### Step 2: Configure Environment (Optional)

#### Backend Configuration
Edit `backend/.env`:
- **MongoDB**: Use local MongoDB or MongoDB Atlas (free)
- **Gemini API**: Get free key from https://makersuite.google.com/app/apikey

#### Frontend Configuration
Edit `frontend/.env`:
- Already configured for local development!
- Connects to `http://localhost:3000` automatically

### Step 3: Start Servers
```bash
start-local.bat
```

---

## 🎯 WHAT YOU'LL SEE

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

---

## 🔧 CONFIGURATION DETAILS

### Backend (Port 3000)
- **File**: `backend/index.js`
- **Port**: 3000 (configurable in `.env`)
- **Database**: MongoDB (local or Atlas)
- **API Endpoints**: All routes available at `/api/*`

### Frontend (Port 5173)
- **File**: `frontend/vite.config.ts`
- **Port**: 5173 (Vite default)
- **API Connection**: `http://localhost:3000`
- **Auto-open**: Browser opens automatically

---

## 🛠️ TROUBLESHOOTING

### Port Already in Use

**Backend (Port 3000)**
Edit `backend/.env`:
```env
PORT=3001
```
Then update `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

**Frontend (Port 5173)**
Edit `frontend/vite.config.ts`:
```typescript
server: {
  port: 5174,
}
```

### MongoDB Connection Error

**Option 1: Use MongoDB Atlas (Recommended)**
1. Go to https://mongodb.com/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env`:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-agriculture
```

**Option 2: Install Local MongoDB**
1. Download from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Keep default in `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/smart-agriculture
```

### Dependencies Not Installing

**Clear npm cache and reinstall:**
```bash
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install

cd ../frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```

### API Not Responding

1. Check backend terminal for errors
2. Verify backend is running on port 3000
3. Check `frontend/.env` has correct API URL
4. Try accessing http://localhost:3000 directly

---

## 📱 FEATURES AVAILABLE LOCALLY

All features work perfectly in local development:

✅ **AI Chatbot (Sarthi)** - Hindi/English farming assistant
✅ **Crop Health Detection** - Disease identification with AI
✅ **Price Estimation** - AI-powered market analysis
✅ **Weather Analytics** - 3D weather visualization
✅ **FarmShield Pro** - Wildlife protection system
✅ **Land Marketplace** - Interactive property listings
✅ **Government Schemes** - Agricultural policies
✅ **Direct Market** - Farmer-to-consumer platform

---

## 🎨 DEVELOPMENT TIPS

### Hot Reload
Both servers support hot reload:
- **Backend**: Restart server to see changes
- **Frontend**: Changes appear instantly (Vite HMR)

### View Logs
Check the terminal windows for:
- API requests and responses
- Error messages
- Database connections
- Build information

### Stop Servers
Press `Ctrl+C` in each terminal window

### Restart Servers
Just run `start-local.bat` again!

---

## 🔐 SECURITY NOTES

For local development:
- ✅ Default JWT secret is fine
- ✅ MongoDB can be local without password
- ✅ API keys can be test keys

For production:
- ⚠️ Change JWT_SECRET to random string
- ⚠️ Use secure MongoDB credentials
- ⚠️ Use production API keys
- ⚠️ Enable HTTPS

---

## 📞 NEED HELP?

### Common Issues

**"npm is not recognized"**
- Install Node.js from https://nodejs.org/

**"Port 3000 is already in use"**
- Change PORT in `backend/.env`

**"Cannot connect to MongoDB"**
- Use MongoDB Atlas (free cloud option)

**"API calls failing"**
- Check backend is running
- Verify `frontend/.env` has correct URL

---

## 🎯 QUICK REFERENCE

### Start Everything
```bash
quick-start.bat
```

### Just Install Dependencies
```bash
setup-local.bat
```

### Just Start Servers
```bash
start-local.bat
```

### Manual Start
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## 🌟 YOUR LOCAL LINKS (COPY & PASTE)

```
Main App:        http://localhost:5173
FarmShield:      http://localhost:5173/farmshield
Backend API:     http://localhost:3000
API Health:      http://localhost:3000/
```

---

**🎉 You're all set! Happy coding!**

Your IIT Bombay Smart Agriculture Platform is now running locally on your machine!
