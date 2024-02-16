import { Ad } from "@/types/ad";
import Image from "next/image";
import styles from "@/styles/Ad.module.css";
import Link from "next/link";
import { FindCategoryQuery } from "@/types/graphql";
function AdCard({ ad }: { ad: FindCategoryQuery["findCategory"]["ads"][0]}) {
  return (
    <div key={ad.id} className={styles.adCard}>
      <div>{ad.title}</div>
      <div>{ad.price}</div>
      <img
        src={`http://localhost:3002${ad.picture}`}
        alt={ad.title}
        width={50}
        height={50}
        className={styles.image}
      />
      <Link href={`/ads/view/${ad.id}`} className={styles.button}>
        Voir l'annonce
      </Link>
    </div>
  );
}

export default AdCard;
