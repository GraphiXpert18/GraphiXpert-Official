# Contact Form Error - Troubleshooting Guide

## The Error
**"Something went wrong. Please try again later."**

This error appears when the contact form fails to submit to the backend API.

## Most Likely Causes

### 1. **NEXT_PUBLIC_API_URL Not Set Correctly** ⚠️ MOST LIKELY
The client doesn't know where to send the form data.

**How to Check:**
1. Open your deployed client in a browser: `https://graphixpert-client.onrender.com`
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Look for a line that says: `API Base URL: ...`
5. It should show: `https://graphixpert-server.onrender.com/api`
6. If it shows `http://localhost:5007/api`, that's the problem!

**How to Fix:**
The `NEXT_PUBLIC_API_URL` should be automatically set by Render from the `render.yaml` file. Check:
1. Go to Render Dashboard
2. Click on **graphixpert-client**
3. Click **Environment** in the sidebar
4. Check if `NEXT_PUBLIC_API_URL` exists and has the value from the server's host
5. If it's wrong or missing, manually set it to: `https://graphixpert-server.onrender.com`
6. Save and wait for redeployment

### 2. **CLIENT_URL Not Set on Server** ⚠️ LIKELY
The server is blocking requests from the client due to CORS.

**How to Fix:**
1. Go to Render Dashboard
2. Click on **graphixpert-server**
3. Click **Environment** in the sidebar
4. Find or add `CLIENT_URL`
5. Set it to: `https://graphixpert-client.onrender.com`
6. Save and wait for redeployment

### 3. **Server is Sleeping (Free Tier)** 🕐
Render's free tier spins down after inactivity. The first request takes 50+ seconds to wake up.

**How to Check:**
1. Visit: `https://graphixpert-server.onrender.com`
2. If it takes a long time to load, the server was sleeping
3. Wait for it to wake up, then try the form again

**How to Fix:**
- Just wait 1-2 minutes for the server to wake up
- Try submitting the form again
- Consider upgrading to a paid plan to avoid spin-down

### 4. **Network/CORS Error**
The browser is blocking the request due to CORS policy.

**How to Check:**
1. Open Developer Tools (`F12`)
2. Go to **Console** tab
3. Look for errors mentioning "CORS" or "blocked"

**How to Fix:**
- Make sure `CLIENT_URL` is set correctly on the server (see #2)
- The server already allows `.onrender.com` domains, so this should work

## Step-by-Step Debugging

### Step 1: Check Console Logs
1. Open your client URL: `https://graphixpert-client.onrender.com/contact`
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Fill out the contact form and click "Send Message"
5. Look for these console logs:
   ```
   API Base URL: https://graphixpert-server.onrender.com/api
   Requesting: https://graphixpert-server.onrender.com/api/enquiries
   Submitting to: https://graphixpert-server.onrender.com/api/enquiries
   Form data: {name: "...", email: "...", ...}
   ```

### Step 2: Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Submit the form again
3. Look for a request to `/enquiries`
4. Click on it to see details:
   - **Status Code**: Should be 200 or 201 (success)
   - If it's 404: The endpoint doesn't exist
   - If it's 500: Server error
   - If it's 0 or failed: Network/CORS issue

### Step 3: Check Error Details
After submitting the form, look in the Console for:
```
Error submitting form: ...
Error response: ...
Error message: ...
```

This will tell you exactly what went wrong.

## Quick Fixes Checklist

- [ ] Set `NEXT_PUBLIC_API_URL` on graphixpert-client to `https://graphixpert-server.onrender.com`
- [ ] Set `CLIENT_URL` on graphixpert-server to `https://graphixpert-client.onrender.com`
- [ ] Wait for both services to redeploy
- [ ] Visit the server URL to wake it up if it's sleeping
- [ ] Clear browser cache and try again
- [ ] Check console logs for detailed error messages

## Still Not Working?

If you've tried everything above and it still doesn't work:

1. **Check Server Logs on Render:**
   - Go to graphixpert-server on Render
   - Click **Logs** tab
   - Look for errors when you submit the form

2. **Test the API directly:**
   - Visit: `https://graphixpert-server.onrender.com/api/enquiries`
   - You should see a list of enquiries (might be empty)
   - If you get an error, the server has an issue

3. **Share the console logs:**
   - Take a screenshot of the Console tab after submitting
   - Share it so we can see the exact error

## Expected Behavior

When everything is working correctly:
1. You fill out the form
2. Click "Send Message"
3. Button shows "Sending..."
4. After 1-2 seconds, you see: "Thank you! Your message has been sent successfully."
5. Form fields clear automatically
