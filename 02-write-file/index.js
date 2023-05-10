const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = require('process');

const filePath = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

function fillFile() {
  console.log('введите что-нибудь');
  rl.on('line', (input) => {
    if (input === 'exit') {
      console.log('сохранено в text.txt');
      rl.close();
    } else fs.appendFile(filePath, input + '\n', (err) => {
      if (err) throw new err;
    });
  });
  rl.on('SIGINT', () => {
    console.log('сохранено в text.txt');
    rl.close();
  });
}

fillFile();








