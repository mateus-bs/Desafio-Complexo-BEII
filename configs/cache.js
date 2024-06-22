// configs/cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30, checkperiod: 30 });

module.exports = cache;
