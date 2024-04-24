import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductItem from "./ProductItem";
import Pagination from "../Pagination/Pagination";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Overlay from "../../ui/Overlay";

type propsType = {
  handleProductNumChange: (productNum: number) => void;
};

const ProductList = () => {
  const { page } = useParams();
  const [products, setProducts] = useState<Product[] | []>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pNum, setPNum] = useState<number | 0>(0);
  const [searchParams] = useSearchParams();

  const gender = searchParams.get("gender");
  const season = searchParams.get("season");
  const price = searchParams.get("price");
  const brand = searchParams.get("brand");
  const sort = searchParams.get("sort");
  const { handleProductNumChange }: propsType = useOutletContext();

  const fetchData = async (query: number | string) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/products/${query}`)
      .then((res) => res.json())
      .then(
        (data: {
          metadata: {
            pageinfo: {
              productNum: number;
              productPerPage: number;
              currentPage: number;
              PageNum: number;
            };
            products: Product[];
          };
        }) => {
          setPNum(data.metadata.pageinfo.productNum);
          setProducts(data.metadata.products);
          setTotalPage(data.metadata.pageinfo.PageNum);
        },
      );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleProductNumChange(pNum);
    setIsLoading(true);

    fetchData(
      `${page ? page : 1}?${gender ? "gender=" + gender : ""}${
        season ? "&season=" + season : ""
      }${price ? "&price=" + price : ""}${brand ? "&brand=" + brand : ""}${
        sort ? "&sort=" + sort : ""
      }`,
    );

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [gender, page, brand, price, season, sort, handleProductNumChange, pNum]);

  return (
    <>
      <div className="relative w-full xl:w-[80%]">
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product._id}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={page ? page : "1"}
          productNum={pNum}
          totalPages={totalPage}
        />
        {products.length === 0 && (
          <p className="absolute left-[50%] top-[10%] translate-x-[-50%] p-4 text-xl font-medium outline outline-[#ddaf6a]">
            No products were found matching your selection.
          </p>
        )}
      </div>
      <Overlay
        bg="bg-[#f6f3f360]"
        isShow={isLoading}
        children={
          <ScaleLoader
            color="#f8b500"
            height={80}
            margin={4}
            radius={0}
            speedMultiplier={1}
            width={10}
            cssOverride={{
              top: "50%",
              transform: "translateX(100%)",
              position: "absolute",
            }}
          />
        }
      />
    </>
  );
};

export default ProductList;
