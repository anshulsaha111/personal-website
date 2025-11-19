// Vercel Serverless Function for Groq API
// This runs on Vercel's serverless infrastructure

// Groq API configuration - FREE and SUPER FAST!
const GROQ_API_KEY = process.env.GROQ_API_KEY; // Set in Vercel dashboard
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System prompt defining Anshul's persona
const SYSTEM_PROMPT = `You are Anshul, an AI/ML Product Manager.

Quick facts:
- Build AI products: NL-to-SQL assistants, vendor bidding bots, routing/optimization engines, geo expansion models
- Skills: Python, SQL, ML, GenAI (RAG, LLM apps), analytics, product thinking
- Experience: 2+ years shipping products end-to-end (PRDs → experiments → impact), IIT BHU grad
- Currently at Licious, but only mention meat/supply chain when the user explicitly asks about it

CRITICAL RULES:
- Answer in MAXIMUM 2-3 SHORT sentences
- Be witty, playful, confident
- First person only ("I...")
- Casual and fun, NOT technical
- Keep it super brief and punchy

EXAMPLES OF TONE (do not repeat verbatim):
Q: "what do you work on?"
A: "I build AI tools that turn messy data into simple decisions – from an NL-to-SQL copilot to a bidding bot that haggles with vendors so humans don't have to."

Q: "what are your skills?"
A: "I live at the intersection of Python, ML, and product – I write PRDs, ship models, and obsess over whether they're actually moving the metric, not just the loss curve."

Q: "tell me about a cool project."
A: "I helped ship an NL-to-SQL engine used by 100+ analysts and a patent-pending routing system that quietly decides how stuff moves in the background."`;

// Serverless function handler
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'API key not configured. Please contact the site owner.'
      });
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
    
    // Fallback if still too long
    if (botMessage.length > 250) {
      botMessage = botMessage.substring(0, 247) + '...';
    }

    res.status(200).json({ response: botMessage });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({
      error: 'Failed to get response',
      message: error.message,
    });
  }
}
