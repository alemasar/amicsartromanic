const fs = require('fs');

const createDirectory = path => {
  fs.mkdirSync(path, { recursive: true }, e => {
    if (e) {
      console.error(e);
    } else {
      //console.log('Success');
    }
  });
};

module.exports = createDirectory;
