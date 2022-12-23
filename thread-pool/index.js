const crypto = require('crypto');
const currentTime = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;

// first 4 will take somewhat the same time to execute as they will be done in the thread pool that has 4 threads. 
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeNeeded = Date.now() - currentTime;
    console.log("password encrypted in ", timeNeeded, "miliseconds");
});
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeNeeded = Date.now() - currentTime;
    console.log("password encrypted in ", timeNeeded, "miliseconds");
});
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeNeeded = Date.now() - currentTime;
    console.log("password encrypted in ", timeNeeded, "miliseconds");
});
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeNeeded = Date.now() - currentTime;
    console.log("password encrypted in ", timeNeeded, "miliseconds");
});

// it will take more than those in the first 4 as there are 4 thread in the thread pool.
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeNeeded = Date.now() - currentTime;
    console.log("password encrypted in ", timeNeeded, "miliseconds");
});
crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    const timeNeeded = Date.now() - currentTime;
    console.log("password encrypted in ", timeNeeded, "miliseconds");
});