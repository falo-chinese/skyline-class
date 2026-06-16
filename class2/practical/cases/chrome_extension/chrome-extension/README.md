# 🔌 銀河 ERP 填單助手 ── Chrome Extension (V1)
> **版權所有 © 2026 Falo x Force Cheng. All rights reserved. (Released: 2026/6/6)**

本資料夾包含 SkyLine Class 02 課程中 V1 階段所使用的 **「銀河 ERP 填單助手」實體 Chrome 外掛**。
本外掛是專為控制與填寫特定的 ERP 模擬網頁（[erp.html](file:///Users/force/Google_Antigravity/attn-SkyLine class2-demo/chrome-computer-use/erp.html) 或其 GitHub Pages 部署網址）所設計。

---

## 🛠️ 外掛與網頁互動 DOM 控制規範 (DOM Specifications)

為了讓外掛能夠精確控制主網頁並填入或擷取數值，外掛的 `content.js` 嚴格遵循了以下**網頁 DOM Selector 互動規範**：

| 網頁欄位名稱 | DOM Selector (ID) | 資料型態 | 外掛通訊 Key |
| :--- | :--- | :--- | :--- |
| **採購單號** | `#po-number` | `String` | `po` |
| **產品代碼** | `#product-code` | `String` | `code` |
| **進貨部門** | `#dept-code` | `Select Option` (PUR, WH, QC, RD) | `dept` |
| **進貨數量** | `#received-qty` | `Number` | `qty` |
| **產品效期** | `#expiry-date` | `Date` (YYYY-MM-DD) | `expiry` |

---

## 📡 雙向通訊協議說明 (Message Passing Protocols)

外掛的側邊欄 (`sidepanel.js`) 與網頁注入腳本 (`content.js`) 之間透過以下指令進行雙向跨視窗通訊：

### 1. 單欄逐步填入 (Write Step-by-Step)
* **指令**：`{ action: "fillField", field: "po" | "code" | "dept" | "qty" | "expiry", value: "新值" }`
* **動作**：外掛將指定的文字框新值，單獨寫入網頁對應的 DOM 節點中，並觸發閃爍與事件派發。

### 2. 單欄逐步擷取 (Read Step-by-Step)
* **指令**：`{ action: "readField", field: "po" | "code" | "dept" | "qty" | "expiry" }`
* **動作**：`content.js` 讀取網頁 DOM 節點的值，並透過非同步 `sendResponse({ value })` 回傳給外掛，填回側邊欄對應的文字框中。

### 3. 一鍵全表單填入 (Write All Fields)
* **指令**：`{ action: "fillForm", data: { po, code, qty, expiry } }`
* **動作**：將外掛上所有自訂文字框的值，一次性全部寫入主網頁對應欄位。

### 4. 一鍵全表單擷取 (Read All Fields)
* **指令**：`{ action: "readForm" }`
* **動作**：讀取網頁上現存的所有欄位值，並以 JSON 格式回傳，一次性同步到外掛側邊欄的文字框中。

### 5. 遠端遙控檢核 (Remote Check Form)
* **指令**：`{ action: "clickCheck" }`
* **動作**：`content.js` 遙控點擊主網頁的「1. 檢核表單」按鈕，觸發主網頁表單檢核邏輯（格式非空、PO 開頭、效期不早於今天台北時間）。

### 6. 遠端遙控入庫 (Remote Confirm Entry)
* **指令**：`{ action: "clickSubmit" }`
* **動作**：`content.js` 遙控點擊主網頁的「2. 確認入庫」按鈕，完成表單入庫並顯示入庫成功 Toast 提示。

### 7. 一鍵清空表單 (Clear Webpage Form)
* **指令**：`{ action: "clearForm" }`
* **動作**：`content.js` 遙控重置主網頁的進貨單表單（所有輸入與下拉選單設為空值、重置按鈕禁用狀態與「待檢核」徽章、並清除所有高亮高反差 Class）。

---

## 🧠 核心技術要點剖析 (開發者防錯指南)

### 1. 非同步雙向事件回傳
側邊欄無法直接讀取網頁 DOM，因此必須透過 `chrome.tabs.sendMessage`。為了接收網頁回傳的值，必須在 `chrome.runtime.onMessage.addListener` 的回呼中執行 `sendResponse`，且監聽器結尾需 `return true;` 以聲明該訊息通道為非同步等待回傳：
```javascript
// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "readField") {
    sendResponse({ value: document.querySelector('#po-number').value });
  }
  return true; 
});
```

### 2. 現代框架相容大魔王：事件派遣 (Event Dispatching)
如果目標網頁使用 React 或 Vue，僅以 `input.value = value` 寫入值後，點擊送出時表單會被清空（因為框架的 Virtual DOM 無法捕捉到狀態的直接修改）。
為了解決此問題，外掛在寫入值後，會**主動拋出 input 與 change 事件**：
```javascript
input.value = value;
input.dispatchEvent(new Event('input', { bubbles: true }));
input.dispatchEvent(new Event('change', { bubbles: true }));
```

---

## 🚀 實地載入與實測步驟

1. **開啟開發者模式**：
   * 在 Chrome 瀏覽器網址列輸入 `chrome://extensions/`。
   * 開啟右上角的 **「開發者模式」 (Developer mode)**。
2. **載入外掛資料夾**：
   * 點選左上角的 **「載入未封裝項目」 (Load unpacked)**。
   * 選擇本專案的 `chrome-extension/` 資料夾。
3. **開始互動填單**：
   * 打開您的 [erp.html](file:///Users/force/Google_Antigravity/attn-SkyLine class2-demo/chrome-computer-use/erp.html) 測試網頁。
   * 點擊瀏覽器工具列上的外掛圖示開啟側邊欄。
   * 在側邊欄的文字框輸入自訂內容，點選 **「✍️ 填入」** 測試單欄填值；在網頁修改內容，點選外掛的 **「🔍 擷取」** 測試單欄抓取。
   * 也可以使用 **「一鍵全填入」** 與 **「一鍵全擷取」** 測試完整表單同步！
