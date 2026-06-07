// day10/backpressure-deep-dive.js
// Backpressure deep dive demo
// Run: node day10/backpressure-deep-dive.js

const { Writable, Readable, PassThrough } = require('stream');
const { pipeline } = require('stream/promises');
const os = require('os');

function now() {
  return new Date().toISOString();
}

// Fast producer: emits numbers as quickly as possible
class FastProducer extends Readable {
  constructor(total = 1000, opts = {}) {
    super({ objectMode: true, ...opts });
    this.current = 1;
    this.total = total;
  }

  _read() {
    while (this.current <= this.total) {
      const pushed = this.push({ n: this.current, ts: Date.now() });
      this.current++;
      if (!pushed) return; // stop when buffer is full
    }
    this.push(null);
  }
}

// Slow consumer: simulates slow processing with a delay
class SlowConsumer extends Writable {
  constructor(delayMs = 50, opts = {}) {
    super({ objectMode: true, ...opts });
    this.delayMs = delayMs;
    this.processed = 0;
  }

  _write(chunk, _, cb) {
    setTimeout(() => {
      this.processed++;
      if (this.processed % 100 === 0) {
        console.log(`${now()} processed ${this.processed}`);
      }
      cb();
    }, this.delayMs);
  }
}

// Manual backpressure handling example
async function manualDemo() {
  console.log('--- Manual backpressure demo ---');

  const producer = new FastProducer(500);
  const consumer = new SlowConsumer(20, { highWaterMark: 16 });

  const monitor = setInterval(() => {
    console.log(`${now()} writableLength=${consumer.writableLength} writableHWM=${consumer.writableHighWaterMark}`);
  }, 200);

  producer.on('data', (chunk) => {
    const ok = consumer.write(chunk);
    if (!ok) {
      console.log(`${now()} backpressure detected -> pausing producer`);
      producer.pause();
    }
  });

  consumer.on('drain', () => {
    console.log(`${now()} drain event -> resuming producer`);
    producer.resume();
  });

  producer.on('end', () => consumer.end());

  await new Promise((resolve) => consumer.on('finish', resolve));
  clearInterval(monitor);
  console.log('Manual demo finished, processed:', consumer.processed);
}

// Pipe demo using pipeline
async function pipeDemo() {
  console.log(os.EOL + '--- pipe() demo (automatic pause/resume) ---');

  const producer = new FastProducer(500);
  const consumer = new SlowConsumer(20, { highWaterMark: 16 });

  const monitor = setInterval(() => {
    console.log(`${now()} writableLength=${consumer.writableLength} writableHWM=${consumer.writableHighWaterMark}`);
  }, 200);

  await pipeline(producer, consumer);
  clearInterval(monitor);
  console.log('pipe() demo finished, processed:', consumer.processed);
}

// HighWaterMark tuning demo
async function hwmDemo() {
  console.log(os.EOL + '--- highWaterMark tuning demo ---');

  const producer = new FastProducer(300);
  const consumerLow = new SlowConsumer(10, { highWaterMark: 4 });
  const consumerHigh = new SlowConsumer(10, { highWaterMark: 64 });

  const tee = new PassThrough({ objectMode: true });

  const monitor = setInterval(() => {
    console.log(`${now()} low.wLen=${consumerLow.writableLength} low.hwm=${consumerLow.writableHighWaterMark} | high.wLen=${consumerHigh.writableLength} high.hwm=${consumerHigh.writableHighWaterMark}`);
  }, 300);

  producer.pipe(tee);
  tee.pipe(consumerLow);
  tee.pipe(consumerHigh);

  await Promise.all([
    new Promise((res) => consumerLow.on('finish', res)),
    new Promise((res) => consumerHigh.on('finish', res)),
  ]);

  clearInterval(monitor);
  console.log('HWM demo finished, low processed:', consumerLow.processed, 'high processed:', consumerHigh.processed);
}

(async () => {
  try {
    await manualDemo();
    await pipeDemo();
    await hwmDemo();
    console.log('All demos complete');
  } catch (err) {
    console.error('Demo error', err);
  }
})();
