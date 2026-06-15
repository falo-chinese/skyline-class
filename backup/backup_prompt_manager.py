import os
import zipfile
from datetime import datetime

source_dir = "/Users/force/Google_Antigravity/horizon_class/skyline-class/class2/reference/falo-prompt-manager"
backup_dir = "/Users/force/Google_Antigravity/horizon_class/skyline-class/backup/prompt-manager-backups"
version = "v2.1"
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
1. 置頂固定變數面板 (Sticky Variables Panel)：
   - 將變數輸入面板移至外掛側邊欄最上方固定顯示。
   - 支援即時變數代入預覽與變數快取記憶。
2. 五級字型大小調整 (5-Level Font Scaling)：
   - 側邊欄提供 5 個字型調整等級，使用者可透過 +/- 按鈕即時縮放文字，改善閱讀體驗。
3. 雙向身分握手機制與心跳偵測 (Bi-directional Handshake & Heartbeat)：
   - PWA 端新增連線狀態徽章 UI。
   - 外掛與 PWA 間每 5 秒發送心跳探測 PING，並設定 6 秒超時監控，自動更新雙向連線狀態與連線分頁資訊。
4. 多 PWA 連線選擇器 (Multi-PWA Connection Selector)：
   - 當開啟多個 PWA 網頁時，外掛同步控制區會顯示下拉選單 `<select id="pwaTargetSelector">`，允許自由切換要連線的目標 PWA 分頁，並指向性進行拉取/推送。
5. CSV Overwrite 覆寫與 PWA Metadata 機制：
   - 支援匯入新 CSV 時動態定義 `window.__FALO_PWA_METADATA__`，確保變數與欄位名稱映射的即時更新與匯入還原。
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
