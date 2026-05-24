# Day 08 Notes

- Always listen for `error` events on streams.
- `pipeline()` automatically forwards errors and closes streams.
- Common pitfalls:
  - Forgetting to handle errors leads to uncaught exceptions.
  - Not cleaning up resources (file handles, sockets).
- Use try/catch with async `pipeline()` for cleaner error handling.
- For production, log errors and provide fallback behavior.
