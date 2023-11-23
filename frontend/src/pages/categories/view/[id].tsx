import AdsGrid from "@/components/ads/AdsGrid";
import Back from "@/components/common/Back";
import axiosInstance from "@/lib/axiosInstance";
import { Category } from "@/types/category";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function CategoryAds() {
  const router = useRouter();
  const [category, setCategory] = useState<Category>();
  useEffect(() => {
    if (router.isReady) {
      axiosInstance
        .get<Category>(
          `/categories/find/${router.query.id}`
        )
        .then((result) => {
          setCategory(result.data);
        });
    }
  }, [router.isReady]);
  return (
    <div>
      <Back />
      <h1>{category?.name}</h1>
      {category?.ads.length ? (
        <AdsGrid ads={category.ads} />
      ) : (
        <div>Aucune annonce dans cette catégorie</div>
      )}
    </div>
  );
}

export default CategoryAds;
