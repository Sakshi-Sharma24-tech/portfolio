/**
 * Lecture 15 — Portfolio Chatbot Implementation
 * Connects to Groq Cloud API (llama-3.1-8b-instant).
 * Supports both local testing (via config.js) and secure Vercel deployment (via /api/chat).
 */

(function () {
  "use strict";

  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");
  const statusText = document.getElementById("chatStatus");
  const sendButton = document.getElementById("chatSend");
  const promptChips = document.querySelectorAll(".prompt-chip");

  // System prompt grounding the chatbot in Sakshi Sharma's portfolio
  const SYSTEM_PROMPT = `You are a polite, knowledgeable AI assistant for Sakshi Sharma's personal portfolio.
Key student information:
- Name: Sakshi Sharma
- Education: 2nd year B.Tech Computer Science and Engineering student at JECRC University.
- Career Aspiration: Aspiring Data Analyst passionate about data exploration, insights, and decision-making.
- Technical Skills: Python, SQL, C++, JavaScript (ES6+), Microsoft Excel, Git & GitHub, Cursor AI, HTML5, CSS3, REST APIs, Vercel.
- Projects Completed:
  1. Python Programs Collection: Factorial calculation, Fibonacci series, and Structure-to-Dictionary data conversion with detailed README.
  2. Messy Python Code Improvement: Refactoring unformatted script in Cursor AI adhering to .cursor/rules/python-standards.mdc with 100% identical console output.
  3. Bug Fixing Using Cursor AI: Applied Red-Fix-Green TDD methodology with 9 unit tests to fix average calculation, passing boundary (>= 40), and grade ordering.
  4. Interactive Quiz Application: Lecture 10 interactive quiz app with dynamic DOM question rendering and score tracking.
  5. Book Reading List Application: Lecture 11 web app built with Bolt AI and deployed to Vercel with reading status filters, duplicate prevention, and 60-character title limit.
- GitHub: https://github.com/sakshisharma-cse
- Contact: sakshisharma.cse@gmail.com, Jaipur, Rajasthan, India.

Instructions:
- Keep replies concise, helpful, and under 70 words.
- If asked about personal details not listed above, say so politely rather than inventing facts.`;

  function showMessage(text, kind) {
    const wrapper = document.createElement("div");
    wrapper.className = `message-wrapper ${kind}`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = kind === "user" ? "👤" : "🤖";

    const p = document.createElement("p");
    p.className = kind === "user" ? "user-message" : "bot-message";
    p.textContent = text;

    wrapper.appendChild(avatar);
    wrapper.appendChild(p);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }

  async function handleChatSubmission(question) {
    if (!question) {
      if (statusText) statusText.textContent = "Please type a question.";
      return;
    }

    showMessage(question, "user");
    if (input) input.value = "";
    if (sendButton) sendButton.disabled = true;
    if (statusText) statusText.textContent = "Thinking...";

    try {
      let botResponse = "";

      // 1. Try server-side Vercel endpoint first (protects API keys in deployment)
      let usedServerless = false;
      try {
        const serverlessRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: question }
            ]
          })
        });

        if (serverlessRes.ok) {
          const data = await serverlessRes.json();
          botResponse = data.choices?.[0]?.message?.content || data.reply;
          usedServerless = true;
        }
      } catch (e) {
        // Not running on Vercel or /api/chat not available locally; fallback to client config
        usedServerless = false;
      }

      // 2. Client-side fallback using config.js (as taught in Lecture 15)
      if (!usedServerless) {
        if (
          typeof CONFIG === "undefined" ||
          !CONFIG.apiKey ||
          CONFIG.apiKey === "PASTE_YOUR_GROQ_API_KEY_HERE"
        ) {
          throw new Error("Add your Groq API key in config.js (or configure GROQ_API_KEY on Vercel).");
        }

        const response = await fetch(`${CONFIG.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${CONFIG.apiKey}`
          },
          body: JSON.stringify({
            model: CONFIG.model || "llama-3.1-8b-instant",
            temperature: 0.7,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: question }
            ]
          })
        });

        if (!response.ok) {
          if (response.status === 401) throw new Error("Check your Groq API key in config.js.");
          if (response.status === 429) throw new Error("Too many requests. Please wait a moment and try again.");
          throw new Error(`API request failed (HTTP ${response.status}).`);
        }

        const data = await response.json();
        botResponse = data.choices?.[0]?.message?.content;
      }

      showMessage(botResponse || "I didn't receive a response. Please try again.", "bot");
      if (statusText) statusText.textContent = "";
    } catch (error) {
      if (statusText) statusText.textContent = "Chat unavailable. " + error.message;
      showMessage("Sorry, I could not complete that request. " + error.message, "bot");
    } finally {
      if (sendButton) sendButton.disabled = false;
    }
  }

  // Handle Form Submit
  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const question = input ? input.value.trim() : "";
      handleChatSubmission(question);
    });
  }

  // Quick Prompt Chips
  promptChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      const promptText = this.getAttribute("data-prompt");
      if (promptText) {
        if (input) input.value = promptText;
        handleChatSubmission(promptText);
      }
    });
  });
})();
