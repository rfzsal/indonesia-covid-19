'use strict';
const data = require('./controllers/data');

const update = async () => {
  await data.update();
};

update();
