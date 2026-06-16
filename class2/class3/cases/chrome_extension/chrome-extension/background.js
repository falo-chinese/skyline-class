// WATERMARK: Falo x Force Cheng 2026/6/6
// Project: 銀河 ERP 填單助手 (V1)
// Description: 點擊外掛圖示直接開啟右側 Side-panel

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
