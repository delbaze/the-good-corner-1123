import { useRouter } from "next/router";
import { useEffect } from "react";

function CategoryAds() {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
        //faire la récupération des données
        console.log("je récupère les données", router.query.id);
    }
  }, [router.isReady]);
  return <div>Ici il y aura la liste des annonces</div>;
}

export default CategoryAds;
