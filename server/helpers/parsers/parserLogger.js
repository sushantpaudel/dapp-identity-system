var path = require('path');
var winston = require('winston');
require('winston-daily-rotate-file');
var transport = new winston.transports.DailyRotateFile({
  filename: path.join('logs', 'parser-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});
var parserLogger = winston.createLogger({
  transports: [transport],
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.timestamp(),
  ),
});

module.exports = parserLogger;
