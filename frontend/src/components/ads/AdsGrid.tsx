import AdCard from "./AdCard";
import styles from "@/styles/Ad.module.css";
import { FindCategoryQuery } from "@/types/graphql";

function AdsGrid({ ads }: { ads: FindCategoryQuery["findCategory"]["ads"] }) {
  return (
    <div className={styles.adGrid}>
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}

export default AdsGrid;
