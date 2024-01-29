const cache = require("../../index");

const check = async (req, res, next) => {
  const endPointPath = req.path;
  const cachedData = cache.get(endPointPath);

  //   console.log(endPointPath);

  if (cachedData && cachedData.date === new Date().getDate()) {
    console.log("Data retrieved from cache");
    res.json(cachedData);
  } else {
    console.log("Data not found in cache, fetching from source");
    req.body = { cacheKey: endPointPath };
    next();
  }
};

module.exports = check;
