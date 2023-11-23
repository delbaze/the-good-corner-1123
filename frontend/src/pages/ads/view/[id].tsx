import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import { Ad } from "@/types/ad";
import { AxiosResponse } from "axios";
import Back from "@/components/Back";

function AdDetails() {
  const [ad, setAd] = useState<Ad>();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      axiosInstance
        .get<AxiosResponse<Ad>["data"]>(`/ads/find/${router.query.id}`)
        .then((result) => {
          console.log('%c⧭', 'color: #807160', result);
          setAd(result.data);
        });
    }
  }, [router.isReady]);

  return (
    <div>
      <Back />
      {ad ? (
        <>
          <h1>{ad.title}</h1>
          <p>Description : {ad.description}</p>
          <p>Localité : {ad.location}</p>
          <p>Créé le : {new Date(ad.createdAt).toLocaleString()}</p>
          <div>
            <Image width={50} height={50} alt={ad.title} src={ad.picture} />
          </div>
        </>
      ) : (
        <div>L'annonce n'existe pas</div>
      )}
    </div>
  );
}

export default AdDetails;
