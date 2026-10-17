const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const REPO_ROOT = path.join(__dirname, '../..');
const PREPARE_JS = path.join(REPO_ROOT, 'src/pages/Prepare/Prepare.js');
const SRC_DIR = path.join(REPO_ROOT, 'src');

const NEW_TIP = '如发现问题，请通知作者';
const OLD_PHRASES = [
  '该游戏仍有很多bug',
  '严重bug',
  '请立即通知作者',
];

function collectJsFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectJsFiles(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

test('Prepare 顶栏 tip_message 完整可见为新文案', () => {
  const source = fs.readFileSync(PREPARE_JS, 'utf8');
  assert.match(
    source,
    new RegExp(`className="tip_message">${NEW_TIP}</div>`),
    `Prepare.js 应包含 tip_message「${NEW_TIP}」`,
  );
});

test('Prepare 顶栏同一区域不再出现旧表述', () => {
  const source = fs.readFileSync(PREPARE_JS, 'utf8');
  const tipBlock = source.match(
    /className="tip_message"[^>]*>([^<]*)</,
  );
  assert.ok(tipBlock, '应存在 tip_message 元素');
  const tipText = tipBlock[1];
  for (const phrase of OLD_PHRASES) {
    assert.doesNotMatch(
      tipText,
      new RegExp(phrase),
      `tip_message 内不应包含「${phrase}」`,
    );
  }
});

test('全站 src 下其它 JS 不出现被替换掉的旧句', () => {
  const jsFiles = collectJsFiles(SRC_DIR);
  for (const file of jsFiles) {
    const rel = path.relative(REPO_ROOT, file);
    const content = fs.readFileSync(file, 'utf8');
    for (const phrase of OLD_PHRASES) {
      assert.doesNotMatch(
        content,
        new RegExp(phrase),
        `${rel} 不应包含旧句「${phrase}」`,
      );
    }
  }
});
