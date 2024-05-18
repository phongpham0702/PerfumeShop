import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import OffCanvasMenu from "../OffCanvasMenu";
import { useContext, useState } from "react";
import MenuContext from "../../MenuContext";

const Header = () => {
  const menuContext = useContext(MenuContext);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const token = localStorage?.getItem("accessToken");

  return (
    <header>
      <div className="w-fulls m-auto flex h-[80px] items-center justify-between border-b-[1px] border-black px-5 font-space text-lg sm:px-[50px]">
        <div className="hidden w-[40%] lg:block">
          <ul className="flex gap-7">
            <li className="cursor-pointer">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to="/brands"
              >
                Brands
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to="/shop"
              >
                Shop
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to="/blog"
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="w-[50%] cursor-pointer lg:w-[20%]">
          <NavLink to="/">
            <img
              className="w-[120px] lg:mx-auto"
              src="http://localhost:5173/images/luxe-logo.svg"
              alt="logo"
            />
          </NavLink>
        </div>

        <div className="w-[50%] lg:w-[40%]">
          <ul className="flex justify-end gap-8">
            <li
              onClick={() => setIsSearch((prev) => !prev)}
              className="hidden cursor-pointer text-2xl sm:block"
            >
              <AiOutlineSearch />
            </li>
            <li className="hidden cursor-pointer text-2xl sm:block">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to={token ? "/account" : "/login"}
              >
                <AiOutlineUser />
              </NavLink>
            </li>
            <li className="hidden cursor-pointer text-2xl sm:block">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to="/wishlist"
              >
                <AiOutlineHeart />
              </NavLink>
            </li>
            <li className="hidden cursor-pointer text-2xl sm:block">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to="/cart"
              >
                <AiOutlineShoppingCart />
              </NavLink>
            </li>
            <li
              onClick={() => {
                menuContext.handleOpen();
              }}
              className="block cursor-pointer text-3xl sm:text-2xl lg:hidden"
            >
              <AiOutlineMenuFold />
            </li>
          </ul>
        </div>
      </div>

      <OffCanvasMenu />
    </header>
  );
};

export default Header;
