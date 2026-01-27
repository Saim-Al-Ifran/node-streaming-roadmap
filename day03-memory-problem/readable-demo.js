// Day 3: Readable Streams (Raw)
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "sample.txt"); // create a test file

function testStream(highWaterMark) {
  console.log(`\n--- Testing with highWaterMark = ${highWaterMark} ---`);
  let totalSize = 0;
  let chunkCount = 0;

  const stream = fs.createReadStream(filePath, { highWaterMark });

  stream.on("data", (chunk) => {
    chunkCount++;
    totalSize += chunk.length;
    console.log(`Chunk ${chunkCount}: ${chunk.length} bytes`);
  });

  stream.on("end", () => {
    console.log(`Stream ended. Total size: ${totalSize} bytes`);
    console.log(`Total chunks: ${chunkCount}`);
  });

  stream.on("error", (err) => {
    console.error("Stream error:", err);
  });
}

// Run tests with different chunk sizes
testStream(16 * 1024);   // 16 KB
testStream(64 * 1024);   // 64 KB (default)
testStream(128 * 1024);  // 128 KB
