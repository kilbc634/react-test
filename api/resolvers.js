
const resolvers = {
    Query: {
        postOptionData: (parent, args) => {
            const {name, type} = args;
            const ts = Date.now().toString();
            return {
                timestamp: ts,
                name: name,
                type: type
            };
        }
    },
    PostOptionData: {
        priceData: (parent, args) => {
            const socketData = Object.assign({}, args);
            const {name, type} = parent;
            console.log(`Should add data ${JSON.stringify(socketData)} for ${name} of ${type}`);
            return socketData;
        }
    }
}

module.exports = resolvers;
