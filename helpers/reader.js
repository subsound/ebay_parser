const fs = require('fs');

const readItemsFromFile = (jsonFileName) => {
  if (fs.existsSync(jsonFileName)) {
    const data = fs.readFileSync(jsonFileName, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

module.exports = { readItemsFromFile };