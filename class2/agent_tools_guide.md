# 🤖 Agent 工具實戰指南 (Agent Tools Guide)

本指南專為企業主管與開發同仁設計，詳細說明如何操作與調用 Pro 等級 AI Agent (特別是運作在「地端工作站」且動態測試能耐極佳的 **Codex 技術特工**)，配合 Google NotebookLM 脈絡大腦，以一條龍方式完成「台南玩具展總包標案 (450萬元)」的對帳、利潤核算、甘特圖進度監控與草稿組裝。

---

## 💡 0. 系統分工與配合模式 (System Division of Labor)

本指南與 **[🤖 智慧投標控制塔 (POC)](bidding_control_tower.html)** 是完全對齊的：
* **本指南 (靜態手冊)**：提供底層 CLI 腳本與 Prompt 的黃金範本，是 NotebookLM 知識庫的參考源，適合工程師或主管在終端機 (CLI) 離線操作時參考。
* **控制塔 (動態面板)**：將本指南 of 5 大步驟與進度監控整合為可點擊切換、手動/API 雙模式的一條龍展示平台，供 G總和 C董 快速理解與決策收割。

---

## 📂 1. 用 Agent 整理檔案 (File Prep & Intake)

在開始任何分析前，必須將地端隨意放置的歷史得標檔案、Excel、PDF 進行清洗與結構化，存入 staging/ 目錄以隔離 SSOT。

* **輸入檔案**：`台南玩具展_RFP.pdf`、`大同搭建商_實績證明.docx`、`名音燈光商_SLA承諾.txt`。
* **分環節**：1.1 採購網公告爬取 ➔ 1.2 地端檔案目錄掃描 ➔ 1.3 個資去識別化隔離。
* **CLI 指令**：`python3 scripts/prep_intake.py --source ./raw_tenders --output ./staging --clean-pii --verbose`

### 📋 JSON 輸出結構 (`staging/file_manifest.json`)
```json
{
  "timestamp": "2026-06-16T16:40:00Z",
  "total_files_processed": 3,
  "manifest": [
    {
      "original_name": "台南玩具展_RFP.pdf",
      "staged_path": "staging/20260616_RFP_Tainan_ToyExpo.txt",
      "pii_scrubbed": true,
      "metadata": { "pages": 42, "category": "RFP", "file_size_bytes": 1048576 }
    }
  ]
}
```

### 💬 執行 Prompt：檔案整理與結構化 (XML 格式)
```xml
<instruction>
  你現在是 Dev (Codex) 技術特工。請掃描地端目錄下的原始招標文件，進行清洗與去敏感化。
</instruction>
<inputs>
  <path>./raw_tenders</path>
  <target_dir>./staging</target_dir>
</inputs>
<rules>
  1. 檔案重新命名格式：[YYYYMMDD]_[大類]_[原檔名]
  2. 使用 PII_Scrubber 自動屏蔽身份證字號、姓名與行動電話，並儲存至隔離 Staging 目錄。
  3. 輸出包含檔案大小、頁數及處理狀態的 JSON 清單。
</rules>
```

---

## 🔍 2. 比對既有招標書 (RFP Comparison & Gap Audit)

比對全新玩具展 RFP 與 SQLite 歷史得標庫，找出硬性廢標條款與合規缺失。

* **輸入檔案**：`staging/20260616_RFP_Tainan_ToyExpo.txt`、SQLite 歷史得標庫 `ssot_historical_tenders.db`。
* **分環節**：2.1 廢標條款自動提取 ➔ 2.2 PM 證照過期稽核 ➔ 2.3 SLA 技術對帳比對。
* **CLI 指令**：`python3 scripts/gap_audit.py --rfp ./staging/20260616_RFP_Tainan_ToyExpo.txt --db ./backup/ssot_historical_tenders.db --rules-schema ./config/disq_rules.json`

### 📋 JSON 輸出結構 (`gap_report.json`)
```json
{
  "audit_status": "fail",
  "gaps_found": [
    {
      "clause": "PM Certification Requirements",
      "rfp_requirement": "專案經理必須持有效 PMP 證照",
      "our_status": "志明 (PMP 已過期 2026-02-15)",
      "risk_level": "RED_DISQUALIFY"
    },
    {
      "clause": "SLA Response Time",
      "rfp_requirement": "2小時現場響應",
      "our_status": "名音燈光商原始承諾 4h",
      "risk_level": "YELLOW_WARNING"
    }
  ]
}
```

### 💬 執行 Prompt：RFP 與歷史對帳差距稽核 (XML 格式)
```xml
<instruction>
  你現在是負責合規性審查的合規特工。請比對新招標書 txt 與 SQLite 歷史得標庫，找出硬性廢標與不合規缺口。
</instruction>
<inputs>
  <rfp_text>staging/20260616_RFP_Tainan_ToyExpo.txt</rfp_text>
  <historical_db>ssot_historical_tenders.db</historical_db>
</inputs>
<rules>
  1. 提取所有包含「應、須、持、保證、罰則、SLA」的段落。
  2. 自動比對 SQLite 資料庫中的員工資歷證照、協力廠商服務規格。
  3. 輸出含 RED_DISQUALIFY, YELLOW_WARNING, GREEN_PASS 等風險燈號的 JSON 對帳單。
</rules>
```

---

## 📊 3. SLA 成本溢價與決策試算 (SLA Surcharge & Costing)

評估名音燈光商改為 2h SLA 增加的人工與保證金支出，對總利潤紅線 (15%) 的衝擊。

* **輸入檔案**：SQLite 費率庫 `ssot_material_rates.db`、`20260616_SLA_Mingyin_Light.txt`。
* **分環節**：3.1 物料上漲費率調校 ➔ 3.2 2h SLA 加急成本計算 ➔ 3.3 毛利率與決策核算。
* **CLI 指令**：`python3 scripts/sla_cost_sim.py --tender-value 4500000 --light-base 800000 --wood-surcharge 0.05 --target-margin-pct 15.0`

### 📋 JSON 輸出結構 (`cost_analysis.json`)
```json
{
  "budget_limit": 4500000,
  "estimated_cost": 3800000,
  "breakdown": {
    "base_light_cost": 800000,
    "sla_2h_surcharge": 150000,
    "risk_reserve": 150000,
    "other_materials": 2700000
  },
  "projected_profit": 700000,
  "profit_margin_pct": 15.55,
  "decision_recommendation": "green_approve"
}
```

### 💬 執行 Prompt：SLA 成本溢價決策分析 (XML 格式)
```xml
<instruction>
  你現在是財務成本核算分析 Agent。因應 2h SLA 響應要求，請計算協力廠商溢價對標案整體利潤紅線的影響。
</instruction>
<variables>
  <tender_value>4500000</tender_value>
  <target_margin_pct>15.0</target_margin_pct>
  <sla_escalation_surcharge>150000</sla_escalation_surcharge>
  <risk_reserve>150000</risk_reserve>
</variables>
<rules>
  1. 從 SQLite 查詢物料上漲 5% 費率，並累加 2h SLA 維運加急排班溢價與合約違約準備金。
  2. 計算最終毛利率，並判斷是否低於 target_margin_pct 獲利紅線。
</rules>
```

---

## 📘 4. Delta 草稿自動組裝 (NotebookLM & Draft Compiling)

結合 Google NotebookLM 去識別化得標實績與有效證照，編譯技術建議書草稿。

* **輸入檔案**：Google NotebookLM 脈絡庫、草稿模板 `templates/tech_bid.md`。
* **分環節**：4.1 NotebookLM 真理檢索 ➔ 4.2 PM 備降人員替換（Sophia 取代志明） ➔ 4.3 標註人類審查點。
* **CLI 指令**：`python3 scripts/draft_assemble.py --template ./templates/tech_bid.md --output ./staging/draft_assembled.md --replace-pm "Sophia"`

### 📋 JSON 輸出結構 (`draft_status.json`)
```json
{
  "draft_path": "staging/draft_assembled.md",
  "pm_assigned": "Sophia (林淑芬)",
  "pm_cert_id": "#PMP-246801",
  "human_review_points": [
    {
      "line": 142,
      "context": "[人類審查點: 確證 SLA 溢價補償金 NT$ 300,000 已於財務核算核准。]"
    }
  ]
}
```

### 💬 執行 Prompt：投標書草稿組裝與合規起草 (XML 格式)
```xml
<instruction>
  你現在是 Content (主力產線) 寫作專家。請結合 NotebookLM 知識庫資料，起草技術建議書草稿並標記人工審核點。
</instruction>
<rag_context>
  <source>NotebookLM: Sophia 有效 PMP 證照檔案</source>
  <source>NotebookLM: 繁星智慧檔案實績</source>
</rag_context>
<rules>
  1. 針對「技術服務與 SLA 承諾」章節進行起草，自動用有效的 Sophia 替換過期 PM 志明。
  2. 置入「繁星智慧檔案專案」實績。
  3. 凡涉及手動批准或財務異動（如 30 萬 SLA 溢價），必須插入 `[人類審查點]` 標籤。
</rules>
```

---

## 🖥️ 5. 實機跑測與收割發佈 (Sandbox Run & Harvest)

主管進行最後決策審批，啟動 Pro Agent 自動跑測上傳並同步 SSOT 地端黃金庫。

* **輸入檔案**：`staging/draft_assembled.md`、SQLite 本地真理庫。
* **分環節**：5.1 Computer Use 網頁上傳模擬 ➔ 5.2 SQLite SSOT 資料庫寫入 ➔ 5.3 知識大腦同步發布。
* **CLI 指令**：`python3 scripts/system_harvest.py --draft ./staging/draft_assembled.md --commit-to-db --sync-notebooklm --operator "Force(ff)"`

### 📋 JSON 輸出結構 (`harvest_log.json`)
```json
{
  "harvest_status": "success",
  "sqlite_write": true,
  "notebooklm_sync": true,
  "audit_log_id": "AUDIT_20260616_164210_FF"
}
```

### 💬 執行 Prompt：一鍵收割與地端真理庫同步 (XML 格式)
```xml
<instruction>
  你現在是決策收割 Agent。請模擬 Computer Use 跑測上傳，並正式寫入地端 SQLite 黃金資料庫與發佈知識。
</instruction>
<actions>
  1. 調用 Computer Use 特工模擬打開瀏覽器，登入招標網測試區並自動點選上傳 draft_assembled.md.
  2. 將專案得標金額、PM Sophia 及主管批准紀錄寫入 SQLite 真理庫 (SSOT)。
  3. 去除敏感資料後，發布至 NotebookLM Sources 完成知識閉環。
</actions>
```

---

## 📅 6. 進度控制與 AI PM 管理 (Progress Control & AI PM Orchestration)

定期分析員 (Scheduled Analyst) 負責在背景運作，主動監控 7 天甘特圖關鍵路徑、排班進度與協力廠通訊狀態，防範專案延誤。

* **輸入檔案**：SQLite 排程配置表、Staging 寫作日誌。
* **CLI 指令**：`python3 scripts/ai_pm_scheduler.py --config ./config/scheduler_config.json --run-monitor --alert-webhook "https://discord.gg/webhook"`

### 📋 JSON 輸出結構 (`scheduler_alerts.json`)
```json
{
  "alert_timestamp": "2026-06-16T16:40:00Z",
  "critical_path_node": "D-4 Draft",
  "anomalies_detected": [
    {
      "type": "DELAY_WARNING",
      "description": "第四章技術草稿落後預期 12 小時",
      "suggested_action": "調撥 Codex 特工資源"
    }
  ]
}
```

### 💬 執行 Prompt：AI PM 排程監控與主動協調 (XML 格式)
```xml
<instruction>
  你現在是 AI PM 大腦。請幫我設定 Scheduled Analyst 運作邏輯以監控 7天關鍵路徑及廠商缺件。
</instruction>
<monitoring>
  1. 自動監控 Staging 寫作日誌，若落後時數 > 12h，產出警告。
  2. 稽核證書有效期，若發現 PM 失效自動執行備用降級 Sophia。
  3. 掃描 Staging 目錄，若大同搭建商缺件，自動起草催辦郵件草稿。
</monitoring>
```
