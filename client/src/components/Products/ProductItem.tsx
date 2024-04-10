import { Link } from "react-router-dom";
import { Product } from "../../types/Product";
// import { useState } from "react";
// import Overlay from "../../ui/Overlay";
// import { FaRegHeart } from "react-icons/fa";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { AiFillHeart } from "react-icons/ai";

type propsType = {
  product: Product;
};

const ProductItem = ({ product }: propsType) => {
  // const [isHover, setIsHover] = useState(false);
  return (
    <div
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
      className="relative top-0 mt-8 flex h-[342px] w-[240px] flex-col items-center "
    >
      <Link
        className="w-full bg-[#f6f6f6] p-4"
        to={"/product/detail/" + product.PID}
      >
        <img
          src={product.Pictures}
          className="mx-auto h-[200px] w-[200px]"
          alt=""
        />
      </Link>
      <p className="my-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-lg text-[#856a20]">
        {product.Brand_Name}
      </p>
      <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
        {product.Product_name}
      </p>
      <p className="absolute bottom-[14px]">${product.display_price}</p>

      {/* <Overlay
        bg={"bg-[#4c4b4b8f]"}
        isShow={isHover}
        children={
          <div className="flex h-[100%] flex-col justify-around font-medium text-[#fff] transition-all">
            <p className="animate-[goDown_0.25s_ease-in-out] cursor-pointer rounded-sm border-2 border-[#fff] px-6 py-3">
              View Detail
            </p>
            <div className="flex animate-[goUp_0.25s_ease-in-out] justify-center gap-4 text-2xl">
              <div className="relative mr-5 ">
                <i className="peer absolute cursor-pointer shadow-md">
                  <FaRegHeart />
                </i>
                <i className="absolute hidden cursor-pointer shadow-md peer-hover:block">
                  <AiFillHeart />
                </i>
              </div>

              <i className="cursor-pointer text-3xl">
                <AiOutlineShoppingCart />
              </i>
            </div>
          </div>
        }
      /> */}
    </div>
  );
};

export default ProductItem;
