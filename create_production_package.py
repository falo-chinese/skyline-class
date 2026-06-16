import os
import shutil
import zipfile

source_root = "/Users/force/Google_Antigravity/horizon_class/skyline-class/class2"
dest_root = os.path.join(source_root, "production_data")
zip_filepath = os.path.join(source_root, "production_data.zip")

# Ensure fresh directories
if os.path.exists(dest_root):
    shutil.rmtree(dest_root)
os.makedirs(dest_root, exist_ok=True)
os.makedirs(os.path.join(dest_root, "docs"), exist_ok=True)

# Files to copy and modify
files_to_copy = [
    ("skyline_set_menu.md", "skyline_set_menu.md"),
    ("skyline_set_menu.html", "skyline_set_menu.html"),
    ("notebooklm_master_guide.md", "notebooklm_master_guide.md"),
    ("notebooklm_master_guide.html", "notebooklm_master_guide.html"),
    ("local_ai_pm_architecture.md", "local_ai_pm_architecture.md"),
    ("local_ai_pm_architecture.html", "local_ai_pm_architecture.html"),
    ("pm_experience_responses_raw.csv", "pm_experience_responses_raw.csv"),
    ("docs/02_tender_workflow.md", "docs/02_tender_workflow.md"),
    ("docs/02_tender_workflow.html", "docs/02_tender_workflow.html"),
    ("docs/04_artifact_management.md", "docs/04_artifact_management.md"),
    ("docs/04_artifact_management.html", "docs/04_artifact_management.html"),
    ("ai_finance_demo.md", "ai_finance_demo.md"),
    ("ai_finance_demo.html", "ai_finance_demo.html"),
    ("agent_tools_guide.md", "agent_tools_guide.md"),
    ("agent_tools_guide.html", "agent_tools_guide.html"),
    ("bidding_control_tower.md", "bidding_control_tower.md"),
    ("bidding_control_tower.html", "bidding_control_tower.html"),
    ("notebooklm_index_map.md", "notebooklm_index_map.md"),
    ("notebooklm_index_map.html", "notebooklm_index_map.html"),
    ("reference/skyline-prompt-manager/docs/ai_unified_gateway_notebooklm.png", "reference/skyline-prompt-manager/docs/ai_unified_gateway_notebooklm.png")
]

sheets_url = "https://docs.google.com/spreadsheets/d/1z5MlDimJl7sO0JuD5LKVPqJkRzldPUt51nqoSM3rt3Q/edit?usp=sharing"

# Copy files
for src, dst in files_to_copy:
    src_path = os.path.join(source_root, src)
    dst_path = os.path.join(dest_root, dst)
    # Ensure nested folders exist
    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    shutil.copy(src_path, dst_path)

# Copy the demo/ai-parser-demo1 folder recursively
demo_src = os.path.join(source_root, "demo/ai-parser-demo1")
demo_dst = os.path.join(dest_root, "demo/ai-parser-demo1")
if os.path.exists(demo_dst):
    shutil.rmtree(demo_dst)
shutil.copytree(demo_src, demo_dst)

# Copy the part1 ~ part6 folders recursively
for i in range(1, 7):
    part_name = f"part{i}"
    part_src = os.path.join(source_root, part_name)
    part_dst = os.path.join(dest_root, part_name)
    if os.path.exists(part_dst):
        shutil.rmtree(part_dst)
    if os.path.exists(part_src):
        shutil.copytree(part_src, part_dst)

# Copy the unified workspace zip if exists
workspace_zip_src = os.path.join(source_root, "class2_workspace.zip")
workspace_zip_dst = os.path.join(dest_root, "class2_workspace.zip")
if os.path.exists(workspace_zip_src):
    shutil.copy(workspace_zip_src, workspace_zip_dst)

# Revert placeholders to production data
for root, dirs, filenames in os.walk(dest_root):
    for filename in filenames:
        filepath = os.path.join(root, filename)
        
        # We process text files
        if filename.endswith(('.csv', '.md', '.html')):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Revert names & locations
            content = content.replace("Julia", "辜芃榛")
            content = content.replace("台西", "嘉義")
            
            # Revert executive titles if necessary
            content = content.replace("G總", "辜總")
            content = content.replace("C董", "陳董")
            
            # Ensure no "FALO" or "falo" or "地平線" or "Horizon" exists in the output
            content = content.replace("FALO", "Skyline")
            content = content.replace("falo", "skyline")
            content = content.replace("地平線", "Skyline")
            content = content.replace("Horizon", "Skyline")
            content = content.replace("horizon", "skyline")
            
            # Revert links
            # md link
            content = content.replace(
                "[專案執行經驗與改善對策庫 (pm_experience_responses_raw.csv)](file:///Users/force/Google_Antigravity/horizon_class/skyline-class/class2/pm_experience_responses_raw.csv)",
                f"[專案執行經驗與改善對策庫]({sheets_url})"
            )
            # html links
            content = content.replace(
                'href="pm_experience_responses_raw.csv" target="_blank">專案執行經驗與改善對策庫 (pm_experience_responses_raw.csv)</a>',
                f'href="{sheets_url}" target="_blank">專案執行經驗與改善對策庫</a>'
            )
            content = content.replace(
                'href="../pm_experience_responses_raw.csv" target="_blank">專案執行經驗與改善對策庫 (pm_experience_responses_raw.csv)</a>',
                f'href="{sheets_url}" target="_blank">專案執行經驗與改善對策庫</a>'
            )
            
            # Revert descriptions
            content = content.replace("與這份 CSV 檔案綁定", "與這份 Google Sheet 綁定")
            content = content.replace("作為具體的「地端真理中心 (SSOT)」資料流範例", "作為具體的「地端真理中心 (SSOT)」資料流範例（Google Sheet）")
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

# Zip the production_data directory
if os.path.exists(zip_filepath):
    os.remove(zip_filepath)

with zipfile.ZipFile(zip_filepath, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, filenames in os.walk(dest_root):
        for filename in filenames:
            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, dest_root)
            zipf.write(filepath, rel_path)

print(f"SUCCESS: Created local production data package at '{zip_filepath}'")
print(f"Ignored directory at '{dest_root}' also kept for easy browsing.")
