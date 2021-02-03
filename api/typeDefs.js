const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    testData: String!
    getOptionData(code: String, type: String!): GetOptionData
    postOptionData(code: String, type: String!): PostOptionData
  }

  type GetOptionData {
    timestamp: String!
    code: String
    type: String!
    priceData(index: Int): PriceData
    priceDatas(begin: Int, end: Int): [PriceData]
  }

  type PostOptionData {
    timestamp: String!
    code: String
    type: String!
    priceData(any: Int, s1: Int, s2: Int, s3: Int, s4: Int, s5: Int, s6: Int, s7: Int, s8: Int): PriceData
  }

  type PriceData {
    timestamp: String!
    any: Int
    s1: Int
    s2: Int
    s3: Int
    s4: Int
    s5: Int
    s6: Int
    s7: Int
    s8: Int
  }
`;

module.exports = typeDefs;
