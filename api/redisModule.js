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

redisModule.set = function(key, value) {
    return new Promise((resolve, reject) => {
        RedisClient.set(key, value, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('');
            }
        });
    });
}

redisModule.lrange = function(key, begin, end) {
    return new Promise((resolve, reject) => {
        RedisClient.lrange(key, begin, end, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

redisModule.lpush = function(key, value) {
    return new Promise((resolve, reject) => {
        RedisClient.lpush(key, value, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('');
            }
        });
    });
}

module.exports = redisModule;
