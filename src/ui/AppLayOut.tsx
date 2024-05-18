import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Subscribe from "../components/Subscribe/Subscribe";
import { MenuProvider } from "../contexts/MenuContext";
import { SearchProvider } from "../contexts/SearchContext";

const AppLayOut = () => {
  return (
    <>
      <SearchProvider>
        <MenuProvider>
          <Header />
        </MenuProvider>
      </SearchProvider>
      <main className="relative font-sans">
        <Outlet />
      </main>
      <Subscribe />
      <Footer />
    </>
  );
};

export default AppLayOut;
