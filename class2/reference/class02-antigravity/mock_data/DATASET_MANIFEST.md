# 📋 星河 Class 02 實作資料集清單與映射說明 (Manifest)

本 Manifest 用於詳細記錄 `class02/mock_data/` 下所有檔案的用途、對應的課程階段以及前後對帳關係：

| 檔案相對路徑 | 檔案用途說明 | 對應課程段落 | 學員任務與演練 | 預期輸出對照 | 是否為標準答案 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `01_rfp/mock_rfp_summary.md` | 1頁精簡版模擬招標書 | 2. 模擬 RFP 摘要 | 快速提取核心要求 | 無 | 否 |
| `01_rfp/mock_rfp_full.md` | 3頁完整版模擬招標書 | 4. 現場練習工作表 | 進行深度合規分析與條款拆解 | `05_answer_keys/` | 否 |
| `02_internal_knowledge_assets/company_profile_component.md` | 星河公司簡介積木元件 | 3. 內部知識積木 | 熟悉資本額與組織資產 | 無 | 否 |
| `02_internal_knowledge_assets/2025_apex_erp_project_case.md` | 鼎盛 ERP 專案 450w 實績 | 3. 內部知識積木 | 作為 REQ-01 資格對映積木 | 無 | 否 |
| `02_internal_knowledge_assets/information_security_policy.md` | 資訊安全維護政策積木 | 3. 內部知識積木 | 作為 REQ-02 資安切結積木 | 無 | 否 |
| `02_internal_knowledge_assets/falo_pm_methodology_component.md` | FALO PM 流程映射方法論 | 3. 內部知識積木 | 作為 REQ-03 技術方法論積木 | 無 | 否 |
| `02_internal_knowledge_assets/training_and_handover_plan.md` | 教育訓練與無痛交接大綱 | 3. 內部知識積木 | 作為 REQ-04 培訓與交接積木 | 無 | 否 |
| `02_internal_knowledge_assets/maintenance_service_component.md` | 售後維護支持 SLA 元件 | 3. 內部知識積木 | 對齊維護條款，小幅增強 | 無 | 否 |
| `03_missing_items/missing_items_register.md` | 實體缺件登錄表 (公文未歸檔) | 5. 缺件與避險 | 練習查出 REQ-01 的致命缺件 | 無 | 否 |
| `03_missing_items/risk_notes.md` | 避險與偽造防線核心講義 | 5. 缺件與避險 | 沉澱真實誠信與 AI 邊界觀念 | 無 | 否 |
| `04_student_templates/requirement_extraction_blank.md` | Blank 需求抽取表格 | 4. 現場練習工作表 | 練習抽取 RFP 7 欄位要求 | `05_answer_keys/` | 否 (練習範本) |
| `04_student_templates/compliance_matrix_blank.md` | Blank 回應對照矩陣表 | 4. 現場練習工作表 | 練習對映歷史積木與章節 | `05_answer_keys/` | 否 (練習範本) |
| `04_student_templates/risk_audit_blank.md` | Blank 避險決策卡 | 4. 現場練習工作表 | 練習判斷高風險與決策 | `05_answer_keys/` | 否 (練習範本) |
| `05_answer_keys/requirement_extraction_answer.md` | 7 欄式需求表標準答案 | 4. 現場練習工作表 | 對答案使用 | 無 | **🟢 是** |
| `05_answer_keys/compliance_matrix_answer.md` | 6 欄式回應矩陣標準答案 | 4. 現場練習工作表 | 對答案使用 | 無 | **🟢 是** |
| `05_answer_keys/risk_audit_answer.md` | 缺件避險分析標準答案 | 4. 現場練習工作表 | 對答案使用 | 無 | **🟢 是** |
| `05_answer_keys/expected_management_summary.md` | 預期管理摘要標準答案 | 6. 中控收束與管理 | 對齊管理者中控資訊 | 無 | **🟢 是** |
| `06_antigravity_prompts/` (5個檔案) | 5 階段 AIDE 投遞 Prompts | 5. Antigravity 指令 | 學員複製並投投至 Agent | `07_expected_outputs/` | 否 |
| `07_expected_outputs/proposal_chapter_2_methodology_draft.md` | 標案第二章合規草稿產出 | 5. Antigravity 指令 | 對齊 Agent 一鍵組裝成果 | 無 | **🟢 是** |
| `07_expected_outputs/executive_status_summary.md` | 總經理 4 防線審批結果 | 6. 中控收束與管理 | 對照總經理指令審核結果 | 無 | **🟢 是** |
| `07_expected_outputs/falo_pm_control_fields.md` | 中控台控制欄位同步輸出 | 6. 中控收束與管理 | 對齊 FALO PM 指標同步 | 無 | **🟢 是** |

---

## 🧬 前後一致性對帳防線設計

為確保實作的嚴密性，資料集內藏了以下對帳關係：
1. **實績門檻比對**：RFP 規定需大於 **300 萬** 實績 ➔ 學員定位 `/02_.../2025_apex_erp_project_case.md` 金額為 **450 萬** (合規)。
2. **資格硬性漏件**：RFP 規定必須附上「驗收合格公文影本」 ➔ 盤點 `/03_.../missing_items_register.md` 發現鼎盛專案公文「尚未歸檔」(黃燈中風險) ➔ 觸發 PM 避險動作。
3. **資安切結書對映**：RFP 規定必須檢附資安切結書，要包含資料不落地 ➔ 學員比對 `/02_.../information_security_policy.md` 證實完全符合 (綠燈無風險)。
