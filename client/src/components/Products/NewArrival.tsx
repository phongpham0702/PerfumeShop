import ProductItem from "./ProductItem";
import Carousel from "../../ui/Carousel";
import { useQuery } from "@tanstack/react-query";
import { BestsellerProduct } from "../../interfaces/Product";
import CardSkeleton from "../../ui/CardSkeleton";
import { SwiperSlide } from "swiper/react";

const NewArrival = () => {
  async function fetchData() {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/products/newarrival`,
    );
    const data = await res.json();
    return data.metadata.newArrival;
  }

  const { data: products, isLoading } = useQuery({
    queryKey: ["newArrival"],
    queryFn: fetchData,
  });

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
      {isLoading ? (
        <div className="flex justify-center gap-6">
          <CardSkeleton cards={5} />
        </div>
      ) : (
        <Carousel>
          {products.map((product: BestsellerProduct) => (
            <SwiperSlide key={product._id} className="mr-0 w-[200px]">
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default NewArrival;
