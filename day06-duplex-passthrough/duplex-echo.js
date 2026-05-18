// day06/test/duplex-echo.test.js
const assert = require('assert');
const { Duplex, Readable } = require('stream');
const { pipeline } = require('stream/promises');

describe('Day 06 Duplex Streams Echo', function () {
  it('echoes written messages back to reader', async function () {
    class EchoDuplex extends Duplex {
      constructor(opts = {}) {
        super({ objectMode: true, ...opts });
      }
      _write(chunk, _, cb) {
        this.push(`echo:${chunk}`);
        cb();
      }
      _read() {}
    }

    const echo = new EchoDuplex();
    const input = Readable.from(['a', 'b', 'c'], { objectMode: true });
    let collected = [];
    const collector = new Duplex({
      objectMode: true,
      write(chunk, _, cb) {
        collected.push(chunk.toString());
        cb();
      },
      read() {}
    });

    await pipeline(input, echo, collector);
    assert.deepStrictEqual(collected, ['echo:a', 'echo:b', 'echo:c']);
  });
});
