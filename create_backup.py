import os
import re
import zipfile
from datetime import datetime

backup_dir = "/Users/force/Google_Antigravity/horizon_class/skyline-class/backup"
source_dir = "/Users/force/Google_Antigravity/horizon_class/skyline-class"
project_prefix = "skyline_class"

os.makedirs(backup_dir, exist_ok=True)

# Find existing backups to determine the version
files = os.listdir(backup_dir)
pattern = re.compile(rf"^{project_prefix}_v(\d+)\.(\d+)_\d+_\d+\.zip$")

max_major = 0
max_minor = 0

for file in files:
    match = pattern.match(file)
    if match:
        major = int(match.group(1))
        minor = int(match.group(2))
        if (major, minor) > (max_major, max_minor):
            max_major = major
            max_minor = minor

# Set version explicitly for v2.8 release
new_major = 2
new_minor = 8
new_version = f"v{new_major}.{new_minor}"
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
zip_filename = f"{project_prefix}_{new_version}_{timestamp}.zip"
zip_filepath = os.path.join(backup_dir, zip_filename)

changelog_content = """==================================================
Skyline Class02 備份版本重點說明
版本: {}
時間戳: {}
1. 側邊欄重構與精簡收斂 (v2.8)：
   - 精簡「引導總覽」區塊為 5 大核心入口（新增 course_overview.html 本次課程說明與 Skyline Prompt 提示詞管理專案）。
   - 新增「參考資源」區塊，整合本機 ETL 轉運站、AI OCR 辨識、影音優化等專案。
   - 將所有其他輔助教材與工具（核心教材、架構共識、教材工作台、控制塔 POC）移至「其他」區塊。
2. 實戰橫幅與圖片更換：
   - 橫幅圖片更換為全新 ChatGPT 橫幅 png 圖片。
3. 雙倉庫自動更新與部署：
   - 全套 workspaces、production_data.zip 已重新生成，並成功推送至 falo-taiwan 及 falo-chinese 遠端 GitHub 倉庫。
"""

print(f"DEBUG: Next version computed as {new_version}")
print(f"DEBUG: Zip destination: {zip_filepath}")

# Write temporary changelog file to include in zip
changelog_path = os.path.join(source_dir, "changelog_backup.txt")
with open(changelog_path, "w", encoding="utf-8") as f:
    f.write(changelog_content.format(new_version, timestamp))

# Zip the source directory (excluding .git)
with zipfile.ZipFile(zip_filepath, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files_in_dir in os.walk(source_dir):
        # Exclude .git and backup directories
        if '.git' in dirs:
            dirs.remove('.git')
        if 'backup' in dirs:
            dirs.remove('backup')
        for file in files_in_dir:
            file_path = os.path.join(root, file)
            # Avoid zipping the zip file itself if it's placed inside source
            if file_path == zip_filepath:
                continue
            rel_path = os.path.relpath(file_path, source_dir)
            zipf.write(file_path, rel_path)

# Remove temporary changelog file from working dir
if os.path.exists(changelog_path):
    os.remove(changelog_path)

print(f"SUCCESS: Created backup zip file '{zip_filename}' in '{backup_dir}'")
print(changelog_content.format(new_version, timestamp))
