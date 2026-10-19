/**
 * Prepare 准备页 `.tip_message` 文案验收（与 FE_HARNESS_CARD acceptance 对应）
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const preparePath = path.join(__dirname, '../src/pages/Prepare/Prepare.js');
const source = fs.readFileSync(preparePath, 'utf8');

const EXPECTED_TIP = '如发现问题，请通知作者';
const OLD_PHRASES = [
  '该游戏仍有很多bug',
  '严重bug',
  '请立即通知作者',
];

const tipBlockMatch = source.match(
  /<div className="tip_message">([\s\S]*?)<\/div>/
);
assert.ok(tipBlockMatch, 'Prepare 页应包含 className="tip_message" 的 div');

const tipText = tipBlockMatch[1].trim();
assert.strictEqual(
  tipText,
  EXPECTED_TIP,
  `.tip_message 完整可见文案应为「${EXPECTED_TIP}」，实际为「${tipText}」`
);

for (const phrase of OLD_PHRASES) {
  assert.ok(
    !tipText.includes(phrase),
    `.tip_message 不应包含旧表述「${phrase}」`
  );
}

assert.ok(
  !tipText.includes('907280636@qq.com'),
  '.tip_message 不应包含作者邮箱（中性指引不含联系方式）'
);

console.log('prepare-tip-message.test.js: all acceptance checks passed');
