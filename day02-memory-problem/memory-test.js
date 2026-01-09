// Day 2: Memory Problem Demo
const fs = require("fs");
const path = require("path");

const bigFile = path.join(__dirname, "large.txt"); // create a large test file

// --- Method 1: readFileSync (blocking, loads entire file into memory)
console.time("readFileSync");
const data = fs.readFileSync(bigFile); // loads whole file
console.timeEnd("readFileSync");
console.log("Sync file size:", data.length / 1024 / 1024, "MB");

// --- Method 2: createReadStream (non-blocking, chunked streaming)
console.time("createReadStream");
let totalSize = 0;

const stream = fs.createReadStream(bigFile, { highWaterMark: 64 * 1024 }); // 64KB chunks
stream.on("data", (chunk) => {
  totalSize += chunk.length;
  console.log("Chunk size:", chunk.length);
});

stream.on("end", () => {
  console.timeEnd("createReadStream");
  console.log("Streamed file size:", totalSize / 1024 / 1024, "MB");
});

stream.on("error", (err) => {
  console.error("Stream error:", err);
});
