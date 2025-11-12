# 🚀 Vercel Deployment Guide - Chat Widget Fix

## The Problem
Your chat widget was trying to connect to `localhost:3001`, which doesn't exist on Vercel!

## The Solution
I've converted your backend to use **Vercel Serverless Functions**. Now your chat will work on Vercel automatically! ✨

---

## 📋 Step-by-Step Deployment

### Step 1: Set up Environment Variable on Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your deployed project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key (get it from https://console.groq.com/keys)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

### Step 2: Push Your Updated Code

```bash
cd /Users/anshulsahai/Downloads/vibe_site_v2

# Add all changes
git add .

# Commit with a message
git commit -m "Fix chat widget for Vercel deployment"

# Push to GitHub
git push
```

Vercel will automatically detect the push and redeploy your site! 🎉

### Step 3: Test Your Chat

1. Wait 1-2 minutes for Vercel to finish deploying
2. Visit your site
3. Try the chat widget - it should work now!

---

## 🛠 What Changed?

### 1. Created `/api/chat.js`
This is a **Vercel Serverless Function** that handles chat requests. It runs on Vercel's infrastructure instead of requiring a separate server.

### 2. Updated `chat-widget.js`
The widget now automatically detects if you're on localhost or production:
- **Localhost**: Uses `http://localhost:3001/api/chat` (for local development with `npm start`)
- **Production**: Uses `/api/chat` (Vercel serverless function)

### 3. Added `vercel.json`
Configuration file that tells Vercel how to handle the API routes.

---

## 🧪 Testing Locally

### For Local Development (with Express server):
```bash
# Terminal 1: Start the Express backend
npm start

# Terminal 2: Serve the frontend
npx http-server -p 8080
```

Then visit: http://localhost:8080

The chat widget will automatically use the local backend at `localhost:3001`.

---

## ✅ Verification Checklist

After deployment, check:
- [ ] Go to your Vercel site URL
- [ ] Open the chat widget
- [ ] Send a message
- [ ] You should get a response from the AI!

---

## 🔍 Troubleshooting

### Chat still not working?

**1. Check Environment Variable:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify `GROQ_API_KEY` is set
- If you just added it, trigger a new deployment:
  ```bash
  git commit --allow-empty -m "Trigger redeploy"
  git push
  ```

**2. Check Deployment Logs:**
- Go to Vercel Dashboard → Your Project → Deployments
- Click on the latest deployment
- Check the "Functions" tab
- Look for any errors in `/api/chat`

**3. Check Browser Console:**
- Open your site
- Press F12 to open Developer Tools
- Go to Console tab
- Try sending a chat message
- Look for any error messages

**4. Verify API Key is Valid:**
- Go to https://console.groq.com/keys
- Make sure your API key is active
- If expired, generate a new one and update it in Vercel

---

## 🎯 Quick Commands Reference

```bash
# Push changes to Vercel
git add .
git commit -m "Your message here"
git push

# Force redeploy (if env vars changed)
git commit --allow-empty -m "Trigger redeploy"
git push

# Test locally
npm start
# Then open http://localhost:3001/health
```

---

## 🌟 Success!

Once everything is working:
- ✅ Your chat widget works on Vercel
- ✅ No need for a separate backend server
- ✅ Automatic scaling with Vercel serverless functions
- ✅ Fast responses powered by Groq's Llama 3.1 model
- ✅ Still works locally for development

---

## 📚 Additional Resources

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Groq API Documentation](https://console.groq.com/docs)
- [Environment Variables on Vercel](https://vercel.com/docs/projects/environment-variables)

---

**Need help?** Check the deployment logs on Vercel or feel free to reach out!

