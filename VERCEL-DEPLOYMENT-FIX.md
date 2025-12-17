# 🔧 Vercel Deployment Fix Guide

## Issue
Vercel deployment failing with error: "Unable to resolve action vercel/action, repository not found"

## ✅ Fixes Applied

### 1. Updated GitHub Workflow
**File**: `.github/workflows/deploy.yml`

**Changed from:**
```yaml
uses: vercel/action@v1
```

**Changed to:**
```yaml
uses: amondnet/vercel-action@v25
```

### 2. Updated Vercel Configuration
**File**: `vercel.json` (root)

Simplified configuration for better compatibility:
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm install --prefix frontend",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. Added Frontend Vercel Config
**File**: `frontend/vercel.json`

Added SPA routing configuration:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🚀 How to Deploy

### Option 1: Push to GitHub (Automatic)
```bash
git add .
git commit -m "fix: Update Vercel deployment configuration"
git push origin main
```

The GitHub Action will automatically deploy to Vercel.

### Option 2: Deploy Directly from Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click "Deployments"
4. Click "Redeploy" on the latest deployment
5. Or click "Deploy" → "Import Git Repository"

### Option 3: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

---

## 🔍 Verify Deployment

### Check GitHub Actions
1. Go to your GitHub repository
2. Click "Actions" tab
3. Check the latest workflow run
4. Should show ✅ green checkmark

### Check Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Check "Deployments" tab
4. Latest deployment should show "Ready"

---

## 🛠️ Troubleshooting

### If GitHub Action Still Fails:

#### 1. Check Secrets
Make sure these secrets are set in GitHub:
- `VERCEL_TOKEN` - Your Vercel token
- `ORG_ID` - Your Vercel organization ID
- `PROJECT_ID` - Your Vercel project ID

**To get these values:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
cd frontend
vercel link

# Get project info
cat .vercel/project.json
```

#### 2. Update Secrets in GitHub
1. Go to GitHub repository
2. Settings → Secrets and variables → Actions
3. Add/Update secrets:
   - `VERCEL_TOKEN`
   - `ORG_ID`
   - `PROJECT_ID`

### If Build Fails:

#### Check Node Version
Make sure you're using Node 18+:
```bash
node --version
```

#### Check Dependencies
```bash
cd frontend
npm install
npm run build
```

#### Check Environment Variables
Create `.env` file in frontend if needed:
```env
VITE_API_URL=https://your-backend-url.com
```

---

## 📝 Alternative: Deploy Without GitHub Actions

If you want to skip GitHub Actions and deploy directly:

### 1. Remove GitHub Workflow
```bash
# Optional: Remove the workflow file
rm .github/workflows/deploy.yml
```

### 2. Deploy via Vercel Dashboard
1. Go to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"

### 3. Set Environment Variables in Vercel
1. Go to Project Settings
2. Click "Environment Variables"
3. Add:
   - `VITE_API_URL` = your backend URL

---

## 🎯 Recommended Deployment Strategy

### For Development:
```bash
# Deploy to preview
cd frontend
vercel
```

### For Production:
```bash
# Deploy to production
cd frontend
vercel --prod
```

### For Automatic Deployments:
- Push to `main` branch → Auto-deploy to production
- Push to other branches → Auto-deploy to preview

---

## ✅ Post-Deployment Checklist

After successful deployment:

1. ✅ Visit your Vercel URL
2. ✅ Test all pages:
   - Home page
   - Soil Monitoring
   - Government Schemes
   - Crop Health
3. ✅ Test Demo Mode toggle
4. ✅ Test crop comparison
5. ✅ Check browser console for errors
6. ✅ Test on mobile devices

---

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [GitHub Actions for Vercel](https://github.com/amondnet/vercel-action)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## 📞 Still Having Issues?

### Check Vercel Build Logs:
1. Go to Vercel Dashboard
2. Click on failed deployment
3. Check "Build Logs" tab
4. Look for specific error messages

### Common Issues:

#### "Module not found"
```bash
# Make sure all dependencies are in package.json
cd frontend
npm install
```

#### "Build failed"
```bash
# Test build locally first
cd frontend
npm run build
```

#### "Environment variable not found"
- Add environment variables in Vercel Dashboard
- Settings → Environment Variables

---

## 🚀 Quick Fix Commands

```bash
# 1. Update files
git add .github/workflows/deploy.yml
git add vercel.json
git add frontend/vercel.json

# 2. Commit
git commit -m "fix: Update Vercel deployment configuration"

# 3. Push
git push origin main

# 4. Check deployment
# Go to GitHub Actions tab or Vercel Dashboard
```

---

**Fixed by**: Updating GitHub Action to use `amondnet/vercel-action@v25`
**Date**: December 2024
**Status**: ✅ Ready to deploy
