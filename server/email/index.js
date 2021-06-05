const fs = require('fs');
const path = require('path');

module.exports.readEmail = (fileName, payload) => {
  const filePath = path.resolve(__dirname, 'templates', fileName);
  let htmlString = fs.readFileSync(filePath).toString('utf-8');
  const keys = Object.keys(payload);
  for (let key of keys) {
    const searchExp = new RegExp(`{{${key}}}`, 'g');
    htmlString = htmlString.replace(searchExp, payload[key]);
  }
  return htmlString;
};
