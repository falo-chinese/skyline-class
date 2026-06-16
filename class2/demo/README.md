# Skyline Class02 前端展示頁面規劃 (Demo Stage)

本目錄為未來 **Skyline Class02 前端實體展示網頁** 的預留空間。我們將在此建立一個動態、高質感的 Web 介面，將本課程所描述的「投標文件 AI 工作流」與「Multi-AI 協作」進行實體視覺化，讓企業主管能以最直覺的方式體驗 AI 治理的成果。

---

## 🎯 展示網頁核心目標

1. **視覺化 AI 生產線**：將抽象的資訊流（ff -> smf -> aaa -> ccc -> Skyline PM）轉化為動態的卡片、進度條與對話動態。
2. **模擬真實案例**：讓學員在畫面上點擊「上傳招標書」，即時觀看 NotebookLM 提取出的「需求矩陣」，以及後續 AI 協作撰寫投標書草稿的過程。
3. **展示 Artifact 治理**：提供一個「Artifact 倉庫」介面，展示版本更迭、元數據標記與品質審查紀錄。

---

## 🖥️ 預期頁面與功能規劃

### 1. 專案主控台 (Project Dashboard)
* **內容**：專案基本資訊、目前階段（例如：進行中：ccc 品質審核）、任務完成百分比。
* **視覺**：現代化的環形進度條、角色頭像狀態指示燈。

### 2. 需求提取室 (NotebookLM Matrix Simulator)
* **內容**：左側展示原始 RFP 文件內容，右側展示 AI 自動提取出的「合規要件對照表（需求矩陣）」。
* **互動**：滑鼠懸停在需求矩陣的某一列上，左側對應的 RFP 原文段落會自動發光高亮，體現「來源可追溯性」。

### 3. AI 協作實境 (Multi-Agent Collaboration Space)
* **內容**：模擬聊天室與工作台的混合介面：
  * **SME (ff)** 發送語音/文字指導。
  * **AI PM (smf)** 將其拆解並生成架構。
  * **AI Content (aaa)** 實時逐字生成投標書段落。
  * **AI Reviewer (ccc)** 在有爭議的文字旁留下「紅色便利貼警告」，指明潛在風險。
* **視覺**：精緻的打字機效果、動畫卡片流轉。

### 4. Artifact 資產庫 (Artifact Repo)
* **內容**：已審核通過（Approved）的投標書章節列表，具備版本號（V1.0.0, V1.0.1）與元數據展開面板。
* **互動**：可進行「版本對比（Diff View）」，清晰看出 ccc 挑戰前後的文件修改差異。

---

## 🎨 視覺與技術棧規範 (Design & Tech Stack)

為符合 Antigravity 團隊對於極致美感與使用者體驗的追求，Demo 開發將遵循以下標準：
* **核心架構**：採用 HTML5 與 Vanilla JavaScript，無須繁瑣的打包工具，保證極速載入。
* **設計美學**：
  * **配色**：深色模式 (Dark Mode) 基底，搭配柔和的高飽和度漸層色（如 HSL 配色）區分不同的 AI 角色。
  * **字型**：使用 Google Fonts 的 `Outfit` 與 `Noto Sans TC`。
  * **毛玻璃效果 (Glassmorphism)**：使用 `backdrop-filter: blur()` 設計半透明懸浮面板，凸顯層次感。
  * **微動畫 (Micro-interactions)**：使用 CSS 3D Transforms 與 Transitions 提供流暢的按鈕懸停、卡片翻轉效果。
