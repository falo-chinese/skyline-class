# 🖥️ Windows 地端 AI PM 平台人機協同設計架構 (LAN & AI Scheduled Analyst Architecture)

本文件記錄了團隊針對 **地端 Windows AI 節點** 配合 **人機協同 (Human-AI Co-pilot)** 以及 **AI 定期分析員 (Scheduled Analyst)** 的架構設計共識。

---

## 📌 1. 地端 Windows AI 節點部署 (Local Windows Node)

為適應企業內部網路環境，系統採用輕量化、零外部依賴的本地部署架構：

* **核心引擎 (Backend)**：採用 Python (FastAPI) 運行於 Windows 本地環境，提供高併發、非同步的 API 服務。
* **共享資料庫 (Local Database)**：採用 **SQLite** 檔案型資料庫。所有員工提問、標案進度與分析日誌皆儲存於本地 `.db` 檔，極易進行日常備份與移轉。
* **分公司穿透安全 (Ngrok Tunneling)**：
  - **總公司同仁**：直接透過內部 LAN IP 進行訪問。
  - **分公司同仁**：透過開啟具備 **Basic Auth 認證** 的 `ngrok` 安全隧道連入，確保外網資料存取安全。

---

## 🔄 2. 人＋AI 雙軌協作分流 (Human-AI Role Isolation)

系統針對不同角色提供專屬的操作維度，防止核心知識庫污染（RAG Pollution）：

* **員工端 (General Staff - 平台化 UI)**：
  - 透過簡易的網頁介面使用標準模板（如：RFP 快速清洗、制式報表生成）。
  - 對於知識庫僅有「受限讀取權限」，且無法直接寫入地端真理中心 (SSOT)。
  - 每一次操作均寫入本地 SQLite 稽核日誌。
* **主管端 (Supervisor / Trusted - 決策者主控台)**：
  - 擁有 Pro-Grade Agent 的完整控制權（直接規劃、代碼執行、沙盒操作）。
  - 可對 Staging 協作暫存區進行深度修改。
  - 確認無誤後，透過 **「一鍵收割 (Sync & Commit)」** 機制將黃金知識同步至地端真理中心 (SSOT)，供全體員工與平台調用。

---

## 📋 3. AI 定期分析員與 Checklist 排程機制 (AI Scheduled Analyst)

AI 不僅是待命的問答機器人，更是主動介入專案的「虛擬同仁」：

* **任務 Checklist 設計 (Modular Checklist)**：
  AI 的分析工作被拆解為獨立的 Check 項目，主管可於網頁介面自由開關特定任務，無須變更底層代碼：
  - **🛡️ 敏感資料去識別化監控 (Data Privacy Check)**
  - **📊 Token 成本與效能稽核 (FinOps & Token Check)**
  - **🔄 SSOT 污染防範比對 (RAG Conflict Check)**
  - **📜 人員證照與 SLA 合規掃描 (Compliance Check)**
  - **📝 每日專案進度匯總報告 (Daily Report Check)**
* **自由設定排程 (Flexible Scheduler)**：
  - 後端整合 `APScheduler` 排程引擎，主管可為每個啟用中的 Checklist 項目單獨設定執行排程（例如：每小時掃描一次資安、每日 18:30 自動彙整進度）。
  - 支持 **「手動即時觸發」**，主管可隨時點擊按鈕強行插隊執行特定稽核。

---

## 📊 4. Token 帳本與 FinOps 成本控制 (Token & FinOps Ledger)

系統精細記錄每一次 AI 調用，做為 AI 分析員進行效能審計的基礎：

* **記錄指標**：每次調用之使用者 ID、調用 AgentID、使用的 Model、Input/Output Token 數、快取節省 Token (Cache Savings) 以及實質 API 成本。
* **AI 效能審計**：AI 分析員定期掃描此帳本，若發現低效 Prompt 或異常消耗（如死循環），主動發送警報並給出優化建議（如：「此任務建議移至地端 Nano 執行以省下 85% 成本」）。
