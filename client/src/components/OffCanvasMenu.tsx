import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import MenuContext from "../MenuContext";

const OffCanvasMenu = () => {
  const { isOpen, handleClose } = useContext(MenuContext);

  return (
    <div>
      <div
        onClick={handleClose}
        className={`fixed left-0 right-0 top-0 z-[20] h-[100vh] bg-[#3333337b] ${
          isOpen ? "block" : "hidden"
        }`}
      />

      <div
        className={`fixed bottom-0 right-0 top-0 z-[100] h-[100vh] w-full bg-[#fff] p-4 font-space shadow-lg sm:w-[320px] ${
          isOpen
            ? "animate-[goIn_.3s_ease-out_both]"
            : "animate-[goOut_.3s_ease-out_both]"
        }`}
      >
        <NavLink to="/">
          <img
            className="mb-4 w-[120px]"
            src="http://localhost:5173/images/luxe-logo.svg"
            alt="logo"
          />
        </NavLink>
        <ul className="flex flex-col gap-4">
          <li className="cursor-pointer border-0 border-b-[1px]  pb-1">
            <NavLink
              className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className=" cursor-pointer border-0 border-b-[1px] pb-1 ">
            <NavLink
              className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className=" cursor-pointer border-0 border-b-[1px] pb-1">
            <NavLink
              className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
              to="/brands"
            >
              Brands
            </NavLink>
          </li>
          <li className=" cursor-pointer border-0 border-b-[1px] pb-1">
            <NavLink
              className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
              to="/shop"
            >
              Shop
            </NavLink>
          </li>
          <li className=" cursor-pointer border-0 border-b-[1px] pb-1">
            <NavLink
              className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
              to="/blog"
            >
              Blog
            </NavLink>
          </li>
        </ul>
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
