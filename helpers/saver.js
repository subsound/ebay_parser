const fs = require('fs');

const saveItemsToFile = (items, jsonFileName) => {
  fs.writeFileSync(jsonFileName, JSON.stringify(items, null, 2), 'utf-8');
};

module.exports = { saveItemsToFile };