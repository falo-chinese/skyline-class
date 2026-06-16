// WATERMARK: Falo x Force Cheng 2026/6/6
// Project: 銀河 ERP 填單助手 (V1)
// Description: 側邊欄控制邏輯，點擊按鈕後跨視窗通訊，發送自訂文字框資料給主網頁的 content.js，或從其擷取 DOM 值

// 1. 輔助函式：查詢當前 Active 分頁並發送通訊訊息 (支援回傳 Response)
function sendMessageToActiveTab(msg, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
        if (callback && response) {
          callback(response);
        }
      });
    }
  });
}

// 3. 監聽單步「填入」按鈕點擊
document.getElementById('btn-write-po').addEventListener('click', () => {
  const value = document.getElementById('po-input').value;
  sendMessageToActiveTab({ action: "fillField", field: "po", value });
});

document.getElementById('btn-write-code').addEventListener('click', () => {
  const value = document.getElementById('code-input').value;
  sendMessageToActiveTab({ action: "fillField", field: "code", value });
});

document.getElementById('btn-write-dept').addEventListener('click', () => {
  const value = document.getElementById('dept-input').value;
  sendMessageToActiveTab({ action: "fillField", field: "dept", value });
});

document.getElementById('btn-write-qty').addEventListener('click', () => {
  const value = document.getElementById('qty-input').value;
  sendMessageToActiveTab({ action: "fillField", field: "qty", value });
});

document.getElementById('btn-write-expiry').addEventListener('click', () => {
  const value = document.getElementById('expiry-input').value;
  sendMessageToActiveTab({ action: "fillField", field: "expiry", value });
});

// 4. 監聽單步「🔍 擷取」按鈕點擊 (非同步從網頁 DOM 讀值)
document.getElementById('btn-read-po').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "readField", field: "po" }, (response) => {
    if (response && response.value !== undefined) {
      document.getElementById('po-input').value = response.value;
    }
  });
});

document.getElementById('btn-read-code').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "readField", field: "code" }, (response) => {
    if (response && response.value !== undefined) {
      document.getElementById('code-input').value = response.value;
    }
  });
});

document.getElementById('btn-read-dept').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "readField", field: "dept" }, (response) => {
    if (response && response.value !== undefined) {
      document.getElementById('dept-input').value = response.value;
    }
  });
});

document.getElementById('btn-read-qty').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "readField", field: "qty" }, (response) => {
    if (response && response.value !== undefined) {
      document.getElementById('qty-input').value = response.value;
    }
  });
});

document.getElementById('btn-read-expiry').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "readField", field: "expiry" }, (response) => {
    if (response && response.value !== undefined) {
      document.getElementById('expiry-input').value = response.value;
    }
  });
});

// 5. 監聽「✍️ 一鍵全填入」按鈕點擊
document.getElementById('btn-write-all').addEventListener('click', () => {
  const data = {
    po: document.getElementById('po-input').value,
    code: document.getElementById('code-input').value,
    dept: document.getElementById('dept-input').value,
    qty: document.getElementById('qty-input').value,
    expiry: document.getElementById('expiry-input').value
  };
  sendMessageToActiveTab({ action: "fillForm", data });
});

// 6. 監聽「🔍 一鍵全擷取」按鈕點擊
document.getElementById('btn-read-all').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "readForm" }, (response) => {
    if (response && response.data) {
      document.getElementById('po-input').value = response.data.po || '';
      document.getElementById('code-input').value = response.data.code || '';
      document.getElementById('dept-input').value = response.data.dept || '';
      document.getElementById('qty-input').value = response.data.qty || '';
      document.getElementById('expiry-input').value = response.data.expiry || '';
    }
  });
});

// 7. 監聽遠端網頁控制按鈕點擊
document.getElementById('btn-remote-check').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "clickCheck" });
});

document.getElementById('btn-remote-submit').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "clickSubmit" }, (response) => {
    if (response && response.success) {
      downloadReport(response.data);
    }
  });
});

// 8. 監聽「捕捉 🔍」按鈕點擊
document.getElementById('btn-capture-serial').addEventListener('click', () => {
  sendMessageToActiveTab({ action: "captureSerial" }, (response) => {
    if (response && response.value !== undefined) {
      document.getElementById('serial-input').value = response.value;
    }
  });
});

// 9. 輔助下載函式
function downloadReport(data) {
  const now = new Date();
  const formatNum = (n) => n.toString().padStart(2, '0');
  const year = now.getFullYear();
  const month = formatNum(now.getMonth() + 1);
  const date = formatNum(now.getDate());
  const hour = formatNum(now.getHours());
  const min = formatNum(now.getMinutes());
  const sec = formatNum(now.getSeconds());
  
  const filename = `report_${year}${month}${date}_${hour}${min}${sec}.txt`;
  
  const content = `系統流水號：${data.serial}
採購單號：${data.po}
產品代碼：${data.code}
進貨部門：${data.dept}
進貨數量：${data.qty}
產品效期：${data.expiry}
執行結果：入庫成功
執行時間：${data.timestamp}
`;
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 10. 監聽「🎲 亂數產資料」按鈕點擊
document.getElementById('btn-random-data').addEventListener('click', () => {
  // 10-1. 隨機產生符合業務規則的數值
  const po = `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const code = ['FALO-R1', 'FALO-G2', 'FALO-B3', 'FALO-Y4', 'FALO-P5'][Math.floor(Math.random() * 5)];
  const dept = ['PUR', 'WH', 'QC', 'RD'][Math.floor(Math.random() * 4)];
  const qty = Math.floor(10 + Math.random() * 490);
  
  // 10-2. 取得今天的台北時間 (格式: YYYY-MM-DD)
  const now = new Date();
  const options = { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);
  let year, month, day;
  for (const part of parts) {
    if (part.type === 'year') year = part.value;
    if (part.type === 'month') month = part.value;
    if (part.type === 'day') day = part.value;
  }
  const todayStr = `${year}-${month}-${day}`;
  
  // 10-3. 填入外掛側邊欄的輸入控制項
  document.getElementById('po-input').value = po;
  document.getElementById('code-input').value = code;
  document.getElementById('dept-input').value = dept;
  document.getElementById('qty-input').value = qty;
  document.getElementById('expiry-input').value = todayStr;

});

// 11. 監聽「🗑️ 一鍵清空」按鈕點擊
document.getElementById('btn-clear-all').addEventListener('click', () => {
  // 11-1. 清空外掛側邊欄的所有控制項數值
  document.getElementById('po-input').value = '';
  document.getElementById('code-input').value = '';
  document.getElementById('dept-input').value = '';
  document.getElementById('qty-input').value = '';
  document.getElementById('expiry-input').value = '';
  document.getElementById('serial-input').value = '';
  
  // 11-2. 發送清空通知給主網頁 DOM
  sendMessageToActiveTab({ action: "clearForm" });
});

// 12. 監聽「匯出 CSV」按鈕點擊
document.getElementById('btn-export-csv').addEventListener('click', () => {
  const po = document.getElementById('po-input').value;
  const code = document.getElementById('code-input').value;
  const dept = document.getElementById('dept-input').value;
  const qty = document.getElementById('qty-input').value;
  const expiry = document.getElementById('expiry-input').value;
  
  // 建立 CSV 內容
  const headers = ['po', 'code', 'dept', 'qty', 'expiry'];
  const row = [po, code, dept, qty, expiry].map(val => {
    let escaped = val.toString().replace(/"/g, '""');
    if (escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')) {
      escaped = `"${escaped}"`;
    }
    return escaped;
  });
  
  const csvContent = headers.join(',') + '\n' + row.join(',');
  
  // 下載檔案
  const now = new Date();
  const formatNum = (n) => n.toString().padStart(2, '0');
  const timestamp = `${now.getFullYear()}${formatNum(now.getMonth() + 1)}${formatNum(now.getDate())}_${formatNum(now.getHours())}${formatNum(now.getMinutes())}${formatNum(now.getSeconds())}`;
  const filename = `export_${timestamp}.csv`;
  
  // 加入 BOM (\ufeff) 避免 Excel 開啟時中文亂碼
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// 13. 監聽「匯入 CSV」按鈕點擊
document.getElementById('btn-import-csv').addEventListener('click', () => {
  document.getElementById('csv-file-input').click();
});

document.getElementById('csv-file-input').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    parseAndFillCSV(text);
    // 重置以利於重複選取同檔案觸發 change
    event.target.value = '';
  };
  reader.readAsText(file);
});

// 14. 解析並填入 CSV 邏輯
function parseAndFillCSV(csvText) {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length < 2) {
    alert('CSV 格式錯誤：資料列不足。');
    return;
  }
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/^\ufeff/, '').toLowerCase());
  const values = lines[1].split(',').map(v => {
    let val = v.trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.substring(1, val.length - 1).replace(/""/g, '"');
    }
    return val;
  });
  
  const data = {};
  headers.forEach((header, index) => {
    data[header] = values[index] || '';
  });
  
  if (data.po !== undefined) document.getElementById('po-input').value = data.po;
  if (data.code !== undefined) document.getElementById('code-input').value = data.code;
  if (data.dept !== undefined) document.getElementById('dept-input').value = data.dept;
  if (data.qty !== undefined) document.getElementById('qty-input').value = data.qty;
  if (data.expiry !== undefined) document.getElementById('expiry-input').value = data.expiry;
}
