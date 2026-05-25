// day09/test/stream-utilities.pipeline.test.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');
const { Readable, Transform } = require('stream');

describe('Day 09 Stream Utilities pipeline', function () {
  const outPath = path.join(__dirname, 'pipeline-output.txt');

  afterEach(() => {
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
  });

  it('writes numbers from Readable.from to file via pipeline', async function () {
    const numbers = Readable.from((function* () {
      for (let i = 1; i <= 5; i++) yield `${i}\n`;
    })(), { encoding: 'utf8' });

    const prefix = new Transform({
      transform(chunk, _, cb) {
        cb(null, `NUM:${chunk}`);
      }
    });

    await pipeline(numbers, prefix, fs.createWriteStream(outPath, { encoding: 'utf8' }));

    const content = fs.readFileSync(outPath, 'utf8');
    assert.strictEqual(content, 'NUM:1\nNUM:2\nNUM:3\nNUM:4\nNUM:5\n');
  });

  it('pipeline rejects when a transform throws', async function () {
    const bad = new Transform({
      transform(chunk, _, cb) {
        cb(new Error('boom'));
      }
    });

    const src = Readable.from(['a']);

    let caught = false;
    try {
      await pipeline(src, bad, fs.createWriteStream(outPath));
    } catch (err) {
      caught = true;
      assert.strictEqual(err.message, 'boom');
    }
    assert.strictEqual(caught, true);
  });
});
