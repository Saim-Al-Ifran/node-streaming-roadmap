# Day 3 – Readable Streams (Raw)

## 🧠 Concepts Learned
- A **Readable Stream** lets you consume data piece by piece instead of loading it all at once.
- With `fs.createReadStream()`, you can listen to events:
  - `data` → fires when a chunk of data is available
  - `end` → fires when the stream has no more data
  - `error` → fires if something goes wrong (e.g., file not found)

## 🔑 Key Questions

### ❓ What exactly is a chunk?
- A **chunk** is a piece of data (binary buffer) that the stream hands you.
- Think of it like tearing pages out of a book one by one instead of grabbing the whole book.
- Each chunk is a `Buffer` object, not a string (though you can convert it).

### ❓ Who decides chunk size?
- The **highWaterMark** option in `fs.createReadStream()` sets the *maximum* chunk size.
- Default: `64 KB` for binary data, `16 KB` for strings/objects.
- The OS + Node’s internal buffering also influence the actual size.  
  → So you *request* a chunk size, but the system may give slightly different sizes depending on how data arrives.

## 🧪 Observations
- Changing `highWaterMark` directly affects how big each chunk is.
- Smaller chunks → more `data` events, more overhead.
- Larger chunks → fewer events, but more memory per chunk.

## ✅ Practice Checklist
- Create a stream with default `highWaterMark`.
- Log chunk sizes.
- Change `highWaterMark` (e.g., 16 KB, 128 KB) and compare.
- Observe how many `data` events fire for the same file.
