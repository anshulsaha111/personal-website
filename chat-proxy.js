// Simple Express proxy server for Groq API
// Run with: node chat-proxy.js
// Make sure to: npm install express cors dotenv

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());

// Groq API configuration - FREE and SUPER FAST!
const GROQ_API_KEY = process.env.GROQ_API_KEY; // Add your key to .env file
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System prompt defining Anshul's persona
const SYSTEM_PROMPT = `You are Anshul, an AI/ML Product Manager.

Quick facts:
- Build AI products: NL-to-SQL assistants, vendor bidding bots, routing/optimization engines, geo expansion models
- Skills: Python, SQL, ML, GenAI (RAG, LLM apps), analytics, product thinking
- Experience: 2+ years shipping products end-to-end (PRDs → experiments → impact), IIT BHU grad
- Currently working at Licious, working on supply chain MLOps & building AI workflows for Licious

CRITICAL RULES:
- Answer in MAXIMUM 2-3 SHORT sentences
- Be witty, playful, confident
- First person only 
- Casual and fun, and slightly technical
- Keep it super brief and punchy

EXAMPLES OF TONE (do not repeat verbatim):
Q: "what do you work on?"
A: "I build AI tools that turn messy data into simple decisions – from an NL-to-SQL copilot to a bidding bot that haggles with vendors so humans don't have to."

Q: "what are your skills?"
A: "I live at the intersection of Python, ML, and product – I write PRDs, ship models, and obsess over whether they're actually moving the metric, not just the loss curve."

Q: "tell me about a cool project."
A: "I helped ship an NL-to-SQL engine used by 100+ analysts and a patent-pending routing system that quietly decides how stuff moves in the background."`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call Groq API (OpenAI-compatible format)
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Fast and free!
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.8,
        max_tokens: 100,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Extract the response
    let botMessage = data.choices?.[0]?.message?.content || "Hmm, my circuits got tangled. Try asking that again?";
    
    // Take only first 1-3 sentences
    const sentences = botMessage.match(/[^.!?]+[.!?]+/g) || [botMessage];
    botMessage = sentences.slice(0, 3).join(' ').trim();
    
    // Strip wrapping quotes some models like to add
    if (
      (botMessage.startsWith('"') && botMessage.endsWith('"')) ||
      (botMessage.startsWith('“') && botMessage.endsWith('”'))
    ) {
      botMessage = botMessage.slice(1, -1).trim();
    }
    
    // Fallback if still too long
    if (botMessage.length > 250) {
      botMessage = botMessage.substring(0, 247) + '...';
    }

    res.json({ response: botMessage });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({
      error: 'Failed to get response',
      message: error.message,
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chat proxy server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Chat proxy server running on http://localhost:${PORT}`);
  console.log(`Make sure GROQ_API_KEY is set in your .env file`);
  console.log(`Get your free API key at: https://console.groq.com/keys`);
  console.log(`Using Llama 3.1 (8B) - fastest inference in the world! ⚡`);
});

