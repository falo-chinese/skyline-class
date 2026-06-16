# 🤖 展會投標 AIDE 控制塔 (Bidding Control Tower POC)

本頁面展示了在 **「台南玩具節展會總包標案 (450萬元)」** 的情境下，高階決策者與基層員工如何進行雙軌人機協同 (Human-AI Co-pilot) 作業的控制塔概念驗證 (POC)。

線上 Live 運作平台：**[展會投標 AIDE 控制塔 (Live POC)](bidding_control_tower.html)**

---

## 💡 1. 系統分工定位：靜態指南 vs 動態控制塔

* **📖 Agent 工具使用指南 (`agent_tools_guide.html`)**：
  - **定位**：靜態的技術說明書。
  - **職能**：記錄開發同仁在地端電腦或伺服器上執行檔案清洗、RFP 對帳及草稿合併時的「具體 Prompt 範本、Python 腳本寫法及 CLI 指令」，做為知識庫參考資料。
* **🖥️ 智慧投標控制塔 (POC) (`bidding_control_tower.html`)**：
  - **定位**：動態的視覺化操作控制塔 (Cockpit)。
  - **職能**：將指南中的 5 大靜態指令封裝為一條龍流程。用戶可直接在此點選步驟，即時檢視輸入檔案、Prompts 及對帳結果，並支援手動/自動模式的模擬執行。

---

## 📅 2. 專案進度與 AI PM 控制面板 (Progress & AI PM Orchestration)

本控制塔設計了專屬的 **AI PM 大腦監控與協調** 區塊：
* **📊 7天關鍵路徑甘特圖 (Gantt Critical Path)**：展示招標生命的 7 天進度流程（D-7 整理、D-6 對帳、D-5 決策、D-4 草稿、D-3 評審、D-2 跑測、D-1 遞件），以不同顏色（綠色：已完成，紫色：當前，灰色：待執行）顯示目前進行中的節點。
* **🔔 AI PM 主動催辦與調度日誌 (Proactive Logs)**：模擬展示背景運作之「定期分析員」的主動協調作為，包括「自動偵測大同搭建漏件並發送催辦」、「自動替換過期 PM 志明為 Sophia」、「SLA 成本上調導致毛利率波動預警」等，體現 AI 作為協調者 (Orchestrator) 的全局價值。

---

## 🛠&nbsp; 3. 雙軌人機協同工作流 (Dual-Workflow)

為了在大規模投標中，極致發揮 AI 的能耐，同時避免 Token 成本失控與核心資料庫污染（RAG Pollution），系統採用了雙軌分流設計：

### ⸻ 主管端 (Supervisor - Agent-First 模式)
* **定位**：重度能耐與完整放權。
* **特性**：主管擁有完整 API 調用與代碼執行權。可調用 Pro 級技術特工 (Codex) 進行 **Computer Use** 動態實機跑測，模擬操作政府電子採購網或內部測試控制台，完成對帳後「一鍵收割」寫回地端。

### ⸻ 員工端 (Staff - HITL-First 模式)
* **定位**：標準作業與安全合規限制。
* **特性**：基層同仁在系統設定好的 **「人類在環 (Human-in-the-Loop, HITL)」** 流程中作業，僅能呼叫輕量 AI 或本機 Chrome Nano 沙盒，對外部廠商（搭建商、燈光商）的實績、證照與 SLA 響應時間進行初步清洗與對帳，無權限寫入地端真理庫 (SSOT)。

---

## 📋 4. 手動與 API 加速雙模操作 (Manual vs. API)

為適應企業不同的金鑰與安全網路限制，控制塔提供了一鍵切換功能：
* **✍️ 人工手動 (Prompt 複製)**：在無 API Key 的離線環境下，主管與同仁可以點擊卡片一鍵複製「編譯後帶變數的 Prompt」，貼到外部 ChatGPT/Claude 直接執行，作為 Fallback 方案。
* **⚡ API 自動加速 (API-Accelerated)**：當配置了 API Key，點擊按鈕即可直接調用 Gemini 2.5 Flash / Chrome built-in Nano / 定向 Search API，在幾秒內全自動完成整合跑測與一鍵收割。

---

## 🔄 5. 一條龍步驟詳細內容 (End-to-End Steps)

本控制塔細化了五大核心節點與其底層 15 個子環節的運作細節：

1. **第一步：標前文件整理 (Intake & Prep)**：
   - **地端輸入**：`台南玩具展_RFP.pdf`、`大同搭建商_實績證明.docx`、`名音燈光商_SLA承諾.txt`。
   - **子環節**：1.1 採購網公告爬取 ➔ 1.2 地端檔案目錄掃描 ➔ 1.3 個資去識別化隔離。
2. **第二步：合規差距比對 (Compliance & Gap Audit)**：
   - **地端輸入**：`staging/20260616_RFP_Tainan_ToyExpo.txt` 及 SQLite 歷史黃金庫。
   - **子環節**：2.1 廢標條款自動提取 ➔ 2.2 PM 證照過期稽核 ➔ 2.3 SLA 技術對帳比對。
3. **第三步：SLA 成本試算與決策 (SLA Surcharge & Costing)**：
   - **地端輸入**：SQLite 費率庫、名音燈光維運承諾。
   - **子環節**：3.1 物料上漲費率調校 ➔ 3.2 2h SLA 加急成本計算 ➔ 3.3 毛利率與決策核算。由主管批准 2h SLA 溢價變更 (+NT$ 300,000)。
4. **第四步：Delta 草稿自動組裝 (NotebookLM & Draft Compiling)**：
   - **地端輸入**：NotebookLM 組織知識庫。
   - **子環節**：4.1 NotebookLM 真理檢索 ➔ 4.2 PM 備降人員替換（Sophia 取代志明） ➔ 4.3 標註人類審查點。
5. **第五步：實機跑測與一鍵收割 (Sandbox Run & Harvest)**：
   - **地端輸入**：Staging 草稿、SQLite 地端真理庫。
   - **子環節**：5.1 Computer Use 網頁上傳模擬 ➔ 5.2 SQLite SSOT 資料庫寫入 ➔ 5.3 知識大腦同步發布。
