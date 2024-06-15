import BrandItem from "./BrandItem";
import { brands } from "../../dummy_data/brands";
import { useState } from "react";

const FamousBrands = () => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  return (
    <section className="mx-auto mb-20 mt-12 w-full px-2 lg:w-[90%]">
      <h1 className="text-center font-heading text-3xl font-semibold tracking-widest lg:text-4xl">
        Famous Brands
      </h1>

      <div
        className={`mt-10 grid h-[400px] grid-cols-2 gap-x-4 gap-y-4 overflow-hidden px-2 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-6 sm:px-8 md:grid-cols-4 lg:grid-cols-5 xl:h-fit xl:grid-cols-6 xl:[-webkit-mask-image:unset] ${
          isShowMore ? "show-less h-fit" : "show-more h-[400px]"
        }`}
      >
        {brands.map((item, index) => (
          <div
            key={index}
            className="flex justify-center rounded-md border border-[#959191]"
          >
            <BrandItem logo={item.logo} name={item.name} />
          </div>
        ))}
      </div>

      <p
        onClick={() => setIsShowMore((prev) => !prev)}
        className="block cursor-pointer bg-[#ffffff29] p-4 text-center font-semibold text-[#93932a] xl:hidden"
      >
        {isShowMore ? "Show less" : "Show more"}
      </p>
    </section>
  );
};

export default FamousBrands;
