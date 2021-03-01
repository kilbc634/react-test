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

export const GQL_postOptionData = gql`
  query ($code: String, $type: String!,
    $any: Int,
    $s1: Int,
    $s2: Int,
    $s3: Int,
    $s4: Int,
    $s5: Int,
    $s6: Int,
    $s7: Int,
    $s8: Int) {
    postOptionData(code: $code, type: $type) {
      type
      code
      priceData(
        any: $any,
        s1: $s1,
        s2: $s2,
        s3: $s3,
        s4: $s4,
        s5: $s5,
        s6: $s6,
        s7: $s7,
        s8: $s8) {
        timestamp
        any
        s1
        s2
        s3
        s4
        s5
        s6
        s7
        s8
      }
    }
  }
`;
