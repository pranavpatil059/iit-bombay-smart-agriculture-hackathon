# Deployment Guide - Smart Agriculture Assistant

## Quick Deploy (Recommended: Vercel)

### 1. Setup MongoDB Atlas
1. Go to https://mongodb.com/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to environment variables

### 2. Deploy Backend to Vercel
```bash
cd backend
npm install -g vercel
vercel login
vercel --prod
```

### 3. Deploy Frontend to Vercel
```bash
cd frontend
vercel --prod
```

### 4. Environment Variables
Set these in Vercel dashboard:
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Random secret key
- `GEMINI_API_KEY`: Your Google AI API key

## Alternative: Netlify + Railway

### Frontend (Netlify)
1. Connect GitHub repo to Netlify
2. Set build command: `cd frontend && npm run build`
3. Set publish directory: `frontend/dist`

### Backend (Railway)
1. Connect GitHub repo to Railway
2. Set start command: `cd backend && node index.js`
3. Add environment variables

## Free Tier Limits
- Vercel: 100GB bandwidth/month
- Netlify: 100GB bandwidth/month  
- Railway: 500 hours/month
- MongoDB Atlas: 512MB storage
- Render: 750 hours/month

All sufficient for development and small-scale production!