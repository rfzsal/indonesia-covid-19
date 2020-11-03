'use strict';
const fs = require('fs');

exports.createFolder = (folderName) => {
  try {
    fs.mkdirSync(folderName);
  } catch (error) {
    return false;
  }
};

exports.deleteFolder = (folderName) => {
  try {
    fs.rmdirSync(folderName, { recursive: true });
  } catch (error) {
    return false;
  }
};

exports.writeFile = (fileName, data) => {
  try {
    fs.writeFileSync(fileName, data);
  } catch (error) {
    return false;
  }
};
