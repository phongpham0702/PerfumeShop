import { Link } from "react-router-dom";
import {
  BestsellerProduct,
  Product,
  SimilarProduct,
} from "../../types/Product";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye, BsHeart, BsLink45Deg } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

type propsType = {
  product: Product | SimilarProduct | BestsellerProduct;
};

const ProductItem = ({ product }: propsType) => {
  const [isHovered, setIsHovered] = useState(false);
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);
  const heartIconRef = useRef<HTMLSpanElement>(null);
  const eyeIconRef = useRef<HTMLSpanElement>(null);
  const linkIconRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    heartIconRef.current?.classList.remove("animate-rightOutL");
    eyeIconRef.current?.classList.remove("animate-rightOutM");
    linkIconRef.current?.classList.remove("animate-rightOutF");
    addToCartBtnRef.current?.classList.remove("animate-goDown");
  }, []);

  let timeoutId: number;
  return (
    <div className="group relative top-0 mt-8 flex h-[410px] w-[240px] flex-col">
      <div
        onMouseEnter={() => {
          timeoutId = setTimeout(() => setIsHovered(true), 250);
        }}
        onMouseLeave={() => {
          clearTimeout(timeoutId);
          setIsHovered(false);
        }}
        className="product-item relative z-10 h-[812px] w-[240px] overflow-hidden bg-[#f6f6f6] px-4 py-12"
      >
        <Link className="" to={"/product/detail/" + product.PID}>
          <img
            src={product.Pictures}
            className="mx-auto h-[200px] w-[200px] transform transition-transform duration-500 group-hover:scale-110"
            alt=""
          />
        </Link>
        <div className="absolute right-[-40px] top-[16px] flex flex-col gap-2 transition-all duration-500">
          <span
            ref={heartIconRef}
            className={`cursor-pointer bg-[#fff] p-3 font-bold shadow-lg hover:bg-[#f50963] hover:text-[#fff] hover:transition-all hover:duration-500 ${
              isHovered
                ? "animate-rightInF group-hover:animate-rightInF"
                : "animate-rightOutL"
            }`}
          >
            <BsHeart />
          </span>
          <span
            ref={eyeIconRef}
            className={`cursor-pointer bg-[#fff] p-3 font-bold shadow-lg hover:bg-[#f50963] hover:text-[#fff]  hover:transition-all hover:duration-500 ${
              isHovered
                ? "animate-rightInM group-hover:animate-rightInM"
                : "animate-rightOutM"
            }`}
          >
            <BsEye />
          </span>
          <span
            ref={linkIconRef}
            className={`cursor-pointer bg-[#fff] p-3 font-bold shadow-lg hover:bg-[#f50963] hover:text-[#fff] hover:transition-all hover:duration-500 ${
              isHovered
                ? "animate-rightInL group-hover:animate-rightInL"
                : "animate-rightOutF"
            }`}
          >
            <BsLink45Deg />
          </span>
        </div>
        <button
          ref={addToCartBtnRef}
          className={`absolute left-0 top-[299px] flex w-full items-center justify-center gap-2 bg-[#000] p-2 font-semibold text-[#fff] transition-all duration-500 hover:bg-[#f50963] ${
            isHovered
              ? "animate-goUp group-hover:animate-goUp"
              : "animate-goDown"
          }`}
        >
          <i>
            <AiOutlineShoppingCart />
          </i>
          Add to Cart
        </button>
      </div>

      <div className="relative z-10 flex h-[406px] w-[240px] flex-col items-center">
        <p className="my-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-lg text-[#856a20]">
          {product.Brand_Name}
        </p>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
          {product.Product_name}
        </p>
        <p className="absolute bottom-[14px]">${product.display_price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
