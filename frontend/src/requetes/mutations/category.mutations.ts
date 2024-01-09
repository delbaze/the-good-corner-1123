import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($infos: CategoryCreateInput!) {
    createCategory(infos: $infos) {
      id
      name
    }
  }
`;
