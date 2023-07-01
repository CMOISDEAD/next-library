import { Header } from "./Header";
import { Footer } from "./Footer";
import { useStore } from "../store/store";

const Layout = ({ children }) => {
  const { theme } = useStore((state) => ({ theme: state.theme }));
  return (
    <div data-theme={theme} className="relative min-h-screen">
      <Header />
      <div className="bg-gradient-to-tl from-base-100 to-base-300">
        <div className="py-16 min-h-screen">{children}</div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
