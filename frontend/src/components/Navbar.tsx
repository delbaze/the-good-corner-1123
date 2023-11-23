import Image from "next/image";
import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import SearchBar from "./Searchbar";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoBloc}>
        <Link href="/">
          <Image alt="logo" src="/logo.svg" width={60} height={60} />
        </Link>
      </div>
      <div className={styles.inputBloc}>
        <SearchBar />
      </div>
      <div>
        <Link className={styles.addAdButton} href="/">
          Accueil
        </Link>
        <Link className={styles.addAdButton} href="/categories/list">
          Liste des catégories
        </Link>
        <Link href={"/ads/create"} className={styles.addAdButton}>
          Ajouter une annonce
        </Link>
        <Link href={"/admin/categories/create"} className={styles.addAdButton}>
          Ajouter une catégorie
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
