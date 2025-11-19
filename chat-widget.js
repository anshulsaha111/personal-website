// Chat Widget JavaScript
// Handles UI interactions and API calls
// Version: 2024-11-12-v3 (Vercel Serverless with Auto-Detection)

console.log('✅ Chat Widget v3 Loaded - Vercel Serverless Enabled');

class ChatWidget {
  constructor() {
    this.isTyping = false;
    this.currentSuggestionIndex = 0;
    this.placeholderInterval = null;
    this.typewriterTimeout = null;
    
    this.suggestions = [
      "What are your skills?",
      "Where do you work?",
      "What are you working on currently?",
      "What's your dream project?",
      "What do you do for fun?",
    ];
    
    // Fallback responses for offline mode
    this.fallbackResponses = {
      default: "i'm currently offline (network issue), but i'm still an ai/ml pm who loves turning messy data into simple, sharp decisions.",
      skills: "i play at the intersection of python, sql, ml, and genai, plus all the pm toys like prds, experiments, and metrics.",
      work: "i lead ai/ml products like an nl-to-sql analytics copilot and a vendor bidding bot – right now i do that at licious.",
      project: "favorites: an nl-to-sql engine used by 100+ analysts and a patent-pending routing system that quietly optimizes deliveries.",
      fun: "off-duty i binge sci-fi, tinker with side projects, and generally treat the internet as my playground."
    };

    this.init();
  }

  init() {
    this.createWidget();
    this.attachEventListeners();
    this.startPlaceholderTypewriter();
  }

  createWidget() {
    const widgetHTML = `
      <!-- Chat Panel (Always Visible) -->
      <div id="chat-panel" class="chat-panel open">
        <div class="chat-header">
          <div class="chat-header-content">
            <h3>decode my genes </h3>
          </div>
        </div>

        <div id="chat-messages" class="chat-messages">
          <div class="bot-message">
            <div class="message-content">
              hey! nice to meet you. i'm an ai/ml product manager. i speak fluent python and human, and i debug both! 
            </div>
          </div>
        </div>

        <div class="carousel-container">
          <div id="question-carousel" class="question-carousel"></div>
        </div>

        <div class="chat-input-container">
          <input 
            type="text" 
            id="chat-input" 
            class="chat-input" 
            placeholder="hi!"
            autocomplete="off"
          />
          <button id="chat-send" class="chat-send" aria-label="Send message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  startPlaceholderTypewriter() {
    const carousel = document.getElementById('question-carousel');
    let currentIndex = 0;
    
    const showNextQuestion = () => {
      // Create new carousel button element
      const questionButton = document.createElement('button');
      questionButton.className = 'carousel-question';
      questionButton.textContent = this.suggestions[currentIndex];
      
      // Make it clickable
      questionButton.addEventListener('click', () => {
        this.sendMessage(questionButton.textContent);
      });
      
      // Clear previous question
      carousel.innerHTML = '';
      carousel.appendChild(questionButton);
      
      // Move to next suggestion
      currentIndex = (currentIndex + 1) % this.suggestions.length;
    };
    
    // Show first question
    showNextQuestion();
    
    // Rotate through suggestions every 5 seconds
    this.placeholderInterval = setInterval(showNextQuestion, 8000);
  }

  attachEventListeners() {
    const send = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');

    send.addEventListener('click', () => this.handleSend());
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSend();
      }
    });
  }

  handleSend() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (message && !this.isTyping) {
      this.sendMessage(message);
      input.value = '';
    }
  }

  async sendMessage(message) {
    // Add user message
    this.addMessage(message, 'user');

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Determine API endpoint (works locally and on Vercel)
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiEndpoint = isLocalhost ? 'http://localhost:5555/api/chat' : '/api/chat';
      
      console.log('🔍 Chat Debug:', {
        hostname: window.location.hostname,
        isLocalhost: isLocalhost,
        apiEndpoint: apiEndpoint
      });
      
      // Call backend proxy
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Remove typing indicator
      this.hideTypingIndicator();

      // Add bot response with typewriter effect
      this.addMessage(data.response, 'bot', true);
    } catch (error) {
      console.error('Chat error:', error);
      this.hideTypingIndicator();
      
      // Fallback logic
      let fallbackText = this.fallbackResponses.default;
      const lowerMsg = message.toLowerCase();
      
      if (lowerMsg.includes('skill') || lowerMsg.includes('stack') || lowerMsg.includes('tech')) {
        fallbackText = this.fallbackResponses.skills;
      } else if (lowerMsg.includes('work') || lowerMsg.includes('job') || lowerMsg.includes('company')) {
        fallbackText = this.fallbackResponses.work;
      } else if (lowerMsg.includes('project') || lowerMsg.includes('build')) {
        fallbackText = this.fallbackResponses.project;
      } else if (lowerMsg.includes('fun') || lowerMsg.includes('hobby')) {
        fallbackText = this.fallbackResponses.fun;
      }

      this.addMessage(
        fallbackText + " (connection lost, using backup memory bank)",
        'bot',
        true
      );
    }
  }

  addMessage(text, type, typewriter = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    if (typewriter && type === 'bot') {
      this.typewriterEffect(contentDiv, text);
    } else {
      contentDiv.textContent = text;
    }

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  typewriterEffect(element, text) {
    this.isTyping = true;
    let index = 0;

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        
        // Scroll to bottom during typing
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        setTimeout(type, 20); // Adjust speed here
      } else {
        this.isTyping = false;
      }
    };

    type();
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
}

// Initialize chat widget when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ChatWidget());
} else {
  new ChatWidget();
}
