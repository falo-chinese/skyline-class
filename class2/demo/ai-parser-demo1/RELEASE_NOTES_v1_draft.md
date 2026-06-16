# Skyline AI Parser Demo 1 v1.0 草稿版

Date: 2026-06-16  
Credit: Skyline x Force Cheng 2026/6/16  
Target path: `__Skyline_TAIWAN__/ai-parser-demo1`

## 改版重點

- 建立可掛 GitHub Pages 的 RWD 介紹頁。
- 對外名稱調整為 `Skyline AI Parser Demo 1`。
- 保留 Chrome Extension 資源包下載，並改成公開發佈用檔名。
- 加入 SEO、GEO、Open Graph、AI-readable meta tags、JSON-LD、HTML 備註與隱藏浮水印。
- 放入並重新命名四個教學素材：兩張截圖、兩支操作錄影。
- 新增素材展示區，讓學員能看見公開查詢頁、AI 側邊欄、實際操作錄影。
- 修正手機 RWD 長路徑與隱藏浮水印造成的水平 overflow。
- 將操作錄影由 QuickTime `.mov` 轉為瀏覽器友善的 H.264 `.mp4`。
- 所有素材卡支援放大預覽與直接下載。
- 補上 Vibe Coding、Chrome 外掛查詢政府網站、AI 爬蟲與 HITL 的整體定位。
- 新增 ETL 教學區，拆解 Extract / Transform / Load 與 CSV、JSON、Excel、HTML 報告、HTML 互動查詢式輸出。
- 新增 AI 模型選擇區，說明地端規則、小模型、雲端模型與高階模型的分工，以及此類查詢不必預設使用最高級模型。
- 新增電腦自動化模式區，說明資料流 / API、Chrome 外掛頁面操作、Computer Use、人機協作混合模式的差異。
- 新增三種頁面版型顏色：清爽淺色、櫻花粉淺色、深色展示。
- 替換第一支影片為自動化操作工作流示範。
- 更新第二支影片說明為多家公司與不完整公司名稱自動轉換示範。
- 重新排版：縮小主標題，將操作介面素材區提前到頁面上方，桌機改為四卡 1x4 顯示。

## 驗證

- `python3 -m unittest tests.test_tsmc_public_query_extension.TsmcPublicQueryExtensionTest.test_github_pages_intro_contains_resource_pack_and_metadata`
- `node --check` for extension scripts.
- Full Python unittest suite: 28 tests passed.
- Browser RWD verification: desktop and 390px mobile viewport checked; mobile skylinetal overflow fixed.
- Browser media verification: image cards and video cards can open in the in-page viewer; public MP4 and download URLs return HTTP 200 after deployment.
