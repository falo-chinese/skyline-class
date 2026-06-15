# Class02 Knowledge Engineering Lessons Learned

> 本文件記錄 Class02 與 `mock_data/` 生成過程中，從教材製作意外挖掘出的知識工程工作模式。  
> 狀態：心得沉澱版 v0.1  
> 目的：保留本次方法論發現，避免未來重新發明一次。

---

## 1. 核心發現

這次原本只是要產生一包學員實作資料：

```text
27 份 Markdown 文件
```

但在驗收過程中，我們發現真正更有價值的資產，可能不是這 27 份文件本身，而是：

- `create_mock_data.py`
- 生成規則
- 資料模型
- Markdown 模板
- 前後一致性驗證方式
- 可重跑、可維護、可改版的生成流程

核心句：

> 不要把長文件當作文章來寫，而要把文件當作代碼來編譯與治理。

這句話可能成為 AIDE 與 Antigravity 後續的重要方法論之一。

---

## 2. 從「寫文件」到「編譯文件」

傳統文件工作常見流程：

```text
人
↓
Word
↓
文件
```

AIDE 觀察到的新流程：

```text
知識
↓
規則
↓
模板
↓
生成器
↓
文件
```

這代表長文件不只是文字輸出，而是一個可以被工程化的生產流程。

在這次 `mock_data/` 生成中，aaa 沒有逐份手寫 27 個 `.md`，而是先建立 `create_mock_data.py`，再由腳本產出整包資料。這讓文件變成一種可編譯成果，而不是一次性的文字工件。

---

## 3. 四個重要發現

### 發現一：不要把長文件當文章

招標書、教材包、標準答案、Prompt 指令、FALO PM 中控欄位，都不是彼此孤立的文章。它們互相引用、互相對帳、互相驗證。

如果用文章思維處理，就會變成：

- 每份文件各寫各的
- 名稱、金額、風險等級容易漂移
- 改版時到處找字串
- 學員練習表與標準答案可能對不上

如果用工程思維處理，就會變成：

- 先定義資料模型
- 再定義規則
- 再建立模板
- 最後批量生成文件
- 用抽樣驗收確認端到端一致性

### 發現二：規則與生成方法是更高階資產

27 份教材文件是資產。

但更高階的資產是：

> 如何穩定、可重跑、可驗證地生成這 27 份教材文件。

這代表知識資產化不只發生在文件層，也可以發生在生成規則層。

### 發現三：這與 Class02 主題高度一致

Class02 的教學主線是：

```text
歷史文件
↓
知識化
↓
資產化
↓
元件化
↓
成果
```

這次 aaa 的做法則是：

```text
文件需求
↓
規則抽取
↓
模板設計
↓
生成器
↓
文件資料集
```

兩者本質一致：都是把一次性的內容，升級成可重用、可維護、可治理的知識資產。

### 發現四：Knowledge as Code / Document as Code

這次開始看到兩個方向：

- **Knowledge as Code**：知識不只存成文件，而是被轉成結構、規則、元件、資料模型。
- **Document as Code**：長文件不只靠人手寫，而是可由模板與生成器編譯、重跑、驗證。

這不代表所有文件都要程式化，而是代表高價值、長週期、多版本、多約束的文件，應該優先工程化。

---

## 4. 對 AIDE 的意義

AIDE 不只是「AI 協助寫文件」。

AIDE 更接近：

> 用 AI 與工程方法，把長文件工作轉成可規劃、可生成、可檢查、可治理的流程。

這次 `create_mock_data.py` 的出現，讓 AIDE 從文件方法論進一步靠近文件工程：

- RFP 條款是輸入限制
- 內部知識元件是可調用素材
- 空白表是學員工作介面
- 標準答案是驗收基準
- Prompt 是操作程序
- expected outputs 是產出規格
- FALO PM 欄位是管理回推接口

這些若能由規則與生成器統一管理，AIDE 就不只是教學框架，而是長文件工程 runtime 的雛形。

---

## 5. 對教材工程的意義

這次發現對教材工程非常重要。

傳統教材常見問題：

- 講師版、學員版、答案版各自維護
- 範例資料與標準答案不一致
- 一次改版需要人工同步很多檔
- 課堂練習無法穩定重現

Script-based 生成方式可以讓教材變成一個可維護的資料集：

- 先定義教學情境
- 再定義資料包
- 再定義練習表
- 再定義答案
- 最後定義驗收與中控輸出

這讓教材具備：

- 可重跑
- 可改版
- 可去識別化
- 可公開版/內部版分流
- 可進行端到端抽樣驗收

---

## 6. 對 SME 的意義

對中小企業來說，這個發現很關鍵。

SME 最常遇到的不是「完全沒有資料」，而是：

- 有資料但找不到
- 有文件但不可重用
- 有 SOP 但版本不清
- 有標案經驗但無法沉澱
- 有 AI 工具但仍用傳統方式作業

如果企業只把 AI 當寫文章工具，效益會有限。

但如果企業開始把常用文件、標案、SOP、教材、QA Library 視為可工程化資產，就能逐步建立：

- 可重用的知識元件
- 可重跑的文件生成流程
- 可驗證的標準答案
- 可交接的操作程序
- 可管理的中控欄位

這就是 Class02 要讓 SME 看懂的價值：AI 的真正 ROI，不在於多寫幾段文字，而在於升級核心作業流程。

---

## 7. 對知識資產化的意義

原本我們說「文件可以資產化」。

這次進一步看到：

> 規則、模板、生成器與驗證方式，也可以資產化。

知識資產可以分成多層：

| 層級 | 資產類型 | 範例 |
|---|---|---|
| L1 | 文件資產 | RFP、SOP、標案、教材、QA |
| L2 | 元件資產 | 公司簡介、實績、資安條款、教育訓練段落 |
| L3 | 規則資產 | RFP 對映規則、風險分級、標準答案邏輯 |
| L4 | 模板資產 | 需求抽取表、Compliance Matrix、管理摘要 |
| L5 | 生成器資產 | `create_mock_data.py`、未來的 AIDE generator |
| L6 | 驗證資產 | Manifest、端到端抽樣驗收、風險一致性檢查 |

過去企業常停在 L1。  
Class02 與 mock dataset 顯示，我們可以往 L3-L6 推進。

---

## 8. 如何延伸到現有工具與模組

### NotebookLM

NotebookLM 可作為知識查詢與引用層。

未來可以把 generated mock dataset 或企業內部資料集放入 NotebookLM，用於：

- 問 RFP 條款
- 查內部元件來源
- 驗證答案是否有依據
- 讓學員理解 QA Library 的引用能力

### Antigravity

Antigravity 可作為長文件工程執行器。

本次觀察顯示，Antigravity 不只會生成文件，也能：

- 建立生成腳本
- 批量產出資料集
- 維護檔案結構
- 更新 task / walkthrough
- 形成可重跑的教材資產產線

### FALO PM

FALO PM 可作為管理回推層。

若 AIDE 生成的文件資料集能輸出：

- 進度
- 缺件
- 風險
- 負責人
- 合規覆蓋率
- 待人工確認項目

這些就能自然映射到 FALO PM 的 Knowledge Asset Control Center。

### QA Library

QA Library 可作為學員與新人交接層。

未來可以從 mock dataset 自動生成：

- RFP 條款問答
- 缺件風險問答
- 內部元件用途問答
- 標準答案解釋問答

### 長文件工程

長文件工程可以從「寫一份文件」升級為：

```text
Source data
↓
Rule model
↓
Template
↓
Generator
↓
Compiled documents
↓
Validation
↓
Control fields
```

---

## 9. Script First / Rule First / Generator First

這次應正式保留三個工作原則：

### Script First

當交付物包含多份高度關聯文件時，不要先逐份手寫。  
先評估是否需要腳本化生成。

適用場景：

- mock dataset
- 標案練習包
- 多版本教材
- 標準答案與空白範本
- 批量 QA Library
- 多客戶去識別化版本

### Rule First

在生成文件前，先定義規則。

範例：

- RFP 實績門檻是 300 萬
- 內部實績是 450 萬
- 驗收公文未歸檔
- 資安要求包含資料不落地
- 教育訓練是 3 場，每場 4 小時
- 缺必交文件時風險不得低估

### Generator First

如果文件未來會改版、重跑、複製到其他案例，就應該保留生成器。

生成器本身不是輔助工具，而是知識工程資產。

---

## 10. 新增觀察：Markdown 到 HTML 的雙文件編譯鏈

在 `mock_data/` 生成完成後，aaa 又建立了 `convert_md_to_html.py`，將 27 份 Markdown 檔案同步編譯成 27 份 HTML。

這一步讓本次方法論更完整：

```text
教學需求
↓
create_mock_data.py
↓
27 份 Markdown mock dataset
↓
convert_md_to_html.py
↓
27 份 HTML human-readable pages
↓
index.html 課程入口
```

這代表雙文件治理不只是手動習慣，而可以變成一條明確的教材工程 pipeline：

- Markdown 是 source of truth / AI 工作母稿
- HTML 是 human-readable compiled output / 人類閱讀展示版
- `README.html` 與各子頁可建立相對導航
- `.md` 本地連結可轉成 `.html` 連結
- 教材資料集可以從檔案夾升級成可瀏覽的靜態教材網站

這個發現補強了 **Document as Code** 的概念：

> 文件不是只被寫出來，而是可以從 Markdown source 被編譯成不同閱讀與交付型態。

因此，未來 AIDE 的教材工程應該保留兩類 generator：

| 生成器 | 角色 | 產出 |
|---|---|---|
| `create_mock_data.py` | 資料集生成器 | Markdown mock dataset |
| `convert_md_to_html.py` | 展示版編譯器 | HTML readable pages |

這也提醒我們：如果這兩個腳本被確認為可重複使用，就不應只留在 `.gemini/.../scratch/`。它們應該被整理成專案內正式工具，例如：

```text
tools/create_mock_data.py
tools/convert_md_to_html.py
```

或至少在 Antigravity Working Principles 中記錄其用途與適用邊界。

---

## 11. 外部對照觀察：Opus 4.8 / Claude Code 的 scriptable agent workflow

這次 aaa 先寫 `create_mock_data.py`，再寫 `convert_md_to_html.py`，表面上是在幫 Class02 做教材資料。

但如果把它放到 2026 年 AI coding agent 的發展來看，這不是孤立行為，而是很明顯接近 **scriptable agent workflow** 的方向。

### 觀察到的外部訊號

| 來源 | 關鍵訊號 | 對本案的意義 |
|---|---|---|
| [Claude Opus 4.8 官方發布](https://www.anthropic.com/news/claude-opus-4-8?cmid=03693516-1d21-4130-ac10-3f9892c0929b) | Dynamic workflows 可讓 Claude 規劃工作、啟動大量 subagents、最後驗證輸出再回報 | AI agent 的價值不只在單次回答，而在可規劃、可執行、可驗證的長任務流程 |
| [Claude Code Dynamic Workflows](https://code.claude.com/docs/en/workflows) | Workflow 是由 Claude 寫出的 JavaScript script，runtime 會執行，且可以保存後重跑 | 「把計畫移入程式碼」已成為 agent workflow 的正式能力 |
| [Claude Code Overview](https://code.claude.com/docs/en/overview) | Claude Code 被設計成可 pipe、可 script、可進 CI/CD 的 Unix-style 工具 | AI 工具正在從聊天介面，進入工程流程與自動化管線 |
| [Claude Code Programmatic Usage](https://code.claude.com/docs/en/headless) | `claude -p` 可用於非互動模式、build script、structured output 與批次任務 | AI 可以成為腳本、CI、資料處理流程的一個可組合節點 |
| [Claude Code Subagents](https://code.claude.com/docs/en/sub-agents) | Subagent 可用獨立 context 處理大量探索，再回傳摘要 | 複雜任務應拆給專門角色，避免主線 context 被污染 |
| [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) | Agent SDK 可用 Python / TypeScript 建立能讀檔、跑指令、編輯、掛 hooks 的代理 | agent workflow 會從人工互動，逐步進入可程式化、可觀測、可治理的 runtime |

### 跟本次 aaa 行為的對照

| Claude / Opus 4.8 方向 | 本次 aaa 做法 | 共同精神 |
|---|---|---|
| Dynamic workflow script | `create_mock_data.py` | 把任務流程寫成可重跑的 script |
| Workflow runtime executes script | Python 執行生成 27 份 Markdown | 由 runtime 產出結果，而不是手工逐份製作 |
| Save workflow for reuse | 建議移入 `tools/` 或 Working Principles | 一次性操作應沉澱為可重用資產 |
| Subagents / context isolation | md source、HTML compiled output、Manifest、answer key 分層 | 把不同角色與交付層分開治理 |
| Verification before report | 對帳 Manifest、答案表、HTML parse check | 產出後必須驗證，而不是只相信生成結果 |

### 核心差異

Claude / Opus 4.8 的主戰場是：

```text
Software Engineering
↓
Agentic Coding
↓
Dynamic Workflow
↓
Subagents
↓
Test / Verification
```

本次 aaa 在 Class02 走出的路線是：

```text
Knowledge Engineering
↓
Document Engineering
↓
Dataset Generator
↓
Display Compiler
↓
Teaching / Proposal / QA Outputs
```

兩者不是同一件事，但底層思想高度相似：

> AI 不只是幫人完成一份成果，而是幫人建立能穩定產生成果的工作系統。

### 對 Class02 的教學意義

這段外部對照可以補強 Class02 對總經理 / 董事長的說服力：

傳統對 AI 的理解常停在：

```text
我問 AI
↓
AI 給我一篇文章
```

但真正的企業導入應該升級成：

```text
我定義工作規則
↓
AI 建立可重跑流程
↓
流程產出文件 / 表格 / 網頁 / QA / 管理欄位
↓
人負責審查、決策與改善
```

所以 Class02 不應把 Antigravity 教成「比較強的 AI Writer」。

更準確的定位是：

> Antigravity 是讓企業把高價值長文件工作，從人工拼裝升級為可重跑、可檢查、可交接的文件工程流程。

### 對 AIDE 的補強

原本 AIDE 可描述為：

```text
Knowledgeization
↓
Assetization
↓
Componentization
↓
Reference Index
↓
Long Document Runtime
```

經過這次 aaa 與 Opus 4.8 對照後，AIDE 應再補一層：

```text
Workflow Codification
```

也就是：

- 把重複性文件任務寫成 script
- 把資料規則集中管理
- 把模板與答案同源化
- 把輸出分成 machine-editable 與 human-readable
- 把驗收變成端到端抽樣流程
- 把可重用的流程沉澱成 project tools / working principles

這會讓 AIDE 從「長文件方法論」再往前推一步，變成：

> 長文件工作流的工程化治理方法。

---

## 12. 給 aaa 的後續提醒

這次做法值得保留，不要只存在於 `mock_data/` 案例。

請後續協助 aaa 整理一份專案層級文件，例如：

- `antigravity_working_principles.md`
- `antigravity_best_practices.md`
- `aide_document_engineering_principles.md`

建議寫入專案主目錄，正式沉澱：

- Script First
- Rule First
- Generator First
- Markdown source + HTML compiled output
- Dataset generator + display compiler
- Manifest 作為資料集索引
- Blank template 與 answer key 必須同源
- 端到端抽樣驗收
- 內部版/公開版分流
- 不把長文件當文章，而把長文件當可編譯資產

這不是單純技巧，而是一種可重複使用的知識工程工作方法。

---

## 13. 驗收建議

未來驗收批量生成成果時，sxf / Force 應優先檢查：

1. 核心數據是否前後一致  
   例如 RFP 300 萬門檻、內部 450 萬實績、缺驗收公文是否一致。

2. 空白範本是否真的可練習  
   不應殘留標準答案，也不應缺少必要欄位。

3. 標準答案是否能回扣來源  
   每一個答案都應能追到 RFP 或內部元件。

4. 風險等級是否符合常識  
   必交附件缺件若會造成廢標，就不能輕描淡寫成低風險。

5. Prompt 是否能照資料夾結構直接使用  
   路徑、檔名、任務目標要一致。

6. Expected outputs 是否能回推管理欄位  
   例如 FALO PM 是否可看到進度、缺件、風險、負責人、合規覆蓋率。

7. 生成器是否值得保留  
   若交付物未來可能改版，生成器應視為正式資產，而不是一次性 scratch。

8. HTML 編譯結果是否能閱讀與導航  
   應抽查 `README.html`、子目錄頁與 Manifest 頁，確認返回首頁、返回 README、`.md` 轉 `.html` 連結都合理。

---

## 14. 本次心得總結

這次 Class02 mock dataset 驗收的最大收穫是：

> 我們原本以為要的是 27 份 Markdown。  
> 但真正值得保留的，可能是能穩定生成 27 份 Markdown 的知識工程方法。

Class02 教的是企業知識資產化。  
而這次 aaa 的做法，剛好把知識資產化做給我們看：

```text
文件需求
↓
知識規則
↓
資料模型
↓
生成器
↓
教材資料集
↓
驗收與中控
```

因此，本文件應作為 Class02 後續 AIDE / Antigravity 方法論整理的基礎素材。
