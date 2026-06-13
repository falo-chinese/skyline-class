# Skyline Class02 教材工作台主控台 (Workbench)

歡迎來到 Skyline Class02 教材工作台。本工作台是為了協助學員與企業主管快速理解 **「AI 如何從聊天對話框轉型為企業工作流」** 的實作示範基地。

在這裡，我們以一個典型的企業情境——**「投標文件與大型合約協作」** 為主軸，解構如何利用不同的 AI 角色與管理工具，建立一個自動化、可治理的 AI 文件工程。

---

## 🧭 快速導覽通道

本工作台包含四大核心教材單元，請依序或針對特定主題進行閱讀：

```mermaid
graph TD
    Start[開始：專案啟動] --> Map[01. 課程地圖]
    Map --> Flow[02. 投標文件工作流]
    Flow --> MultiAI[03. Multi-AI 協作]
    MultiAI --> Artifact[04. Artifact 管理]
    Artifact --> Demo[未來規劃：展示 Web App]
```

* **[單元 01：課程地圖](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/01_course_map.md)**
  * *「從問答到工作流的思維轉變」* —— 理解 Horizon 到 Skyline 的學習路徑，以及 Class02 的核心知識點。
* **[單元 02：投標文件工作流說明](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/02_tender_workflow.md)**
  * *「如何用 AI 吞下大型投標文件？」* —— 解析企業在處理大型 RFP（需求建議書）時的痛點，以及如何建立端到端（End-to-End）的 AI 工作流。
* **[單元 03：Multi-AI 協作說明](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/03_multi_ai_collaboration.md)**
  * *「當 NotebookLM 遇上 Antigravity 與 FALO PM」* —— 說明三個核心工具/角色在工作流中扮演的「理解、整理、管理」鐵三角。
* **[單元 04：Artifact 管理機制](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/04_artifact_management.md)**
  * *「把 AI 的產出變成企業真正的資產」* —— 說明如何建立 AI 產出物的生命週期管理、命名規範與品質審查門檻。

---

## 🎯 依角色情境導讀

如果您是不同背景的讀者，建議可以從以下情境切入：

### 💼 我是企業主管 / 決策者
> 您最關心的是 **AI 能否落地、降低風險與提高產出效率**。
> * 建議閱讀順序：
>   1. [02 投標文件工作流說明](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/02_tender_workflow.md) (理解商業價值與痛點解決)
>   2. [04 Artifact 管理機制](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/04_artifact_management.md) (理解如何實施品質治理與控管風險)

### 📋 我是專案經理 (PM) / 流程規劃者
> 您關心的是 **AI 之間如何協同工作、進度如何追蹤**。
> * 建議閱讀順序：
>   1. [03 Multi-AI 協作說明](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/03_multi_ai_collaboration.md) (理解角色分工與訊息流轉)
>   2. [01 課程地圖](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/01_course_map.md) (理解整體知識框架與實踐步驟)

### 💻 我是教材工程師 / 展示開發者
> 您關心的是 **Markdown 文件工程、檔案結構與前端 Demo 展示**。
> * 建議閱讀順序：
>   1. [01 課程地圖](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/docs/01_course_map.md) (熟悉整體 Repo 結構)
>   2. 閱讀 `README.md` 中關於 [aaa 任務與團隊角色](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/README.md) 的設定。

---

## 🚀 未來展示規劃
在後續的專案推進中，我們將在 `demo/` 目錄中建立一個 HTML/CSS/JS 的實體網頁展示，將這套投標文件工作流與 Multi-AI 的協作過程視覺化，讓企業主管能以最直覺的方式體驗 AI 治理的威力。
