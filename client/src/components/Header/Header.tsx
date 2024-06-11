import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import OffCanvasMenu from "../OffCanvas/OffCanvasMenu";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import MenuContext from "../../contexts/MenuContext";
import OffCanvasMenuItem from "../OffCanvas/OffCanvasMenuItem";
// import SearchContext from "../../contexts/SearchContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const [searchVal, setSearchVal] = useState("");
  const [wishlistCount, setWishlistCount] = useState(
    localStorage.getItem("wishlistCount"),
  );
  const [cartCount, setCartCount] = useState(localStorage.getItem("cartCount"));
  window.addEventListener("storage", () => {
    setWishlistCount(localStorage.getItem("wishlistCount"));
    setCartCount(localStorage.getItem("cartCount"));
  });
  const handleSearchVal = (val: string) => setSearchVal(val);

  const menuContext = useContext(MenuContext);
  const token = localStorage?.getItem("accessToken");
  const navigate = useNavigate();
  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/shop/1?search=${searchVal}`);
    handleClose();
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as HTMLDivElement)
      )
        handleClose();
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [formRef]);

  // console.log(localStorage.getItem("wishlist_items"));

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
          <ul className="flex items-center justify-end gap-8">
            {isOpen ? (
              <form
                ref={formRef}
                action=""
                onSubmit={handleSubmitSearch}
                className="mx-auto flex w-[80%] items-center gap-2 rounded-lg border border-[#d5cfcf] px-4 text-lg transition-all duration-1000"
              >
                <input
                  className="w-full p-1 outline-none"
                  type="text"
                  placeholder="Search..."
                  name="searchVal"
                  // value={searchContext.searchVal}
                  onChange={(e) => handleSearchVal(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  // onClick={() => setIsSearch((prev) => !prev)}
                  className="hidden cursor-pointer text-2xl sm:block"
                >
                  <AiOutlineSearch />
                </button>
              </form>
            ) : (
              <li
                onClick={() => handleOpen()}
                className="hidden cursor-pointer text-3xl sm:block"
              >
                <AiOutlineSearch />
              </li>
            )}
            <li className="hidden cursor-pointer text-3xl sm:block">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to={token ? "/account" : "/login"}
              >
                <AiOutlineUser />
              </NavLink>
            </li>
            <li className="relative hidden cursor-pointer text-3xl sm:block">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to="/wishlist"
              >
                <AiOutlineHeart />
                <span className="absolute right-[-12px] top-[-6px] rounded-[50%] border-[3px] border-[#f0f2ee] bg-[#f50963] px-[6px] text-[12px] text-sm font-bold leading-[17px] text-white">
                  {wishlistCount}
                </span>
              </NavLink>
            </li>
            <li className="relative hidden cursor-pointer text-3xl sm:block">
              <NavLink
                className="aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
                to="/cart"
              >
                <AiOutlineShoppingCart />
                <span className="absolute right-[-12px] top-[-6px] rounded-[50%] border-[3px] border-[#f0f2ee] bg-[#f50963] px-[6px] text-[12px] text-sm font-bold leading-[17px] text-white">
                  {cartCount}
                </span>
              </NavLink>
            </li>
            <li
              onClick={() => {
                menuContext.handleOpen("menu");
              }}
              className="block cursor-pointer text-3xl sm:text-2xl lg:hidden"
            >
              <AiOutlineMenuFold />
            </li>
          </ul>
        </div>
      </div>

      <OffCanvasMenu id="menu">
        <div className="flex flex-col gap-4">
          <OffCanvasMenuItem url="/">Home</OffCanvasMenuItem>
          <OffCanvasMenuItem url="/about">About</OffCanvasMenuItem>
          <OffCanvasMenuItem url="/brands">Brands</OffCanvasMenuItem>
          <OffCanvasMenuItem url="/shop">Shop</OffCanvasMenuItem>
          <OffCanvasMenuItem url="/blog">Blog</OffCanvasMenuItem>
        </div>
      </OffCanvasMenu>
    </header>
  );
};

export default Header;
