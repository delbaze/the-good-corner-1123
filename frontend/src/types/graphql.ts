import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Ad = {
  __typename?: 'Ad';
  category: Category;
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
};

export type AdCreateInput = {
  category: PartialCategoryInput;
  description?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  picture: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type AdUpdateInput = {
  category?: InputMaybe<PartialCategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Category = {
  __typename?: 'Category';
  ads: Array<Ad>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CategoryCreateInput = {
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Ad;
  createCategory: Category;
  createTag: Array<Tag>;
  deleteAd: Array<Ad>;
  deleteCategory: Array<Category>;
  deleteTag: Array<Tag>;
  updateAd: Ad;
  updateCategory: Category;
  updateTag: Tag;
};


export type MutationCreateAdArgs = {
  infos: AdCreateInput;
};


export type MutationCreateCategoryArgs = {
  infos: CategoryCreateInput;
};


export type MutationCreateTagArgs = {
  infos: TagCreateInput;
};


export type MutationDeleteAdArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateAdArgs = {
  id: Scalars['String']['input'];
  infos: AdUpdateInput;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String']['input'];
  infos: CategoryCreateInput;
};


export type MutationUpdateTagArgs = {
  id: Scalars['String']['input'];
  infos: TagUpdateInput;
};

export type PartialCategoryInput = {
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  findAd: Ad;
  findCategory: Category;
  findTag: Tag;
  listAds: Array<Ad>;
  listCategories: Array<Category>;
  listTags: Array<Tag>;
};


export type QueryFindAdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindTagArgs = {
  id: Scalars['String']['input'];
};


export type QueryListAdsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type TagCreateInput = {
  name: Scalars['String']['input'];
};

export type TagUpdateInput = {
  name: Scalars['String']['input'];
};

export type CreateCategoryMutationVariables = Exact<{
  infos: CategoryCreateInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, name: string } };

export type FindAdQueryVariables = Exact<{
  findAdId: Scalars['String']['input'];
}>;


export type FindAdQuery = { __typename?: 'Query', findAd: { __typename?: 'Ad', id: string, title: string, price: number, description: string, location: string, createdAt: string, picture: string } };

export type ListCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCategoriesQuery = { __typename?: 'Query', listCategories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type FindCategoryQueryVariables = Exact<{
  findCategoryId: Scalars['String']['input'];
}>;


export type FindCategoryQuery = { __typename?: 'Query', findCategory: { __typename?: 'Category', id: string, name: string, ads: Array<{ __typename?: 'Ad', id: string, title: string, price: number, picture: string }> } };


export const CreateCategoryDocument = gql`
    mutation CreateCategory($infos: CategoryCreateInput!) {
  createCategory(infos: $infos) {
    id
    name
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const FindAdDocument = gql`
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

/**
 * __useFindAdQuery__
 *
 * To run a query within a React component, call `useFindAdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAdQuery({
 *   variables: {
 *      findAdId: // value for 'findAdId'
 *   },
 * });
 */
export function useFindAdQuery(baseOptions: Apollo.QueryHookOptions<FindAdQuery, FindAdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAdQuery, FindAdQueryVariables>(FindAdDocument, options);
      }
export function useFindAdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAdQuery, FindAdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAdQuery, FindAdQueryVariables>(FindAdDocument, options);
        }
export function useFindAdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAdQuery, FindAdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAdQuery, FindAdQueryVariables>(FindAdDocument, options);
        }
export type FindAdQueryHookResult = ReturnType<typeof useFindAdQuery>;
export type FindAdLazyQueryHookResult = ReturnType<typeof useFindAdLazyQuery>;
export type FindAdSuspenseQueryHookResult = ReturnType<typeof useFindAdSuspenseQuery>;
export type FindAdQueryResult = Apollo.QueryResult<FindAdQuery, FindAdQueryVariables>;
export const ListCategoriesDocument = gql`
    query ListCategories {
  listCategories {
    id
    name
  }
}
    `;

/**
 * __useListCategoriesQuery__
 *
 * To run a query within a React component, call `useListCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<ListCategoriesQuery, ListCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(ListCategoriesDocument, options);
      }
export function useListCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCategoriesQuery, ListCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(ListCategoriesDocument, options);
        }
export function useListCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListCategoriesQuery, ListCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(ListCategoriesDocument, options);
        }
export type ListCategoriesQueryHookResult = ReturnType<typeof useListCategoriesQuery>;
export type ListCategoriesLazyQueryHookResult = ReturnType<typeof useListCategoriesLazyQuery>;
export type ListCategoriesSuspenseQueryHookResult = ReturnType<typeof useListCategoriesSuspenseQuery>;
export type ListCategoriesQueryResult = Apollo.QueryResult<ListCategoriesQuery, ListCategoriesQueryVariables>;
export const FindCategoryDocument = gql`
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

/**
 * __useFindCategoryQuery__
 *
 * To run a query within a React component, call `useFindCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCategoryQuery({
 *   variables: {
 *      findCategoryId: // value for 'findCategoryId'
 *   },
 * });
 */
export function useFindCategoryQuery(baseOptions: Apollo.QueryHookOptions<FindCategoryQuery, FindCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCategoryQuery, FindCategoryQueryVariables>(FindCategoryDocument, options);
      }
export function useFindCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCategoryQuery, FindCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCategoryQuery, FindCategoryQueryVariables>(FindCategoryDocument, options);
        }
export function useFindCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindCategoryQuery, FindCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCategoryQuery, FindCategoryQueryVariables>(FindCategoryDocument, options);
        }
export type FindCategoryQueryHookResult = ReturnType<typeof useFindCategoryQuery>;
export type FindCategoryLazyQueryHookResult = ReturnType<typeof useFindCategoryLazyQuery>;
export type FindCategorySuspenseQueryHookResult = ReturnType<typeof useFindCategorySuspenseQuery>;
export type FindCategoryQueryResult = Apollo.QueryResult<FindCategoryQuery, FindCategoryQueryVariables>;