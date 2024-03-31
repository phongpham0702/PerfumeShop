import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:8080/products/1")
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
    }

    fetchData();
  }, []);
  console.log(products);

  return (
    <div className="my-20 w-full">
      <div className="mx-auto flex w-[80%] flex-col items-center">
        <h1 className="text-4xl">BEST SELLERS PRODUCTS</h1>
        <p>The stylish and organized cosmetic products</p>
        <div className="m-4 flex cursor-pointer gap-4 text-xl">
          <div className="group">
            <p>Man</p>
            <hr className="border border-white transition ease-in-out group-hover:w-full group-hover:border-black group-hover:transition-all group-hover:duration-100" />
          </div>
          <p>Women</p>
          <p>Unisex</p>
        </div>
      </div>
      <div className="mx-auto grid w-[1280px] grid-cols-5 gap-y-4">
        {products.map((product) => (
          <div key={product.PID}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
