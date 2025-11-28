# Deploying GraphiXpert to Render

This guide will walk you through deploying your GraphiXpert application to Render.

## Prerequisites

1. A [Render](https://render.com) account (free tier available)
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for your database
3. A [Cloudinary](https://cloudinary.com) account for image/video storage (free tier available)
4. Your code pushed to a GitHub repository

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0 is sufficient)
3. Create a database user with a username and password
4. Whitelist all IP addresses (0.0.0.0/0) for Render access
5. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/graphixpert`)

## Step 2: Set Up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for a free account
3. From your dashboard, note down:
   - Cloud Name
   - API Key
   - API Secret

## Step 3: Push Code to GitHub

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 4: Deploy to Render Using Blueprint

### Option A: Deploy via Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file automatically
5. Click "Apply" to create the services

### Option B: Deploy via Render YAML

The `render.yaml` file in the root directory contains the deployment configuration for both services.

## Step 5: Configure Environment Variables

After the services are created, you need to add environment variables:

### For `graphixpert-server`:

1. Go to the server service in Render dashboard
2. Navigate to "Environment" tab
3. Add the following environment variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/graphixpert
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLIENT_URL=https://your-client-app.onrender.com
```

**Important Notes:**
- Replace the MongoDB URI with your actual Atlas connection string
- Generate a strong JWT_SECRET (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Replace Cloudinary credentials with your actual values
- The CLIENT_URL will be available after the client deploys

### For `graphixpert-client`:

The `NEXT_PUBLIC_API_URL` is automatically set from the server service URL via the render.yaml configuration.

## Step 6: Seed the Database

After the server is deployed successfully:

1. Go to your server service URL (e.g., `https://graphixpert-server.onrender.com`)
2. Visit: `https://graphixpert-server.onrender.com/api/seed/seed-admin`
3. This will create the default admin user:
   - Email: `rajaaysha78@gmail.com`
   - Password: `admin`

**Important:** Change the admin password immediately after first login!

## Step 7: Update Client URL in Server

1. Once the client is deployed, copy its URL
2. Go back to the server service environment variables
3. Update `CLIENT_URL` with the actual client URL
4. The server will automatically redeploy

## Step 8: Verify Deployment

1. Visit your client URL (e.g., `https://graphixpert-client.onrender.com`)
2. Test the following:
   - Homepage loads correctly
   - Services page displays
   - Portfolio page displays
   - Admin login works
   - Image uploads work (uses Cloudinary)

## Troubleshooting

### Server won't start
- Check the logs in Render dashboard
- Verify all environment variables are set correctly
- Ensure MongoDB connection string is correct

### Images not loading
- Verify Cloudinary credentials are correct
- Check that `next.config.ts` allows the Cloudinary domain
- Ensure images are being uploaded to Cloudinary (not local storage)

### CORS errors
- Verify `CLIENT_URL` is set in server environment variables
- Check that the client URL matches exactly (with https://)

### Build fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Free Tier Limitations

Render's free tier has some limitations:
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- 750 hours/month of runtime per service

## Upgrading to Paid Plan

For production use, consider upgrading to a paid plan for:
- No spin-down delays
- Better performance
- More resources
- Custom domains

## Custom Domain (Optional)

To add a custom domain:
1. Go to your client service in Render
2. Click "Settings" → "Custom Domain"
3. Follow the instructions to add your domain
4. Update DNS records as instructed

## Monitoring

- Check service logs regularly in Render dashboard
- Set up email notifications for deployment failures
- Monitor MongoDB Atlas usage

## Security Checklist

- [ ] Changed default admin password
- [ ] Using strong JWT_SECRET
- [ ] MongoDB user has limited permissions
- [ ] Environment variables are not in code
- [ ] CORS is properly configured
- [ ] HTTPS is enabled (automatic on Render)

## Support

If you encounter issues:
1. Check Render documentation: https://render.com/docs
2. Review service logs in Render dashboard
3. Check MongoDB Atlas connection
4. Verify Cloudinary configuration
