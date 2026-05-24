// day08/test/error-handling.test.js
const assert = require('assert');
const { Transform, Readable } = require('stream');
const { pipeline } = require('stream/promises');

describe('Day 08 Stream Error Handling', function () {
  it('propagates errors through pipeline', async function () {
    const badTransform = new Transform({
      transform(chunk, _, cb) {
        cb(new Error('Test error'));
      }
    });

    const input = Readable.from(['data']);
    let errorCaught = false;

    try {
      await pipeline(input, badTransform, new Transform({
        transform(chunk, _, cb) { cb(null, chunk); }
      }));
    } catch (err) {
      errorCaught = true;
      assert.strictEqual(err.message, 'Test error');
    }

    assert.strictEqual(errorCaught, true);
  });
});
