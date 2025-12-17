# 📤 GitHub Push Guide

## Quick Start

### Option 1: Using the Automated Script (Recommended)
```bash
cd iit-bombay-smart-agriculture-hackathon
commit-and-push.bat
```

### Option 2: Manual Commands
```bash
cd iit-bombay-smart-agriculture-hackathon
git add .
git commit -m "feat: Add Soil Monitoring System with Pattern Matching"
git push origin main
```

---

## 📋 Files Being Added

### Core Application Files
- ✅ `frontend/src/components/IoTMonitoring.tsx` - Main soil monitoring component
- ✅ `frontend/src/pages/IoTMonitoring.tsx` - Page wrapper
- ✅ `frontend/src/components/Navbar.tsx` - Updated navigation
- ✅ `frontend/src/components/FarmerSchemesHub.tsx` - Government schemes (English default)
- ✅ `backend/routes/iotRoutes.js` - IoT API endpoints
- ✅ `backend/index.js` - Updated backend with IoT routes
- ✅ `backend/.env` - Environment configuration

### Setup Scripts
- ✅ `setup-local.bat` - Initial setup script
- ✅ `start-local.bat` - Start servers script
- ✅ `quick-start.bat` - Quick start script

### IoT Integration
- ✅ `raspberry-pi-sender.py` - Python script for Raspberry Pi
- ✅ `raspberry-pi-arduino-sender.py` - Arduino integration script
- ✅ `Iot/index.html` - IoT test page

### Documentation
- ✅ `LOCAL-SETUP-GUIDE.md` - Local setup instructions
- ✅ `DEMO-MODE-GUIDE.md` - Demo mode usage
- ✅ `CROP-PATTERN-MATCHING.md` - Pattern matching explanation
- ✅ `RASPBERRY-PI-DIRECT-SETUP.md` - Hardware setup
- ✅ `ARDUINO-RASPBERRY-PI-SETUP.md` - Arduino integration

---

## 🚀 Step-by-Step Instructions

### Step 1: Check Current Status
```bash
cd iit-bombay-smart-agriculture-hackathon
git status
```

This shows all modified and new files.

### Step 2: Add Files to Staging
```bash
# Add all files
git add .

# Or add specific files
git add frontend/src/components/IoTMonitoring.tsx
git add backend/routes/iotRoutes.js
# ... etc
```

### Step 3: Commit Changes
```bash
git commit -m "feat: Add Soil Monitoring System with Pattern Matching and Demo Mode"
```

### Step 4: Push to GitHub

#### If pushing to main repository:
```bash
git push origin main
```

#### If pushing to your fork:
```bash
git push myfork main
```

#### If you haven't set up your fork as remote:
```bash
git remote add myfork https://github.com/Adityarajnitrr/iit-bombay-smart-agriculture-hackathon.git
git push myfork main
```

---

## 📝 Detailed Commit Message

Use this comprehensive commit message:

```
feat: Add Soil Monitoring System with Pattern Matching and Demo Mode

Features Added:
- Real-time soil moisture monitoring with IoT integration
- Multi-line crop comparison graphs (8 crops: Rice, Wheat, Cotton, Maize, Sugarcane, Tomato, Potato, Chickpea)
- Pattern matching algorithm for intelligent crop recommendations
- Visual sorting animation showing comparison process
- Demo mode with 7 sample readings for presentations
- Individual crop comparison graphs (4 detailed views)
- Raspberry Pi and Arduino sensor integration
- Toggle switch between Demo and Live modes
- Crop recommendation cards with match scores and rankings
- Performance metrics dashboard

Technical Updates:
- Enhanced IoTMonitoring component with advanced visualization
- Added demo mode with realistic sample data (58-65% moisture range)
- Implemented visual sorting with comparison overlay
- Created crop moisture pattern database with growth stages
- Added backend IoT routes for sensor data (latest, history, health)
- Updated Navbar with "Soil Monitoring" link
- Cleaned up 16 redundant documentation files
- Fixed Government Schemes page to default to English

Components Modified:
- frontend/src/components/IoTMonitoring.tsx (major enhancement)
- frontend/src/components/Navbar.tsx (added Soil Monitoring link)
- frontend/src/components/FarmerSchemesHub.tsx (English default)
- backend/routes/iotRoutes.js (new IoT endpoints)
- backend/index.js (registered IoT routes)

New Features:
1. Demo Mode Toggle
   - Switch between Demo and Raspberry Pi modes
   - Sample data for presentations
   - Show/Hide comparison button

2. Crop Pattern Matching
   - 8 crop patterns with growth stages
   - Similarity scoring algorithm
   - Automatic ranking by match score

3. Visual Comparison
   - Multi-line graph (your soil vs 8 crops)
   - Individual comparison graphs (4 crops)
   - Real-time sorting animation

4. IoT Integration
   - Direct Raspberry Pi connection
   - Arduino sensor support
   - Real-time data updates (5 seconds)

Documentation:
- DEMO-MODE-GUIDE.md - Complete demo mode usage guide
- CROP-PATTERN-MATCHING.md - Pattern matching algorithm explanation
- LOCAL-SETUP-GUIDE.md - Local development setup
- RASPBERRY-PI-DIRECT-SETUP.md - Hardware setup instructions
- ARDUINO-RASPBERRY-PI-SETUP.md - Arduino integration guide

Tested:
- ✅ Demo mode with sample data
- ✅ Crop pattern matching algorithm
- ✅ Visual sorting animation
- ✅ Individual comparison graphs
- ✅ Toggle switch functionality
- ✅ Backend IoT routes
- ✅ Frontend-backend integration

For IIT Bombay AWS X Impact Challenge 2025
```

---

## 🔍 Verify Before Pushing

### Check what will be committed:
```bash
git diff --cached
```

### Check commit history:
```bash
git log --oneline -5
```

### Check remote repositories:
```bash
git remote -v
```

---

## 🌿 Creating a Pull Request

### If pushing to your fork:

1. **Push to your fork:**
   ```bash
   git push myfork main
   ```

2. **Go to GitHub:**
   - Visit: https://github.com/Adityarajnitrr/iit-bombay-smart-agriculture-hackathon

3. **Create Pull Request:**
   - Click "Contribute" → "Open pull request"
   - Add title: "feat: Add Soil Monitoring System with Pattern Matching"
   - Add description (use the detailed commit message above)
   - Click "Create pull request"

---

## 🔧 Troubleshooting

### If you get "Permission denied":
```bash
# Check your remote URL
git remote -v

# If using HTTPS, you may need to authenticate
# If using SSH, check your SSH keys
```

### If you get "Merge conflicts":
```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts
# Then commit and push
```

### If you want to undo the last commit:
```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Undo commit and discard changes
git reset --hard HEAD~1
```

---

## 📊 What's Being Added

### New Features (Summary):
1. **Soil Monitoring System** - Complete IoT monitoring dashboard
2. **Pattern Matching** - AI-powered crop recommendations
3. **Demo Mode** - Presentation-ready sample data
4. **Visual Sorting** - Animated comparison process
5. **IoT Integration** - Raspberry Pi & Arduino support

### Files Changed:
- **Modified**: 5 files
- **Added**: 10+ files
- **Deleted**: 16 redundant files

### Lines of Code:
- **Frontend**: ~1000+ lines (IoTMonitoring.tsx)
- **Backend**: ~200+ lines (iotRoutes.js)
- **Documentation**: ~2000+ lines (guides)

---

## ✅ Post-Push Checklist

After pushing, verify:

1. ✅ Visit your GitHub repository
2. ✅ Check that all files are uploaded
3. ✅ Review the commit message
4. ✅ Check file structure is correct
5. ✅ Verify documentation is readable
6. ✅ Test clone on another machine (optional)

---

## 🎯 Quick Commands Reference

```bash
# Status
git status

# Add all
git add .

# Commit
git commit -m "your message"

# Push to origin
git push origin main

# Push to fork
git push myfork main

# View remotes
git remote -v

# View log
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

---

## 📞 Need Help?

If you encounter issues:
1. Check git status: `git status`
2. Check remotes: `git remote -v`
3. Check branch: `git branch`
4. Pull latest: `git pull origin main`

---

**Ready to push? Run:**
```bash
commit-and-push.bat
```

Or manually:
```bash
git add .
git commit -m "feat: Add Soil Monitoring System"
git push origin main
```

Good luck! 🚀
