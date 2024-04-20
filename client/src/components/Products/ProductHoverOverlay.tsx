import { BsHeart } from "react-icons/bs";

type propsType = {
  children: React.ReactNode;
  iconRef: React.RefObject<HTMLDivElement>;
  popoverRef: React.RefObject<HTMLDivElement>;
  isHovered: boolean;
  isPopoverHover: boolean;
};

const ProductHoverOverlay = ({
  children,
  popoverRef,
  iconRef,
  isHovered,
  isPopoverHover,
}: propsType) => {
  return (
    <div>
      <div
        ref={iconRef}
        className={`peer cursor-pointer bg-[#fff] p-3 font-bold shadow-lg hover:bg-[#f50963] hover:text-[#fff] hover:transition-all hover:duration-500 ${
          isHovered
            ? "animate-rightInF group-hover:animate-rightInF"
            : "animate-rightOutL"
        }`}
      >
        <BsHeart />
      </div>

      <div
        ref={popoverRef}
        className={`absolute right-[90px] top-[8px] flex w-[118px] items-center justify-center opacity-0 peer-hover:transition-all ${
          isPopoverHover
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
  );
};

export default ProductHoverOverlay;
