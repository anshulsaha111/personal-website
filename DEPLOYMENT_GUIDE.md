# 🚀 GitHub & Deployment Guide

## Step 1: Create GitHub Repository

### Option A: Via GitHub Website (Easiest)
1. Go to https://github.com/new
2. Repository name: `portfolio-website` (or any name you like)
3. Description: "Personal portfolio with 3D visualization and AI chat"
4. Select **Private** ✅
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Option B: Via GitHub CLI
```bash
gh repo create portfolio-website --private
```

---

## Step 2: Push Your Code to GitHub

### Open Terminal in your project folder:
```bash
cd /Users/anshulsahai/Downloads/vibe_site_v2
```

### Run these commands ONE BY ONE:

```bash
# 1. Initialize git repository
git init

# 2. Add all files
git add .

# 3. Make your first commit
git commit -m "Initial commit: Portfolio website with 3D model and AI chat"

# 4. Set main as default branch
git branch -M main

# 5. Connect to your GitHub repo (REPLACE with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# 6. Push to GitHub
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username!

---

## Step 3: Set Up Environment Variables

⚠️ **IMPORTANT**: Your `.env` file is NOT pushed to GitHub (it's in `.gitignore`).

You'll need to set environment variables wherever you deploy:

```
GROQ_API_KEY=your_actual_groq_api_key_here
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**For Frontend:**
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your `portfolio-website` repository
5. Click "Deploy"
6. Done! Your site is live 🎉

**For Backend (Chat Proxy):**
1. In Vercel dashboard, go to your project
2. Add a new "Serverless Function" or deploy separately
3. Set environment variable: `GROQ_API_KEY`

**OR deploy backend separately:**
```bash
cd /Users/anshulsahai/Downloads/vibe_site_v2
vercel
```

---

### Option 2: Netlify

**Frontend:**
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
6. Deploy!

**Backend:** Use Netlify Functions or deploy on Railway (see below)

---

### Option 3: Railway (Best for Backend)

**For the Chat Proxy Server:**
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variable:
   - Key: `GROQ_API_KEY`
   - Value: your Groq API key
6. Railway will auto-detect Node.js and run `npm start`
7. You'll get a URL like: `https://your-app.railway.app`

**Update Frontend:**
In `chat-widget.js`, change the API endpoint:
```javascript
const response = await fetch('https://your-app.railway.app/api/chat', {
```

---

### Option 4: GitHub Pages (Free, Static Only)

**Note:** GitHub Pages only hosts static files. You'll need to deploy the backend elsewhere.

1. Go to your repo on GitHub
2. Settings → Pages
3. Source: Deploy from branch `main`
4. Folder: `/` (root)
5. Save
6. Your site will be at: `https://yourusername.github.io/portfolio-website`

**For the backend:** Deploy on Railway, Render, or Heroku.

---

## 🎯 Recommended Setup

**Best Combo for Free Hosting:**

1. **Frontend** → Vercel or Netlify
   - Automatic HTTPS
   - Custom domain support
   - Fast CDN

2. **Backend (Chat Proxy)** → Railway
   - Free tier: 500 hours/month
   - Auto-deploy from GitHub
   - Easy environment variables

---

## 📝 Complete Deployment Checklist

### Before Deploying:
- [x] `.gitignore` created (blocks `.env` and `node_modules`)
- [ ] Code pushed to GitHub
- [ ] Groq API key ready

### Frontend Deployment:
- [ ] Deployed to Vercel/Netlify
- [ ] Custom domain configured (optional)
- [ ] HTTPS working

### Backend Deployment:
- [ ] Deployed to Railway/Render
- [ ] Environment variable `GROQ_API_KEY` set
- [ ] Backend URL obtained

### Final Steps:
- [ ] Update `chat-widget.js` with backend URL
- [ ] Test chat widget on live site
- [ ] Test on mobile device
- [ ] Share your portfolio! 🎉

---

## 🔄 Updating Your Site Later

Whenever you make changes:

```bash
# 1. Check what changed
git status

# 2. Add changed files
git add .

# 3. Commit with a message
git commit -m "Updated chat widget styles"

# 4. Push to GitHub
git push

# Vercel/Netlify will auto-deploy!
```

---

## 🆘 Troubleshooting

### "Permission denied" error?
```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:YOUR_USERNAME/portfolio-website.git
```

### Need to create a new repo?
```bash
# Remove old remote
git remote remove origin

# Add new one
git remote add origin https://github.com/YOUR_USERNAME/new-repo-name.git
git push -u origin main
```

### Backend not connecting?
1. Check CORS settings in `chat-proxy.js`
2. Verify `GROQ_API_KEY` is set in environment variables
3. Check backend logs on Railway/Render
4. Update frontend API URL to match backend URL

---

## 💡 Pro Tips

1. **Use a custom domain**: Both Vercel and Netlify support free custom domains
2. **Enable analytics**: Vercel and Netlify have built-in analytics
3. **Set up staging**: Create a `dev` branch for testing before production
4. **Monitor API usage**: Check Groq dashboard for API usage stats

---

## 🎉 You're Done!

Your site is now:
- ✅ Version controlled on GitHub
- ✅ Deployed and live
- ✅ Auto-updates when you push changes
- ✅ Mobile responsive
- ✅ Has a working AI chat widget

Share your portfolio and show off your work! 🚀

