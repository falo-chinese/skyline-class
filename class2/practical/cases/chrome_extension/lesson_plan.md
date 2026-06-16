# SkyLine Class 02 教學案設計與開發脈絡全紀錄 (Lesson Plan)

> [!NOTE]
> **作者**：Falo x Force Cheng  
> **發佈日期**：2026/06/08  
> **教案宗旨**：引導學員掌握 Chrome 側邊欄外掛開發，實現網頁 DOM 節點的雙向控制（寫入、擷取、隨機產生、一鍵清空、CSV 備份與還原），並深入理解 Manifest V3 規格、背景腳本（Service Worker）、側邊欄與網頁 Content Script 之間的通訊（Message Passing）底層機制。

---

## 🗺️ 一、教案總體設計地圖

本教案設計為從「體驗注入」到「雙向 DOM 控制」及「資料備份閉環」的實戰演進，其邏輯架構如下：

```mermaid
graph TD
    Start[課前準備/暖身] --> Step1[實作階段 1：單欄雙向讀寫控制]
    Step1 --> Step2[實作階段 2：全部欄位單獨讀寫與一鍵控制]
    Step2 --> Step3[實作階段 3：完整自動化與資料備份]
    
    subgraph 課前準備/暖身
        Start -->|體驗| IG[IG Video Enhancer v1.0.1]
        IG -->|學習點| DOM_Modify[人藉由外掛「修改」網頁體驗]
    end
    
    subgraph 實作階段 1：單欄雙向讀寫控制
        Step1 -->|小白意圖| S1_Easy[一般口語需求描述]
        Step1 -->|專家指點| S1_Exp[精準 Manifest V3 與單欄讀寫通訊]
    end
    
    subgraph 實作階段 2：全部欄位單獨讀寫與一鍵控制
        Step2 -->|寫入與擷取| Write_Read_All[五大欄位單獨雙向控制與亮黃色閃爍]
        Step2 -->|全域批次| Batch_Clear[一鍵全填入、一鍵全擷取與清空表單]
        Step2 -->|相容性| Reactivity[Dispatch input/change 事件相容 Vue/React]
    end
    
    subgraph 實作階段 3：完整自動化與資料備份
        Step3 -->|隨機資料| Random[台北時間隨機產生]
        Step3 -->|CSV 備份| CSV[匯出 BOM CSV 與 FileReader 讀取]
        Step3 -->|遠端遙控| Remote[遠端檢核/入庫與流水號捕捉報告下載]
    end
```

---

## 🎨 二、暖身專案：FALO Instagram Video Enhancer

<details>
<summary>📂 點此展開 ── 暖身專案定位與技術原理</summary>

### 1. 暖身專案定位
在進入 ERP 自動化前，先用一個學員日常接觸得到的痛點（IG Reels 無法倒帶、調速）作為起點，建立外掛開發的基礎體感。
*   **暖身專案路徑**：`ig-video-enhancer-extension`
*   **教學核心**：讓學員在 Chrome 開啟開發者模式，載入未封裝項目，直接運行外掛。理解外掛能讀寫瀏覽器的 tab 權限，並「注入」代碼來修改第三方網頁 UI。

### 2. 技術原理說明
*   **Manifest V3**：透過 `content_scripts` 匹配 `https://*.instagram.com/*`，在網頁加載完畢時注入 `content.js` 與 `content.css`。
*   **DOM 修改**：外掛腳本會尋找網頁中的 `<video>` 標籤，動態在下方 append 進度條與速度控制器，並監聽鍵盤事件來實現快捷鍵控制。
</details>

---

## ⚙️ 三、實作專案：銀河 ERP 填單助手 (3階段實戰)

本課程設計了三套 Prompt，引導學員從小白口語意圖，升級到進階技術控制，再到能夠一鍵生成完整自動化外掛的專家版。**每個階段的 Prompt 皆為完全獨立、自包含之版本**，不需要延續前一步驟程式碼。**小白版與專家版均內含網址，且明確提及「Chrome 外掛」或「Chrome 側邊欄外掛」**，防止 AI 缺乏上下文或遺漏定位基礎：

<details>
<summary>📂 點此展開 ── Step 1：單欄雙向讀寫控制 Prompt 演化對照</summary>

*   **💬 一般小白簡單版**：
    > 我有一個線上 ERP 測試網頁：../chrome_extension/index.htmlerp.html。我想寫一個 Chrome 瀏覽器外掛，外掛打開後在右側滑出側邊欄，側邊欄上有一個填「採購單號」的格子。點一下格子旁邊的「填入」按鈕，網頁上的採購單號欄位就會自動填好；如果網頁上已經有寫字，我點「擷取」按鈕，Chrome 外掛就能把我網頁上寫的字抓回來外掛顯示。請幫我寫出外掛程式碼。
*   **⚡ 專家指點版**：
    > 我有一個線上 ERP 測試網頁：
    > ../chrome_extension/index.htmlerp.html
    > 
    > 請你讀取並解析這張網頁的結構，找出「採購單號」欄位的 CSS Selector。
    > 接著，在目前的目錄下建立一個 Chrome 側邊欄（Side-panel）外掛，包含以下檔案：
    > 1. manifest.json：設定 Manifest V3 規格，註冊 background.js、content.js，包含 sidePanel 與 activeTab 權限。
    > 2. background.js：當點擊外掛 Icon 時，自動在右側滑出側邊欄。
    > 3. sidepanel.html：側邊欄 UI。提供一個「採購單號」輸入框，旁邊配有「填入」與「擷取」按鈕。
    > 4. sidepanel.js：處理按鈕事件，發送通訊訊息給網頁 content.js。
    > 5. content.js：注入網頁運行。當收到「填入」指令時，將採購單號值寫入網頁對應的輸入框，並派遣 input/change 事件以相容 Vue/React；當收到「擷取」指令時，讀取網頁採購單號輸入框的值並回傳給側邊欄。
    > 所有程式碼請附上中文逐行註解。
</details>

<details>
<summary>📂 點此展開 ── Step 2：全部欄位單獨讀寫 ＋ 一鍵全填與清空 Prompt 演化對照</summary>

*   **💬 一般小白簡單版**：
    > 我有一個線上 ERP 測試網頁：../chrome_extension/index.htmlerp.html。我想開發一個 Chrome 瀏覽器側邊欄外掛，外掛打開後有 5 個輸入欄位，分別是「採購單號」、「產品代碼」、「進貨數量」、「產品效期」和「進貨部門」下拉選單（部門選項包含 PUR, WH, QC, RD）。每個欄位旁邊都要有獨立的「填入」與「擷取」按鈕。點填入就填入對應的網頁欄位，點擷取就抓取網頁的值回填。另外，側邊欄底部要提供「一鍵全填入」（將外掛 5 個值全寫入網頁）、「一鍵全擷取」（將網頁 5 個值抓回外掛）與「清空表單」（將網頁與外掛的 5 個欄位值全部清空）按鈕。請幫我寫出完整的 Chrome 外掛程式碼檔案結構。
*   **⚡ 專家指點版**：
    > 我有一個線上 ERP 測試網頁：
    > ../chrome_extension/index.htmlerp.html
    > 
    > 請幫我開發一個 Chrome 瀏覽器外掛。功能需求與技術規範如下：
    > 1. 使用 Manifest V3 規格，點擊外掛 Icon 時在右側開啟側邊欄（Side Panel）介面。
    > 2. 側邊欄內提供 5 個輸入控制項（採購單號、產品代碼、進貨數量、產品效期、進貨部門下拉選單），每個控制項旁邊配有獨立的「填入」與「擷取」按鈕。
    > 3. 側邊欄底部提供三個全局按鈕：「一鍵全填入」、「一鍵全擷取」與「清空表單」。
    > 4. 請先解析該網頁結構，自主定位五個欄位在網頁中的 CSS Selector。
    > 5. 填值與清空規範：向網頁填值時，必須派遣 input/change 事件以相容 React/Vue 框架，並對被填入的網頁元素進行短暫黃色背景閃爍反饋（CSS 動畫需於 content.css 處理）。點擊「清空表單」時，同步清空網頁與側邊欄的 5 個欄位值。
    > 6. 跨空間通訊：使用 Message Passing 在 sidepanel.js 與注入網頁的 content.js 之間進行訊息傳遞。
    > 請生成完整程式碼與檔案結構，並附上繁體中文逐行註解。
</details>

<details>
<summary>📂 點此展開 ── Step 3：完整自動化與資料備份 Prompt 演化對照</summary>

*   **💬 一般小白簡單版**：
    > 我有一個線上 ERP 測試網頁：../chrome_extension/index.htmlerp.html。我想開發一個功能完整的 Chrome 瀏覽器外掛，外掛打開後在右側滑出側邊欄。側邊欄上包含 5 個 ERP 欄位（採購單號、產品代碼、進貨數量、產品效期、進貨部門下拉選單），每個欄位有獨立的「填入」與「擷取」按鈕，底部有一鍵全填、一鍵全擷與一鍵清空。
    > 此外，請為外掛加入以下高階功能：
    > 1. 點「隨機產生資料」按鈕，能在外掛欄位產生測試數值（單號以 PO-2026- 開頭，數量在 10-500，效期設為台北時間今天）。
    > 2. 點「匯出 CSV」和「匯入 CSV」按鈕，可將外掛的 5 欄資料下載成 CSV 備份，或讀取上傳的 CSV 回填外掛。
    > 3. 點「檢核表單」與「確認入庫」按鈕，可遠端遙控點擊網頁上對應的按鈕。網頁入庫成功後，外掛要能讀取網頁產生的入庫流水號，並自動幫我下載一個 txt 的入庫報告（檔名含時間戳記）。
    > 請幫我寫出完整的 Chrome 外掛程式碼檔案結構。
*   **⚡ 專家指點版**：
    > 我有一個線上 ERP 測試網頁：
    > ../chrome_extension/index.htmlerp.html
    > 
    > 請幫我開發一個 Chrome 瀏覽器外掛。功能需求與技術規範如下：
    > 1. 使用 Manifest V3 規格，點擊外掛 Icon 時在右側開啟側邊欄（Side Panel）介面。
    > 2. 側邊欄內提供 5 個輸入控制項（採購單號、產品代碼、進貨數量、產品效期、進貨部門下拉選單），每個控制項旁配有獨立的「填入」與「擷取」按鈕，底部有一鍵全填、一鍵全擷與清空表單按鈕。
    > 3. 新增「隨機產生資料」按鈕：於側邊欄本地生成測試數值（採購單號以 PO-2026- 開頭，數量在 10-500，效期設為台北時間今天），僅填入側邊欄不自動寫入網頁。
    > 4. 新增「匯出 CSV」與「匯入 CSV」按鈕：支持將外掛資料下載備份（加入 UTF-8 BOM \uFEFF）或上傳 CSV 還原至外掛控制項。
    > 5. 新增「檢核表單」與「確認入庫」按鈕：通知 content.js 遠端遙控點擊網頁上的檢核與入庫按鈕。
    > 6. 實作流水號捕捉與報告下載：主網頁入庫成功後，content.js 讀取網頁生成的系統流水序號回傳側邊欄，側邊欄接收後，自動生成含台北時間戳記的入庫報告 (.txt) 供瀏覽器自動下載。
    > 7. 請先讀取並解析該網頁結構，自主尋找與定位五個欄位、檢核按鈕、入庫按鈕及流水序號元素的 CSS Selector，不可在 Prompt 中劇透。
    > 請為我生成完整的專案程式碼與檔案結構，附上繁體中文逐行註解。
</details>

---

## 🚀 四、SkyLine Class 02 課堂引導腳本設計 (教案執行流程)

| 階段 | 教學時間 | 教師操作步驟 | 學員互動與思考引導 |
| :--- | :--- | :--- | :--- |
| **暖身體驗** | 10 mins | 1. 載入 `ig-video-enhancer-extension`<br>2. 開啟 IG reels 頁面並播放。<br>3. 調整播放速度，展示進度條。 | **引導問答**：「大家常用的外掛都是為了解決什麼問題？（如去廣告、下載）外掛是怎麼做到的？答案是：因為外掛有權限可以改動網頁代碼。」 |
| **Step 1 實作** | 15 mins | 1. 引導學員體驗「單欄讀寫」外掛。<br>2. 比較 Step 1 的一般口語版與專家指點版 Prompt，讓學員看 AI 產出的程式碼結構。 | **思考點**：「外掛側邊欄的 HTML/JS 和原本的網頁 DOM 是互相隔離的，他們要怎麼溝通？➔ 透過 `chrome.runtime` 進行跨宇宙通訊。」 |
| **Step 2 實作** | 20 mins | 1. 擴展至 ERP 五個欄位與一鍵全填/全擷及清空。<br>2. 比較 Step 2 的兩個 Prompt 版本，演示亮黃色填值閃爍動畫。 | **核心震撼點**：「為什麼外掛填完值後，Vue/React 能讀到新資料？因為專家版 Prompt 要求 content.js 派發了 input/change 事件，這解決了框架的 Reactivity 狀態同步問題。」 |
| **Step 3 實作** | 20 mins | 1. 導入 CSV 資料備份、隨機數產生、遠端按鈕點擊、流水號捕捉與下載 TXT 報告。<br>2. 比較 Step 3 的 Prompt。 | **技術特性與維護要點**：「如果網頁上的欄位 ID 改變了（如 `po-number` 改成 `po-id`），外掛會發生什麼事？➔ 找不到 Selector，外掛會失效。所以 DOM 自動化必須與前端結構規格對齊。」 |

---

## 🛡️ 五、教材開發規範對照 (Developer Guide Compliance)

本專案之開發完全落實 `developer_guide.md` 所要求的高品質標準：
- [x] **Tutorial as Entrypoint**：根目錄 `index.html` 為概念教學導讀，測試頁面與實作分開，並使用細節折疊維持版面整潔。
- [x] **CORS Bypass**：完全使用本機/靜態網頁邏輯，離線雙擊即可執行與測試。
- [x] **SEO & Schema**：在 HTML 結構中宣告 JSON-LD `TechArticle` / `WebPage`，標明作者 `Falo x Force Cheng`。
- [x] **Watercolor Aesthetic**：介面全面採用 Outfit 字體、Pastel 漸層及半透明玻璃磨砂設計，確保視覺體驗高階。
