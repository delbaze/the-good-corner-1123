import { Ad } from "@/types/ad";
import AdCard from "./AdCard";
import styles from "@/styles/Ad.module.css";

function AdsGrid({ ads }: { ads: Ad[] }) {
  return (
    <div className={styles.adGrid}>
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}

export default AdsGrid;
