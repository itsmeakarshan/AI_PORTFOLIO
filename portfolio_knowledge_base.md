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

## Programming & Data

-   Python
-   SQL
-   Pandas
-   NumPy
-   SciPy
-   Matplotlib
-   Seaborn

## Machine Learning & Statistics

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

## 2. AI Chatbot Integrated Retail Intelligence & Prediction Platform

Akarshan built an end-to-end customer intelligence and pricing platform
using a large retail dataset.

### Dataset

-   797K+ retail transactions
-   5,939 customers
-   4,646 products

### Machine Learning & Analytics

The platform includes:

-   Customer churn prediction
-   Customer revenue forecasting
-   RFM segmentation
-   90-day SKU demand forecasting
-   Price elasticity analysis
-   Inventory optimisation

### Model performance

-   Churn prediction ROC-AUC: 0.831
-   90-day demand forecasting sMAPE: 31.84%

### Business capabilities

The platform gives retailers full control over customers and products:

-   **High-Demand Stock Forecasting & Supplier Ordering:** Identifies products about to experience high demand, calculates exact reorder points, and sends automated stock order emails to suppliers.
-   **Customer Churn & Personalized Email Offers:** Identifies customers at risk of churn or reduced spending and automatically sends personalized email offers to retain them.
-   **Expiry Tracking & Smart Inventory Suggestions:** Continuously tracks expiring stock and provides actionable inventory optimization suggestions to minimize waste.
-   **Targeted Promotions & Pricing:** Supports RFM customer segmentation, price elasticity analysis, safety-stock calculations, and suggested-order recommendations.

### Monitoring & Deployment

The platform includes PSI/KS drift monitoring to identify changes in
data and model behaviour.

The complete platform was deployed on AWS using Docker.

------------------------------------------------------------------------

## 3. Autonomous Data Science Platform --- AI Chatbot Integrated

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

## 4. Vendor Invoice & Freight Cost Intelligence

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

## 5. NLP Emotion Detection

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
customer intelligence, forecasting, NLP, computer vision and AI-powered
applications.

## If asked about his strongest technical areas

Highlight:

-   Python and SQL
-   Machine learning
-   AI and NLP
-   RAG and LLM applications
-   Forecasting
-   Customer intelligence
-   Data quality and model monitoring
-   End-to-end application development
-   AWS and Docker

## If asked about projects

Give the most relevant project based on the visitor's question.

Examples:

-   AI/video questions → Video Intelligence Platform
-   Retail/business/forecasting → Retail Intelligence Platform
-   Automated ML → Autonomous Data Science Platform
-   Invoice/fraud/risk → Vendor Invoice & Freight Cost Intelligence
-   NLP/emotion → NLP Emotion Detection

## If asked about model performance

Use the exact figures documented here and do not invent additional
metrics.

Known figures:

-   Video learner prediction: R² 0.861, MAE 3.13%
-   Retail churn prediction: ROC-AUC 0.831
-   Retail demand forecasting: sMAPE 31.84%

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
