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

export const LIST_AD_WITH_FILTER = gql`
  query ListAdsWithFilter($search: String) {
    listAds(search: $search) {
      category {
        name
      }
      id
      title
    }
  }
`;
