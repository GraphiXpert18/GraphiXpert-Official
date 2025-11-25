# GraphiXpert - Vercel Deployment

## Quick Deploy (Recommended)

### Option 1: Frontend Only on Vercel ⭐ RECOMMENDED

This is the easiest and best approach for free tier:

1. **Deploy Frontend**:
   ```bash
   # Already pushed to GitHub
   ```
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repo: `RajaEditz/Graphixpert`
   - **Root Directory**: `client`
   - **Framework**: Next.js
   - **Environment Variable**: 
     - Name: `NEXT_PUBLIC_API_URL`
     - Value: `https://graphixpert-api.onrender.com/api`
   - Click "Deploy"

2. **Deploy Backend to Render**:
   - Follow: [Render Deployment Guide](file:///c:/Users/HP/.gemini/antigravity/brain/284f7222-27e6-4f0d-b9c8-c9ad5190c5e0/render_free_deployment.md)

3. **Update Backend CORS**:
   - Add your Vercel URL to `CLIENT_URL` in Render

### Option 2: Full Stack on Vercel

For advanced users who want everything on Vercel:
- See: [Full Vercel Deployment Guide](file:///c:/Users/HP/.gemini/antigravity/brain/284f7222-27e6-4f0d-b9c8-c9ad5190c5e0/vercel_deployment_guide.md)

## Environment Variables Needed

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend-url/api
```

### Backend (Render or Vercel)
```
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=https://your-vercel-app.vercel.app
```

## Post-Deployment

1. Visit your Vercel URL
2. Test all pages
3. Login to admin panel
4. Upload a test portfolio item
5. Verify images load from Cloudinary

## Support

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
