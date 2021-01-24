const redis = require('redis');
const setting = require('../setting');

// Redis client connect init
const RedisClient = redis.createClient({
    host: setting.REDIS_HOST,
    port: setting.REDIS_PORT,
    password: setting.REDIS_AUTH
});
RedisClient.on('connect', function() {
    console.log('Redis client connected');
});
RedisClient.on('error', function(error) {
    console.error(error);
});

// Redis functions
const redisModule = {};

redisModule.get = function(key) {
    return new Promise((resolve, reject) => {
        RedisClient.get(key, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = redisModule;
