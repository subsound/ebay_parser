const fs = require('fs');
const path = require('path');

const cleanDataFiles = () => {
  const dataDir = path.join(__dirname, '../data');
  fs.readdir(dataDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dataDir, file), err => {
        if (err) throw err;
      });
    }
  });
};

module.exports = { cleanDataFiles };