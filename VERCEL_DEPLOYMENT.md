# Deploying GraphiXpert Client to Vercel

This guide will walk you through deploying the GraphiXpert Next.js client application to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account (free tier available)
2. Your backend server deployed (e.g., on Render)
3. Your code pushed to a GitHub repository

## Project Structure

This is a monorepo with the following structure:
```
GraphiXpert-Official/
├── client/          # Next.js frontend (what we're deploying to Vercel)
├── server/          # Node.js backend (deploy separately to Render)
└── vercel.json      # Vercel configuration
```

## Step 1: Push Code to GitHub

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Import Project to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect the `vercel.json` configuration

### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel
```

## Step 3: Configure Project Settings

The `vercel.json` file is already configured with:
- **Build Command**: `cd client && npm run build`
- **Install Command**: `npm install --prefix client`
- **Output Directory**: `client/.next`
- **Dev Command**: `cd client && npm run dev`

You don't need to change these settings in the Vercel dashboard.

## Step 4: Set Environment Variables

In the Vercel dashboard for your project:

1. Go to "Settings" → "Environment Variables"
2. Add the following variable:

```
NEXT_PUBLIC_API_URL=https://your-backend-server.onrender.com
```

**Important Notes:**
- Replace with your actual backend server URL
- Must include `https://`
- No trailing slash
- The variable must start with `NEXT_PUBLIC_` to be accessible in the browser

## Step 5: Deploy

1. Click "Deploy" in Vercel dashboard
2. Wait for the build to complete (usually 1-2 minutes)
3. Vercel will provide you with a deployment URL

## Step 6: Update Backend CORS

After deployment, update your backend server's `CLIENT_URL` environment variable:

1. Go to your backend service (e.g., Render)
2. Add/Update environment variable:
   ```
   CLIENT_URL=https://your-vercel-app.vercel.app
   ```
3. Redeploy the backend if necessary

## Step 7: Verify Deployment

Visit your Vercel URL and test:
- ✅ Homepage loads correctly
- ✅ Navigation works
- ✅ Images load from Cloudinary
- ✅ API calls to backend work
- ✅ Admin login functions properly

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check that all dependencies are in `client/package.json`
- Verify the build command is correct in `vercel.json`

**Error: "Command failed"**
- Check build logs in Vercel dashboard
- Ensure Next.js version is compatible

### API Calls Fail

**Error: "Network request failed" or CORS errors**
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Check that backend `CLIENT_URL` includes your Vercel domain
- Ensure backend server is running


### Images Not Loading

**Error: "Invalid src prop"**
- Verify Cloudinary domain is in `next.config.ts`
- Check that images are uploaded to Cloudinary
- Ensure `remotePatterns` includes your backend domain

### Environment Variables Not Working

- Variables must start with `NEXT_PUBLIC_` to be accessible in browser
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain
4. Update DNS records as instructed by Vercel
5. Update `CLIENT_URL` in backend to use custom domain

## Automatic Deployments

Vercel automatically deploys when you push to your repository:

- **Production**: Pushes to `main` branch
- **Preview**: Pushes to other branches or pull requests

To disable automatic deployments:
1. Go to "Settings" → "Git"
2. Configure deployment branches

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Edge caching
- ✅ Serverless functions

## Monitoring

Monitor your deployment:
- **Analytics**: Vercel dashboard → "Analytics"
- **Logs**: Vercel dashboard → "Deployments" → Select deployment → "Logs"
- **Performance**: Vercel dashboard → "Speed Insights"

## Free Tier Limitations

Vercel's free tier (Hobby) includes:
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Preview deployments
- Analytics

For production apps with high traffic, consider upgrading to Pro.

## Security Checklist

- [ ] Environment variables are set in Vercel (not in code)
- [ ] Backend CORS is properly configured
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] API keys are not exposed in client code
- [ ] Admin credentials are secure

## Redeployment

To redeploy:

**Option 1: Push to GitHub**
```bash
git add .
git commit -m "Update"
git push origin main
```

**Option 2: Manual Redeploy**
1. Go to Vercel dashboard
2. Click "Deployments"
3. Click "..." on latest deployment
4. Click "Redeploy"

## Support

If you encounter issues:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review deployment logs in Vercel dashboard
3. Check [Next.js Documentation](https://nextjs.org/docs)
4. Verify backend server is accessible

## Common Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Pull environment variables
vercel env pull
```

## Next Steps

After successful deployment:
1. Test all features thoroughly
2. Set up custom domain (optional)
3. Enable Vercel Analytics
4. Configure deployment notifications
5. Set up monitoring alerts
