import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const AppLayOut = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayOut;
