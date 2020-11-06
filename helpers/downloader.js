'use strict';
const fs = require('fs');
const axios = require('axios');

exports.downloadImage = async (url, imageName) => {
  const image = await axios.get(url, {
    responseType: 'stream'
  });

  image.data
    .pipe(fs.createWriteStream(`public/image/${imageName}.png`))
    .on('error', () => false);
};
