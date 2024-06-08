import { useQuery } from "@tanstack/react-query";
import FamousBrands from "../components/Brands/FamousBrands";
import { Link } from "react-router-dom";

const Brands = () => {
  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: async () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/brands`).then((res) =>
        res.json(),
      ),
  });
  return (
    <div>
      <FamousBrands />
      <h2 className="text-center font-heading text-3xl font-semibold lg:text-4xl">
        All Brands
      </h2>

      <div className="mx-auto mt-6 grid max-w-[90%] grid-cols-8 gap-4">
        {data?.metadata?.brandList?.map(
          (item: { productNum: number; brand: string }) => (
            <Link
              className="flex items-center border border-[#333] px-6 py-2"
              to={`/shop/1?brand=${item.brand}`}
            >
              {item.brand}
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default Brands;
