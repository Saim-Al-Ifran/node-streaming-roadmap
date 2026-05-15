# Day 05 Notes

- Transform streams are both readable and writable.
- Implement `_transform(chunk, encoding, callback)` to process data.
- Always call `callback(error, data)` to push transformed data downstream.
- Can chain multiple transforms together using `pipe()`.
- Common pitfalls:
  - Forgetting to call `callback()`.
  - Not handling encoding properly when working with binary data.
- Use `objectMode: true` for non-buffer objects.
- `pipeline()` is safer than manual `pipe()` for error handling.
