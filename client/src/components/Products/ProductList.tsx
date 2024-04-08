import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductItem from "./ProductItem";
import Pagination from "../Pagination/Pagination";
import { useParams, useSearchParams } from "react-router-dom";

const ProductList = () => {
  const { page } = useParams();
  const [products, setProducts] = useState<Product[] | []>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [searchParams] = useSearchParams();
  const gender = searchParams.get("filter_gender");
  const season = searchParams.get("filter_season");

  const fetchData = async (query: number | string) => {
    fetch(`http://localhost:8080/products/${query}`)
      .then((res) => res.json())
      .then(
        (data: {
          productPerPage: number;
          currentPage: number;
          Page_nums: number;
          products: Product[];
        }) => {
          setProducts(data.products);
          setTotalPage(data.Page_nums);
        },
      );
  };
  useEffect(() => {
    fetchData(
      `${page ? page : 1}?${gender ? "filter_gender=" + gender : ""}&${
        season ? "filter_season=" + season : ""
      }`,
    );
  }, [page, gender, season]);

  console.log(products);

  return (
    <div className="w-[80%]">
      <div className="grid  grid-cols-5">
        {products.map((product) => (
          <div key={product.PID}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
      <Pagination currentPage={page ? page : 1} totalPages={totalPage} />
    </div>
  );
};

export default ProductList;
