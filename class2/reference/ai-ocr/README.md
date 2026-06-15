# FALO OCR Workbench Demo v1.02

FALO OCR Workbench v1.02 是一個獨立的、具備離線快取支援的 PWA 智能文字辨識與比對工具。

👉 **[線上測試 Live Demo 連結](https://falo-taiwan.github.io/ai-ocr-demo/)**

---

## 💡 聲明與版權宣告

- **開發作者**：FALO x TAAT x Force Cheng 2026/6/1. All rights reserved.
- **教學示範**：**此專案為 AI 老師 Force Cheng 教學示範用途。**
- **商業用途授權**：**本專案之程式碼與設計若有商業用途需求，請務必聯繫本人 (Force Cheng) 授權與洽談。**

---

## ⚡ 核心功能特色

1. **雙 OCR 模式 (Dual OCR)**：
   - 支援右上角一鍵開啟雙欄對照佈局，可對同一張影像執行不同的 Gemini 模型並行辨識（例如 `gemini-3.1-flash-lite` 對照 `gemini-3.5-flash`）。
   * 並列顯示耗時（ms）、真實輸入與輸出 Token 數，以及雙軌 FinOps 費率對帳估算。

2. **本機 Chrome Built-in AI (Gemini Nano) 整合**：
   - 自動檢測本機 Chrome 瀏覽器內置的 Gemini Nano 模型狀態（`ready可用` / `after-download需下載` / `no不支援`）。
   - 支援下載進度條百分比與 MB 檔案大小顯示。
   - 預設包含比對、摘要、繁簡轉換等本地分析 Prompt 模板，在沙盒環境內進行本機文字分析，不需消耗任何 API 費率。
   - 支援分析 Prompt 模板的編修、新增、刪除、儲存與還原預設。

3. **Gemini 模型 A 雲端分析**：
   - 可使用同一份分析 Prompt，讓 Gemini 模型 A 直接分析 OCR 結果 A/B。
   - 適合教學比較：`Chrome Nano 本地分析` vs. `Gemini 模型 A 雲端分析`。
   - 雲端分析會寫入對帳日誌，保留模型、耗時、Token 與估算費用。
   - v1.02 新增「匯總輸出」預設 Prompt，用於彙整 A/B 結果為最可能版本。
   - v1.02 新增「原檔」送出選項，適合需要保留原始影像內容的測試情境。

4. **離線與 PWA 支持**：
   - 完整支援 Service Worker 靜態快取與 PWA 應用安裝，可作為本機獨立視窗應用程式離線使用。

5. **手動複製 Fallback 方案**：
   - 針對不支援 `window.ai` 內建 AI API 的電腦，提供「手動複製組合字串」功能，自動將模型名稱、OCR 結果 A/B 代入 Prompt，方便一鍵貼給 ChatGPT / Claude 等外部 AI 進行分析比對。
