import { useState } from "react";
import { Product } from "../../interfaces/Product";
import ProductItem from "./ProductItem";
import Carousel from "../../ui/Carousel";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../../ui/CardSkeleton";
import { SwiperSlide } from "swiper/react";

type bestSellerDataType = {
  gender: string;
  products: Product[];
};

const category: Array<{ [key: string]: string }> = [
  { Man: "Male" },
  { Women: "Female" },
  { Unisex: "Unisex" },
];

const BestsellerList = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [gender, setGender] = useState<string>("Male");

  async function fetchData() {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/products/bestseller`,
    );
    const data = await res.json();

    let male: Product[] = [];
    data.metadata.bestSeller.forEach(
      (element: { gender: string; products: Product[] }) => {
        if (element.gender === "Male") male = element.products;
      },
    );
    setProducts(male);

    return data.metadata.bestSeller;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["bestSeller"],
    queryFn: async () => await fetchData(),
  });

  const genderFilter = (gender: string) => {
    const dataFilter: bestSellerDataType[] = data.filter(
      (item: bestSellerDataType) => item.gender === gender,
    );
    setProducts(dataFilter[0].products);
  };

  return (
    <div className="mb-10 mt-14 w-full">
      <div className="mx-auto flex w-[80%] flex-col items-center">
        <h1 className="font-heading text-3xl font-semibold tracking-wider sm:text-4xl">
          Best Seller Products
        </h1>
        <p className="m-2 text-center text-lg opacity-40">
          The stylish and organized cosmetic products
        </p>
        <div className="m-4 flex cursor-pointer gap-4 text-xl">
          {category.map((obj, index) => {
            const item = Object.entries(obj);
            return (
              <p
                className={
                  gender == item[0][1] ? "text-[#f8b500]" : "opacity-[0.3]"
                }
                key={index}
                onClick={() => {
                  setGender(item[0][1]);
                  genderFilter(item[0][1]);
                }}
              >
                {item[0][0]}
              </p>
            );
          })}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center gap-6">
          <CardSkeleton cards={5} />
        </div>
      ) : (
        <Carousel>
          {products.map((product) => (
            <SwiperSlide key={product._id} className="mr-0 w-[200px]">
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default BestsellerList;
