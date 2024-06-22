// middlewares/cacheMiddleware.js
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = (req, res, next) => {
  const cachedData = cache.get(req.originalUrl);
  if (cachedData) {
    console.log('Cache hit for', req.originalUrl);
    return res.json(cachedData);
  }
  console.log('Cache miss for', req.originalUrl);
  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(req.originalUrl, body);
    res.sendResponse(body);
  };
  next();
};
