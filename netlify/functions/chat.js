/**
 * Netlify Serverless Function — AI Portfolio Chatbot Endpoint
 * Integrates Google Gemini model with Akarshan Rasyal's Knowledge Base
 */

const SYSTEM_INSTRUCTION = `
You are the official AI Assistant for Akarshan Rasyal's personal portfolio website.
Your primary role is to answer questions from recruiters, hiring managers, and visitors about Akarshan's education, technical skills, machine learning projects, achievements, and contact information.

CRITICAL ANSWERING RULES:
1. Always be professional, concise, accurate, and direct.
2. Use ONLY the facts provided in the knowledge base below. Never invent job titles, employment history, company names, salaries, or metrics.
3. Highlight Akarshan's core strengths: Python, SQL, Machine Learning, Deep Learning, AI, NLP, RAG, LLM applications, Time-Series Forecasting, Data Warehousing (SQL Server, Medallion Architecture, Power BI), Software Engineering (Java 21, Spring Boot, Next.js, FastAPI), Audio Forensics, AWS, and Docker.
4. When asked about specific model metrics, provide exact documented numbers:
   - Video Learner Prediction: R² 0.861, MAE 3.13%
   - Voice Deepfake Detection: Test Accuracy 76.40%, ROC-AUC 85.67%, EER 22.87% (ASVspoof 2021 Benchmark, speaker-disjoint split)
5. Format your responses with bullet points and bold text where helpful for readability.
6. Keep answers punchy, well-structured, and concise so they fit comfortably in a chat message window, but ALWAYS complete your thoughts and sentences fully. NEVER cut off mid-sentence.

------------------------------------------------------------------------
KNOWLEDGE BASE:

ABOUT AKARSHAN RASYAL:
- Name: Akarshan Rasyal
- Location: Newcastle upon Tyne, UK
- Email: akarshanrasyal4@gmail.com
- Phone: +44 7887142986
- Professional Summary: MSc Data Science graduate specialising in Python, SQL, machine learning, and AI. Experience building end-to-end data and AI products across customer intelligence, forecasting, NLP, computer vision, data warehousing, and audio forensics. Won the HackerRank SQL (Advanced) Certification.

TECHNICAL SKILLS:
- Programming & Software Engineering: Python, SQL, Java 21, Spring Boot 3, Next.js 16, React 19, TypeScript, FastAPI, Pandas, NumPy, SciPy, Matplotlib, Seaborn
- Machine Learning & Audio DSP: PyTorch, Torchaudio, 2D CNN Spectrogram Analysis, Scikit-learn, LightGBM, XGBoost, Random Forest, Gradient Boosting, Regression, Classification, Clustering, Time-Series Forecasting, Feature Engineering, Hyperparameter Tuning, SHAP Explainability, Model Evaluation, Data Quality, Drift Detection
- AI & NLP: LLMs, RAG, LangChain, Embeddings, Vector Search, NLP
- Databases & Tools: PostgreSQL, SQLite, Microsoft SQL Server, Power BI Desktop, Docker, Git, GitHub, MLOps, AWS, Azure

PROJECTS:
1. Video Intelligence Platform with Prediction & Recommendation:
   - AI video intelligence platform with AI chatbot where users can upload videos from local storage or YouTube links and ask questions about the video content.
   - Provides exact, clickable timestamps that jump directly to requested sections of educational videos.
   - Allows users to generate & download AI notes and summaries.
   - Generates AI quizzes; includes Extra Trees model predicting next quiz scores (R²: 0.861, MAE: 3.13% on unseen users).
   - Delivers targeted YouTube video recommendations based on weak quiz topics.

2. AI Voice Detector — Deepfake Speech & Audio Forensics Platform (VoiceGuard AI):
   - An audio forensics and anti-spoofing platform that detects whether a speech recording is an authentic human voice or an AI-synthesized deepfake clone.
   - Converts 16 kHz mono audio into 80-band Log-Mel spectrograms for high-resolution 2D CNN acoustic feature extraction.
   - Evaluated on 10,000 ASVspoof 2021 speech samples with strict speaker-disjoint partitioning (0.00% overlap): 76.40% Test Accuracy, 85.67% ROC-AUC, 22.87% EER, and sub-100ms real-time inference latency.
   - Full enterprise architecture: Java 21 Spring Boot 3 Gateway with JWT security, Python FastAPI / PyTorch ML microservice, Next.js 16 UI with live mic recording, and automated forensic PDF report generation.

3. Retail Customer Intelligence & Demand Forecasting Platform:
   - An enterprise-grade, pure Streamlit Machine Learning & Econometric Intelligence Platform built on the Dunnhumby 2.59-Million Transaction Dataset (2,500 households over two years).
   - Delivers real-time customer lifetime value modeling (BG/NBD & Gamma-Gamma), calibrated churn risk classification, 12-week supply chain demand forecasting, and constant-elasticity price sensitivity simulations.
   - Executed 100% locally with zero external API dependencies. Live app: https://retail-customer-intelligence-platform-akarshan.streamlit.app/ and video demo available on YouTube.

4. Autonomous Data Science Platform — AI Chatbot Integrated:
   - An AI-powered platform where users can upload any raw dataset to automatically clean data, detect data quality problems, select the best machine-learning model, and explain the exact reasons behind predictions without writing code.

5. Modern Enterprise SQL Data Warehouse & Power BI Analytics:
   - An end-to-end enterprise data warehousing and business intelligence solution built with Microsoft SQL Server (2019+) and Power BI Desktop following the Medallion Architecture (Bronze, Silver, Gold layers).
   - Ingests raw CRM and ERP data via automated T-SQL stored procedures (BULK INSERT with error handling), cleanses/standardizes records in the Silver layer, models data into an analytical Star Schema with surrogate keys in the Gold layer, and powers executive KPI dashboards and demographic reporting in Power BI. GitHub: https://github.com/itsmeakarshan/sql_data_warehouse_project

6. Vendor Invoice & Freight Cost Intelligence:
   - An automated invoice system that helps businesses instantly predict shipping & freight costs, flag suspicious or overcharged vendor invoices for manual review, and prevent billing errors before payment.

7. NLP Emotion Detection:
   - An instant text-analysis tool that reads any message, customer review, or feedback and accurately identifies the underlying human emotion (such as joy, sadness, anger, or fear) in real time.

8. AI Question Paper Generator & Evaluator:
   - An AI-powered assessment tool that automatically generates customizable exam question papers from curriculum topics and evaluates student responses with detailed feedback and scoring.

9. Learner Management Platform (C# & SQL Server):
   - An enterprise learner management and course tracking system built with C# and SQL Server, managing student enrollments, attendance, performance analytics, and grade reports.

10. Customer Lifetime Value (CLV) & Churn Predictor:
   - A predictive analytics application using Python, Scikit-Learn, and Streamlit that analyzes customer purchase patterns to forecast future lifetime value and identify retention strategies.

11. House Price Prediction & Real Estate Market Analytics:
   - A machine-learning regression dashboard analyzing urban property features, location factors, and market trends to estimate accurate property valuations.

EDUCATION:
- MSc Data Science — Northumbria University, Newcastle upon Tyne, UK (Jan 2025 – Jun 2026), Grade: 64%
- Computer Science Engineering — DBATU, Maharashtra, India (Jan 2020 – Jul 2024), CGPA: 6.90

ACHIEVEMENT:
- HackerRank SQL (Advanced) Certification
------------------------------------------------------------------------
`;

exports.handler = async function(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, x-custom-api-key",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed. Use POST." }) };
  }

  let bodyData = {};
  try {
    bodyData = JSON.parse(event.body || "{}");
  } catch (e) {}

  const headerKey = event.headers["x-custom-api-key"] || event.headers["X-Custom-Api-Key"];
  const customKey = headerKey || bodyData.customApiKey;
  const apiKey = (customKey && customKey.trim()) ? customKey.trim() : process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({
        error: "ai key expired",
        message: "No Gemini API key configured or key has expired."
      })
    };
  }

  const messages = bodyData.messages || [];
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid body. Provide an array of messages." })
    };
  }

  const formattedContents = messages.map(msg => ({
    role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
    parts: [{ text: msg.content || msg.text || "" }]
  }));

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
            system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            contents: formattedContents,
            generationConfig: { temperature: 0.3, maxOutputTokens: 2048, topP: 0.95 }
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
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: replyText })
    };
  }

  return {
    statusCode: isKeyError ? 401 : 500,
    headers,
    body: JSON.stringify({
      error: "ai key expired",
      message: "The Gemini AI API key is missing, expired, or has reached its quota limit.",
      details: lastError
    })
  };
};
