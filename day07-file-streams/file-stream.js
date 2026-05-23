// day07/test/file-stream.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

describe('Day 07 File Streams', function () {
  const inputPath = path.join(__dirname, 'test-input.txt');
  const outputPath = path.join(__dirname, 'test-output.txt');

  before(() => {
    fs.writeFileSync(inputPath, 'line1\nline2\nline3\n');
  });

  after(() => {
    fs.unlinkSync(inputPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  });

  it('copies file content using streams', async function () {
    const reader = fs.createReadStream(inputPath, { encoding: 'utf8' });
    const writer = fs.createWriteStream(outputPath, { encoding: 'utf8' });

    await pipeline(reader, writer);

    const copied = fs.readFileSync(outputPath, 'utf8');
    assert.strictEqual(copied, 'line1\nline2\nline3\n');
  });
});
