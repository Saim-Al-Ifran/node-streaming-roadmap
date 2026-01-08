# Day 1 – Buffers

## 🧠 Concepts Learned
- Node.js uses **Buffers** to handle binary data (raw bytes).
- Buffers are fixed-size chunks of memory outside the V8 heap.
- Useful for file I/O, network sockets, and streaming.

## 🔑 Key Methods
- `Buffer.from(string|array|buffer)` → Create buffer from data
- `Buffer.alloc(size)` → Allocate buffer with given size
- `Buffer.allocUnsafe(size)` → Faster but may contain old memory

## 🧪 Observations
- Buffers are not resizable → once allocated, size is fixed.
- `Buffer.toString()` converts back to human-readable format.
- Binary data can be manipulated directly (e.g., ASCII codes).

## ✅ Practice Checklist
- Create a buffer from a string
- Allocate a buffer of fixed size
- Write and read data from buffer
- Convert buffer back to string
