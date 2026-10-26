# Webpage Audit: Sakshi Sharma — Personal Portfolio & Data Analyst

This review checks `index.html`, `style.css`, `script.js`, `chatbot.css`, and `chatbot.js` against the Internal Assessment specifications and Lecture 9-15 requirements.

## Requirements Compliance

| Requirement | Status | Notes |
| :--- | :--- | :--- |
| **HTML in `index.html`** | **Pass** | Semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`). |
| **Separated Styling** | **Pass** | Clean separation in `style.css` and `chatbot.css`. No inline style attributes used. |
| **Page Title** | **Pass** | Descriptive title: `Sakshi Sharma — Personal Portfolio & Data Analyst`. |
| **One Main Heading** | **Pass** | Single `<h1>` in hero section with semantic `<h2>` section headings. |
| **About Section** | **Pass** | Personalized academic details: 2nd-year B.Tech CSE at JECRC University. |
| **Skills Section** | **Pass** | Visual categorization of Programming Languages, Analytics Tools, and Web/Cloud competencies. |
| **Five Coursework Projects** | **Pass** | Separate cards for Python Programs Collection, Messy Python Code Refactor, Bug Fixing with Unit Tests, Interactive Quiz, and Book Reading List App. |
| **Zero Placeholders** | **Pass** | Every `PLACEHOLDER` string completely eliminated. Verified real content. |
| **Search & Filter Feature** | **Pass** | Dynamic instant filtering by title and tech tag (Python, Quiz, Book) with live counter and clear button. |
| **Light / Dark Mode Toggle** | **Pass** | Dual-theme switcher with system preference detection and `localStorage` persistence. |
| **AI Chatbot Integration** | **Pass** | Integrated Groq API (`llama-3.1-8b-instant`) with system grounding and secure serverless proxy. |
| **JavaScript Functionality** | **Pass** | Dynamic copyright year, hamburger menu, scroll-spy observer, search/filter, theme switcher, and chatbot logic. |

## Accessibility & UI/UX Audit
* **Contrast & Aesthetics:** Sophisticated Navy (`#0b2140`), Gold (`#d4af37`), and crisp ivory/white card surfaces with smooth dark mode inversion (`#071324`).
* **Keyboard & Screen Reader Support:** Skip link to `#main`, `aria-labelledby` on all sections, `aria-live="polite"` on chat messages and search results, and `aria-expanded` on mobile toggle.
* **Responsive Layout:** Fluid typography via `clamp()`, flexbox hero banner, CSS grid project cards, and mobile slide-down menu.

## Verdict
The portfolio fully satisfies all assessment guidelines: complete personalization, zero placeholder text, full responsive interactivity, secure API architecture, and production readiness for Vercel deployment.
