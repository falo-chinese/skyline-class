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

# Set version explicitly for v2.6 release
new_major = 2
new_minor = 6
new_version = f"v{new_major}.{new_minor}"
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
zip_filename = f"{project_prefix}_{new_version}_{timestamp}.zip"
zip_filepath = os.path.join(backup_dir, zip_filename)

changelog_content = """==================================================
Skyline Class02 備份版本重點說明
版本: {}
時間戳: {}
1. 雙軌 Prompt (簡單版 vs 強 Agent 認知版) 對比架構升級 (v1.2)：
   - 全面引入「✍️ 簡單 Prompt 模式」與「🧠 高段 Agent 模式」的對比展示。
   - 用戶可在控制塔 Inspector 面板動態切換，Prompt 文字與 CLI 指令即時切換。
   - Console CLI 模擬日誌升級，在強 Agent 模式下模擬輸出極寫實的 Chain-of-Thought (CoT) 思考軌跡。
2. 目錄名稱與地端資料庫架構升級：
   - 取代 raw_tenders / staging 等英文預留名，全面改為本地有意義的「原始標案資源/」與「標案工作暫存區/」中文資料夾。
   - 第一步檔案整理從 JSON Manifest 升級為地端 SQLite 資料庫建置與寫入，自動建立 files_registry 與 extracted_metadata 兩張實體表，模擬 SSOT。
3. 項目編譯打包與本地備份 (LOCAL ONLY)：
   - 包含去識別化與地端真正資料版的編譯打包腳本更新。
   - 保持地端 (LOCAL ONLY)，未獲得主管指示 git push 前，不執行任何雲端上傳命令。
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
