import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Subscribe from "../components/Subscribe/Subscribe";

const AppLayOut = () => {
  return (
    <>
      <Header />
      <main className="font-sans">
        <Outlet />
      </main>
      <Subscribe />
      <Footer />
    </>
  );
};

export default AppLayOut;
