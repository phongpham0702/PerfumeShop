import { useEffect, useState } from "react";
import { ProductDetail as PDetail, SimilarProduct } from "../../types/Product";
import { useParams } from "react-router-dom";
import Tabs from "../../ui/Tabs/Tabs";

const ProductDetail = () => {
  const [product, setProduct] = useState<PDetail>();
  const [priceByCapacity, setPriceByCapacity] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [similarProduct, setSimilarProduct] = useState<SimilarProduct>();
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const { pid } = useParams();

  const navs = [
    { id: "tab1", title: "Scent", activeTab, setActiveTab },
    { id: "tab2", title: "Feature", activeTab, setActiveTab },
    { id: "tab3", title: "Recommendation", activeTab, setActiveTab },
  ];
  const contents = [
    {
      id: "tab1",
      activeTab,
      children: (
        <div className="grid grid-cols-4">
          <p className="font-semibold">Main</p>
          <p className="col-span-3 mb-4 tracking-wider">
            {product?.Scent.Main.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </p>

          <p className="font-semibold">First</p>
          <p className="col-span-3 mb-4 tracking-wider">
            {product?.Scent.First.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </p>

          <p className="font-semibold">Middle</p>
          <p className="col-span-3 mb-4 tracking-wider">
            {product?.Scent.Middle.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </p>

          <p className="font-semibold">Final</p>
          <p className="col-span-3 mb-4 tracking-wider">
            {product?.Scent.Final.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </p>
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
            <div className="col-span-4 h-[10px] h-[10px] w-full bg-[#d4dde8]">
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
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8080/products/detail/${pid}`);
      const data = await res.json();
      setProduct(data.product_detail);
      setSimilarProduct(data.similar_products);
    };
    fetchData();
  }, [pid]);

  const handleCapacityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    product?.priceScale.forEach((item) => {
      if (item.Capacity === event.target.value) setPriceByCapacity(item.Price);
    });
  };

  return (
    <div className="mx-auto my-10 grid w-[90%] grid-cols-2">
      <div className="mx-auto w-[100%]">
        <div className="mx-auto w-[90%] ">
          <img
            className="mx-auto h-[400px] w-[400px]"
            src={product?.Pictures}
            alt="product picture"
          />
          <p className="mb-4 mt-12 text-xl font-semibold">Description</p>
          <p className="text-balance text-justify text-lg tracking-wide">
            {product?.Description}
          </p>
        </div>
      </div>

      <div className="flex flex-col text-[#666]">
        <p className="mb-4">{product?.Brand_Name}</p>
        <p className="mb-4 text-3xl text-[#000]">{product?.Product_name}</p>
        <p className="mb-4">{product?.Product_gender}</p>
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
            {product?.priceScale.map((item) => (
              <option value={item.Capacity} key={item._id}>
                {item.Capacity}
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
          <button className="w-[40%] bg-[#333] px-16 py-4 text-lg font-medium uppercase text-[#fff]">
            Add to cart
          </button>
          <button className="w-[40%] bg-[#9a1919] px-16 py-4 text-lg font-medium uppercase text-[#fff]">
            Buy now
          </button>
        </div>

        <Tabs navs={navs} contents={contents} />
      </div>
    </div>
  );
};

export default ProductDetail;
