const fs = require('fs');
const path = require('path');

let dirPath = path.dirname('/01-read-file/text.txt')

// let stream = fs.createReadStream(dirPath + '/text.txt')
let stream = fs.createReadStream('./01-read-file/text.txt', 'utf-8')

stream.on('data', chunk => console.log(chunk));

// console.log(path.dirname('text.txt'))
