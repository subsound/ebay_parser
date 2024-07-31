const fs = require('fs');

export const readItemsFromFile = () => {
  if (fs.existsSync(jsonFileName)) {
    const data = fs.readFileSync(jsonFileName, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};