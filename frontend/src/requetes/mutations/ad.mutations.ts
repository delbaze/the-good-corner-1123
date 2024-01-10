import { gql } from "@apollo/client";

export const CREATE_AD = gql`
  mutation CreateAd($infos: AdCreateInput!) {
    createAd(infos: $infos) {
      category {
        id
      }
    }
  }
`;
