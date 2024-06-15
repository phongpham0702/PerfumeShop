import { useQuery } from "@tanstack/react-query";
import FamousBrands from "../components/Brands/FamousBrands";
import { Link } from "react-router-dom";
// import { useState } from "react";

const Brands = () => {
  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: async () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/brands`).then((res) =>
        res.json(),
      ),
  });
  // const [searchVal, setSearchVal] = useState<string>("");
  // const [searchedBrands, setSearchedBrands] = useState<unknown>(data?.metadata?.brandList);
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newSearchVal = event.target.value.toLowerCase();
  //   setSearchVal(newSearchVal);

  //   const updatedCategories = data?.metadata?.brandList?.map((item) => {

  //     return item;
  //   });

  //   setSearchedBrands(updatedCategories);
  // };

  return (
    <div>
      <FamousBrands />
      <h2 className="text-center font-heading text-3xl font-semibold lg:text-4xl">
        All Brands
      </h2>

      <div className="mx-auto mt-6 grid max-w-[90%] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.metadata?.brandList?.map(
          (item: { productNum: number; brand: string }) => (
            <Link
              className="flex items-center justify-between rounded-sm border border-[#333] px-3 py-2 xl:px-6"
              to={`/shop/1?brand=${item.brand}`}
            >
              <span>{item.brand} : </span>
              <span>{item.productNum}</span>
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default Brands;
