import { useEffect, useState } from "react";
import { BestsellerProduct } from "../../types/Product";
import ProductItem from "./ProductItem";
import Carousel from "../../ui/Carousel";

const NewArrival = () => {
  const [products, setProducts] = useState<BestsellerProduct[]>([]);

  async function fetchData() {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/products/newarrival`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.metadata.newArrival);
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div className="mb-10 mt-14 w-full">
      <div className="mx-auto flex w-[85%] flex-col items-center">
        <h1 className="font-heading text-3xl font-semibold tracking-wider sm:text-4xl">
          New Arrival Products
        </h1>
        <p className="m-2 text-center text-lg opacity-40">
          The stylish and organized cosmetic products
        </p>
      </div>
      <Carousel
        children={products.map((product) => (
          <div key={product._id}>
            <ProductItem product={product} />
          </div>
        ))}
      />
    </div>
  );
};

export default NewArrival;
