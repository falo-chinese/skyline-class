# SkyLine Class 02 教學指引：Chrome Extension 填單助手控制實戰

> [!NOTE]
> **作者**：Falo x Force Cheng  
> **發佈日期**：2026/06/08  
> **專案定位**：這堂課的重點是帶領學員開發出一個完整的 Chrome 側邊欄外掛，實現網頁 DOM 節點的讀取與自動填寫，並深入理解瀏覽器擴充功能與網頁之間的雙向通訊與控制機制。

---

## 🎨 課程核心觀念與金句

在進入任何技術實作前，請務必先向學員揭露這套「網頁 DOM 節點控制權」的運作機制。

> [!TIP]
> **Force 老師教學金句**：
> - **寫入網頁 (Write)**：外掛側邊欄發送指令與數據，注入網頁的 content.js 接收並將數值填入對應的 DOM 輸入框。
> - **擷取資料 (Read)**：當外掛點擊擷取，網頁的 content.js 讀取網頁 DOM 欄位值並打包回傳，回填至外掛側邊欄中。

### 🗺️ 技術特性與維護要點 (需注意事項)
1. **依賴 DOM 結構**：外掛是利用 `CSS Selector`（如 `#po-number`）尋找網頁元素並進行讀寫。
2. **重構風險**：當 ERP 網頁的前端結構變更（例如採購單號的 ID 從 `#po-number` 改成 `#po-id`）時，外掛對應的 Selector 必須同步維護更新，否則自動化填單會立刻失效。

---

## 📁 專案檔案結構與元件劃分

本實作案例將外掛檔案分為 **「🛡️ Chrome 外掛必備三劍客（必備黨）」** 與 **「🔌 本專案額外補充組件」** 兩大類，以利學員理解 Chrome MV3 架構：

### 🛡️ Chrome 外掛必備三劍客（核心必備）
- **manifest.json (外掛身分證) [擴充功能必備]**：擴充功能的主設定檔（JSON 格式）。聲明外掛名稱、版本、要求的權限（`activeTab`, `sidePanel`）、背景 Service Worker 及注入內容腳本。
- **background.js (背景守護程序) [擴充功能必備]**：事件驅動的背景 Service Worker 腳本，在後台運行。無法直接讀寫網頁 DOM，但負責全局調度。本專案中負責監聽 Icon 點擊事件，並指令開啟右側 Side Panel。
- **content.js (網頁注入爪牙) [擴充功能必備]**：直接注入當前網頁 DOM 環境運行的 JavaScript。擁有直接讀寫網頁 DOM 節點的權限，負責填值、派發事件與網頁通訊。

### 🔌 本專案額外補充組件（高階補充）
- **sidepanel.html & sidepanel.js (控制台 UI 與邏輯) [專案補充]**：外掛側邊欄的面板與控制腳本。運行於獨立 Extension 環境，透過 `Message Passing` 與 content.js 進行跨空間通訊。實作隨機生成、CSV 匯出匯入、遠端流程控制與報告下載。
- **content.css (動態樣式注入) [專案補充]**：注入網頁的 CSS，宣告黃色（`#fef08a`）與粉色（`#fbcfe8`）閃爍動畫，供 content.js 動態為輸入框加上特效。
- **icon.png (外掛圖示) [專案補充]**：外掛在瀏覽器工具列上的標誌。
- **erp.html (外掛演練靶機) [專案補充]**：本次課程的實體測試網頁。模擬 ERP 表單（具備欄位檢核、儲存入庫與流水序號），外掛在此網頁上進行控制演練。

---

## ⚡ 實戰 Prompt 演化對照表 (3階段小白與專家版)

我們將外掛的 Prompt 分為三個獨立的實作階段，每個階段都是**完全獨立、自包含的（不依賴前一個步驟）**。在每個步驟中，**無論是小白版或專家版，均提供測試網頁 URL，且明確包含「Chrome 外掛」或「Chrome 側邊欄外掛」**，防止 AI 缺乏上下文或遺漏 DOM 定位資訊：

<details>
<summary>📂 點此展開 ── Step 1：單欄雙向讀寫控制 Prompt 對照</summary>

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
<summary>📂 點此展開 ── Step 2：全部欄位單獨讀寫 ＋ 一鍵全填與清空 Prompt 對照</summary>

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
<summary>📂 點此展開 ── Step 3：完整自動化與資料備份 Prompt 對照</summary>

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

## 🚀 SkyLine Class 02 現場演示 (Showcase) 步驟指南

Force 老師在課堂上可透過以下步驟進行演示：

### 課前暖身：體驗 FALO Instagram Video Enhancer 外掛
1. 讓學員在 Chrome 瀏覽器開啟 `chrome://extensions`「開發者模式」，點擊「載入未封裝項目」，選取本機暖身專案路徑：`ig-video-enhancer-extension`。
2. 導引學員至 Instagram 影片，體驗外掛如何將「自訂影片進度條、音量控制、播放速度選單、快速鍵」直接注入到 IG 中。
3. **觀念轉折**：向學員引導：「這個外掛改善了我們看影片的體驗。那如果我們要自動化完成企業內無聊的 ERP 填單報表呢？這就進到我們的主題 —— 網頁填單助手外掛。」

### 步驟一：載入外掛並打開 ERP 測試頁
1. 開啟 `chrome://extensions` 並開啟 **「開發者模式」**。
2. 點擊 **「載入未封裝項目」**，選取專案目錄中的 [chrome-extension/](file:///Users/force/Google_Antigravity/attn-SkyLine class2-demo/chrome-computer-use/chrome-extension/) 資料夾。
3. 開啟 [erp.html](file:///Users/force/Google_Antigravity/attn-SkyLine class2-demo/chrome-computer-use/erp.html)。
4. 點擊 Chrome 工具列的 **FALO ERP Form Helper** 外掛圖示，開啟右側 side panel。

### 步驟二：演示外掛的雙向控制功能
1. **隨機產生資料**：在側邊欄點選「隨機產生」，側邊欄欄位自動生成測試數據。
2. **一鍵全填入**：點擊「一鍵全填入」，外掛將數據發送至 content.js，寫入網頁對應 DOM 輸入框（欄位亮黃色背景閃爍提示填值成功）。
3. **網頁手動填寫 ➔ 一鍵全擷取**：在網頁上隨手修改或輸入資料，點擊側邊欄的「一鍵全擷取」，外掛會讀取網頁 DOM 欄位值並同步回外掛欄位。
4. **一鍵清空**：點擊「清空表單」，外掛與網頁欄位同時清空。
5. **CSV 備份與還原**：在側邊欄填入資料後點擊「匯出 CSV」下載備份；清空後，點擊「匯入 CSV」選取剛才的檔案，資料立刻回填至外掛。

---

## 📖 V1 擴充功能分檔逐行教學指引 (逐檔剖析)

為了讓您在課堂上面對學員時，能夠將外掛目錄中的檔案當作教材順暢講授，以下為您整理各檔案的「核心目的」與「逐行解析教案」：

<details>
<summary>📂 點此展開 ── 🛡️ 身份宣告檔：manifest.json 解析 [擴充功能必備]</summary>

*   **教學目標**：理解 Manifest V3 擴充功能的配置規範。
*   **核心配置解析**：
    - `"manifest_version": 3`：告訴瀏覽器這使用的是現代 V3 規範（V2 已廢棄）。
    - `"background": { "service_worker": "background.js" }`：註冊後台背景 Service Worker 線程，負責監聽外掛級別事件。
    - `"side_panel": { "default_path": "sidepanel.html" }`：宣告外掛為「側邊欄」形式，並指定其預設網頁。
    - `"permissions": ["activeTab", "sidePanel"]`：要求安全權限，`activeTab` 代表僅允許讀寫當前開啟的分頁，`sidePanel` 允許使用側邊欄 API。
    - `"content_scripts": [...]`：定義「當使用者打開任何網頁時，自動將 `content.js` 與 `content.css` 注入該網頁」。
</details>

<details>
<summary>📂 點此展開 ── 🛡️ 背景服務：background.js 解析 [擴充功能必備]</summary>

*   **教學目標**：理解事件驅動的背景處理（Event-driven Service Worker）。
*   **核心代碼解析**：
    - `chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })`：這行程式碼非常關鍵！它告訴瀏覽器：「當使用者用滑鼠點擊瀏覽器右上角的外掛圖示時，請直接滑出我們的 `sidepanel.html` 側邊欄，而不是彈出傳統的小 Popup 視窗。」
</details>

<details>
<summary>📂 點此展開 ── 🔌 側邊欄介面與控制：sidepanel.html / sidepanel.js 解析 [專案補充]</summary>

*   **教學目標**：掌握**「Context 隔離宇宙」**與**「跨宇宙通訊 (Message Passing)」**。
*   **核心內容解析**：
    - `sidepanel.html` 提供了與 ERP 表單對應的 5 個輸入控制項（採購單號、產品代碼、進貨部門下拉、進貨數量、產品效期）與系統流水號的唯讀框。
    - `chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { ... })`：查詢當前使用者的 Active 分頁資訊。
    - `chrome.tabs.sendMessage(...)`：向 content.js 發送訊息信件，通知其操作網頁 DOM 元素。
    - 實作了 CSV 格式的生成（加入 UTF-8 BOM `\uFEFF` 防止 Excel 開啟亂碼）與下載，並以 `FileReader` 讀取並還原上傳的 CSV 資料。
</details>

<details>
<summary>📂 點此展開 ── 🛡️ 網頁注入邏輯：content.js / content.css 解析 [核心必備/專案補充]</summary>

*   **教學目標**：理解「接收信件並控制主網頁 DOM」的底層原理。
*   **核心代碼解析**：
    - `chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { ... })`：在網頁宇宙中註冊監聽器，接收側邊欄發送的通訊訊息。
    - `input.dispatchEvent(new Event('input', { bubbles: true }))`：告訴學員如果網頁是用 React/Vue 寫的，僅修改 `.value` 無法讓框架感知，必須主動派發 `input` 與 `change` 事件，通知前端框架進行資料更新。
    - 輔助填值函式在寫入值後會對 DOM 元素進行短暫的背景黃色閃爍（`#fef08a`）視覺反饋，提示學員填值已生效。
</details>
