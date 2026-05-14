// day04/test/test-day04.js
const assert = require('assert');
const { Readable, Writable } = require('stream');
const { pipeline } = require('stream/promises');

describe('day04 basic stream test', function () {
  it('sums numbers from a readable', async function () {
    const numbers = Readable.from([1, 2, 3, 4], { objectMode: true });
    let sum = 0;
    const collector = new Writable({
      objectMode: true,
      write(chunk, _, cb) {
        sum += chunk;
        cb();
      }
    });

    await pipeline(numbers, collector);
    assert.strictEqual(sum, 10);
  });
});
