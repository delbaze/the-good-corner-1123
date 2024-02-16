import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      name
    }
  }
`;

export const FIND_CATEGORY = gql`
  query FindCategory($findCategoryId: String!, $limit: Float, $skip: Float) {
    findCategory(id: $findCategoryId, limit: $limit, skip: $skip) {
      ads {
        id
        title
        price
        picture
      }
      count
      category {
        id
        name
      }
    }
  }
`;
