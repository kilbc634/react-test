import { gql } from '@apollo/client';

export const GQL_getOptionData = gql`
  query ($code: String, $type: String!) {
    getOptionData(code: $code, type: $type) {
      type
      code
      priceDatas(begin: 0) {
        timestamp
        s6
        s7
        s8
      }
    }
  }
`;


