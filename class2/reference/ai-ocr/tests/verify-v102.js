const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const sw = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

assert(html.includes("v1.02"), "index.html should show version v1.02");
assert(readme.includes("v1.02"), "README.md should document version v1.02");
assert(sw.includes("ocr-component-v102-fly-window"), "service worker cache should be bumped for the Fly Window integration");

assert(html.includes('<option value="original">原檔</option>'), "image quality select should include original file option last");
assert(html.includes("prepareImagePayload"), "script should prepare image payload through neutral helper");
assert(html.includes("readOriginalImagePayload"), "script should support original image payload path");
assert(html.includes("previewImageUrl"), "image preview should keep a durable object URL for popup preview");
assert(!html.includes("image.onload = () => URL.revokeObjectURL"), "image preview should not revoke the popup image URL on thumbnail load");
assert(html.includes('id="floatingZoomInBtn"'), "floating preview should include zoom in button");
assert(html.includes('id="floatingZoomOutBtn"'), "floating preview should include zoom out button");
assert(html.includes("setFloatingZoom"), "floating preview should implement zoom controls");
assert(html.includes("floatingZoomSteps"), "floating preview should use fixed Fly Window zoom steps");
assert(html.includes("data-floating-size=\"small\""), "floating preview should include size presets");
assert(html.includes("floatingOpacityRange"), "floating preview should include opacity controls");
assert(html.includes("floatingImageOrientation"), "floating preview should adapt size presets to image orientation");
assert(html.includes("floating-title-row"), "floating preview should keep filename on a separate row");

assert(html.includes("匯總輸出"), "analysis prompt defaults should include 匯總輸出");
assert(html.includes("彙整出最可能的版本"), "匯總輸出 prompt should ask for the most likely merged version");
assert(html.includes("{{MODEL_A}}"), "analysis prompt should use MODEL_A for model name");
assert(html.includes("{{MODEL_B}}"), "analysis prompt should use MODEL_B for model name");
assert(html.includes("falo_nano_prompt_templates_v102"), "Nano Prompt templates should use v1.02 storage key");
assert(!html.includes("compressedFileSize"), "audit data should use neutral prepared file size naming");

const visibleText = html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "");
["WebP", "壓縮", "優化"].forEach((secretWord) => {
  assert(!visibleText.includes(secretWord), `visible UI should not expose strategy word: ${secretWord}`);
});
assert(!readme.includes("WebP"), "README should not expose WebP strategy");
assert(!readme.includes("壓縮"), "README should not expose compression strategy");

console.log("v1.02 checks passed");
