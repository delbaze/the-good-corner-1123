import AdsGrid from "@/components/ads/AdsGrid";
import Pagination from "@/components/ads/Pagination";
import Back from "@/components/common/Back";
import { useFindCategoryLazyQuery } from "@/types/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
function CategoryAds() {
  const router = useRouter();
  // const [findCategory, {data, loading, error}] = useLazyQuery<FindCategoryQuery, FindCategoryQueryVariables>(FIND_CATEGORY)
  const [findCategory, { data, loading }] = useFindCategoryLazyQuery({
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (router.isReady) {
      findCategory({
        variables: { findCategoryId: router.query.id as string },
      });
    }
  }, [router.isReady]);

  const callRequest = (p: number, limit: number) => {
    console.log(p, limit);
    findCategory({
      variables: {
        findCategoryId: router.query.id as string,
        limit,
        skip: (p - 1) * limit,
      },
    });
  };
  if (loading) {
    return <div>Chargement en cours</div>;
  }
  return (
    <div>
      <Back />
      <h1>{data?.findCategory.category.name}</h1>
      {data?.findCategory.ads.length ? (
        <>
          <AdsGrid ads={data?.findCategory.ads} />
          <Pagination
            count={data?.findCategory.count}
            callRequest={callRequest}
          />
        </>
      ) : (
        <div>Aucune annonce dans cette catégorie</div>
      )}
    </div>
  );
}

export default CategoryAds;
