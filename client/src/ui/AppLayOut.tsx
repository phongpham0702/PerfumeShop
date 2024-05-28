import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Subscribe from "../components/Subscribe/Subscribe";
import { MenuProvider } from "../contexts/MenuContext";

const AppLayOut = () => {
  return (
    <>
      <MenuProvider>
        <Header />
      </MenuProvider>
      <main className="relative font-sans">
        <Outlet />
      </main>
      <Subscribe />
      <Footer />
    </>
  );
};

export default AppLayOut;
