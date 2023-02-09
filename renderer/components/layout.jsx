import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout = ({ children }) => {
  return (
    <div data-theme="black">
      <Header />
      <div className="min-h-screen">
        <div className="container mx-auto py-16">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
