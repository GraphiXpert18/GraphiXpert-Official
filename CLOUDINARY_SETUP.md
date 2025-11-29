# Cloudinary Setup for Image Persistence on Render

## The Problem

Your portfolio images are not displaying because:
- Render uses an **ephemeral filesystem** - uploaded files are deleted when the server restarts
- Images uploaded via the admin panel are saved to `/uploads/` folder locally
- When Render restarts, all files in `/uploads/` are lost
- The database still has references to these deleted files

## The Solution: Cloudinary

Cloudinary is a cloud-based image storage service that permanently stores your images.

---

## Step 1: Create a Free Cloudinary Account

1. Go to: https://cloudinary.com/users/register_free
2. Sign up for a **free account**
3. After signing up, you'll be taken to your dashboard

---

## Step 2: Get Your Cloudinary Credentials

On your Cloudinary dashboard, you'll see:

```
Cloud Name: your-cloud-name
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz
```

**Copy these three values** - you'll need them in the next step.

---

## Step 3: Add Cloudinary Environment Variables to Render

### For the Server Service:

1. Go to your Render Dashboard: https://dashboard.render.com/
2. Click on **graphixpert-server** service
3. Click **"Environment"** in the left sidebar
4. Click **"Add Environment Variable"** button
5. Add these three variables one by one:

   **Variable 1:**
   - Key: `CLOUDINARY_CLOUD_NAME`
   - Value: `your-cloud-name` (from Cloudinary dashboard)

   **Variable 2:**
   - Key: `CLOUDINARY_API_KEY`
   - Value: `123456789012345` (from Cloudinary dashboard)

   **Variable 3:**
   - Key: `CLOUDINARY_API_SECRET`
   - Value: `abcdefghijklmnopqrstuvwxyz` (from Cloudinary dashboard)

6. Click **"Save Changes"**

---

## Step 4: Wait for Automatic Redeployment

- Render will automatically redeploy your server
- Wait 2-5 minutes for deployment to complete
- Check the deployment logs to ensure no errors

---

## Step 5: Re-upload Your Portfolio Images

**IMPORTANT:** Existing images in the database still point to the old `/uploads/` paths which are now deleted.

You need to:

1. Go to your admin panel: https://graphixpert-client.onrender.com/admin/portfolio
2. For each portfolio item:
   - Click the **Edit** button
   - Re-upload the images
   - Click **Update**

**What happens now:**
- New images will be uploaded to Cloudinary (not local filesystem)
- Cloudinary will return a permanent URL like: `https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/graphixpert/image.jpg`
- This URL is saved in the database
- Images will persist even when Render restarts

---

## Step 6: Verify Images Are Working

1. Go to: https://graphixpert-client.onrender.com/portfolio
2. Check that all images are displaying correctly
3. Open browser DevTools (F12) → Console tab
4. Look for any image loading errors (there should be none)

---

## How to Verify Cloudinary is Working

### Check 1: Image URLs
- Open browser DevTools → Network tab
- Reload the portfolio page
- Look at image requests
- URLs should start with `https://res.cloudinary.com/` (not `/uploads/`)

### Check 2: Cloudinary Dashboard
- Go to your Cloudinary dashboard
- Click "Media Library"
- You should see your uploaded images in the `graphixpert` folder

---

## Important Notes

✅ **Free Tier Limits:**
- 25 GB storage
- 25 GB monthly bandwidth
- This is more than enough for a portfolio website

✅ **Automatic Configuration:**
- The code already supports Cloudinary
- It automatically uses Cloudinary when the environment variables are set
- No code changes needed!

✅ **Future Uploads:**
- All new images uploaded via admin panel will go to Cloudinary
- No manual intervention needed

---

## Troubleshooting

### Images still not showing after setup?

1. **Check environment variables are set:**
   - Go to Render → graphixpert-server → Environment
   - Verify all 3 Cloudinary variables are present

2. **Check deployment completed:**
   - Go to Render → graphixpert-server → Events
   - Ensure latest deployment shows "Live"

3. **Re-upload images:**
   - Old images still point to `/uploads/`
   - You must re-upload them via admin panel

4. **Check browser console:**
   - Press F12 → Console tab
   - Look for specific error messages
   - Share the errors if you need help

### How to check if Cloudinary is active?

Run this test:
1. Go to admin panel
2. Upload a new test portfolio item with an image
3. Check the database entry (or inspect the image URL in browser)
4. If URL starts with `https://res.cloudinary.com/`, Cloudinary is working!

---

## Summary

1. ✅ Create Cloudinary account
2. ✅ Get credentials (Cloud Name, API Key, API Secret)
3. ✅ Add 3 environment variables to Render
4. ✅ Wait for redeployment
5. ✅ Re-upload all portfolio images via admin panel
6. ✅ Verify images are displaying

After completing these steps, your images will be permanently stored and will survive server restarts!
