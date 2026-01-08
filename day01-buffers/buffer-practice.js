// Day 1: Buffer practice

// Create buffer from string
const buf1 = Buffer.from("Hello Streams!");
console.log("Buffer 1:", buf1);
console.log("Buffer 1 as string:", buf1.toString());

// Allocate buffer of fixed size
const buf2 = Buffer.alloc(10); // 10 bytes
buf2.write("Hi");
console.log("Buffer 2:", buf2);
console.log("Buffer 2 as string:", buf2.toString());

// Unsafe allocation (may contain old memory)
const buf3 = Buffer.allocUnsafe(5);
console.log("Buffer 3 (unsafe):", buf3);

// Manipulate buffer directly
buf1[0] = 0x48; // ASCII 'H'
console.log("Modified Buffer 1:", buf1.toString());
