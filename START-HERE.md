# 🚀 START HERE - Quick Guide

## ⚡ FASTEST WAY TO RUN LOCALLY

### Option 1: One-Click Start (Recommended)
Double-click this file:
```
quick-start.bat
```

### Option 2: View All Links
Open this file in your browser:
```
LOCALHOST-LINKS.html
```

---

## 🌐 YOUR LOCALHOST LINKS

Once servers are running:

### Frontend (Main Application)
```
http://localhost:5173
```

### FarmShield Pro (Wildlife Protection)
```
http://localhost:5173/farmshield
```

### Backend API
```
http://localhost:3000
```

---

## 📋 WHAT EACH FILE DOES

| File | Purpose |
|------|---------|
| `quick-start.bat` | ⚡ Install & start everything (ONE CLICK!) |
| `setup-local.bat` | 📦 Install dependencies only |
| `start-local.bat` | 🚀 Start servers only |
| `LOCALHOST-LINKS.html` | 🌐 View all links in browser |
| `LOCAL-DEPLOYMENT.md` | 📖 Complete setup guide |
| `LOCAL-SETUP-GUIDE.md` | 📚 Detailed instructions |

---

## 🎯 QUICK START STEPS

1. **Run quick-start.bat**
   - Installs everything
   - Starts both servers
   - Opens browser automatically

2. **Access your app**
   - Main app: http://localhost:5173
   - FarmShield: http://localhost:5173/farmshield

3. **Done!** 🎉

---

## 🔧 CONFIGURATION (Optional)

### Backend (.env)
Located at: `backend/.env`

**Required for AI features:**
- Get Gemini API key: https://makersuite.google.com/app/apikey
- Update `GEMINI_API_KEY=your-key-here`

**Database (Optional):**
- Default: Local MongoDB
- Or use MongoDB Atlas (free): https://mongodb.com/atlas

### Frontend (.env)
Located at: `frontend/.env`
- Already configured!
- Connects to `http://localhost:3000` automatically

---

## 🛠️ TROUBLESHOOTING

### Servers won't start?
1. Make sure Node.js is installed: https://nodejs.org/
2. Run `setup-local.bat` first
3. Check if ports 3000 and 5173 are free

### Can't access localhost?
1. Check both terminal windows are running
2. Wait 10-20 seconds for servers to start
3. Try refreshing the browser

### Need detailed help?
Read: `LOCAL-DEPLOYMENT.md`

---

## 📱 FEATURES YOU'LL SEE

✅ AI Chatbot (Sarthi) - Hindi/English assistant
✅ Crop Health Detection - Disease identification
✅ Price Estimation - Market analysis
✅ Weather Analytics - 3D visualization
✅ FarmShield Pro - Wildlife protection
✅ Land Marketplace - Property listings
✅ Government Schemes - Agricultural policies
✅ Direct Market - Farmer platform

---

## 🌟 PRODUCTION WEBSITE

Already deployed and live:
```
https://iit-bombay-agriculture-frontend-pw2314i5w.vercel.app
```

---

## 📞 QUICK REFERENCE

**Start everything:**
```bash
quick-start.bat
```

**View links:**
```
Open LOCALHOST-LINKS.html in browser
```

**Your local URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- FarmShield: http://localhost:5173/farmshield

---

**🎉 That's it! You're ready to go!**

Just run `quick-start.bat` and start developing!
