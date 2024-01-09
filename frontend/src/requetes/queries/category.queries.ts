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
  query FindCategory($findCategoryId: String!) {
    findCategory(id: $findCategoryId) {
      id
      name
      ads {
        id
        title
        price
        picture
      }
    }
  }
`;
