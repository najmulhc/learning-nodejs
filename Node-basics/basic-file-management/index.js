// access the file system
const fs = require('fs');
// read the input text from the file and store that into a variable as a string. 

const inputString = fs.readFileSync("./texts/input.txt", 'utf-8');
console.log(inputString);

// create an output text
const outputString = 'this is a text written in a node server'; 
fs.writeFileSync('./texts/output.txt', outputString);