const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = require('process');

const filePath = path.join(__dirname, '/text.txt');

const writeStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

function fillFile() {
  console.log('введите что-нибудь')
  rl.on('line', (input) => {
    if (input === 'exit') {
      rl.close();
    } else writeStream.write(`${input}\n`);
  })
  rl.on('SIGINT', () => {
    rl.close()
  });
}

fillFile();








