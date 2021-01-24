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
}

module.exports = redisAPI;
