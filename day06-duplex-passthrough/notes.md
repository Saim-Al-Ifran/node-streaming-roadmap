# Day 06 Notes

- `Duplex` is both readable and writable; implement `_write` and `_read` as needed.
- If your duplex stream produces output only in response to writes, `_read` can be a no-op.
- `PassThrough` is a lightweight transform that forwards data unchanged; useful for logging, metrics, or branching.
- Use `objectMode: true` for non-buffer data.
- For complex adapters, prefer `pipeline()` to manage errors and cleanup.
- Common pitfall: piping a duplex into itself can create confusing cycles; simulate client/server with separate PassThrough endpoints.
