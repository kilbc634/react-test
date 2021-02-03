const { DataSource } = require('apollo-datasource');
const redisModule = require('./redisModule');

class redisAPI extends DataSource {
    constructor(name) {
        super();
        this.name = name;
    }

    initialize(config) {
        this.context = config.context;
    }

    async get_data_test() {
        const key = 'test';
        var data = await redisModule.get(key);
        return data;
    }

    async get_option_data(optionCode, type, begin, end) {
        if (!optionCode) {optionCode = 'NONE'}
        if (!begin && !Number.isInteger(begin)) {begin = 0}
        if (!end && !Number.isInteger(end)) {end = begin + 50}
        const key = `PSO2/OPs/${type}/${optionCode}`;
        var resp = await redisModule.lrange(key, begin, end);
        if (!resp) {
            return [];
        } else {
            resp = resp.map(value => JSON.parse(value));
            return resp;
        }
    }

    async post_option_data(optionCode, type, timestamp, socketData) {
        if (!optionCode) {optionCode = 'NONE'}
        const key = `PSO2/OPs/${type}/${optionCode}`;
        socketData['timestamp'] = timestamp;
        var resp = await redisModule.lpush(key, JSON.stringify(socketData));
        if (resp) {
            return resp;
        } else {
            return socketData;
        }
    }
}

module.exports = redisAPI;
