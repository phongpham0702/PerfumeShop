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
    fetch(`http://localhost:8080/products/${query}`)
      .then((res) => res.json())
      .then(
        (data: {
          products_num: number;
          productPerPage: number;
          currentPage: number;
          Page_nums: number;
          products: Product[];
        }) => {
          setPNum(data.products_num);
          setProducts(data.products);
          setTotalPage(data.Page_nums);
        },
      );
  };

  // const query = `?${gender ? "gender=" + gender : ""}${
  //   season ? "&season=" + season : ""
  // }${price ? "&price=" + price : ""}${brand ? "&brand=" + brand : ""}${
  //   sort ? "&sort=" + sort : ""
  // }`;

  useEffect(() => {
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
      {products.length !== 0 ? (
        <>
          <div className="relative w-[80%]">
            <div className="grid grid-cols-4">
              {products.map((product) => (
                <div key={product.PID}>
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
            <Pagination currentPage={page ? page : 1} totalPages={totalPage} />
          </div>
          <Overlay
            bg="bg-[#f6f3f360]"
            isShow={isLoading}
            children={
              <div>
                <ScaleLoader
                  color="#f8b500"
                  height={80}
                  margin={4}
                  radius={0}
                  speedMultiplier={1}
                  width={10}
                  cssOverride={{
                    top: "20%",
                    transform: "translateX(100%)",
                    position: "absolute",
                  }}
                />
              </div>
            }
          ></Overlay>
        </>
      ) : (
        <p className="absolute top-[30%] translate-x-[120%] p-4 text-xl font-medium outline outline-[#ddaf6a]">
          No products were found matching your selection.
        </p>
      )}
    </>
  );
};

export default ProductList;
