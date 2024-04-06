import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  const fetchData = async () => {
    fetch("http://localhost:8080/products/1")
      .then((res) => res.json())
      .then(
        (data: {
          productPerPage: number;
          currentPage: number;
          Page_nums: number;
          products: Product[];
        }) => setProducts(data.products),
      );
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(products);

  return (
    <div className="grid grid-cols-5">
      {products.map((product) => (
        <div key={product.PID}>
          <ProductItem product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
