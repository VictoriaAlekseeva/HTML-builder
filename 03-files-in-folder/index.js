const { stat } = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const dirPath = path.join(__dirname, '/secret-folder');

async function readDir() {
  try {
    const files = await readdir(dirPath, {withFileTypes: true});
    for (const file of files)
      if (file.isFile()) { // && (file.name !== '.DS_Store')
        stat(path.join(dirPath, file.name), (err, stats) => {
          if (err) throw err;
          console.log(file.name.split('.')[0], '-', path.extname(file.name).slice(1), '-', `${stats.size}b`);
        });
      }
  } catch (err) {
    console.error(err);
  }
}

readDir();