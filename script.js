/**
 * Akarshan Rasyal — Portfolio Scripts
 * Lightweight, zero-dependency vanilla JavaScript
 * 1. Scroll-controlled cinematic hero video scrubbing
 * 2. On-demand YouTube player instantiation
 * 3. Accessible keyboard & interaction handlers
 */

// 1. Projects Data
const projects = [
  {
    title: "Video Intelligence Platform with Prediction & Recommendation",
    yt: "Do-LcKG6l8c",
    live: "http://35.178.182.38",
    description: "AI video intelligence platform with AI chatbot where users can upload videos from local storage or YouTube links and ask questions about the video content. Features exact clickable timestamps that jump directly to requested video sections, downloadable AI notes & summaries, AI-generated quizzes with next-score prediction, and targeted YouTube recommendations for weak topics."
  },
  {
    title: "AI Chatbot Integrated Retail Intelligence & Prediction Platform",
    yt: "R5F8nOMUvm8",
    live: "http://35.178.182.38:8080/",
    description: "Retail intelligence platform giving retailers full control over customers and products. Features SKU demand forecasting to order stocks and automate reorder emails, customer churn prediction to target at-risk spenders with personalized email offers, and automated expiry tracking with smart stock optimization suggestions built across 797K+ transactions."
  },
  {
    title: "Autonomous Data Science Platform — AI chatbot integrated",
    yt: "bzzT175ze74",
    live: "https://github.com/itsmeakarshan/ai-data-scientist",
    description: "An AI-powered data science platform that lets users upload raw datasets and automatically cleans data, finds hidden patterns, builds the best machine-learning models, and explains exact reasons behind predictions without writing code."
  },
  {
    title: "Vendor Invoice & Freight Cost Intelligence",
    yt: "MGz7S36F5GE",
    live: "https://invoice-intelligence-byakarshan.streamlit.app/",
    description: "An automated invoice intelligence system that helps businesses instantly predict shipping & freight costs, flag suspicious or overcharged vendor invoices for review, and prevent billing errors before payment."
  },
  {
    title: "NLP Emotion Detection",
    yt: "7OG-jnmAXz4",
    live: "https://emotion-detection-ml-owsc.onrender.com",
    description: "An instant text-analysis tool that reads any message, customer review, or feedback and accurately identifies the underlying human emotion (such as joy, sadness, anger, or fear) in real time."
  }
];

// 2. Render Project Cards with On-Demand Video Embeds
const projectGrid = document.getElementById("projectGrid");

if (projectGrid) {
  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
    const padIndex = String(index + 1).padStart(2, "0");
    const thumbUrl = `https://img.youtube.com/vi/${project.yt}/maxresdefault.jpg`;
    const fallbackThumb = `https://img.youtube.com/vi/${project.yt}/hqdefault.jpg`;

    card.innerHTML = `
      <div class="project-media" tabindex="0" role="region" aria-label="${project.title} video preview">
        <img src="${thumbUrl}" alt="Thumbnail preview for ${project.title}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackThumb}'">
        <button class="play-overlay" type="button" aria-label="Play video demonstration for ${project.title}">
          <span class="play-button"><span class="play-icon" aria-hidden="true"></span> Play video</span>
        </button>
      </div>
      <div class="project-info">
        <span class="project-index">0${index + 1} / PROJECT</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-links">
          <a href="${project.live}" target="_blank" rel="noopener">Live Site ↗</a>
          <a href="https://youtu.be/${project.yt}" target="_blank" rel="noopener">YouTube ↗</a>
        </div>
      </div>
    `;

    const mediaContainer = card.querySelector(".project-media");
    const playButton = card.querySelector(".play-overlay");

    // Load iframe only on user action (preserves privacy, reduces initial page load to near zero)
    const activatePlayer = () => {
      if (mediaContainer.querySelector("iframe")) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${project.yt}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = `${project.title} — YouTube Video Demo`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.loading = "eager";
      mediaContainer.innerHTML = "";
      mediaContainer.appendChild(iframe);
      iframe.focus();
    };

    playButton.addEventListener("click", (e) => {
      e.stopPropagation();
      activatePlayer();
    });

    mediaContainer.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activatePlayer();
      }
    });

    projectGrid.appendChild(card);
  });
}

// 3. Scroll-Driven Hero Video Scrubbing
(function initHeroScrollScrub() {
  const heroSection = document.querySelector(".hero-scrub");
  const video = document.getElementById("heroVideo");
  const progressBar = document.getElementById("heroProgress");

  if (!heroSection || !video) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let prefersReducedMotion = motionQuery.matches;

  motionQuery.addEventListener("change", (e) => {
    prefersReducedMotion = e.matches;
    if (prefersReducedMotion) {
      video.pause();
    }
  });

  let duration = 0;
  let targetTime = 0;
  let isTicking = false;

  function updateDuration() {
    if (video.duration && !isNaN(video.duration) && video.duration > 0) {
      duration = video.duration;
      renderHeroScrub();
    }
  }

  // Extract duration across all video loading lifecycle events
  updateDuration();
  video.addEventListener("loadedmetadata", updateDuration);
  video.addEventListener("loadeddata", updateDuration);
  video.addEventListener("canplay", updateDuration);
  video.addEventListener("durationchange", updateDuration);

  // Pause video so manual scroll scrubbing controls currentTime cleanly
  video.pause();

  function applyVideoSeek() {
    if (prefersReducedMotion || duration <= 0) return;

    // Prevent issuing new seeks while a seek is in progress (prevents browser seek lockup)
    if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.01) {
      if ("fastSeek" in video && typeof video.fastSeek === "function") {
        video.fastSeek(targetTime);
      } else {
        video.currentTime = targetTime;
      }
    }
  }

  function renderHeroScrub() {
    isTicking = false;
    if (prefersReducedMotion) return;

    if (!duration && video.duration) {
      duration = video.duration;
    }

    const rect = heroSection.getBoundingClientRect();
    const scrollableDistance = heroSection.offsetHeight - window.innerHeight;

    if (scrollableDistance <= 0) return;

    // Calculate scrub progress between 0 and 1
    const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));

    // Update visual progress bar
    if (progressBar) {
      progressBar.style.width = `${(progress * 100).toFixed(2)}%`;
    }

    if (duration > 0) {
      targetTime = progress * duration;
      applyVideoSeek();
    }
  }

  // When current seek finishes, immediately catch up to latest target time if user scrolled further
  video.addEventListener("seeked", () => {
    applyVideoSeek();
  });

  function onScrollOrResize() {
    if (!isTicking) {
      requestAnimationFrame(renderHeroScrub);
      isTicking = true;
    }
  }

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });
  window.addEventListener("touchmove", onScrollOrResize, { passive: true });
  window.addEventListener("touchstart", onScrollOrResize, { passive: true });

  // Initial calculation
  renderHeroScrub();
})();

// 4. AI Portfolio Chatbot Controller with Bring-Your-Own-Key (BYOK)
(function initAIChatbot() {
  const ERROR_KEY_EXPIRED = "ai key expired";

  const chatToggle = document.getElementById("chatToggle");
  const chatWindow = document.getElementById("chatWindow");
  const chatClose = document.getElementById("chatClose");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const suggestionsContainer = document.getElementById("chatSuggestions");
  const chatKeyBtn = document.getElementById("chatKeyBtn");
  const keyActiveIndicator = document.getElementById("keyActiveIndicator");
  const chatStatusSubtitle = document.getElementById("chatStatusSubtitle");

  // API Key Modal Elements
  const apiKeyModal = document.getElementById("apiKeyModal");
  const apiKeyModalClose = document.getElementById("apiKeyModalClose");
  const apiKeyModalCancel = document.getElementById("apiKeyModalCancel");
  const apiKeyForm = document.getElementById("apiKeyForm");
  const apiKeyInput = document.getElementById("apiKeyInput");
  const toggleKeyVisibility = document.getElementById("toggleKeyVisibility");
  const apiKeyActiveInfo = document.getElementById("apiKeyActiveInfo");
  const removeApiKeyBtn = document.getElementById("removeApiKeyBtn");

  if (!chatToggle || !chatWindow || !chatForm || !chatInput || !chatMessages) return;

  let history = [];
  let lastFailedMessage = null;

  function getCustomApiKey() {
    return sessionStorage.getItem("portfolio_gemini_key") || "";
  }

  function setCustomApiKey(key) {
    if (key && key.trim()) {
      sessionStorage.setItem("portfolio_gemini_key", key.trim());
    } else {
      sessionStorage.removeItem("portfolio_gemini_key");
    }
    updateKeyUI();
  }

  function updateKeyUI() {
    const key = getCustomApiKey();
    const hasCustomKey = Boolean(key);

    if (keyActiveIndicator) {
      keyActiveIndicator.style.display = hasCustomKey ? "block" : "none";
    }

    if (chatStatusSubtitle) {
      chatStatusSubtitle.innerHTML = hasCustomKey
        ? `<span class="chat-status-dot" style="background:#c8ff4d;box-shadow:0 0 8px #c8ff4d"></span> Gemini AI · Custom Key`
        : `<span class="chat-status-dot"></span> Gemini AI · Live`;
    }

    if (apiKeyActiveInfo) {
      apiKeyActiveInfo.style.display = hasCustomKey ? "flex" : "none";
    }

    if (apiKeyInput && hasCustomKey) {
      apiKeyInput.value = key;
    }
  }

  // Initial key UI state
  updateKeyUI();

  function toggleChat(open) {
    const isOpen = open !== undefined ? open : !chatWindow.classList.contains("open");
    chatWindow.classList.toggle("open", isOpen);
    chatWindow.setAttribute("aria-hidden", !isOpen);
    if (isOpen) {
      setTimeout(() => chatInput.focus(), 150);
    }
  }

  chatToggle.addEventListener("click", () => toggleChat());
  if (chatClose) {
    chatClose.addEventListener("click", () => toggleChat(false));
  }

  // Modal open / close handlers
  function openApiKeyModal() {
    if (!apiKeyModal) return;
    apiKeyModal.classList.add("open");
    apiKeyModal.setAttribute("aria-hidden", "false");
    updateKeyUI();
    setTimeout(() => {
      if (apiKeyInput) apiKeyInput.focus();
    }, 150);
  }

  function closeApiKeyModal() {
    if (!apiKeyModal) return;
    apiKeyModal.classList.remove("open");
    apiKeyModal.setAttribute("aria-hidden", "true");
  }

  if (chatKeyBtn) {
    chatKeyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openApiKeyModal();
    });
  }

  if (apiKeyModalClose) {
    apiKeyModalClose.addEventListener("click", closeApiKeyModal);
  }

  if (apiKeyModalCancel) {
    apiKeyModalCancel.addEventListener("click", closeApiKeyModal);
  }

  if (apiKeyModal) {
    apiKeyModal.addEventListener("click", (e) => {
      if (e.target === apiKeyModal) closeApiKeyModal();
    });
  }

  // Toggle password visibility in modal
  if (toggleKeyVisibility && apiKeyInput) {
    toggleKeyVisibility.addEventListener("click", () => {
      const isPassword = apiKeyInput.type === "password";
      apiKeyInput.type = isPassword ? "text" : "password";
      toggleKeyVisibility.textContent = isPassword ? "🙈" : "👁️";
    });
  }

  // Remove key handler
  if (removeApiKeyBtn) {
    removeApiKeyBtn.addEventListener("click", () => {
      setCustomApiKey("");
      if (apiKeyInput) apiKeyInput.value = "";
      closeApiKeyModal();
      appendMessage(
        "assistant",
        "ℹ️ Custom API key removed. Reverted to default demo environment."
      );
    });
  }

  // API Key Form submit
  if (apiKeyForm) {
    apiKeyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredKey = apiKeyInput.value.trim();
      if (!enteredKey) return;

      setCustomApiKey(enteredKey);
      closeApiKeyModal();

      appendMessage(
        "assistant",
        "✅ **Custom Gemini API Key saved for this session!**\n\nYour key is securely stored in your browser session."
      );

      // Auto retry the message that failed
      if (lastFailedMessage) {
        const retryMsg = lastFailedMessage;
        lastFailedMessage = null;
        setTimeout(() => sendMessage(retryMsg, true), 300);
      }
    });
  }

  // Handle quick suggestion chips
  if (suggestionsContainer) {
    suggestionsContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".suggestion-chip");
      if (chip && chip.dataset.prompt) {
        sendMessage(chip.dataset.prompt);
        suggestionsContainer.style.display = "none";
        const title = document.querySelector(".chat-suggestions-title");
        if (title) title.style.display = "none";
      }
    });
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    sendMessage(text);
    chatInput.value = "";
  });

  function appendMessage(role, content) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${role === "user" ? "user-msg" : "bot-msg"}`;
    
    if (role === "user") {
      msgDiv.textContent = content;
    } else {
      msgDiv.innerHTML = formatMarkdown(content);
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendKeyExpiredPrompt() {
    const bannerDiv = document.createElement("div");
    bannerDiv.className = "chat-msg bot-msg chat-key-banner";
    bannerDiv.innerHTML = `
      <p>⚠️ <strong>AI Key Expired / Demo Quota Reached</strong><br>The demo API key is currently expired or has reached its rate limit. You can add your personal Google Gemini API key to continue chatting.</p>
      <button type="button" class="chat-key-action-btn" id="inChatKeyBtn">
        <span>🔑</span> Enter Your Gemini API Key
      </button>
    `;
    chatMessages.appendChild(bannerDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const btn = bannerDiv.querySelector("#inChatKeyBtn");
    if (btn) {
      btn.addEventListener("click", openApiKeyModal);
    }
  }

  function appendTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "chat-msg bot-msg typing-indicator";
    indicator.id = "typingIndicator";
    indicator.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicator;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    if (indicator) indicator.remove();
  }

  function formatMarkdown(text) {
    if (!text) return "";
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold text **bold**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    
    // Italics *italic*
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert bullet lists
    const lines = html.split("\n");
    let inList = false;
    let result = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) {
          result.push("<ul>");
          inList = true;
        }
        result.push(`<li>${trimmed.substring(2)}</li>`);
      } else {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        if (trimmed.length > 0) {
          result.push(`<p>${line}</p>`);
        }
      }
    });

    if (inList) result.push("</ul>");
    return result.join("");
  }

  async function sendMessage(userText, isRetry = false) {
    if (!isRetry) {
      appendMessage("user", userText);
      history.push({ role: "user", content: userText });
    }

    appendTypingIndicator();

    const customKey = getCustomApiKey();
    const payload = {
      messages: history,
      customApiKey: customKey || ""
    };
    const headers = {
      "Content-Type": "application/json",
      "x-custom-api-key": customKey || ""
    };

    try {
      let response = await fetch("/api/chat", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });

      // Fallback for static servers targeting local port 3000
      if (!response.ok && response.status === 404) {
        try {
          const nodeRes = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
          });
          if (nodeRes.ok || nodeRes.status === 401 || nodeRes.status === 429) {
            response = nodeRes;
          }
        } catch (e) {}
      }

      removeTypingIndicator();

      const data = await response.json().catch(() => ({}));

      // Unified check for "ai key expired"
      const isKeyExpired =
        response.status === 401 ||
        response.status === 429 ||
        data.error === ERROR_KEY_EXPIRED ||
        (typeof data.error === "string" && data.error.toLowerCase().includes(ERROR_KEY_EXPIRED)) ||
        (typeof data.message === "string" && data.message.toLowerCase().includes(ERROR_KEY_EXPIRED));

      if (isKeyExpired) {
        lastFailedMessage = userText;
        appendKeyExpiredPrompt();
        openApiKeyModal();
        return;
      }

      if (response.ok && data.reply) {
        appendMessage("assistant", data.reply);
        history.push({ role: "assistant", content: data.reply });
      } else {
        const errorMsg = data.error || data.details || "Failed to generate Gemini AI response.";
        appendMessage("assistant", `⚠️ ${errorMsg}`);
      }
    } catch (err) {
      // Network catch: attempt connecting to localhost:3000 Node server
      try {
        const nodeRes = await fetch("http://localhost:3000/api/chat", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload)
        });
        removeTypingIndicator();
        const data = await nodeRes.json().catch(() => ({}));

        const isKeyExpired =
          nodeRes.status === 401 ||
          nodeRes.status === 429 ||
          data.error === ERROR_KEY_EXPIRED ||
          (typeof data.error === "string" && data.error.toLowerCase().includes(ERROR_KEY_EXPIRED));

        if (isKeyExpired) {
          lastFailedMessage = userText;
          appendKeyExpiredPrompt();
          openApiKeyModal();
          return;
        }

        if (nodeRes.ok && data.reply) {
          appendMessage("assistant", data.reply);
          history.push({ role: "assistant", content: data.reply });
          return;
        }
      } catch (e) {}

      removeTypingIndicator();
      appendMessage(
        "assistant",
        "⚠️ Could not reach `/api/chat`. Please ensure the server is running (`node server.js` or Vercel)!"
      );
    }
  }
})();

