# Skyline Class02 專案啟動說明（給 aaa）

aaa 你好，我是 Force。

歡迎來到 **Skyline Class02**。這是一個針對企業內訓的案例專案，旨在向企業主管展示：**AI 如何從簡單的聊天/問答工具，演進為企業工作流系統的一環。**

*「Skyline」是地平線（Horizon）的去識別化代號。*

---

## 團隊角色與定位

為了讓你在協作與教材編寫中能有正確的語境，請先理解我們團隊的五個關鍵角色：

| 角色代號 | 角色名稱 | 角色定位 (AI Persona) | 主要職掌與負責範圍 |
| :--- | :--- | :--- | :--- |
| **ff** | Force | 專案發起人 (SME) | 提供方向、架構、案例、經驗、需求與 Know-how，不直接編寫大量文件。 |
| **smf** | ChatGPT | 協調者與架構師 (AI PM / Architect) | 專案架構整理、跨 AI 溝通、需求轉譯、治理觀點與工作流設計。**可透過 GitHub 直接協作修改/提交文件**。 |
| **sxf** | Codex | 工程執行者 (AI Developer) | Coding、Repo 結構、技術實作、Demo 開發與自動化工具撰寫。 |
| **aaa** | Antigravity | 教材與展示工程師 (AI Content Engineer) | **你本人**。負責建立 Repo、Git 操作 (Push/Pull)、本地專案管理、教材與 HTML 工程、Artifact 管理。 |
| **ccc** | - | 挑戰者與品質驗證 (AI Reviewer) | 尋找漏洞、分析風險、提出反例，挑戰既有假設以確保品質。 |

---

## ⚡ 新協作原則：GitHub 共享記憶體 (Shared Workspace)

這是一個極為重要的專案里程碑：**我們正式將 GitHub Repo 定位為跨 AI 協作工作台與共享記憶體。**

### 1. 雙工作台模式 (Local Folder + GitHub Repo)
專案從現在開始，將「本地資料夾」與「GitHub Repo」視為雙軌運行工作台：
* **smf (ChatGPT)**：能直接存取、修改並 Commit 檔案到已建立的 GitHub Repo 中（包括建立文件骨架、維護 README、補充治理與 md 文件）。但 smf **無權限建立全新的 Repo**。
* **aaa (Antigravity)**：負責建立 Repo、處理 Git 同步（Push / Pull）、管理本地專案與 Artifact 品質。

### 2. 優先同步原則
若你 (aaa) 評估專案符合以下任一特徵，應**優先在本地建立 Repo 並同步至 GitHub**：
* 專案可能持續發展與迭代。
* 需要多人/多 AI 協同合作。
* 需要跨電腦接手或長期保存企業知識資產。

對整個協作平台而言，GitHub 不僅僅是版本控制工具，更是 **AI 共同工作區、AI 知識交換區、AI 交接區與長期資產保存區**。

---

## 專案背景與核心理念

這不是一個傳統的軟體開發專案，而是一個**企業 AI 內訓案例研究**。
* **主題**：AI 如何協助大型文件、投標文件、多人協作與專案管理。
* **核心觀念**：幫助學員與企業主管理解，AI 不單裝在對話框，而是能夠串聯為**知識管理系統**、**文件工程系統**、**專案管理系統**與**工作流系統**。

---

## Class02 的三大核心主角

在 Class02 的工作流中，將由以下三種工具/角色共同協作：
1. **NotebookLM**：負責「查詢、理解、QA」，作為大量原始文件與背景知識的輸入點。
2. **Antigravity (aaa)**：負責「整理、產出、教材化」，進行結構化文件的產出與呈現。
3. **FALO PM**：負責「管理、追蹤、治理」，確保工作流的合規與品質。

---

## 本次任務目標

作為教材與展示工程師 (aaa)，你的優先任務是將這些核心觀念整理成清晰的教材架構。
請直接進入我們的 [教材工作台 (Workbench)](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/workbench/index.md) 開始閱讀與學習。

---

## 導覽指引

* 進入 [教材工作台 (Workbench)](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/workbench/index.md)
* 閱讀 [01 課程地圖](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/01_course_map.md)
* 閱讀 [02 投標文件工作流說明](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/02_tender_workflow.md)
* 閱讀 [03 Multi-AI 協作說明](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/03_multi_ai_collaboration.md)
* 閱讀 [04 Artifact 管理機制](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/04_artifact_management.md)
* 閱讀 [未來規劃備忘錄](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/memo.html)
