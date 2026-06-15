import os
import zipfile
from datetime import datetime

source_dir = "/Users/force/Google_Antigravity/horizon_class/skyline-class/class2/reference/falo-prompt-manager"
backup_dir = "/Users/force/Google_Antigravity/horizon_class/skyline-class/backup/prompt-manager-backups"
version = "v2.2"
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
zip_filename = f"falo_prompt_manager_{version}_{timestamp}.zip"
zip_filepath = os.path.join(backup_dir, zip_filename)

os.makedirs(backup_dir, exist_ok=True)

changelog_content = f"""==================================================
FALO Prompt Manager 備份版本重點說明
==================================================
版本: {version}
時間戳: {timestamp}
品牌標記: Falo x Force Cheng
日期: 2026/6/15
--------------------------------------------------
新增與優化功能說明：
1. PWA 主中心新增「精簡模式」與「完整模式」切換鈕 (Compact/Full Mode Switcher)：
   - 於頂部動作列加入模式切換的 Segmented Control，預設為「精簡模式」並自動在 localStorage 記憶使用者最後選取的狀態。
   - 精簡模式下保留全部動作與編輯功能，但從卡片檢視與編輯器網格中隱藏狀態、說明、標籤、預期輸出、人工檢查點、目標 AI、版本等行政與次要欄位，提供乾淨、專注於複製 Prompt 的極簡檢視。
2. 兩端版本號同步升級至 v2.2：
   - PWA 主網頁、Web App 資訊宣告、以及 Chrome 衛星外掛側邊欄版本顯示統一升級為 v2.2，發布日期為 2026/6/15。
"""

# Write temporary changelog file inside the PWA source directory to package it
changelog_path = os.path.join(source_dir, "changelog_backup.txt")
with open(changelog_path, "w", encoding="utf-8") as f:
    f.write(changelog_content)

print(f"DEBUG: Generating backup archive at: {zip_filepath}")

# Zip the source directory
with zipfile.ZipFile(zip_filepath, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(source_dir):
        # Exclude common directories to ignore
        for d in ['.git', 'node_modules', '.tmp', 'dist', 'build']:
            if d in dirs:
                dirs.remove(d)
        
        for file in files:
            # Exclude OS metadata and old zips
            if file in ['.DS_Store', 'Thumbs.db'] or file.endswith('.zip'):
                continue
                
            filepath = os.path.join(root, file)
            # Compute relative path inside zip
            rel_path = os.path.relpath(filepath, source_dir)
            zipf.write(filepath, rel_path)

# Remove the temporary changelog file
if os.path.exists(changelog_path):
    os.remove(changelog_path)

print(f"SUCCESS: Created backup zip file '{zip_filename}' in '{backup_dir}'")
print("\nChangelog included in zip:")
print(changelog_content)
