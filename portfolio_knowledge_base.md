# Akarshan Rasyal --- Portfolio Knowledge Base

## Purpose

This document is the knowledge source for the AI chatbot/portfolio
assistant on Akarshan Rasyal's personal portfolio website. The chatbot
should use this document to answer visitor questions about Akarshan, his
education, technical skills, projects, achievements, and portfolio.

## About Akarshan

**Name:** Akarshan Rasyal\
**Location:** Newcastle upon Tyne, UK\
**Email:** akarshanrasyal4@gmail.com\
**Phone:** +44 7887142986\
**LinkedIn:** Available through the portfolio/CV\
**GitHub:** Available through the portfolio/CV

### Professional Summary

Akarshan Rasyal is an MSc Data Science graduate specialising in Python,
SQL, machine learning and AI. He is passionate about solving real-world
problems through data and has experience building end-to-end solutions
across customer intelligence, forecasting, NLP and computer vision.

He has also won the HackerRank SQL (Advanced) Certification.

Visitors who want to know more can interact with the AI chatbot powered
portfolio assistant.

------------------------------------------------------------------------

# Technical Skills

## Programming & Software Engineering

-   Python
-   SQL
-   Java 21 / Spring Boot 3
-   Next.js 16 / React 19 / TypeScript
-   FastAPI
-   Pandas
-   NumPy
-   SciPy
-   Matplotlib
-   Seaborn

## Machine Learning & Audio DSP

-   PyTorch
-   Torchaudio
-   2D CNN Spectrogram Analysis
-   Scikit-learn
-   LightGBM
-   XGBoost
-   Random Forest
-   Gradient Boosting
-   Regression
-   Classification
-   Clustering
-   Time-Series Forecasting
-   Feature Engineering
-   Hyperparameter Tuning
-   SHAP
-   Model Evaluation
-   Data Quality
-   Drift Detection

## AI & NLP

-   LLMs
-   RAG
-   LangChain
-   Embeddings
-   Vector Search
-   NLP

## Databases & Tools

-   PostgreSQL
-   SQLite
-   SQL Server
-   Docker
-   Git
-   GitHub
-   MLOps
-   AWS
-   Azure

------------------------------------------------------------------------

# Projects

## 1. Video Intelligence Platform with Prediction & Recommendation

**Technologies/areas:** Speech-to-text, semantic search, RAG,
conversational AI, machine learning, video intelligence.

Akarshan built an end-to-end AI video intelligence platform that
converts educational videos into searchable, interactive knowledge.

### Main capabilities

-   Allows users to upload videos from local storage or paste YouTube links.
-   Provides an integrated AI chatbot to ask questions about the video content.
-   Provides exact, clickable timestamps that take users directly to the requested section of a video.
-   Allows users to generate and download AI notes and summaries.
-   Generates AI quizzes and predicts next quiz performance scores.
-   Recommends targeted YouTube videos based on learners' weak topics.

### Machine Learning

A learner performance prediction model was developed using Extra Trees
to predict next quiz scores.

**Performance:** - R²: 0.861 - MAE: 3.13% on unseen users

### Purpose

The platform is designed to support targeted learning, improve
understanding, and help learners find the most relevant parts of
educational videos quickly.

------------------------------------------------------------------------

## 2. AI Voice Detector — Deepfake Speech & Audio Forensics Platform (VoiceGuard AI)

**Technologies/areas:** PyTorch, 2D CNN Spectrogram Analysis, Torchaudio, Java 21 Spring Boot 3, Next.js 16, FastAPI, PostgreSQL, Docker, Microservices, Audio Forensics.

Akarshan built an end-to-end anti-spoofing and deepfake audio forensics platform that detects whether a speech recording is authentic human voice or an AI-synthesized deepfake clone.

### Main capabilities

-   **Live Voice & File Analysis:** Allows users to upload audio files (WAV, MP3, FLAC, OGG, WebM) or record real-time audio directly via microphone with dynamic Web Audio API frequency visualizers.
-   **Deep Acoustic Spectrogram Processing:** Converts 16 kHz mono audio into 80-band Log-Mel spectrograms for high-resolution frequency feature extraction.
-   **Fast Real-Time Inference:** Delivers sub-100ms classification turnaround on standard CPU.
-   **Forensic PDF Audit Reports:** Automatically generates downloadable, audit-ready forensic PDF certificates using OpenPDF, complete with confidence scores and acoustic metadata.
-   **Interactive Verification Presets:** Pre-loaded with authentic human recordings and synthetic AI deepfakes for testing.

### Machine Learning & Benchmark Metrics

-   **Model:** 4-stage 2D Convolutional Neural Network (CNN) with Log-Mel Spectrogram representations (~421K parameters).
-   **Dataset:** 10,000 speech samples from the ASVspoof 2021 Deepfake Benchmark (5,000 genuine, 5,000 synthetic).
-   **Speaker-Disjoint Protocol:** Strict 0.00% speaker overlap between training (54 speakers), validation (17 speakers), and test sets (22 speakers / 1,500 unseen samples) to eliminate identity memorization.
-   **Test Accuracy:** 76.40% on unseen, speaker-disjoint test set.
-   **ROC-AUC:** 85.67%.
-   **Equal Error Rate (EER):** 22.87%.
-   **Lossy Codec Invariance:** > 72% across AAC, MP3, OGG, and WebM encodings.

### Enterprise Architecture

-   **Backend API Gateway:** Java 21 with Spring Boot 3, stateless JWT security, PostgreSQL database, and OpenPDF report compilation.
-   **ML Microservice:** Python FastAPI application running PyTorch 2D CNN inference.
-   **Frontend Dashboard:** Next.js 16 (React 19 + TypeScript) with modern glassmorphism.
-   **Deployment:** Multi-container orchestration with Docker Compose.

------------------------------------------------------------------------

## 3. Retail Customer Intelligence & Demand Forecasting Platform

**Technologies/areas:** Streamlit, Python, Scikit-learn, XGBoost, Lifetimes (BG/NBD & Gamma-Gamma), Statsmodels, Time-Series Econometrics.

An enterprise-grade, pure Streamlit Machine Learning & Econometric Intelligence Platform built on the Dunnhumby 2.59-Million Transaction Dataset (2,500 households over two years). The platform delivers real-time customer lifetime value modeling, calibrated churn risk classification, 12-week supply chain demand forecasting, and constant-elasticity price sensitivity simulations—executed 100% locally with zero external API dependencies.

### Main capabilities

-   **Customer Lifetime Value (CLV) Modeling:** Real-time customer lifetime value modeling using BG/NBD transaction rate estimation and Gamma-Gamma monetary value modeling.
-   **Calibrated Churn Risk Classification:** Probabilistic customer churn classification with probability calibration and threshold optimization.
-   **12-Week Supply Chain Demand Forecasting:** Multi-step econometric and machine-learning demand forecasting for supply chain planning.
-   **Constant-Elasticity Price Sensitivity Simulations:** Econometric log-log demand models simulating revenue and profit impact under varying pricing scenarios.
-   **100% Local Execution:** Runs completely locally with zero external API dependencies.
-   **Deployment:** Pure Streamlit web application.
-   **Live Link:** https://retail-customer-intelligence-platform-akarshan.streamlit.app/
-   **Video Demo:** https://www.youtube.com/watch?v=yFDt3oTBeq8

------------------------------------------------------------------------

## 4. Autonomous Data Science Platform --- AI Chatbot Integrated

Akarshan built an autonomous data science platform that takes raw
datasets and automates the machine-learning workflow.

### Automated workflow

The platform automates:

1.  Data profiling
2.  Data quality checks
3.  Problem-type detection
4.  Feature engineering
5.  Preprocessing
6.  Model selection
7.  Model benchmarking
8.  Champion-model selection using cross-validation
9.  Model evaluation
10. Explainability

### Advanced ML safeguards

The platform includes:

-   Data leakage detection
-   Untouched holdout evaluation
-   Threshold optimisation
-   SHAP explainability

An AI layer generates evidence-based analysis from validated model
results.

------------------------------------------------------------------------

## 5. Modern Enterprise SQL Data Warehouse & Power BI Analytics

**Technologies/areas:** Microsoft SQL Server (2019+), T-SQL, Microsoft Power BI Desktop, SSMS, Medallion Architecture (Bronze, Silver, Gold), Dimensional Modeling (Star Schema), DAX.

Akarshan built an end-to-end Enterprise Data Warehousing & Business Intelligence solution with Microsoft SQL Server and Power BI Desktop following the Medallion Architecture.

### Architecture & Pipeline (Medallion Architecture)

1.  **Bronze Layer (Raw Ingestion):** Direct landing zone ingesting raw CRM and ERP CSV extracts using automated stored procedures (`proc_load_bronze`) with `BULK INSERT`, automated truncation, execution runtime tracking, and `TRY...CATCH` error handling.
2.  **Silver Layer (Cleanse & Standardize):** Cleanses, deduplicates, and standardizes data using T-SQL stored procedures (`proc_load_silver`), applying CTEs, window functions (`ROW_NUMBER() OVER (PARTITION BY cst_id ORDER BY cst_create_date DESC)`), string trimming, and data hygiene rules.
3.  **Gold Layer (Dimensional Modeling / Star Schema):** Structures business-ready facts and dimensions with surrogate keys (`gold.dim_customers`, `gold.dim_products`, `gold.fact_sales`).
4.  **Power BI Desktop Analytics:** Connects directly to the Gold layer to deliver interactive executive KPI dashboards, sales trend analysis, DAX measures, and customer demographic insights.

### Repository

-   **GitHub:** https://github.com/itsmeakarshan/sql_data_warehouse_project

------------------------------------------------------------------------

## 6. Vendor Invoice & Freight Cost Intelligence

Akarshan built an end-to-end invoice intelligence system designed to
predict vendor freight costs and identify high-risk invoices requiring
manual review.

### Work performed

-   SQL-based feature engineering
-   Exploratory data analysis
-   Statistical testing
-   Model benchmarking
-   Regression modelling
-   Classification modelling
-   GridSearchCV optimisation
-   F1-score optimisation
-   Class-imbalance handling

The deployed application enables real-time prediction.

------------------------------------------------------------------------

## 7. NLP Emotion Detection

Akarshan built a real-time emotion detection system that classifies the
emotional state expressed in user-provided text using NLP and machine
learning.

### Pipeline

The system includes:

-   Text preprocessing
-   Feature extraction
-   Model training
-   Model evaluation
-   Prediction

The trained model was deployed as an interactive application,
demonstrating an end-to-end approach to transforming unstructured text
into machine-learning predictions.

------------------------------------------------------------------------

# Education

## MSc Data Science

**Northumbria University**\
Newcastle, UK\
January 2025 -- June 2026\
Result stated on CV: 64%

## Computer Science Engineering

**DBATU**\
Maharashtra, India\
January 2020 -- July 2024\
CGPA: 6.90

------------------------------------------------------------------------

# Achievement

## HackerRank SQL Certification

Akarshan won the **HackerRank SQL (Advanced) Certification**.

------------------------------------------------------------------------

# Chatbot Answering Guidelines

The portfolio chatbot should answer questions using the information in
this document.

## If asked "Who is Akarshan?"

Explain that Akarshan Rasyal is an MSc Data Science graduate based in
Newcastle upon Tyne, specialising in Python, SQL, machine learning and
AI. Mention that he builds end-to-end data and AI solutions across
customer intelligence, forecasting, NLP, computer vision, data warehousing and AI-powered
applications.

## If asked about his strongest technical areas

Highlight:

-   Python and SQL
-   Machine learning & Time-Series Forecasting
-   AI and NLP
-   RAG and LLM applications
-   Customer intelligence & CLV / Churn Modeling
-   Audio Forensics & Deepfake Detection
-   Data Warehousing & BI (SQL Server, Medallion Architecture, Power BI)
-   Software Engineering & Full-Stack Systems (Java Spring Boot, Next.js, FastAPI)
-   Data quality and model monitoring
-   End-to-end application development
-   AWS and Docker

## If asked about projects

Give the most relevant project based on the visitor's question.

Examples:

-   AI/video questions → Video Intelligence Platform
-   Voice/audio/deepfake/forensics/security questions → AI Voice Detector (VoiceGuard AI)
-   Retail/business/forecasting/pricing/CLV/churn → Retail Customer Intelligence & Demand Forecasting Platform
-   Automated ML → Autonomous Data Science Platform
-   Data warehousing/SQL/Power BI/ETL → Modern Enterprise SQL Data Warehouse & Power BI Analytics
-   Invoice/fraud/risk → Vendor Invoice & Freight Cost Intelligence
-   NLP/emotion → NLP Emotion Detection

## If asked about model performance

Use the exact figures documented here and do not invent additional
metrics.

Known figures:

-   Video learner prediction: R² 0.861, MAE 3.13%
-   Voice Deepfake Detection: Test Accuracy 76.40%, ROC-AUC 85.67%, EER 22.87% (ASVspoof 2021 Benchmark, speaker-disjoint protocol)

## If asked about education

State:

-   MSc Data Science, Northumbria University, January 2025 -- June 2026,
    Newcastle, UK, 64%
-   Computer Science Engineering, DBATU, January 2020 -- July 2024,
    Maharashtra, India, 6.90 CGPA

## If asked about contact

Use the contact information provided in this document:

-   Email: akarshanrasyal4@gmail.com
-   Phone: +44 7887142986
-   LinkedIn and GitHub are available through the portfolio/CV.

## If information is not available

Do NOT invent information about Akarshan.

If the document does not contain the answer, say that the information is
not currently available in the portfolio knowledge base and, where
appropriate, direct the visitor to contact Akarshan.

## Important accuracy rule

Never invent:

-   Job titles
-   Employment history
-   Company names
-   Salary
-   Work experience
-   Technologies not listed here
-   Project metrics
-   Education results
-   Certifications
-   Personal information

Only state information supported by this knowledge base or information
explicitly added to the portfolio later.
