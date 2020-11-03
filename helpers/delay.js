'use strict';

exports.delay = (time) => {
  if (!time) return false;

  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
};
