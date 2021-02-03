
const resolvers = {
    Query: {
        testData: async (_, __, { dataSources }) => {
            var data = await dataSources.redisAPI.get_data_test();
            return data;
        },
        getOptionData: (parent, args) => {
            const {code, type} = args;
            const timestamp = Date.now().toString();
            return {
                timestamp: timestamp,
                code: code,
                type: type
            };
        },
        postOptionData: (parent, args) => {
            const {code, type} = args;
            const timestamp = Date.now().toString();
            return {
                timestamp: timestamp,
                code: code,
                type: type
            };
        }
    },
    GetOptionData: {
        priceData: async (parent, args, { dataSources }) => {
            const {index} = args;
            const {code, type} = parent;
            var data = await dataSources.redisAPI.get_option_data(code, type, index, index);
            return data[0];
        },
        priceDatas: async (parent, args, { dataSources }) => {
            const {begin, end} = args;
            const {code, type} = parent;
            var data = await dataSources.redisAPI.get_option_data(code, type, begin, end);
            return data;
        }
    },
    PostOptionData: {
        priceData: async (parent, args, { dataSources }) => {
            const socketData = args;
            const {timestamp, code, type} = parent;
            var data = await dataSources.redisAPI.post_option_data(code, type, timestamp, socketData);
            return data;
        }
    }
}

module.exports = resolvers;
