
const fs = require('fs');
const path = require('path');
const logDir = path.resolve(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const logFile = path.join(logDir, 'error.log');

function logError(err) {
  const entry = `[${new Date().toISOString()}] ${err && err.stack ? err.stack : String(err)}\n`;
  fs.appendFileSync(logFile, entry);
}

module.exports = { logError };
