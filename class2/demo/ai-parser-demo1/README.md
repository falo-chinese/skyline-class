# Skyline AI Parser Demo 1

Version: v1.0 草稿版  
Credit: Skyline x Force Cheng 2026/6/16  
Purpose: GitHub Pages introduction page and resource package for an AI-assisted public-query Chrome Extension demo.

## What This Demo Shows

This demo explains how conversational instructions and AI can be used to query government website data through a Vibe Coding-built Chrome Extension. It turns vague human requests, such as "台積電今年五月資料", into a structured and confirmable query plan.

The point is not to replace the official MOPS website. The point is to teach a human-in-the-loop workflow:

1. A user describes the task in natural language.
2. AI resolves company names, dates, years, and query conditions.
3. The user reviews the interpreted plan.
4. The Chrome Extension operates the public query interface or exports results.

## ETL Teaching Frame

- Extract: collect human intent, company reference data, MOPS query pages, screenshots, recordings, and public-query results.
- Transform: convert natural language into a JSON-like plan, resolve company names to codes, normalize ROC/AD years and months, and let humans confirm or override AI assumptions.
- Load: export results as CSV, JSON, Excel/spreadsheet-friendly data, static HTML reports, and interactive HTML query pages.

## AI Model Selection

This demo also teaches that the most expensive model is not always the right default.

- Local rules or small/local models are enough for company dictionaries, ROC year conversion, month parsing, fixed schemas, and validation.
- Cloud models are useful when natural language is ambiguous or when the system needs external confirmation.
- Premium models should be reserved for higher-value work such as workflow design, teaching material design, exception analysis, or complex reasoning.

The practical pattern is: use the cheapest reliable layer first, then escalate only when ambiguity or risk requires it.

## Automation Modes

The page explains several computer automation modes:

- Data-flow / API mode: efficient and stable for repeatable public-query results.
- Chrome Extension page-operation mode: binds to the browser page and assists with fields, results, and exports.
- Computer Use mode: simulates human viewing, clicking, typing, and scrolling for demos or pages without stable data interfaces.
- HITL hybrid mode: AI proposes actions, while humans confirm or correct the plan before execution.

## Visual Themes

The page includes three color themes for teaching UI variation:

- Comfortable purple light theme.
- Sakura pink light theme.
- Night dark theme.

## Files

- `index.html`: RWD GitHub Pages introduction page.
- `.nojekyll`: GitHub Pages compatibility marker.
- `downloads/skyline_ai_parser_demo1_v1_draft_resource_pack.zip`: Chrome Extension resource pack.
- `assets/mops-empty-query.png`: MOPS public query page screenshot.
- `assets/sidepanel-live-query.png`: Extension side panel with live MOPS result screenshot.
- `assets/ai-parser-demo-recording-160030.mp4`: browser-friendly H.264 MP4 recording for the automated operation workflow.
- `assets/ai-parser-demo-recording-162652.mp4`: browser-friendly H.264 MP4 recording for multi-company and incomplete company-name resolution.

## Media Behavior

Each screenshot and video can be opened in a larger in-page viewer and downloaded directly from the page. The original QuickTime `.mov` recordings were converted to `.mp4` for better browser compatibility on GitHub Pages.

## Metadata

The page includes SEO, GEO, Open Graph, AI-readable meta tags, JSON-LD, visible attribution, HTML comments, and a hidden watermark:

Skyline x Force Cheng 2026/6/16 | Skyline AI Parser Demo 1 | v1.0 草稿版
