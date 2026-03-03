document.addEventListener('DOMContentLoaded', () => {

    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatArea = document.getElementById('chatArea');
    const typingIndicator = document.getElementById('typingIndicator');

    // Simulate simple AI responses based on keywords
    const responses = [
        { keywords: ['price', 'pricing', 'cost', 'plan'], reply: "We have three main tiers: Starter (Free), Pro ($49/mo), and Business ($199/mo). If you scale up, each plan offers expanded features like advanced analytics and direct API access. Which plan are you interested in?" },
        { keywords: ['api', 'developer', 'docs', 'integrate'], reply: "Our REST API is robust and fully documented. You can deploy EXA AI onto your own tools within minutes using custom Webhooks and standard endpoints. You can find our documentation in your dashboard." },
        { keywords: ['hello', 'hi', 'hey'], reply: "Hello again! How can I help?" },
        { keywords: ['human', 'agent', 'support', 'help'], reply: "I can connect you with one of our human support agents. They usually respond within 5 minutes. Would you like me to open a ticket for you?" },
        { keywords: ['thank', 'thanks'], reply: "You're very welcome! Let me know if you need anything else." }
    ];

    const fallbackReply = "That's an interesting question! As an AI assistant, I'm still learning about specific queries like that. Could you rephrase, or would you like me to connect you with out human support team?";

    // Enable/disable send button
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim().length > 0) {
            sendBtn.removeAttribute('disabled');
        } else {
            sendBtn.setAttribute('disabled', 'true');
        }
    });

    // Formatting time
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function scrollToBottom() {
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function appendMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user' : 'bot'}`;

        let avatarIcon = isUser ? 'user' : 'bot';

        msgDiv.innerHTML = `
            <div class="avatar-sm"><i data-lucide="${avatarIcon}" style="width: 18px; color: white;"></i></div>
            <div>
                <div class="bubble">${text}</div>
                <span class="time">${getCurrentTime()}</span>
            </div>
        `;

        // Insert before typing indicator
        chatArea.insertBefore(msgDiv, typingIndicator);
        lucide.createIcons();
        scrollToBottom();
    }

    function getAutoReply(text) {
        text = text.toLowerCase();
        for (let r of responses) {
            if (r.keywords.some(kw => text.includes(kw))) {
                return r.reply;
            }
        }
        return fallbackReply;
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const text = messageInput.value.trim();
        if (!text) return;

        // Reset input
        messageInput.value = '';
        sendBtn.setAttribute('disabled', 'true');

        // Add User Message
        appendMessage(text, true);

        // Show typing indicator
        typingIndicator.classList.add('active');
        scrollToBottom();

        // Simulate network delay for AI response
        const processingTime = Math.random() * 1000 + 1000; // 1-2 seconds

        setTimeout(() => {
            // Hide typing indicator
            typingIndicator.classList.remove('active');

            // Add bot message
            const reply = getAutoReply(text);
            appendMessage(reply, false);

        }, processingTime);
    });
});

import { auth } from "./firebase.js";
import { signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.replace("login.html");
});

import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userEmail").textContent = user.email;

    if (!user.emailVerified) {
      document.getElementById("verificationStatus").textContent = "Email not verified";
    }
  }
});