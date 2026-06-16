# 📋 v2.6 智慧投標控制塔與 Agent 指南 (NotebookLM 共享大腦與 Prompt Hub 整合版) 任務清單

- [x] 升級 `class2/agent_tools_guide.md` 與 `agent_tools_guide.html` (整合本地 Excel 與實體 PDF，去敏化處理)
- [x] 升級 `class2/bidding_control_tower.html` 與 `bidding_control_tower.md` (隱藏舊有核心流程圖，聚焦主管決策中控台，支援 api 對帳模式，整合完整度與差異分析報告)
- [x] 重命名所有 `falo` 為 `skyline`，將 `Horizon/地平線` 替換為 `Skyline`
- [x] 建立三大大腦範例 Markdown 資源包並打包為 `notebooklm_shared_brains.zip`
- [x] 於 `notebooklm_master_guide.html` 及 `notebooklm_master_guide.md` 新增下載與嵌入 AI Gateway 截圖
- [x] 新增 `notebooklm_index_map.html` / `notebooklm_index_map.md` 導航索引手冊與 Prompt 範本
- [x] 於 `notebooklm_master_guide.html` 與 `notebooklm_master_guide.md` 寫入導覽底稿與一鍵複製 Clipboard + Toast 功能
- [x] 同步更新「大腦三：專案執行經驗」之 5 組黃金 Prompt（3簡單，2複雜，第一條包含寵物嘉年華意外防坑檢索）
- [x] 整合 Prompt Hub PWA 與 Chrome 衛星外掛側邊欄引導教學與相容 CSV 資源包 (v2.5)
- [x] 重構 Prompt Hub 導引手冊結構與 falo-taiwan 整合 (v2.6)
  - [x] 重組 `prompt_hub_guide.html` 及 `prompt_hub_guide.md` 手冊，優先介紹 PWA 與 Chrome Extension，接著提供 falo-taiwan 連結，再介紹 NotebookLM 整合與 CSV 導入
  - [x] 在 `notebooklm_master_guide.html` 與 `md` 的 Section 8 頂部加入 `[!TIP]` 指導與下載/匯入 Prompt 資源包說明
  - [x] 複製 CSV 提示詞資源包至 `class2/` 根目錄，並在 `generate_all_workspaces.py` 與 `create_production_package.py` 中整合拷貝與安全清洗
- [x] 重新執行全部解壓工作區生成（`generate_all_workspaces.py`）、生產編譯（`create_production_package.py`）與地端備份（`create_backup.py`）
- [x] 成功將代碼推送至雙 GitHub 遠端倉庫（`chinese` 與 `origin`）
- [x] 更新 `walkthrough.md` 成果說明書版本紀錄並修正一致性

