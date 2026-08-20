# Akarshan Portfolio — lightweight static site

## Files

- `index.html` — website
- `styles.css` — styling
- `script.js` — scroll-scrub video + project YouTube players
- `final.mp4` — **place your finished 360° portfolio video here**
- `assets/hero-poster.png` — fallback/poster image
- `assets/Akarshan_Rasyal_CV.pdf` — CV
- `portfolio_knowledge_base.md` — chatbot/RAG knowledge source

## Deploy to Vercel

No build step and no npm packages are required.

Upload this folder/project to GitHub and import the repository into Vercel. Vercel should detect it as a static site.

## Important

The website expects the video to be named exactly:

`final.mp4`

and placed beside `index.html`.

The hero video is intentionally paused. Scrolling through the hero section controls `video.currentTime`, so the visitor scrubs through the video instead of the video automatically playing.

Project thumbnails use YouTube's thumbnail endpoint and clicking "Play video" loads the YouTube player inside the card.

The two AWS/IP live links supplied are HTTP links. Because the portfolio itself will normally be HTTPS, browsers may block some HTTP embedded content. These links are therefore opened as external links rather than embedded iframes.
