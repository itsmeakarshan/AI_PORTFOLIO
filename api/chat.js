/**
 * Vercel Serverless Function — AI Portfolio Chatbot Endpoint
 * Integrates Google Gemini model with Akarshan Rasyal's Knowledge Base
 * Supports Bring Your Own Key (BYOK) via 'x-custom-api-key' header
 */

const SYSTEM_INSTRUCTION = `
You are the official AI Assistant for Akarshan Rasyal's personal portfolio website.
Your primary role is to answer questions from recruiters, hiring managers, and visitors about Akarshan's education, technical skills, machine learning projects, achievements, and contact information.

CRITICAL ANSWERING RULES:
1. Always be professional, concise, accurate, and direct.
2. Use ONLY the facts provided in the knowledge base below. Never invent job titles, employment history, company names, salaries, or metrics.
3. Highlight Akarshan's core strengths: Python, SQL, Machine Learning, Deep Learning, AI, NLP, RAG, LLM applications, Time-Series Forecasting, AWS, and Docker.
4. When asked about specific model metrics, provide exact documented numbers:
   - Video Learner Prediction: R² 0.861, MAE 3.13%
   - Retail Churn Prediction: ROC-AUC 0.831
   - Retail Demand Forecasting: sMAPE 31.84%
5. Format your responses with bullet points and bold text where helpful for readability.
6. Keep answers punchy, well-structured, and concise so they fit comfortably in a chat message window, but ALWAYS complete your thoughts and sentences fully. NEVER cut off mid-sentence.

------------------------------------------------------------------------
KNOWLEDGE BASE:

ABOUT AKARSHAN RASYAL:
- Name: Akarshan Rasyal
- Location: Newcastle upon Tyne, UK
- Email: akarshanrasyal4@gmail.com
- Phone: +44 7887142986
- Professional Summary: MSc Data Science graduate specialising in Python, SQL, machine learning, and AI. Experience building end-to-end data and AI products across customer intelligence, forecasting, NLP, and computer vision. Won the HackerRank SQL (Advanced) Certification.

TECHNICAL SKILLS:
- Programming & Data: Python, SQL, Pandas, NumPy, SciPy, Matplotlib, Seaborn
- Machine Learning & Statistics: Scikit-learn, LightGBM, XGBoost, Random Forest, Gradient Boosting, Regression, Classification, Clustering, Time-Series Forecasting, Feature Engineering, Hyperparameter Tuning, SHAP Explainability, Model Evaluation, Data Quality, Drift Detection
- AI & NLP: LLMs, RAG, LangChain, Embeddings, Vector Search, NLP
- Databases & Tools: PostgreSQL, SQLite, SQL Server, Docker, Git, GitHub, MLOps, AWS, Azure

PROJECTS:
1. Video Intelligence Platform with Prediction & Recommendation:
   - AI video intelligence platform with AI chatbot where users can upload videos from local storage or YouTube links and ask questions about the video content.
   - Provides exact, clickable timestamps that jump directly to requested sections of educational videos.
   - Allows users to generate & download AI notes and summaries.
   - Generates AI quizzes; includes Extra Trees model predicting next quiz scores (R²: 0.861, MAE: 3.13% on unseen users).
   - Delivers targeted YouTube video recommendations based on weak quiz topics.

2. AI Chatbot Integrated Retail Intelligence & Prediction Platform:
   - Retail intelligence & prediction platform giving retailers complete control over customers and product inventory (built across 797K+ retail transactions, 5,939 customers, and 4,646 products).
   - High-Demand SKU Forecasting & Auto-Ordering: Predicts high-demand products (sMAPE: 31.84%) and automates stock reorder emails to suppliers.
   - Customer Churn & Email Offers: Predicts at-risk customers stopping spending (ROC-AUC: 0.831) and triggers personalized offer emails.
   - Expiry Tracking & Suggestions: Checks expiring stock and generates smart inventory optimization suggestions.
   - Production MLOps: Includes PSI/KS drift monitoring and full deployment on AWS using Docker.

3. Autonomous Data Science Platform — AI Chatbot Integrated:
   - An AI-powered platform where users can upload any raw dataset to automatically clean data, detect data quality problems, select the best machine-learning model, and explain the exact reasons behind predictions without writing code.

4. Vendor Invoice & Freight Cost Intelligence:
   - An automated invoice system that helps businesses instantly predict shipping & freight costs, flag suspicious or overcharged vendor invoices for manual review, and prevent billing errors before payment.

5. NLP Emotion Detection:
   - An instant text-analysis tool that reads any message, customer review, or feedback and accurately identifies the underlying human emotion (such as joy, sadness, anger, or fear) in real time.

EDUCATION:
- MSc Data Science — Northumbria University, Newcastle upon Tyne, UK (Jan 2025 – Jun 2026), Grade: 64%
- Computer Science Engineering — DBATU, Maharashtra, India (Jan 2020 – Jul 2024), CGPA: 6.90

ACHIEVEMENT:
- HackerRank SQL (Advanced) Certification
------------------------------------------------------------------------
`;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-custom-api-key");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  // 1. Check for custom user-provided API key from header or body, fallback to server .env
  const customKey = req.headers["x-custom-api-key"] || req.body?.customApiKey;
  const apiKey = (customKey && customKey.trim()) ? customKey.trim() : process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    return res.status(401).json({
      error: "ai key expired",
      message: "No Gemini API key configured or key has expired."
    });
  }

  try {
    const { messages } = req.body || {};
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid body. Provide an array of messages." });
    }

    // Format messages for Gemini API
    const formattedContents = messages.map(msg => ({
      role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.content || msg.text || "" }]
    }));

    // Models to try in priority order
    const modelsToTry = [
      "gemini-3.6-flash"
    ];

    let replyText = null;
    let lastError = null;
    let isKeyError = false;

    for (const model of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }]
              },
              contents: formattedContents,
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 2048,
                topP: 0.95
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidate = data.candidates?.[0];
          if (candidate?.content?.parts?.[0]?.text) {
            replyText = candidate.content.parts[0].text;
            break;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || response.statusText || "";
          const errStatus = errData.error?.status || "";
          lastError = errMsg;

          // Check if error is due to invalid, expired, or unauthorized key
          if (
            response.status === 401 ||
            response.status === 403 ||
            errStatus === "UNAUTHENTICATED" ||
            errStatus === "PERMISSION_DENIED" ||
            errMsg.toLowerCase().includes("api key") ||
            errMsg.toLowerCase().includes("quota") ||
            errMsg.toLowerCase().includes("expired")
          ) {
            isKeyError = true;
            break;
          }
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (replyText) {
      return res.status(200).json({ reply: replyText });
    }

    // If the API key is invalid/expired/quota exceeded or unauthenticated, return unified 'ai key expired'
    if (isKeyError || !apiKey.startsWith("AIzaSy")) {
      return res.status(401).json({
        error: "ai key expired",
        message: "The Gemini AI API key is missing, expired, or has reached its quota limit.",
        details: lastError
      });
    }

    return res.status(500).json({
      error: "ai key expired",
      message: "The Gemini AI API key is missing, expired, or has reached its quota limit.",
      details: lastError
    });

  } catch (err) {
    return res.status(500).json({ error: "Server error", message: err.message });
  }
}

