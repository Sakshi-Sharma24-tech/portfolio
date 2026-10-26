# Sakshi Sharma — Personal Portfolio with AI Chatbot

A personalized, responsive portfolio web application developed for college Internal Assessment, featuring interactive project search and filtering, dark mode switching, and an integrated AI chatbot powered by the Groq API.

## Live Deployment
* **Live Website URL:** https://portfolio-1-sakshi-d3bc.vercel.app
* **Author:** Sakshi Sharma (B.Tech Computer Science & Engineering, 2nd Year, JECRC University)
* **Role:** Aspiring Data Analyst

---

## Key Features

1. **Dynamic Project Search & Multi-Tag Filtering:**
   * Instant search responding in real-time to query keywords (e.g., `Python`, `Quiz`, `Book`).
   * Categorical chip filters for immediate grouping and dynamic project counter.
   * Graceful fallback when no results match.

2. **Responsive Light / Dark Mode Toggle:**
   * Seamless transition between the signature Navy/Gold palette and a sleek Dark theme.
   * Automatically remembers visitor preference across reloads via browser `localStorage`.
   * Adaptive desktop and mobile toggle controls.

3. **Grounded AI Portfolio Chatbot (Groq API):**
   * Uses Groq Cloud's ultra-fast `llama-3.1-8b-instant` model.
   * Grounded with context about Sakshi's skills, academic background at JECRC University, and five coursework projects.
   * Interactive quick-prompt chips for common evaluator queries.
   * Secure serverless proxy route (`/api/chat`) ensuring private API keys are **never** exposed in client-side code or public Git commits.

4. **Showcase of Five Coursework Projects:**
   * **Python Programs Collection:** Factorial, Fibonacci series, and Structure-to-Dictionary data conversions with documentation.
   * **Messy Python Code Improvement:** AI refactoring of legacy code adhering to `.cursor/rules/python-standards.mdc` while preserving exact output.
   * **Bug Fixing Using Cursor AI:** Test-driven debugging (Red -> Fix -> Green) resolving 3 bug categories with 9 passing unit tests.
   * **Interactive Quiz Application (Lecture 10):** Client-side interactive quiz app with dynamic DOM question rendering and score persistence.
   * **Book Reading List Application (Lecture 11):** Web app built with Bolt AI and deployed to Vercel featuring reading progress states, duplicate prevention, and 60-character title limits.

---

## Tech Stack
* **Frontend:** Semantic HTML5, CSS3 (Custom properties, Grid, Flexbox, Media Queries), Vanilla JavaScript (ES6+)
* **AI & API:** Groq Cloud API (`llama-3.1-8b-instant`), OpenAI-compatible REST API
* **Backend / Serverless:** Vercel Serverless Functions (`Node.js`)
* **Dev Tools:** Cursor AI, Git, GitHub, MinGit
* **Hosting:** Vercel

---

## How to Run Locally

### Option 1: Direct Browser Launch
1. Clone or download this repository.
2. Open `index.html` directly in Google Chrome or any modern web browser.
3. To test the chatbot locally using the Lecture 15 approach:
   * Open `config.js`.
   * Replace `PASTE_YOUR_GROQ_API_KEY_HERE` with your API key from [console.groq.com/keys](https://console.groq.com/keys).
   * Note: `config.js` is included in `.gitignore` so your key remains safe from Git.

### Option 2: Local HTTP Server
Using Python's built-in web server:
```bash
# Navigate to the portfolio folder
cd PORTFOLIO

# Start local server on port 8000
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## Environment Variables for Vercel Deployment

When deploying to Vercel, configure the following environment variable in your Vercel Project Settings:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `GROQ_API_KEY` | Private API key from Groq Console | `gsk_...` |

*(This ensures the serverless `/api/chat` function can communicate with Groq securely without client-side exposure).*

---

## Known Limitations
* The client-side fallback chatbot requires an active internet connection to communicate with Groq Cloud endpoints.
* Rate limits may apply based on free-tier Groq API developer quotas.

---

## License & Credits
Created for academic evaluation and internal practical assessment by **Sakshi Sharma**.
