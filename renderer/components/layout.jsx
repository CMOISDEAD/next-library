import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useStore } from "../store/store";

const Layout = ({ children }) => {
  const { theme } = useStore((state) => ({ theme: state.theme }));
  return (
    <div data-theme={theme}>
      <Header />
      <div className="min-h-[90.8vh]">
        <div className="pt-16">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
