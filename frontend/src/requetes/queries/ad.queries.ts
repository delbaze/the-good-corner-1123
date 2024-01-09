import { gql } from "@apollo/client";

export const FIND_AD = gql`
  query FindAd($findAdId: String!) {
    findAd(id: $findAdId) {
      id
      title
      price
      description
      location
      createdAt
      picture
    }
  }
`;
