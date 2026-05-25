# Day 09 Notes

- Prefer `stream/promises.pipeline` when using async/await; it returns a promise and propagates errors.
- `Readable.from` accepts arrays, iterables, and async iterables — great for converting generators into streams.
- `finished(stream, cb)` or `promisify(finished)` helps detect when a stream is fully closed.
- `PassThrough` is useful for tapping into a stream for metrics or branching.
- `pipeline` closes all streams on error; manual `pipe()` requires explicit cleanup.
- Common pitfall: forgetting to await `pipeline()` in async code, causing early process exit.
