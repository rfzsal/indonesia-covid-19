'use strict';
const data = require('../controllers/data');

exports.start = async (interval) => {
  if (!interval) return false;

  await data.update();

  setInterval(async () => {
    let isDone;
    while (!isDone) {
      try {
        await data.update();
      } catch (error) {
        console.log(error);
        continue;
      }

      isDone = true;
    }
  }, interval * 60 * 1000);
};
