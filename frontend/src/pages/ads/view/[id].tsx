import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Back from "@/components/common/Back";
import { useFindAdLazyQuery } from "@/types/graphql";

function AdDetails() {
  const router = useRouter();

  const [findAd, { data, loading }] = useFindAdLazyQuery();

  useEffect(() => {
    if (router.isReady) {
      findAd({ variables: { findAdId: router.query.id as string } });
    }
  }, [router.isReady, router.query]);

  if (loading) {
    <div>Chargement en cours</div>;
  }
  return (
    <div>
      <Back />
      {data?.findAd ? (
        <>
          <h1>{data?.findAd.title}</h1>
          <p>Description : {data?.findAd.description}</p>
          <p>Localité : {data?.findAd.location}</p>
          <p>Créé le : {new Date(+data?.findAd.createdAt).toLocaleString()}</p>
          <div>
            
            <img
              width={50}
              height={50}
              alt={data?.findAd.title}
              src={`http://localhost:3002${data?.findAd.picture}`}
              />
          </div>
        </>
      ) : (
        <div>L'annonce n'existe pas</div>
      )}
    </div>
  );
}

export default AdDetails;
