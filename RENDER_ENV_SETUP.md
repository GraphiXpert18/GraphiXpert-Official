# How to Update CLIENT_URL on Render

## Step-by-Step Guide

### Step 1: Get Your Client URL

1. Go to your Render Dashboard: https://dashboard.render.com/
2. You should see both services listed:
   - `graphixpert-server`
   - `graphixpert-client`
3. Find the **graphixpert-client** service
4. Copy its URL (it will look like: `https://graphixpert-client.onrender.com`)
   - The URL is displayed at the top of the service card
   - You can click the copy icon next to it

### Step 2: Navigate to Server Environment Variables

1. Click on the **graphixpert-server** service to open it
2. On the left sidebar, click on **"Environment"**
   - This will show all environment variables for your server

### Step 3: Update CLIENT_URL

1. Find the `CLIENT_URL` variable in the list
2. Click the **Edit** (pencil) icon next to it
3. Paste your client URL (from Step 1) into the value field
   - Example: `https://graphixpert-client.onrender.com`
4. Click **Save Changes** button

### Step 4: Automatic Redeployment

- After saving, Render will **automatically redeploy** your server service
- You'll see a notification that deployment has started
- Wait for the deployment to complete (usually 2-5 minutes)
- The server will now use the correct client URL for CORS settings

## Important Notes

⚠️ **Make sure to use HTTPS** - Render provides HTTPS by default, so your URL should start with `https://`

⚠️ **No trailing slash** - Don't add a `/` at the end of the URL
   - ✅ Correct: `https://graphixpert-client.onrender.com`
   - ❌ Wrong: `https://graphixpert-client.onrender.com/`

⚠️ **Wait for deployment** - The changes won't take effect until the server finishes redeploying

## Verification

After the server redeploys, you can verify it's working by:

1. Opening your client URL in a browser
2. Trying to login or make any API call
3. Check the browser console for any CORS errors (there should be none)

## Troubleshooting

**If you still see CORS errors:**
- Make sure the CLIENT_URL matches exactly (no extra characters)
- Check that both services are fully deployed and running
- Clear your browser cache and try again
- Check the server logs on Render for any error messages
