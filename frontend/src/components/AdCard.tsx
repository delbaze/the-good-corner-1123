import { Ad } from "@/types/ad";
import Image from "next/image";
import styles from "@/styles/Ad.module.css";
import Link from "next/link";
function AdCard({ ad }: { ad: Ad }) {
  return (
    <div key={ad.id} className={styles.adCard}>
      <div>{ad.title}</div>
      <div>{ad.price}</div>
      <Image
        src={ad.picture}
        alt={ad.title}
        width={50}
        height={50}
        className={styles.image}
      />
      <Link href={`/ads/${ad.id}`} className={styles.button}>
        Voir l'annonce
      </Link>
    </div>
  );
}

export default AdCard;
