# Day 07 Notes

- `fs.createReadStream` reads files in chunks, useful for large files.
- Always handle `error` events to avoid crashes.
- `pipe()` simplifies connecting readable and writable streams.
- `highWaterMark` option controls buffer size.
- Common pitfall: forgetting to close streams or handle `finish` event.
- For binary files, omit `encoding` and work with raw buffers.
