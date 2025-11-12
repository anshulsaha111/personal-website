# Chat Widget Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Groq API Key

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get your **FREE** API key from: https://console.groq.com/keys
(Sign up with GitHub/Google - takes 30 seconds!)

### 3. Start the Chat Proxy Server

```bash
npm start
```

The server will run on `http://localhost:3001`

### 4. Open Your Portfolio

Open `index.html` in your browser (using a local server like Live Server or Python's http.server)

The chat widget will appear in the bottom-right corner!

---

## 📁 Files Added

- `chat-proxy.js` - Express server that proxies requests to Groq API
- `chat-widget.js` - Frontend JavaScript for the chat UI
- `chat-widget.css` - Glassmorphism styling with futuristic fonts
- `package.json` - Node.js dependencies
- `.env.example` - Example environment variables file

---

## 🎨 Features

✅ Glassmorphism design matching your purple theme  
✅ Horizontal carousel of clickable questions (every 8 seconds)  
✅ Typewriter animation for bot responses  
✅ Secure API key handling via backend proxy  
✅ **FREE** Groq API with Llama 3.1 (8B) model  
✅ SUPER FAST responses (fastest inference available!)  
✅ Short, witty 1-3 sentence responses (auto-limited)  
✅ Futuristic fonts (Orbitron & Rajdhani)  
✅ Mobile responsive  
✅ Always visible compact chat box

---

## 🔧 Customization

### Change Suggested Questions

Edit the `suggestions` array in `chat-widget.js`:

```javascript
this.suggestions = [
  "Your custom question 1?",
  "Your custom question 2?",
  // Add more...
];
```

### Adjust Typewriter Speed

In `chat-widget.js`, find the `typewriterEffect` method and change the timeout:

```javascript
setTimeout(type, 20); // Lower = faster, Higher = slower
```

### Modify Anshul's Persona

Edit the `SYSTEM_PROMPT` in `chat-proxy.js` to adjust tone, facts, or guidelines.

---

## 🐛 Troubleshooting

**Chat not responding?**
- Make sure the proxy server is running (`npm start`)
- Check browser console for errors
- Verify your Groq API key is correct in `.env`
- Groq responses are INSTANT (no cold start!) ⚡

**CORS errors?**
- The proxy server has CORS enabled by default
- Make sure you're accessing the site via a local server (not file://)

**Styling issues?**
- Ensure `chat-widget.css` is loaded in your HTML
- Futuristic fonts (Orbitron & Rajdhani) load from Google Fonts

---

## 🚢 Deployment

For production, you'll need to:

1. Deploy the `chat-proxy.js` server to a hosting service (Heroku, Railway, Vercel, etc.)
2. Update the API endpoint in `chat-widget.js`:
   ```javascript
   const response = await fetch('https://your-deployed-server.com/api/chat', {
   ```
3. Set the `GROQ_API_KEY` environment variable on your hosting platform

---

## 💰 Cost Estimate

**Groq API:**
- **100% FREE** with generous limits
- 14,400 requests per day (free tier)
- 30 requests per minute
- No credit card required!

Perfect for a portfolio site - completely free! 🚀

---

## 🤖 Why Groq + Llama 3.1?

- **Fastest inference in the world** (powered by Groq's custom LPU chips)
- Open-source Llama 3.1 model (8B parameters)
- Instant responses - no cold starts!
- Great at conversational, witty responses
- More reliable than Hugging Face free tier
- Better quality than smaller models

---

## 📝 Notes

- The chat widget is always visible (compact size)
- Chat history is not stored (resets on page refresh)
- Uses Llama 3.1 (8B) via Groq API - fastest inference available!
- All API calls go through your secure backend proxy
- Responses are INSTANT - no loading time! ⚡
- Responses automatically limited to 1-3 sentences for brevity

Enjoy your new witty chat widget! 🎉

