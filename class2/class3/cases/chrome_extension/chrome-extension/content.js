// WATERMARK: Falo x Force Cheng 2026/6/6
// Project: 銀河 ERP 填單助手 (V1)
// Description: 注入目標網頁運行的腳本，接收外掛側邊欄訊息以操作網頁 DOM 元素，或讀取 DOM 值回傳外掛
// 1. 對齊的 DOM Selector 規格定義
const selectorMap = {
  po: '#po-number',
  code: '#product-code',
  dept: '#dept-code',
  qty: '#received-qty',
  expiry: '#expiry-date'
};

// 2. 監聽接收來自側邊欄（sidepanel.js）的訊息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  
  // 動作 B：單一欄位逐步寫入值 (寫網頁 DOM 欄位)
  if (message.action === "fillField") {
    const selector = selectorMap[message.field];
    if (selector) {
      fillInputValue(selector, message.value);
    }
  }

  // 動作 C：單一欄位逐步擷取讀值 (讀網頁 DOM 欄位並回傳)
  if (message.action === "readField") {
    const selector = selectorMap[message.field];
    if (selector) {
      const input = document.querySelector(selector);
      const val = input ? input.value : '';
      sendResponse({ value: val });
    }
  }

  // 動作 D：一鍵全表單自動寫入 (寫網頁 DOM 欄位)
  if (message.action === "fillForm") {
    const data = message.data;
    fillInputValue(selectorMap.po, data.po);
    fillInputValue(selectorMap.code, data.code);
    fillInputValue(selectorMap.dept, data.dept);
    fillInputValue(selectorMap.qty, data.qty);
    fillInputValue(selectorMap.expiry, data.expiry);
  }

  // 動作 E：一鍵全表單資料擷取 (讀網頁 DOM 所有欄位並打包回傳)
  if (message.action === "readForm") {
    const poVal = document.querySelector(selectorMap.po)?.value || '';
    const codeVal = document.querySelector(selectorMap.code)?.value || '';
    const deptVal = document.querySelector(selectorMap.dept)?.value || '';
    const qtyVal = document.querySelector(selectorMap.qty)?.value || '';
    const expiryVal = document.querySelector(selectorMap.expiry)?.value || '';
    
    sendResponse({
      data: {
        po: poVal,
        code: codeVal,
        dept: deptVal,
        qty: qtyVal,
        expiry: expiryVal
      }
    });
  }

  // 動作 F：遠端遙控點擊「檢核表單」
  if (message.action === "clickCheck") {
    const btn = document.querySelector('#btn-check-form');
    if (btn) {
      btn.click();
    }
  }

  // 動作 G：遠端遙控點擊「確認入庫」並回傳最新欄位資料
  if (message.action === "clickSubmit") {
    const btn = document.querySelector('#btn-submit-entry');
    if (btn) {
      const wasDisabled = btn.disabled;
      btn.click();
      if (!wasDisabled) {
        const serialVal = document.querySelector('#system-serial-no')?.textContent || '';
        const poVal = document.querySelector('#po-number')?.value || '';
        const codeVal = document.querySelector('#product-code')?.value || '';
        const qtyVal = document.querySelector('#received-qty')?.value || '';
        const expiryVal = document.querySelector('#expiry-date')?.value || '';
        
        // 取得部門選單可讀的文字 (例如 "倉管部 (WH)")
        const deptEl = document.querySelector(selectorMap.dept);
        const deptText = deptEl ? deptEl.options[deptEl.selectedIndex]?.text : '';
        
        // 格式化當前台北時間
        const now = new Date();
        const formatNum = (n) => n.toString().padStart(2, '0');
        const timestamp = `${now.getFullYear()}-${formatNum(now.getMonth() + 1)}-${formatNum(now.getDate())} ${formatNum(now.getHours())}:${formatNum(now.getMinutes())}:${formatNum(now.getSeconds())}`;
        
        sendResponse({
          success: true,
          data: {
            serial: serialVal,
            po: poVal,
            code: codeVal,
            dept: deptText,
            qty: qtyVal,
            expiry: expiryVal,
            timestamp: timestamp
          }
        });
      } else {
        sendResponse({ success: false });
      }
    } else {
      sendResponse({ success: false });
    }
  }

  // 動作 H：遠端遙控捕捉流水序號，並給予網頁元素粉色閃爍回饋
  if (message.action === "captureSerial") {
    const el = document.getElementById('system-serial-no');
    if (el) {
      const serialNo = el.textContent || '';
      const originalBg = el.style.background;
      // 亮粉色閃爍
      el.style.background = '#f472b6';
      setTimeout(() => {
        el.style.background = originalBg;
      }, 800);
      sendResponse({ value: serialNo });
    } else {
      sendResponse({ value: '' });
    }
  }

  // 動作 I：遠端遙控一鍵清空主網頁表單數值與狀態重置
  if (message.action === "clearForm") {
    // 1. 清空所有輸入欄位
    const poInput = document.querySelector(selectorMap.po);
    const codeInput = document.querySelector(selectorMap.code);
    const deptInput = document.querySelector(selectorMap.dept);
    const qtyInput = document.querySelector(selectorMap.qty);
    const expiryInput = document.querySelector(selectorMap.expiry);
    
    if (poInput) poInput.value = '';
    if (codeInput) codeInput.value = '';
    if (deptInput) deptInput.value = '';
    if (qtyInput) qtyInput.value = '';
    if (expiryInput) expiryInput.value = '';
    
    // 2. 重置確認入庫按鈕狀態為禁用
    const btnSubmit = document.querySelector('#btn-submit-entry');
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.style.background = '#94a3b8';
      btnSubmit.style.cursor = 'not-allowed';
    }
    
    // 3. 復原狀態 Badge 為「待檢核」
    const badge = document.querySelector('#erp-status-badge');
    if (badge) {
      badge.textContent = '待檢核';
      badge.style.background = '#cbd5e1';
      badge.style.color = '#475569';
    }

    
    sendResponse({ success: true });
  }

  // 關鍵教學點：回傳 true 代表我們會使用非同步方式發送 Response 信件 (非強制但為標準開發防錯規範)
  return true;
});

// 3. 核心輔助填值函式
function fillInputValue(selector, value) {
  const input = document.querySelector(selector);
  if (input) {
    input.value = value;
    
    // 關鍵教學點：主動發送 input 與 change 事件，通知前端框架進行雙向綁定更新
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    
    // 填值後黃色閃爍視覺反饋，提示學員該欄位已寫入
    const originalBg = input.style.backgroundColor;
    input.style.backgroundColor = '#fef08a'; // 亮黃色
    setTimeout(() => {
      input.style.backgroundColor = originalBg;
    }, 800);
  }
}
