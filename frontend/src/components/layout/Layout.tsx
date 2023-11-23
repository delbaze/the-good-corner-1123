import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";

// function Layout({ children }: { children: React.ReactNode }) {
function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.mainBloc}>
      <div className={styles.container}>
        <div className={styles.headerPage}>
          <Navbar />
        </div>
        <div className={styles.app}>{children}</div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
