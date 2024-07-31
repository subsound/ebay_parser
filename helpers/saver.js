const fs = require('fs');
const path = require('path');

const saveItemsToFile = (items, jsonFileName) => {
  const dir = path.dirname(jsonFileName);

  // Ensure the directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(jsonFileName, JSON.stringify(items, null, 2), 'utf-8');
};

module.exports = { saveItemsToFile };