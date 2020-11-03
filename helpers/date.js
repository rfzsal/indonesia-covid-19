const luxon = require('luxon').DateTime;

exports.formatTimestamp = (time) => {
  if (!time) return null;

  let timestamp;
  while (!timestamp) {
    try {
      timestamp = luxon.fromISO(time);
      if (timestamp.isValid) break;

      timestamp = timestamp = luxon.fromMillis(time);
      if (timestamp.isValid) break;

      throw new Error('Invalid date format!');
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  return timestamp.setZone('Asia/Bangkok').set({ hour: 7 }).toMillis();
};
