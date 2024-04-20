import { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);

  return (
    <div className="w-fulls m-auto flex h-[80px] items-center justify-between border-b-[1px] border-black px-[50px] font-sans text-lg">
      <div className="w-[40%] ">
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
      <div className=" w-[20%] cursor-pointer">
        <NavLink to="/">
          <img
            className="mx-auto w-[120px]"
            src="http://localhost:5173/images/luxe-logo.svg"
            alt="logo"
          />
        </NavLink>
      </div>
      <div className="w-[40%] ">
        <ul className="flex justify-end gap-8">
          <li
            onClick={() => setIsSearch((prev) => !prev)}
            className="cursor-pointer text-2xl"
          >
            <AiOutlineSearch />
          </li>
          <li className="cursor-pointer text-2xl">
            <NavLink
              className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
              to="/account"
            >
              <AiOutlineUser />
            </NavLink>
          </li>
          <li className="cursor-pointer text-2xl">
            <NavLink
              className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
              to="/cart"
            >
              <AiOutlineShoppingCart />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
