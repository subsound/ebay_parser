const fs = require('fs');
const jsonFileName = process.env.JSON_FILE_NAME || 'data/items.json';

export const saveItemsToFile = (items) => {
  fs.writeFileSync(jsonFileName, JSON.stringify(items, null, 2), 'utf-8');
};
