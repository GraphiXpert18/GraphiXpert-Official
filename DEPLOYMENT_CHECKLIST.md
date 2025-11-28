# Render Deployment Checklist

Use this checklist to ensure a smooth deployment to Render.

## Pre-Deployment Setup

### 1. MongoDB Atlas
- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create a new cluster (M0 Free tier)
- [ ] Create database user with username and password
- [ ] Whitelist all IPs (0.0.0.0/0) in Network Access
- [ ] Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/graphixpert`

### 2. Cloudinary Setup
- [ ] Create Cloudinary account at https://cloudinary.com
- [ ] Note down from dashboard:
  - [ ] Cloud Name
  - [ ] API Key
  - [ ] API Secret

### 3. GitHub Repository
- [ ] Push all code to GitHub
- [ ] Ensure `render.yaml` is in the root directory
- [ ] Verify `.env` files are NOT committed (only `.env.example` should be)

## Render Deployment

### 4. Create Render Account
- [ ] Sign up at https://render.com
- [ ] Connect your GitHub account

### 5. Deploy via Blueprint
- [ ] Click "New" → "Blueprint" in Render Dashboard

- [ ] Select your GraphiXpert repository
- [ ] Render will detect `render.yaml` automatically
- [ ] Click "Apply" to create services

### 6. Configure Server Environment Variables
Go to `graphixpert-server` service → Environment tab and add:

- [ ] `MONGO_URI` = `mongodb+srv://username:password@cluster.mongodb.net/graphixpert`
- [ ] `JWT_SECRET` = Generate using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] `CLOUDINARY_CLOUD_NAME` = Your Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` = Your Cloudinary API key
- [ ] `CLOUDINARY_API_SECRET` = Your Cloudinary API secret
- [ ] `CLIENT_URL` = (Will add after client deploys)

### 7. Wait for Initial Deployment
- [ ] Wait for server to deploy successfully
- [ ] Wait for client to deploy successfully
- [ ] Note the URLs:
  - Server URL: `https://graphixpert-server.onrender.com`
  - Client URL: `https://graphixpert-client.onrender.com`

### 8. Update Client URL in Server
- [ ] Go back to server environment variables
- [ ] Set `CLIENT_URL` = Your actual client URL (e.g., `https://graphixpert-client.onrender.com`)
- [ ] Server will automatically redeploy

### 9. Seed Database
- [ ] Visit: `https://graphixpert-server.onrender.com/api/seed/admin`
- [ ] You should see: "Admin user created successfully"
- [ ] Default credentials:
  - Email: `admin@graphixpert.com`
  - Password: `admin123`

## Post-Deployment Testing

### 10. Test the Application
- [ ] Visit your client URL
- [ ] Homepage loads correctly
- [ ] Services page displays
- [ ] Portfolio page displays
- [ ] Contact form works
- [ ] Admin login works (use default credentials)
- [ ] Change admin password immediately!
- [ ] Test image upload in admin panel
- [ ] Verify images display correctly (should use Cloudinary)

### 11. Verify Image Storage
- [ ] Upload a test image via admin panel
- [ ] Check Cloudinary dashboard - image should appear in `graphixpert` folder
- [ ] Verify image displays on frontend

## Security

### 12. Security Checklist
- [ ] Changed default admin password
- [ ] JWT_SECRET is strong and random
- [ ] MongoDB user has appropriate permissions
- [ ] All environment variables are set in Render (not in code)
- [ ] CORS is properly configured
- [ ] HTTPS is enabled (automatic on Render)

## Optional Enhancements

### 13. Custom Domain (Optional)
- [ ] Purchase domain
- [ ] Go to client service → Settings → Custom Domain
- [ ] Add your domain
- [ ] Update DNS records as instructed
- [ ] Wait for DNS propagation

### 14. Monitoring Setup (Optional)
- [ ] Enable email notifications in Render for deployment failures
- [ ] Set up MongoDB Atlas alerts
- [ ] Monitor Cloudinary usage

## Troubleshooting

If something goes wrong:

1. **Server won't start**
   - Check logs in Render dashboard
   - Verify all environment variables are set
   - Test MongoDB connection string

2. **Images not loading**
   - Verify Cloudinary credentials
   - Check browser console for errors
   - Ensure `next.config.ts` includes Cloudinary domain

3. **CORS errors**
   - Verify `CLIENT_URL` matches exactly
   - Check server logs for CORS errors

4. **Build fails**
   - Check build logs in Render
   - Ensure all dependencies are in `package.json`
   - Try building locally first

## Free Tier Notes

⚠️ **Important**: Render free tier services spin down after 15 minutes of inactivity.
- First request after spin-down may take 30-60 seconds
- Consider upgrading to paid plan for production use

## Success! 🎉

Once all checkboxes are complete, your GraphiXpert website should be live and fully functional!

Your live URLs:
- **Frontend**: https://graphixpert-client.onrender.com
- **Backend**: https://graphixpert-server.onrender.com
- **Admin Panel**: https://graphixpert-client.onrender.com/admin

---

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
