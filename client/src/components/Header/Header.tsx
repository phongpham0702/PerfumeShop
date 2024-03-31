import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex h-[80px] w-full items-center justify-between border-b-[1px] border-black px-[60px] text-lg font-thin ">
      <div className="w-[33.33%] ">
        <ul className="flex gap-7">
          <li className="cursor-pointer">
            <Link to="/">trang chủ</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/about">giới thiệu</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/brands">thương hiệu</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/shop">sản phẩm</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/blog">blog</Link>
          </li>
        </ul>
      </div>
      <div className=" w-[33.33%] cursor-pointer">
        <Link to="/">
          <img
            className="mx-auto w-[120px]"
            src="./images/luxe-logo.svg"
            alt="logo"
          />
        </Link>
      </div>
      <div className="w-[33.33%] ">
        <ul className="flex justify-end gap-8">
          <li className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </li>
          <li className="cursor-pointer">
            <Link to="/account">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
