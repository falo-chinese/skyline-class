# 🤖 Agent 工具實戰指南 (Agent Tools Guide)

本指南專為企業主管與開發同仁設計，詳細說明如何操作與調用 Pro 等級 AI Agent (特別是運作在「地端工作站」且動態測試能耐極佳的 **Codex 技術特工**)，配合 Google NotebookLM 脈絡大腦，以一條龍方式完成「台南玩具展總包標案 (450萬元)」的對帳、利潤核算與起草組裝。

---

## 💡 0. 系統分工與配合模式 (System Division of Labor)

本指南與 **[🤖 智慧投標控制塔 (POC)](bidding_control_tower.html)** 是完全對齊的：
* **本指南 (靜態手冊)**：提供底層 CLI 腳本與 Prompt 的黃金範本，是 NotebookLM 知識庫的參考源，適合工程師或主管在終端機 (CLI) 離線操作時參考。
* **控制塔 (動態面板)**：將本指南的 5 大步驟整合為可點擊切換、手動/API 雙模式的一條龍展示平台，供 G總和 C董 快速理解與決策收割。

---

## 📂 1. 用 Agent 整理檔案 (File Prep & Intake)

在開始任何分析前，必須將地端隨意放置的歷史得標檔案、Excel、PDF 進行清洗與結構化，存入 staging/ 目錄以隔離 SSOT。

* **輸入檔案**：`台南玩具展_RFP.pdf`、`大同搭建商_實績證明.docx`、`名音燈光商_SLA承諾.txt`。
* **CLI 指令**：`python3 scripts/prep_intake.py --source ./raw_tenders --output ./staging`
* **Agent 作用**：自動進行格式轉換 (PDF/Word 轉 UTF-8 文字)，並自動偵測去識別化個資 (遮蔽身分證字號)，生成 `file_manifest.json`。

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

* **輸入檔案**：`staging/20260616_RFP_Tainan_ToyExpo.txt`、SQLite 歷史數據庫。
* **CLI 指令**：`python3 scripts/gap_audit.py --rfp ./staging/20260616_RFP_Tainan_ToyExpo.txt --db ./backup/ssot_historical_tenders.db`
* **Agent 作用**：發現專案經理志明證照過期 (廢標紅線) 以及協力名音燈光商 4h SLA 與 RFP 要求的 2h SLA 現場響應不匹配。

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

* **輸入檔案**：SQLite 費率庫、燈光商加急承諾。
* **CLI 指令**：`python3 scripts/sla_cost_sim.py --tender-value 4500000 --light-base 800000 --wood-surcharge 0.05`
* **Agent 作用**：試算出 2h SLA 淨增 30萬 (總維護費 110萬)。在 450萬標案下，扣除 2.7M 建置與 1.1M 維護，專案預估利潤為 70萬 (毛利率 15.5%)。建議主管批准。

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

* **輸入檔案**：Google NotebookLM、得標範本。
* **CLI 指令**：`python3 scripts/draft_assemble.py --template ./templates/tech_bid.md --output ./staging/draft_assembled.md`
* **Agent 作用**：讀取 NotebookLM 中 Sophia 2028 有效 PMP 證照取代過期志明，寫入 2h SLA 技術承諾，並標記 `[人類審查點]` 以供主管一鍵收割。

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
* **CLI 指令**：`python3 scripts/system_harvest.py --draft ./staging/draft_assembled.md --commit-to-db --sync-notebooklm`
* **Agent 作用**：主管點擊批准後，技術特工在本地沙盒 (利用 Computer Use 模擬瀏覽器) 跑測上傳投標文件，並將最終結果儲存於 SQLite 數據庫與寫回 NotebookLM。

### 💬 執行 Prompt：一鍵收割與地端真理庫同步
```text
你現在是決策審批 Agent。主管已批准「台南玩具總包標案」投標書。
1. 請將 Staging 區的繁星展覽實績、Sophia 的 PM 資歷公文，一鍵寫入 SQLite 地端真理庫。
2. 同步更新至 Google NotebookLM，完成最終的知識收割與發佈。
```
