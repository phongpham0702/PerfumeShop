import { useEffect, useRef, useState } from "react";
import { ProductDetail as PDetail, SimilarProduct } from "../../types/Product";
import { useParams } from "react-router-dom";
import Tabs from "../../ui/Tabs/Tabs";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import ProductItem from "./ProductItem";

const ProductDetail = () => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const [product, setProduct] = useState<PDetail>();
  const [priceByCapacity, setPriceByCapacity] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [similarProduct, setSimilarProduct] = useState<SimilarProduct[]>();
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const { pid } = useParams();

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const navs = [
    { id: "tab1", title: "Scent", activeTab, setActiveTab },
    { id: "tab2", title: "Feature", activeTab, setActiveTab },
    { id: "tab3", title: "Recommend", activeTab, setActiveTab },
  ];
  const contents = [
    {
      id: "tab1",
      activeTab,
      children: (
        <div className="grid grid-cols-4">
          <p className="font-semibold">Main</p>
          <div className="col-span-3 mb-4 tracking-wider">
            {product?.Scent.Main.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </div>

          <p className="font-semibold">First</p>
          <div className="col-span-3 mb-4 tracking-wider">
            {product?.Scent.First.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </div>

          <p className="font-semibold">Middle</p>
          <div className="col-span-3 mb-4 tracking-wider">
            {product?.Scent.Middle.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </div>

          <p className="font-semibold">Final</p>
          <div className="col-span-3 mb-4 tracking-wider">
            {product?.Scent.Final.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </div>
        </div>
      ),
    },
    {
      id: "tab2",
      activeTab,
      children: (
        <div className="grid grid-cols-4">
          <p className="mb-4 font-semibold">Release</p>
          <p className="col-span-3">{product?.Features.release}</p>
          <p className="mb-4 font-semibold">Gender</p>
          <p className="col-span-3">{product?.Product_gender}</p>
          <p className="mb-4 font-semibold">Age</p>
          <p className="col-span-3">{product?.Features.suitable_age}</p>
          <p className="mb-4 mt-1 font-semibold">Retention</p>
          <p
            style={{
              backgroundColor: "#a9c3d6",
              height: "10px",
              width: "100%",
            }}
            className="relative col-span-3 mt-2 flex"
          >
            {/* <span className="absolute top-[-20px]">1</span> */}
            <p
              className="h-[10px]"
              style={{
                width: `${
                  product?.Features.fragrant_saving
                    ? +product?.Features.fragrant_saving * 10
                    : 0
                }%`,
                textAlign: "right",

                backgroundColor: "#3a92da",
              }}
            >
              <span className="absolute top-[-20px]">
                {product?.Features.fragrant_saving}
              </span>
            </p>
            <span className="absolute right-0 top-[-20px]">10</span>
          </p>
        </div>
      ),
    },
    {
      id: "tab3",
      activeTab,
      children: (
        <div>
          <p className="mb-2 text-lg font-bold">Season</p>
          <hr className="mb-2 h-[1.5px] bg-[#9c9a9a]" />

          <div className="grid grid-cols-5 items-center ">
            <p className="mb-4 font-semibold">Spring</p>
            <div className="col-span-4 h-[10px] w-full bg-[#d4dde8]">
              <p
                style={{
                  width: `${
                    product?.seasonRate.Spring
                      ? product.seasonRate.Spring * 100
                      : 0
                  }%`,
                  height: 10,
                  backgroundColor: "#3a92da",
                }}
              ></p>
            </div>
            <p className="mb-4 font-semibold">Summer</p>
            <div className="col-span-4 h-[10px] w-full bg-[#d4dde8]">
              <p
                style={{
                  width: `${
                    product?.seasonRate.Summer
                      ? product.seasonRate.Summer * 100
                      : 0
                  }%`,
                  height: 10,
                  backgroundColor: "#3a92da",
                }}
              ></p>
            </div>
            <p className="mb-4 font-semibold">Autumn</p>
            <div className="col-span-4 h-[10px] w-full bg-[#d4dde8]">
              <p
                style={{
                  width: `${
                    product?.seasonRate.Autumn
                      ? product.seasonRate.Autumn * 100
                      : 0
                  }%`,
                  height: 10,
                  backgroundColor: "#3a92da",
                }}
              ></p>
            </div>
            <p className="mb-4 font-semibold">Winter</p>
            <div className="col-span-4 h-[10px] w-full bg-[#d4dde8]">
              <p
                style={{
                  width: `${
                    product?.seasonRate.Winter
                      ? product.seasonRate.Winter * 100
                      : 0
                  }%`,
                  height: 10,
                  backgroundColor: "#3a92da",
                }}
              ></p>
            </div>
          </div>

          <p className="mb-2 text-lg font-bold">Session</p>
          <hr className="mb-2 h-[1.5px] bg-[#9c9a9a]" />

          <div className="grid grid-cols-5 items-center">
            <p className="mb-4 font-semibold">Day</p>
            <div className="col-span-4 h-[10px] w-full bg-[#d4dde8]">
              <p
                style={{
                  width: `${
                    product?.dayNightRate?.day
                      ? product.dayNightRate.day * 100
                      : 0
                  }%`,
                  height: 10,
                  backgroundColor: "#3a92da",
                }}
              ></p>
            </div>
            <p className="mb-4 font-semibold">Night</p>
            <div className="col-span-4 h-[10px] w-full bg-[#d4dde8]">
              <p
                style={{
                  width: `${
                    product?.dayNightRate?.night
                      ? product.dayNightRate.night * 100
                      : 0
                  }%`,
                  height: 10,
                  backgroundColor: "#3a92da",
                }}
              ></p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (descriptionRef.current) {
      setIsShowMore(descriptionRef.current?.clientHeight > 800);
    }

    window.scrollTo(0, 0);
    const fetchData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/products/detail/${pid}`,
      );
      const data = await res.json();
      setProduct(data.metadata.product_detail);
      setSimilarProduct(data.metadata.similar_products);
    };
    fetchData();
  }, [pid]);

  const handleCapacityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    product?.priceScale.forEach((item) => {
      item.Capacity === event.target.value && setPriceByCapacity(item.Price);
    });
  };

  const priceScaleReverse = [];
  if (product?.priceScale.length) {
    for (let i = product?.priceScale.length; i >= 0; i--) {
      priceScaleReverse.push(product?.priceScale[i]);
    }
  }
  priceScaleReverse.shift();
  let displayGender: JSX.Element = <></>;
  displayGender =
    product?.Product_gender === "Male" ? (
      <span className="flex gap-2">
        <BsGenderMale />
        {product?.Product_gender}
      </span>
    ) : product?.Product_gender === "Female" ? (
      <span className="flex gap-2">
        <BsGenderFemale />
        {product?.Product_gender}
      </span>
    ) : (
      <span className="flex gap-2">
        <BsGenderMale />
        <BsGenderFemale />
        {product?.Product_gender}
      </span>
    );

  return (
    <>
      <div className="mx-auto my-10 w-[90%]">
        <div className="mx-auto flex w-full flex-col sm:flex-row">
          <div className="mx-auto w-[100%] sm:w-[50%]">
            <img
              className="mx-auto h-[400px] w-[400px]"
              src={product?.Pictures}
              alt="product picture"
            />
          </div>

          <div className="w-full sm:w-[50%]">
            <p className="mb-4">{product?.Brand_Name}</p>
            <p className="mb-4 text-3xl text-[#000]">{product?.Product_name}</p>
            <p className="mb-4">{displayGender}</p>
            <p className="mb-4 text-2xl text-[#000]">
              $ {priceByCapacity ? priceByCapacity : product?.display_price}
            </p>
            <div className="flex gap-4">
              <p className="mb-2 w-[200px]">Capacity</p>
              <p>Quantity</p>
            </div>
            <div className="flex gap-4">
              <select
                onChange={handleCapacityChange}
                className="mb-10 w-[200px] p-2 outline outline-1"
              >
                {priceScaleReverse?.map((item) => (
                  <option value={item?.Capacity} key={item?._id}>
                    {item?.Capacity}
                  </option>
                ))}
              </select>
              <div className=" flex h-[36px] w-[120px] items-center justify-evenly gap-3  text-xl outline outline-1">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((prev) => prev - 1)}
                  className="cursor-pointer p-3"
                >
                  -
                </button>
                <span className="font-medium">{quantity}</span>
                <button
                  disabled={quantity >= 10}
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="cursor-pointer p-3"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="w-[50%] bg-[#333] px-6 py-3 text-lg font-medium uppercase text-[#fff] sm:px-16">
                Add to cart
              </button>
              <button className="w-[50%] bg-[#9a1919] px-6 py-3 text-lg font-medium uppercase text-[#fff] sm:px-16">
                Buy now
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-10 flex flex-col justify-between text-[#666] sm:flex-row">
          <div className="w-full sm:w-[45%]">
            <div
              className={`h-[400px] overflow-hidden ${
                isShowMore ? "h-full" : ""
              }`}
            >
              <p className="mb-4 text-xl font-bold">Description</p>
              <p
                ref={descriptionRef}
                className="text-balance text-justify text-lg tracking-wider"
              >
                {product?.Description.slice(
                  0,
                  isShowMore ? product.Description.length : 800,
                )}
              </p>
            </div>
            {!isShowMore &&
              product?.Description.length &&
              product?.Description.length > 800 && (
                <p
                  onClick={() => setIsShowMore(true)}
                  className={`block cursor-pointer bg-[#ffffff29] text-center font-semibold text-[#93932a]`}
                >
                  Show more
                </p>
              )}
            {isShowMore &&
              product?.Description.length &&
              product?.Description.length > 800 && (
                <p
                  onClick={() => setIsShowMore(false)}
                  className={`block cursor-pointer bg-[#ffffff29] text-center font-semibold text-[#93932a]`}
                >
                  Show less
                </p>
              )}
          </div>
          <div className="mt-10 w-full sm:mt-0 sm:w-[50%]">
            <Tabs navs={navs} contents={contents} />
          </div>
        </div>
      </div>

      <hr />

      <div className="mt-14">
        <h1 className="mb-10 text-center font-heading text-4xl font-normal">
          Related Products
        </h1>
        <div className="mx-auto grid w-full grid-cols-2 sm:w-[90%] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {similarProduct?.map((product) => (
            <div className="mb-8 sm:mb-4" key={product.PID}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
