import { useEffect } from "react";
import { Product } from "../../types/Product";
import ProductItem from "./ProductItem";
import Pagination from "../Pagination/Pagination";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Overlay from "../../ui/Overlay";
import { useQuery } from "@tanstack/react-query";

type propsType = {
  handleProductNumChange: (productNum: number) => void;
};

const ProductList = () => {
  const { page } = useParams();
  const [searchParams] = useSearchParams();

  const gender = searchParams.get("gender");
  const search = searchParams.get("search");
  const season = searchParams.get("season");
  const price = searchParams.get("price");
  const brand = searchParams.get("brand");
  const sort = searchParams.get("sort");
  const { handleProductNumChange }: propsType = useOutletContext();
  const queryString = `${page ? page : 1}?${gender ? "gender=" + gender : ""}${
    season ? "&season=" + season : ""
  }${price ? "&price=" + price : ""}${brand ? "&brand=" + brand : ""}${
    sort ? "&sort=" + sort : ""
  }${search ? "&search=" + search : ""}`;

  const fetchData = async (query: number | string) => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/products/${query}`,
    );
    const data = await res.json();

    return data.metadata;
  };

  const { data, isLoading } = useQuery({
    queryKey: [`productsList/${queryString}`],
    queryFn: () => fetchData(queryString),
  });

  const { products, pageinfo } = data || {};
  const { pageNum, productNum } = pageinfo || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    handleProductNumChange(productNum);
  }, [handleProductNumChange, productNum]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="relative w-full xl:w-[80%]">
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: Product) => (
            <div key={product._id}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>

        <Pagination
          currentPage={page ? page : "1"}
          productNum={productNum}
          totalPages={pageNum}
        />

        {products.length === 0 && (
          <p className="absolute left-[50%] top-[10%] translate-x-[-50%] p-4 text-xl font-medium outline outline-[#ddaf6a]">
            No products were found matching your selection.
          </p>
        )}
      </div>
      <Overlay bg="bg-[#f6f3f360]" isShow={isLoading}>
        <ScaleLoader
          color="#f8b500"
          height={80}
          margin={4}
          speedMultiplier={1}
          width={10}
          cssOverride={{
            top: "50%",
            transform: "translateX(100%)",
            position: "absolute",
          }}
        />
      </Overlay>
    </>
  );
};

export default ProductList;
