import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductItem from "./ProductItem";
import Slider from "react-slick";

const BestsellerList = () => {
  const [data, setData] = useState<
    | {
        _id: string;
        products: Product[];
      }[]
    | []
  >([]);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [gender, setGender] = useState<string>("Male");
  const category: Array<{ [key: string]: string }> = [
    { Man: "Male" },
    { Women: "Female" },
    { Unisex: "Unisex" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  async function fetchData() {
    await fetch(`http://localhost:8080/products/bestseller`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.bestSeller);
        let male: Product[] = [];
        data.bestSeller.forEach(
          (element: { _id: string; products: Product[] }) => {
            if (element._id === "Male") {
              male = element.products;
            }
          },
        );
        setProducts(male);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const genderFilter = (gender: string) => {
    const dataFilter: { _id: string; products: Product[] }[] = data.filter(
      (item: { _id: string; products: Product[] }) => item._id === gender,
    );
    setProducts(dataFilter[0].products);
  };

  // console.log(products);

  return (
    <div className="mb-12 mt-20 w-full">
      <div className="mx-auto flex w-[80%] flex-col items-center">
        <h1 className="font-heading text-4xl tracking-wider">
          Best Seller Products
        </h1>
        <p className="m-2 text-xl opacity-40">
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
      <Slider
        className="h-[420px] overflow-x-hidden overflow-y-hidden"
        {...settings}
      >
        {products.map((product) => (
          <div key={product.PID} className="h-[380px]">
            <ProductItem product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestsellerList;
