import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductItem from "./ProductItem";
import Slider from "react-slick";

const ProductList = () => {
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

  async function fetchData(query: string) {
    await fetch(`http://localhost:8080/products/1?gender=${query}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }
  useEffect(() => {
    fetchData(gender!);
  }, [gender]);
  console.log(products);

  return (
    <div className="mb-12 mt-20 w-full">
      <div className="mx-auto flex w-[80%] flex-col items-center">
        <h1 className="text-4xl">BEST SELLERS PRODUCTS</h1>
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
                onClick={() => setGender(item[0][1])}
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

export default ProductList;

{
  /* <div className="group">
            <p
              onClick={() => setGender("Male")}
              className="relative inline-block text-[#0087ca] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:transform after:bg-[#0087ca] after:transition after:delay-[250ms] after:ease-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-[1] aria-[current=page]:font-medium aria-[current=page]:text-[#f8b500]"
            >
              Man
            </p>
          </div>
           */
}
