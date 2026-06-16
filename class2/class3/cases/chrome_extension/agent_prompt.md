# 🤖 AI Agent 實戰：一鍵生成 V1 填單外掛提示詞 (Prompt)

> [!TIP]
> **使用方法**：學員只需在電腦中創建一個空白資料夾，並在其終端機或 AI 編輯器（如 Antigravity 或 Claude Code）中，**複製並貼上以下「高級版控制 Prompt」**。AI Agent 就會自動辨識環境，自主建立並寫出這 6 個外掛檔案，完全不需手動複製貼上！

---

## ⚡ 複製專用：AI Agent 生成外掛提示詞 (Prompt)

```markdown
請在目前的 `chrome-extension` 目錄下，建立一個最精簡的 Manifest V3 規格「銀河 ERP 填單助手」擴充功能。這個外掛需要支援側邊欄（Side-panel）介面。請一次性生成以下 6 個檔案，並在所有程式碼頂部加上 `Falo x Force Cheng 2026/6/6` 的版權與水印宣告（HTML、CSS 採用對應註解格式），且所有代碼都必須附上極為詳盡的繁體中文逐行教學註解：

1. `manifest.json`：設定 MV3 配置，包含 sidePanel 與 activeTab 權限，註冊 background.js、content.js 與 content.css，並使用私有屬性 `_watermark` 標記作者。
2. `background.js`：只需 3 行程式碼。監聽外掛點擊事件，當點擊瀏覽器工具列的外掛圖示時，呼叫 `chrome.sidePanel.setPanelBehavior` 讓側邊欄直接在右側滑出。
3. `sidepanel.html`：側邊欄 UI，採用 Outfit 與 Noto Sans TC 字體、軟水彩漸層與磨砂玻璃風格。提供「高亮主網頁欄位」動作按鈕，以及三個進貨明細卡片按鈕（分別代表廠商 A、B、C），卡片內顯示採購單號、品項與數量。
4. `sidepanel.js`：當點擊卡片或高亮按鈕時，先以 `chrome.tabs.query` 定位 active 網頁分頁，再使用 `chrome.tabs.sendMessage` 向該分頁發送通訊訊息（例如 `{ action: "fillForm", data: { po, code, qty, expiry } }`）。
5. `content.js`：注入主網頁運行。使用 `chrome.runtime.onMessage.addListener` 監聽信件。收到 "toggleHighlight" 時將 `#po-number, #product-code, #received-qty, #expiry-date` 的 class 加入 `falo-highlighted-field`；收到 "fillForm" 時將資料填入對應的輸入框，並主動派發 `input` 與 `change` 事件以相容 React/Vue 雙向綁定，填值成功時閃爍黃色背景。
6. `content.css`：定義 `.falo-highlighted-field` 的發光粉紅邊框樣式，使用 `box-shadow` 與 `!important` 權重。

請確保程式碼結構最簡化、變數名稱與 ID 直觀（如 `#po-number`），去除所有不必要的複雜底層演算法，以利初學者臨摹與教學。
```

---

## 🧠 AI Agent 內部的自主剖析與隱性執行細節

當學員輸入這段提示詞後，AI Agent（例如 Google Antigravity）在後台會自主進行以下工作流，這也是 **AI Agent 時代教材開發革命** 的核心展現：
1.  **環境偵測與目錄建立**：自動檢測本機是否存在 `chrome-extension` 資料夾，若無，自主執行 `mkdir` 建立。
2.  **安全通訊架構設計**：自動判斷 `background.js` 與 `sidepanel.js` 的底層 API 相容性，主動選用 `chrome.sidePanel.setPanelBehavior` 代替傳統的 popup。
3.  **前端框架相容防錯**：自動偵測主畫面可能使用的高級 JS 框架，主動在 `content.js` 寫入 `dispatchEvent(new Event('input'))` 以防填值無效。
4.  **樣式沙盒化**：主動在 CSS 中加上 `!important`，防止主網頁的樣式蓋掉外掛的高亮框。
