import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// function Layout({ children }: { children: React.ReactNode }) {
function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
