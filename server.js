const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const typeDefs = require('./api/typeDefs');
const resolvers = require('./api/resolvers');
const redisAPI = require('./api/redisAPI');
const setting = require('./setting');

// --------------------- Session init

var sessionMiddleware = session({
    secret: 'tsukumonotsuki', // change this!
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge : 1000 * 60 * 60 * 12, // unit is 'ms'
    }
});

// --------------------- Express init

const app = express();
app.use(bodyParser.json({limit: '1mb'}));
app.use('/', express.static(__dirname + '/build'));
app.use(sessionMiddleware);

const GQLserver = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        redisAPI: new redisAPI('redisDB')
    })
});
GQLserver.applyMiddleware({app});

app.get('/', function (req, res) {
    res.redirect('/index');
});

app.get('/index(.html)?', function (req, res) {
    res.sendFile(__dirname + 'build/index.html'); 
});

app.listen(setting.WEB_PORT, function () {
    console.log(`Node server is running on HOST:${setting.WEB_PORT}`);
});