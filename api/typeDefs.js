const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    postOptionData(name: String!, type: String!): PostOptionData
  }

  type PostOptionData {
    timestamp: String!
    name: String!
    type: String!
    priceData(any: Int, s1: Int, s2: Int, s3: Int, s4: Int, s5: Int, s6: Int, s7: Int, s8: Int): PriceData
  }

  type PriceData {
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
