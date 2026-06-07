# Day 10 Notes

## Backpressure Fundamentals
- **Backpressure** happens when a producer emits data faster than a consumer can process it.  
- **write return value**: when `write()` returns **false** the writable stream buffer is full and the producer should stop writing.  
- **drain event** signals that buffered data has been flushed and the producer can resume.  
- **highWaterMark** controls the internal buffer threshold for readable and writable streams. Tune it to balance memory and throughput.

---

## Metrics and Observability
- **writableLength** shows the number of bytes or objects currently buffered in a writable stream.  
- **writableHighWaterMark** shows the configured highWaterMark for a writable stream.  
- **readableLength** and **readableHighWaterMark** provide the same visibility for readable streams.  
- Log `write()` return values, `drain` events, and buffer lengths to observe pressure cycles.

---

## Practical Strategies
- **Respect write return values**: pause the producer when `write()` returns false and resume on `drain`.  
- **Use pipe for common cases** because it handles pause and resume automatically.  
- **Tune highWaterMark** to match workload characteristics. Use smaller values for memory constrained environments and larger values for high throughput.  
- **Batching** reduces overhead by aggregating small writes into larger chunks.  
- **Throttling** intentionally slows the producer to match consumer capacity using timers or token buckets.  
- **Use pipeline** to connect streams and ensure proper cleanup on errors.

---

## Patterns and Examples
- **Manual pause resume**: producer listens for `write()` return value and calls `pause()` when false then resumes on `drain`.  
- **Automatic handling**: `readable.pipe(writable)` manages pause and resume for you.  
- **Teeing**: use `PassThrough` to branch a stream to multiple consumers and manage each consumer’s backpressure separately.  
- **HighWaterMark comparison**: run two consumers with different highWaterMark values to observe how buffering and throughput change.

---

## Common Pitfalls
- Ignoring the `write()` return value and relying on fixed delays.  
- Setting extremely large highWaterMark values without monitoring memory usage.  
- Forgetting to handle `error` and `drain` events which can lead to lost data or memory growth.  
- Piping into multiple slow consumers without proper teeing and per-consumer flow control.

---

## Quick Checklist
- **Monitor** writableLength and readableLength during load tests.  
- **Log** write return values and drain events when debugging throughput issues.  
- **Prefer** pipeline for production code to ensure cleanup on errors.  
- **Tune** highWaterMark based on measured memory and latency tradeoffs.  
- **Test** with realistic producer and consumer speeds to validate behavior under load.
