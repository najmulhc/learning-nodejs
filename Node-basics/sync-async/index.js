const fs = require('fs');


// synchronas way of reading a file 
const text = fs.readFileSync('./texts/input.txt', 'utf-8');
console.log(text);
console.log('this will print once the server finished reading the input file. ')
console.log("")
// asynchronas way of reading the same file 
fs.readFile('./texts/input.txt', 'utf-8', (err, text) => {
    console.log(text);
})
console.log("this is printend before the reading is finished as node is reading the file in the mean time. ")