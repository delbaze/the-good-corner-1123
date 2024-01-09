import CategoryGrid from "@/components/categories/CategoryGrid";
import { useListCategoriesQuery } from "@/types/graphql";

function ListCategories() {
  // const {data, loading, error} = useQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(LIST_CATEGORIES)
  const { data, loading } = useListCategoriesQuery({
    fetchPolicy: "no-cache"
  });
  if (loading) {
    return <div>Chargement en cours</div>;
  }

  return (
    <>
      <h1>Liste des catégories : </h1>
      {data?.listCategories.length ? (
        <CategoryGrid categories={data.listCategories} />
      ) : (
        <div>Aucune catégorie</div>
      )}
    </>
  );
}

export default ListCategories;
