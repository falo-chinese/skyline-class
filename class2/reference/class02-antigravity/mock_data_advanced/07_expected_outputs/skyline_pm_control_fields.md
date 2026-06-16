# 🕹️ Skyline PM 進階中控台控制參數 (Control Fields)

**用途**：對應進階中控指揮中心網頁的底層控制參數，包含黃紅橘多重風險指標。

---

## 🏆 Skyline PM 進階控制欄位指標 (JSON/Text)

```json
{
  "project_name": "星河科技智慧文件投標專案 - 進階實戰版",
  "target_client": "國家檔案數位發展委員會",
  "project_budget": 5000000,
  "project_stage": "Stage 5/7 - 長文件組裝與多樣本決策",
  "overall_compliance_coverage": 1.00,
  "handover_safety_score": 0.95,
  "portfolio_selection": {
    "recommended_case": "2023_stellar_document_automation_case.md",
    "recommended_case_value": 3500000,
    "domain_match": "智慧文件 (100% PERFECT)",
    "documents_status": "FULLY_ARCHIVED_GREEN"
  },
  "active_risks": [
    {
      "risk_id": "RISK-001",
      "risk_level": "RESOLVED_GREEN",
      "associated_rfp_requirement": "REQ-02 (PM證照)",
      "description": "PM志明PMP證件於2024年底過期失效",
      "impact": "廢標致命風險",
      "mitigation_action": "志明已於15:30登入PMI官網線上完成PDU換證展延，展延證件影本已掃描歸檔",
      "status": "COMPLETED"
    },
    {
      "risk_id": "RISK-002",
      "risk_level": "ENHANCED_GREEN",
      "associated_rfp_requirement": "REQ-03 (SLA維護)",
      "description": "星河標準SLA為4小時，RFP技術要求為2小時",
      "impact": "技術評選不合格",
      "mitigation_action": "在編譯投標書第二章時，由Agent進行小幅增強，承諾緊急維護SLA為2小時",
      "status": "COMPLETED"
    }
  ],
  "knowledge_assets": {
    "brain_indexed_files": 10,
    "reusable_components_count": 10,
    "components": [
      "company_profile_component.md",
      "2025_apex_erp_project_case.md",
      "2024_universe_crm_project_case.md",
      "2023_stellar_document_automation_case.md",
      "2021_galaxy_portal_project_case.md",
      "information_security_policy.md",
      "skyline_pm_methodology_component.md",
      "training_and_handover_plan.md",
      "maintenance_service_component.md",
      "pm_resume_chihming.md",
      "architect_resume_chunghua.md"
    ]
  }
}
```
