# Day 2 – Memory Problem

## 🧠 Concepts Learned
- `fs.readFileSync` loads the **entire file into memory** at once → risky for large files.
- `fs.createReadStream` reads data in **chunks** → memory-efficient, especially for big files.
- Streams prevent crashes when handling large files by processing data piece by piece.

## 🔑 Key Points
- **Blocking vs Non-blocking**: `readFileSync` blocks the event loop until the file is fully read.
- **Memory usage**: `readFileSync` can spike memory usage; `createReadStream` keeps memory stable.
- **Events in streams**: `data`, `end`, `error` help track progress.

## 🧪 Observations
- Reading a 1GB file with `readFileSync` → memory usage skyrockets.
- Reading the same file with `createReadStream` → memory stays low, chunks processed sequentially.
- Streams are essential for **scalability** in production systems.

## ✅ Practice Checklist
- Compare memory usage between `readFileSync` and `createReadStream`.
- Log chunk sizes and total memory used.
- Observe event loop responsiveness.
