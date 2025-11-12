# 🌌 Personal Portfolio Website

A futuristic, interactive portfolio featuring a 3D DNA helix visualization and an AI-powered chat widget.

![Portfolio Preview](https://img.shields.io/badge/status-live-success)
![Mobile Responsive](https://img.shields.io/badge/mobile-responsive-blue)
![Chat](https://img.shields.io/badge/AI-powered-purple)

---

## ✨ Features

- 🧬 **Interactive 3D Model**: DNA helix with glowing orbs representing different sections (work, projects, learnings)
- 💬 **AI Chat Widget**: Powered by Groq API (Llama 3.1) for instant, witty responses
- 🎨 **Glassmorphism Design**: Modern, futuristic UI with purple theme
- 📱 **Fully Mobile Responsive**: Touch-friendly gestures and optimized layouts
- ⚡ **Lightning Fast**: Instant AI responses with no cold starts
- 🎯 **Interactive Elements**: Hover effects, typewriter animations, carousel

---

## 🚀 Tech Stack

### Frontend
- **Three.js** - 3D rendering and animations
- **Vanilla JavaScript** - No frameworks, pure performance
- **CSS3** - Glassmorphism effects and animations
- **HTML5** - Semantic markup

### Backend
- **Node.js + Express** - API proxy server
- **Groq API** - Llama 3.1 (8B) for AI chat
- **CORS** - Cross-origin support

### Fonts
- **Orbitron** - Futuristic headers
- **Rajdhani** - Clean, readable body text
- **Share Tech Mono** - Monospace tech aesthetic

---

## 📂 Project Structure

```
vibe_site_v2/
├── index.html              # Main landing page with 3D model
├── work.html               # Work experience timeline
├── projects.html           # Projects showcase (coming soon)
├── learnings.html          # Learning artifacts (coming soon)
├── main.js                 # 3D model logic and interactions
├── style.css               # Global styles and animations
├── chat-widget.js          # Chat widget frontend
├── chat-widget.css         # Chat widget styles
├── chat-proxy.js           # Backend API proxy (Node.js)
├── model.glb               # 3D DNA helix model
├── package.json            # Node.js dependencies
└── .env                    # Environment variables (not in repo)
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- Groq API key (free at https://console.groq.com)

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/portfolio-website.git
cd portfolio-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env
```

4. **Start the chat proxy server**
```bash
npm start
```

5. **Open the site**
Open `index.html` in your browser or use a local server like Live Server

---

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

**Quick Deploy:**
- **Frontend**: Vercel or Netlify
- **Backend**: Railway or Render

---

## 📱 Mobile Support

Fully optimized for mobile devices with:
- Touch gestures (pinch zoom, drag rotate)
- Responsive layouts (768px, 480px breakpoints)
- Touch-friendly buttons (44px minimum)
- Optimized chat widget for small screens

See [MOBILE_RESPONSIVE.md](MOBILE_RESPONSIVE.md) for details.

---

## 🤖 AI Chat Widget

The chat widget uses Groq API with Llama 3.1 for:
- ⚡ **Instant responses** (fastest inference available)
- 🎯 **Short, witty answers** (1-3 sentences)
- 🆓 **Free tier**: 14,400 requests/day
- 🔒 **Secure**: API key handled by backend proxy

See [README_CHAT.md](README_CHAT.md) for chat setup details.

---

## 🎨 Design Philosophy

- **Futuristic Aesthetic**: Purple/violet color scheme (#a05eff)
- **Minimalist UI**: Lowercase text, clean lines
- **Interactive Elements**: Hover effects, smooth transitions
- **Glassmorphism**: Blur effects and transparency
- **Performance First**: Optimized 3D rendering and animations

---

## 📊 Features Breakdown

| Feature | Status | Description |
|---------|--------|-------------|
| 3D Model | ✅ Live | Interactive DNA helix with orb navigation |
| Chat Widget | ✅ Live | AI-powered Q&A about work and projects |
| Work Timeline | ✅ Live | Detailed work experience and tech stack |
| Projects Page | 🚧 Coming Soon | Portfolio of projects |
| Learnings Page | 🚧 Coming Soon | Essays and learning artifacts |

---

## 🔧 Configuration

### Chat Widget
Edit `chat-widget.js`:
- Suggested questions array
- Carousel timing
- API endpoint

### 3D Model
Edit `main.js`:
- Camera position
- Orb colors and positions
- Animation speeds
- Touch sensitivity

### Styling
Edit CSS files:
- Color scheme variables
- Font sizes
- Animation timings
- Mobile breakpoints

---

## 📝 Environment Variables

Required in `.env` file:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key: https://console.groq.com/keys

---

## 🧪 Testing

### Local Testing
1. Start backend: `npm start`
2. Open `index.html` in browser
3. Test chat widget functionality
4. Test 3D model interactions

### Mobile Testing
1. Use browser DevTools responsive mode
2. Test on real devices
3. Check touch gestures
4. Verify chat widget usability

---

## 📄 License

This project is private and proprietary.

---

## 👤 Author

**Anshul Sahai**
- AI/ML Product Manager at Licious
- Email: asahai100@gmail.com
- LinkedIn: [anshul-sahai](https://www.linkedin.com/in/anshul-sahai/)
- X/Twitter: [@anshulsaha111](https://x.com/anshulsaha111)

---

## 🙏 Acknowledgments

- Three.js community for 3D rendering
- Groq for blazing-fast AI inference
- Hugging Face for open-source models

---

## 🔄 Updates

To update the site:
```bash
git add .
git commit -m "Your update message"
git push
```

Auto-deploys if using Vercel/Netlify! 🚀

---

Built with 💜 by Anshul Sahai

