# Day 04 Notes

- Readable streams push data into an internal buffer. The `readable._read` implementation should push until `push()` returns false.
- Writable streams signal backpressure by returning `false` from `write()`. Listen for `drain` to resume.
- `pipe()` handles pause/resume automatically for common cases.
- Use `objectMode: true` when streaming JS objects instead of raw bytes.
- Prefer `stream.pipeline` for production code to handle errors and cleanup.
- Common gotcha: forgetting to call `writable.end()` when readable ends.
