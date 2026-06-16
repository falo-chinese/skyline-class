# 🕹️ Skyline PM 中控台控制變數與指標 (Control Fields)

**用途**：對應中控指揮中心網頁的底層控制參數。
**對應課程**：第六章：PM 中控收斂與管理者視角。

---

## 🏆 Skyline PM 核心控制欄位指標 (JSON/Text)

```json
{
  "project_name": "星河科技智慧文件投標專案",
  "target_client": "國家檔案數位發展委員會",
  "project_budget": 5000000,
  "project_stage": "Stage 5/7 - 長文件組裝",
  "overall_compliance_coverage": 0.90,
  "handover_safety_score": 0.85,
  "active_risks": [
    {
      "risk_id": "RISK-001",
      "risk_level": "WARNING_YELLOW",
      "associated_rfp_requirement": "REQ-01 (基本實績)",
      "description": "2025年鼎盛ERP專案驗收證明公文尚未歸檔影本",
      "impact": "第一階段資格審查時會被直接退件廢標",
      "action_owner": "PM 志明",
      "action_deadline": "2026-06-02 17:00",
      "status": "IN_PROGRESS"
    }
  ],
  "knowledge_assets": {
    "brain_indexed_files": 5,
    "reusable_components_count": 5,
    "components": [
      "company_profile_component.md",
      "2025_apex_erp_project_case.md",
      "information_security_policy.md",
      "skyline_pm_methodology_component.md",
      "training_and_handover_plan.md"
    ]
  }
}
```
