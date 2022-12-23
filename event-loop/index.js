const fs = require('fs');
const now = Date.now();
const crypto = require('crypto');

setTimeout(() => {
    console.log("the text have been logged to the console.")
}, 0);

setImmediate(()=> {
    console.log("this is an immediate text.")
})
fs.readFile("./test-file.txt" , () => { 

    setImmediate(() => {
        console.log("file reading finished immediately")
    });

    // work before the immediate text
    process.nextTick(()=> {
        console.log('after process next tick is done. ')
    });

    // doing some intensive task using the threadpool that will block the current thread of the process
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - now);
})

console.log("I belong on the top lavel!")