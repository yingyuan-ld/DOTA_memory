const { readFileSync } = require('fs');
const { join } = require('path');
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const PREPARE_SOURCE = readFileSync(join(__dirname, 'Prepare.js'), 'utf8');
const EXPECTED_TIP = '如发现问题，请通知作者(907280636@qq.com)';
const LEGACY_PHRASES = [
  '该游戏仍有很多bug',
  '严重bug',
  '请立即通知作者',
];

describe('Prepare 页顶部 tip_message 验收', () => {
  it('tip_message 完整显示为新文案并保留邮箱', () => {
    const match = PREPARE_SOURCE.match(
      /className="tip_message">([^<]+)<\/div>/
    );
    assert.ok(match, '应存在 className="tip_message" 的提示节点');
    assert.equal(match[1], EXPECTED_TIP);
  });

  it('Prepare 页不再包含旧 bug 警告表述', () => {
    for (const phrase of LEGACY_PHRASES) {
      assert.doesNotMatch(
        PREPARE_SOURCE,
        new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        `不应再出现：${phrase}`
      );
    }
  });
});
