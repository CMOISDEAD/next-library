import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="min-h-[81.5vh]" data-theme="luxury">
        <div className="container mx-auto py-5">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
