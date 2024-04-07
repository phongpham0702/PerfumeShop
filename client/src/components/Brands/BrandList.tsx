// import { useEffect, useState } from "react";
import BrandItem from "./BrandItem";
// import { Brand } from "../../types/Brand";
import { brandsLogo } from "../../dummy_data/brandsLogo";
const BrandList = () => {
  // const [brands, setBrands] = useState<Brand[] | []>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     await fetch("http://localhost:8080/brands")
  //       .then((res) => res.json())
  //       .then((data) => setBrands(data.brands));
  //   }

  //   fetchData();
  // }, []);

  return (
    <section className="mx-auto mb-14 mt-12 w-[1280px] tracking-widest">
      <div>
        <h1 className="font-heading text-center text-4xl font-normal">
          Famous Brands
        </h1>
      </div>
      <div className="mb-20 mt-10 grid grid-cols-6 gap-y-6 px-8">
        {brandsLogo.map((logo, index) => (
          <div
            key={index}
            className="flex w-[180px] justify-center rounded-md border border-[#959191]"
          >
            <BrandItem logo={logo} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandList;
