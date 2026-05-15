// day05/test/transform-uppercase.test.js
const assert = require('assert');
const { Transform, Readable } = require('stream');
const { pipeline } = require('stream/promises');

describe('Day 05 — Transform Streams: uppercase transform', function () {
  it('converts incoming chunks to uppercase', async function () {
    const upper = new Transform({
      transform(chunk, _, cb) {
        cb(null, chunk.toString().toUpperCase());
      }
    });

    const input = Readable.from(['hello', ' ', 'world']);
    let result = '';
    const collector = new Transform({
      transform(chunk, _, cb) {
        result += chunk.toString();
        cb();
      }
    });

    await pipeline(input, upper, collector);
    assert.strictEqual(result, 'HELLO WORLD');
  });
});
