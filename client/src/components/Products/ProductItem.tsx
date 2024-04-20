import { Link } from "react-router-dom";
import {
  BestsellerProduct,
  Product,
  SimilarProduct,
} from "../../types/Product";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye, BsHeart, BsLink45Deg } from "react-icons/bs";
import { useEffect, useRef } from "react";
import useHover from "../../hooks/useHover";

type propsType = {
  product: Product | SimilarProduct | BestsellerProduct;
};

const ProductItem = ({ product }: propsType) => {
  const pContentRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(pContentRef);

  const heartIconRef = useRef<HTMLDivElement>(null);
  const isWishListHover = useHover(heartIconRef);

  const eyeIconRef = useRef<HTMLDivElement>(null);
  const isQuickViewHover = useHover(eyeIconRef);

  const linkIconRef = useRef<HTMLDivElement>(null);
  const isPDetailHover = useHover(linkIconRef);

  const addToCartBtnRef = useRef<HTMLButtonElement>(null);
  const wishListRef = useRef<HTMLDivElement>(null);
  const quickViewRef = useRef<HTMLDivElement>(null);
  const pDetailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    heartIconRef.current?.classList.remove("animate-rightOutL");
    eyeIconRef.current?.classList.remove("animate-rightOutM");
    linkIconRef.current?.classList.remove("animate-rightOutF");
    addToCartBtnRef.current?.classList.remove("animate-goDown");
    wishListRef.current?.classList.remove("animate-fadeOut");
    quickViewRef.current?.classList.remove("animate-fadeOut");
    pDetailRef.current?.classList.remove("animate-fadeOut");
  }, []);

  return (
    <div className="flex flex-col px-3 sm:mt-8">
      <div
        ref={pContentRef}
        className="product-item group relative z-10 overflow-hidden bg-[#f6f6f6]"
      >
        <Link className="h-full w-full" to={"/product/detail/" + product.PID}>
          <div className="py-12 sm:py-14">
            <img
              src={product.Pictures}
              className="mx-auto h-[140px] w-[140px] transform transition-transform duration-500 group-hover:scale-110 sm:h-[200px] sm:w-[200px]"
            />
          </div>
        </Link>

        <div className="absolute right-[-40px] top-[16px] flex flex-col gap-2 transition-all duration-500">
          <div>
            <div
              className={`peer cursor-pointer bg-[#fff] p-3 font-bold shadow-lg hover:bg-[#f50963] hover:text-[#fff] hover:transition-all hover:duration-500 ${
                isHovered
                  ? "animate-rightInF group-hover:animate-rightInF"
                  : "animate-rightOutL"
              }`}
              ref={heartIconRef}
            >
              <BsHeart />
            </div>

            <div
              ref={wishListRef}
              className={`absolute right-[90px] top-[8px] z-[-10] flex w-[118px] items-center justify-center opacity-0 peer-hover:z-10 peer-hover:transition-all ${
                isWishListHover
                  ? "animate-fadeIn peer-hover:animate-fadeIn"
                  : "animate-fadeOut"
              }`}
            >
              <span className="  bg-[#000] px-[4px] py-[2px] text-sm text-[#fff]">
                Add To Wishlist
              </span>
              <span className="h-0 w-0 border-b-[8px] border-l-[8px] border-t-[8px] border-b-transparent border-l-[#000] border-t-transparent"></span>
            </div>
          </div>

          <div>
            <div
              ref={eyeIconRef}
              className={`peer cursor-pointer bg-[#fff]  p-3 font-bold shadow-lg hover:bg-[#f50963] hover:text-[#fff]  hover:transition-all hover:duration-500 ${
                isHovered
                  ? "animate-rightInM group-hover:animate-rightInM"
                  : "animate-rightOutM"
              }`}
            >
              <BsEye />
            </div>
            <div
              ref={quickViewRef}
              className={`absolute right-[90px] top-[56px] z-[-10] flex w-[90px] items-center justify-center opacity-0 peer-hover:z-10 peer-hover:transition-all ${
                isQuickViewHover
                  ? "animate-fadeIn peer-hover:animate-fadeIn"
                  : "animate-fadeOut"
              }`}
            >
              <span className="  bg-[#000] px-[4px] py-[2px] text-sm text-[#fff]">
                Quick View
              </span>
              <span className="z-[-1] h-0 w-0 border-b-[8px] border-l-[8px] border-t-[8px] border-b-transparent border-l-[#000] border-t-transparent"></span>
            </div>
          </div>

          <div>
            <div
              ref={linkIconRef}
              className={`peer cursor-pointer bg-[#fff] p-3 font-bold shadow-lg hover:bg-[#f50963] hover:text-[#fff] hover:transition-all hover:duration-500 ${
                isHovered
                  ? "animate-rightInL group-hover:animate-rightInL"
                  : "animate-rightOutF"
              }`}
            >
              <BsLink45Deg />
            </div>
            <div
              ref={pDetailRef}
              className={`absolute right-[90px] top-[104px] z-[-10] flex w-[118px] items-center justify-center opacity-0 peer-hover:z-10 peer-hover:transition-all ${
                isPDetailHover
                  ? "animate-fadeIn peer-hover:animate-fadeIn"
                  : "animate-fadeOut"
              }`}
            >
              <span className="  bg-[#000] px-[4px] py-[2px] text-sm text-[#fff]">
                Product Details
              </span>
              <span className="h-0 w-0 border-b-[8px] border-l-[8px] border-t-[8px] border-b-transparent border-l-[#000] border-t-transparent"></span>
            </div>
          </div>
        </div>

        <button
          ref={addToCartBtnRef}
          className={`absolute left-0 top-[237px] flex w-full items-center justify-center gap-2 bg-[#000] p-2 font-semibold text-[#fff] transition-all duration-500 hover:bg-[#f50963] sm:top-[312px] ${
            isHovered
              ? "animate-goUp group-hover:animate-goUp"
              : "animate-goDown"
          }`}
        >
          <AiOutlineShoppingCart />
          Add to Cart
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <p className="my-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-lg text-[#856a20]">
          {product.Brand_Name}
        </p>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
          {product.Product_name}
        </p>
        <p className="mt-3">${product.display_price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
