# FALO 教材開發革命：案例實作與排版規範指南
> [!NOTE]
> 本文件旨在記錄 **Falo x Force Cheng** 在 `SkyLine class2` 教材開發中所確立的設計習慣與技術規範，以利後續其他實作案例（如 `kx7` 等）能夠遵循一致的標準與高品質呈現。

---

## 📌 核心規則與習慣

### 1. 教學導讀優先（index.html 作為案例入口點）
*   **規則**：每一個案例資料夾下的 `index.html` 必須是**「開發歷程與概念導讀教學」**，而不是直接進入練習或實作網頁。
*   **目的**：引導學習者先理解專案的核心價值（例如：*「不是做一個網站，而是建立一個可持續生產的系統」*）與 AI ETL 的工作流，再點選進入工具。
*   **做法**：把實作產出（例如模擬測驗、功能面板）獨立為同目錄下的其他網頁檔案（如 `practice.html`、`compare.html`），並在教學導讀頁中引導點選。

### 2. 正常流程優先，錯誤處理置後（Normal Flow first, Error Handling second）
*   **規則**：章節大綱的編排必須遵循人類開發與學習的直覺：
    1.  **過去做法的瓶頸** (OCR 與傳統 AI)。
    2.  **正常開發主流程** (PDF 直轉 CSV ➔ 網頁自動生成) 與其對應的實戰 Prompt 模擬。
    3.  **錯誤處理與品質修正** (測試發現瑕疵 ➔ NotebookLM 智慧檢核 ➔ Agent 閉環自動修正) 與其對應的品質檢核與修正 Prompt 模擬。
    4.  **未來展望**。
    5.  **技術細節附錄**。
*   **目的**：讓讀者循序漸進，先學會「如何完成一個 MVP」，再學習「如何優化品質與錯誤處理」。

### 3. 無編號、純語意命名（Semantic Naming without Numbers）
*   **規則**：案例的子目錄名稱**一律不要帶有編號**（例如使用 `ipas-etl`，而不是 `case01-ipas-etl`）。
*   **目的**：由於整套教材的大綱順序在開發期可能隨時調整，不帶編號能保留順序重排的最大彈性，避免因順序更動而需要修改大量的超連結與實體路徑。

### 4. 單機離線執行與 CORS 限制繞過（Offline-First & CORS Bypass）
*   **規則**：網頁必須能在本機端點擊兩下直接打開（`file://` 協定），且在離線狀態下正常運作，不應產生跨網域 (CORS) 錯誤。
*   **做法**：不要使用 AJAX/Fetch 讀取 `questions.json`。而是將題庫資料轉存為 `questions.js`，在內部宣告為全域變數 `const QUESTIONS = [...]`，並在 HTML 中以 `<script src="questions.js"></script>` 靜態載入。

### 5. 雙層實戰 Prompt 模擬對照（v1 基礎版 vs v2 高級版）
*   **規則**：每個開發與檢核階段，必須同時提供以下兩組對照 Prompt：
    *   💬 **基礎版 Prompt (一般 User 口語 - v1)**：以業務意圖為主，非技術口吻，模擬一般大眾的使用習慣。
    *   ⚡ **高級版 Prompt (專業開發者控制 - v2)**：指明特定程式庫、Regex 規則、轉檔邏輯與防錯機制的精準指令。
    *   🧠 **Agent 自主剖析 details**：以折疊面板形式，揭露 Agent 在接收基礎版指令時，背後默默執行的隱性檔案辨識、Regex 防錯與代碼編譯流程。

### 6. 圖片縮圖展示與新視窗放大（Zoomable Images）
*   **規則**：網頁中的架構圖與檢核報告截圖，一律使用 CSS 限制最大高度展示為縮圖，且包裹在 `target="_blank"` 的連結中。
*   **目的**：提供「點擊在新分頁開啟完整大圖」的極佳體驗，方便學員放大閱讀並另存下載。

### 7. 五位一體版權宣告與 GEO/SEO 優化（Author & SEO/GEO Metadata）
每個案例的 HTML 檔案都必須置入以下宣告，標示創作者與日期（如：`Falo x Force Cheng 2026/6/6`）：
1.  **頂部註釋**：HTML 檔案第一行置入專案、作者與授權聲明。
2.  **隱藏註釋**：在 head 內最上方放置 `<!-- WATERMARK: Falo x Force Cheng 2026/6/6 -->`。
3.  **SEO Meta**：加入 `author` 與 `copyright` meta 標籤。
4.  **GEO 結構化 JSON-LD**：在 head 中嵌入符合 schema.org 規格的結構化標記（例如：宣告 `TechArticle`、`Quiz` 或 `WebPage`），供 AI 爬蟲精確識別作者身分與內容型別。
5.  **視覺浮水印 Footer**：在側邊欄底部或頁面底部，渲染視覺可見的版權 footer。

---

## 🛠️ 下一個案例（例如 `kx7`）建立檢核表 (Checklist)

當您建立下一個案例目錄 `/class/a01/SkyLine class2/cases/kx7/` 時，請確認以下檔案結構與命名：

- [ ] `/class/a01/SkyLine class2/cases/kx7/index.html` (這是**教學導讀頁面**)
- [ ] `/class/a01/SkyLine class2/cases/kx7/practice.html` (這是**實作練習頁面**，由教學頁以 `target="_blank"` 開啟)
- [ ] `/class/a01/SkyLine class2/cases/kx7/compare.html` (這是**品質對照頁面**，由教學頁以 `target="_blank"` 開啟)
- [ ] `/class/a01/SkyLine class2/cases/kx7/data.js` (離線資料檔，非 json，避開 CORS)
- [ ] 所有 HTML 頂部皆有註釋、head 內有 JSON-LD 與 Meta 版權標記
