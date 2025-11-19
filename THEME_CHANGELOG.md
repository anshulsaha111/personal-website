# Sci-Fi / Gamified Theme Update 🚀

## 🎨 Visual Improvements
1.  **System Boot Sequence**: Added a "terminal-style" boot up animation that runs before the site loads.
2.  **Scanlines Overlay**: A CRT-monitor style scanline effect over the entire screen.
3.  **Glitch Effect**: The "ANSHUL SAHAI" title now has a cyberpunk glitch animation.
4.  **Sci-Fi Fonts**: Switched to `Orbitron` (headers) and `Rajdhani` (UI text) for a futuristic look.
5.  **Custom Cursor**: Added a sci-fi triangular cursor.
6.  **HUD Styling**: Updated the footer and orb labels to look like a Heads-Up Display.

## 🛠 Functional Fixes
1.  **Chat Widget Fallback**:
    *   If the "Decode My Genes" chat cannot connect to the AI server (e.g., missing API key), it now switches to **Offline Mode**.
    *   It has pre-programmed answers for "skills", "work", "projects", and "fun".
    *   This ensures the chat is *always* functional.
2.  **Tab Title**: Changed to `ANSHUL // SYSTEM_ONLINE` to match the theme.

## 🔧 Configuration
-   **API Key**: To make the AI chat fully dynamic, ensure `GROQ_API_KEY` is set in your Vercel Project Settings.
-   **Model**: The 3D model (`model.glb`) is untouched. Ensure it is a valid GLB file.

## 🚀 How to Deploy
1.  Commit these changes:
    ```bash
    git add .
    git commit -m "Apply sci-fi theme and fix chat"
    git push origin main
    ```
2.  Vercel will automatically redeploy.

