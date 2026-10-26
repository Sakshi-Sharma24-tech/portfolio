// Vercel Serverless Function: /api/chat
// Securely proxies chatbot requests to Groq Cloud API without exposing secret keys in frontend code.

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const apiKey = process.env.GROQ_API_KEY || process.env.CHATBOT_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Groq API key not configured on server. Please add GROQ_API_KEY in Vercel Project Settings."
    });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. 'messages' array required." });
    }

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        messages: messages
      })
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      return res.status(groqResponse.status).json({
        error: `Groq API responded with HTTP ${groqResponse.status}: ${errorText}`
      });
    }

    const data = await groqResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Chat API proxy error:", error);
    return res.status(500).json({ error: "Internal server error: " + error.message });
  }
}
