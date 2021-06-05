const schedule = require('node-schedule');
const EVERY_HOUR = '*/60 * * * *';
const EVERY_SECOND = '*/1 * * * * *';

const job = schedule.scheduleJob(EVERY_HOUR, async () => {
  /**
   * You have to write scheduler here
   */
});
