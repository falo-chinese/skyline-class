# 🤖 Agent 工具實戰指南 (Agent Tools Guide)

本指南專為企業主管與開發同仁設計，詳細說明如何操作與調用 Pro 等級 AI Agent (特別是運作在「地端工作站」且動態測試能耐極佳的 **Codex 技術特工**)，配合 Google NotebookLM 脈絡大腦，以一條龍方式完成「台南玩具展總包標案 (450萬元)」的對帳、利潤核算、甘特圖進度監控與草稿組裝。

---

## 💡 0. 系統分工與配合模式 (System Division of Labor)

本指南與 **[🤖 智慧投標控制塔 (POC)](bidding_control_tower.html)** 是完全對齊的：
* **本指南 (靜態手冊)**：提供底層 CLI 腳本與 Prompt 的黃金範本，是 NotebookLM 知識庫的參考源，適合工程師或主管在終端機 (CLI) 離線操作時參考。
* **控制塔 (動態面板)**：將本指南的 5 大步驟與進度監控整合為可點擊切換、手動/API 雙模式的一條龍展示平台，供 G總和 C董 快速理解與決策收割。

---

## 📂 1. 用 Agent 整理檔案 (File Prep & Intake)

在開始任何分析前，必須將地端隨意放置的歷史得標檔案、Excel、PDF 進行清洗與結構化，存入 staging/ 目錄以隔離 SSOT。

* **輸入檔案**：`台南玩具展_RFP.pdf`、`大同搭建商_實績證明.docx`、`名音燈光商_SLA承諾.txt`。
* **分環節**：1.1 採購網公告爬取 ➔ 1.2 地端檔案目錄掃描 ➔ 1.3 個資去識別化隔離。
* **CLI 指令**：`python3 scripts/prep_intake.py --source ./raw_tenders --output ./staging`

### 💬 執行 Prompt：檔案整理與結構化工具調用
```text
你現在是 Dev (Codex) 技術特工。請幫我整理本地專案目錄下的所有原始招標相關檔案（包括 pdf, docx, xlsx, txt 等）：
1. 掃描目錄並將所有檔案依據「日期_大類_原檔名」進行重新命名。
2. 自動提取出每個檔案的 Metadata（包括文件頁數、建立日期、所屬子模組）。
3. 撰寫一個 Python 腳本，將檔案以 UTF-8 編碼轉存為純文字（txt）或 JSON 結構，存放在 staging/ 目錄中，並輸出一個 file_manifest.json 索引檔以利後續的 AI 檢索。
```

---

## 🔍 2. 比對既有招標書 (RFP Comparison & Gap Audit)

比對全新玩具展 RFP 與 SQLite 歷史得標庫，找出硬性廢標條款與合規缺失。

* **輸入檔案**：`staging/20260616_RFP_Tainan_ToyExpo.txt`、SQLite 歷史得標庫 `ssot_historical_tenders.db`。
* **分環節**：2.1 廢標條款自動提取 ➔ 2.2 PM 證照過期稽核 ➔ 2.3 SLA 技術對帳比對。
* **CLI 指令**：`python3 scripts/gap_audit.py --rfp ./staging/20260616_RFP_Tainan_ToyExpo.txt --db ./backup/ssot_historical_tenders.db`

### 💬 執行 Prompt：RFP 與歷史得標文件差距稽核
```text
你現在是負責合規性審查的技術特工。請幫我比對剛收到的新標案需求書 20260616_RFP_Tainan_ToyExpo.txt 與我們先前得標的歷史標案 SQLite 庫資料：
1. 分析新招標書中所有「硬性廢標條款」（如：SLA 響應時間、實績金額要求、團隊持證規範、技術架構標準）。
2. 與歷史得標投標書進行 Delta 比對，指出我們在技術、資歷與財務上有哪些缺失（Gaps）。
3. 輸出一個差距比對報告，以「合規燈號（紅、黃、綠）」標示每個項目的合規風險。
```

---

## 📊 3. SLA 成本溢價與決策試算 (SLA Surcharge & Costing)

評估名音燈光商改為 2h SLA 增加的人工與保證金支出，對總利潤紅線 (15%) 的衝擊。

* **輸入檔案**：SQLite 費率庫 `ssot_material_rates.db`、`20260616_SLA_Mingyin_Light.txt`。
* **分環節**：3.1 物料上漲費率調校 ➔ 3.2 2h SLA 加急成本計算 ➔ 3.3 毛利率與決策核算。
* **CLI 指令**：`python3 scripts/sla_cost_sim.py --tender-value 4500000 --light-base 800000 --wood-surcharge 0.05`

### 💬 執行 Prompt：SLA 成本溢價決策分析
```text
你現在是負責財務成本核算的分析 Agent。名音燈光商因應 RFP 要求由 4h SLA 改為 2h SLA 響應，產生溢價成本，請進行試算：
1. 查詢 SQLite 中南部燈光音響工程的加急人工費率（目前木作上漲 5%）。
2. 計算 2h SLA 下燈光商增加的排班與保證金成本。
3. 比對本案預算上限 450 萬，推算我方合理利潤空間，產出決策建議。
```

---

## 📘 4. Delta 草稿自動組裝 (NotebookLM & Draft Compiling)

結合 Google NotebookLM 去識別化得標實績與有效證照，編譯技術建議書草稿。

* **輸入檔案**：Google NotebookLM 脈絡庫、草稿模板 `templates/tech_bid.md`。
* **分環節**：4.1 NotebookLM 真理檢索 ➔ 4.2 PM 備降人員替換（Sophia 取代志明） ➔ 4.3 標註人類審查點。
* **CLI 指令**：`python3 scripts/draft_assemble.py --template ./templates/tech_bid.md --output ./staging/draft_assembled.md`

### 💬 執行 Prompt：投標書草稿組裝與合規起草
```text
你現在是 Content (主力產線) 寫作專家。請幫我結合 NotebookLM 的真理脈絡，開始起草並自動組裝招標書草稿：
1. 讀取新招標案的大綱結構，針對「技術服務與 SLA 承諾」章節進行草稿起草。
2. 主動從 NotebookLM 中檢索「林淑芬 (Sophia) 的有效持證證明」以及「繁星智慧檔案專案 (350萬實績)」的精確文字，並將其填入對應的招標表格中。
3. 自動生成「系統故障 2 小時響應 (2h SLA)」的技術承諾與內部成本調撥說明。
4. 輸出最終的投標書草稿段落，並標記「[人類審核點]」以便主管進行最後的一鍵收割。
```

---

## 🖥️ 5. 實機跑測與收割發佈 (Sandbox Run & Harvest)

主管進行最後決策審批，啟動 Pro Agent 自動跑測上傳並同步 SSOT 地端黃金庫。

* **輸入檔案**：`staging/draft_assembled.md`、SQLite 本地真理庫。
* **分環節**：5.1 Computer Use 網頁上傳模擬 ➔ 5.2 SQLite SSOT 資料庫寫入 ➔ 5.3 知識大腦同步發布。
* **CLI 指令**：`python3 scripts/system_harvest.py --draft ./staging/draft_assembled.md --commit-to-db --sync-notebooklm`

### 💬 執行 Prompt：一鍵收割與地端真理庫同步
```text
你現在是決策審批 Agent。主管已批准「台南玩具總包標案」投標書。
1. 請將 Staging 區的繁星展覽實績、Sophia 的 PM 資歷公文，一鍵寫入 SQLite 地端真理庫。
2. 同步更新至 Google NotebookLM，完成最終的知識收割與發佈。
```

---

## 📅 6. 進度控制與 AI PM 管理 (Progress Control & AI PM Orchestration)

定期分析員 (Scheduled Analyst) 負責在背景運作，主動監控 7 天甘特圖關鍵路徑、排班進度與協力廠通訊狀態，防範專案延誤。

* **輸入檔案**：SQLite 排程配置表、Staging 寫作日誌。
* **CLI 指令**：`python3 scripts/ai_pm_scheduler.py --config ./config/scheduler_config.json --run-monitor`

### 💬 執行 Prompt：AI PM 排程監控與主動協調
```text
你現在是負責排程與進度協調的 AI PM 大腦。請幫我設定背景定期分析員 (Scheduled Analyst) 運作邏輯：
1. 定時監控 Staging 區與 SQLite 資料庫，檢查是否面臨專案進度延誤風險（例如撰寫落後預期時間 12 小時以上），若有延誤，自動產出警告日誌並提示主管調撥 AI 資源。
2. 自動掃描協力廠商的檔案，若發現缺漏大同搭建商實績證明或名音燈光承諾書，自動起草催辦郵件，存入待發送區。
3. 監控人員證書到期狀態，若發現 PM 證照失效，自動檢索備降名冊將其改為 Sophia (林淑芬) 並更新 RAG 來源。
```
