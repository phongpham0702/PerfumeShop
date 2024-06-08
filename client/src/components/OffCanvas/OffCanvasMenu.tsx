import { ReactNode, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import MenuContext from "../../contexts/MenuContext";

const OffCanvasMenu = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { id: contextId, handleClose } = useContext(MenuContext);

  return (
    <div className="overflow-x-hidden">
      <div
        onClick={handleClose}
        className={`fixed left-0 right-0 top-0 z-[20] h-[100vh] bg-[#3333337b] ${
          contextId === id ? "block" : "hidden"
        }`}
      />

      <div
        className={`scrollbar-hide fixed bottom-0 right-0 top-0 z-[100] h-[100vh] w-full overflow-y-scroll bg-[#fff] p-4 font-space shadow-lg sm:w-[320px] ${
          contextId === id
            ? "block animate-[goIn_.3s_ease-out_both]"
            : "hidden animate-[goOut_.3s_ease-out_both]"
        } `}
      >
        <NavLink onClick={handleClose} to="/">
          <img
            className="mb-4 w-[120px]"
            src="http://localhost:5173/images/luxe-logo.svg"
            alt="logo"
          />
        </NavLink>
        {children}
        <button
          onClick={handleClose}
          className="fixed right-5 top-5 rounded-full border border-[#a7a5a5] p-3 hover:border-[#2d2c2c]"
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default OffCanvasMenu;
