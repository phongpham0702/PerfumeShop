import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../../ui/Tabs/Tabs";
import { BsGenderFemale, BsGenderMale, BsHeart } from "react-icons/bs";
import ProductItem from "./ProductItem";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  ProductDetail as PDetail,
  Product,
  SimilarProduct,
} from "../../interfaces/Product";
import useAddToCart from "../../hooks/Cart/useAddToCart";
import useGetPDetail from "../../hooks/product/useGetPDetail";
import useHover from "../../hooks/useHover";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requestAPI from "../../helpers/api";
import { ScaleLoader } from "react-spinners";
import Overlay from "../../ui/Overlay";

const ProductDetail = () => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const [priceByCapacity, setPriceByCapacity] = useState<number | null>(null);

  const [quantity, setQuantity] = useState<number>(1);

  const [activeTab, setActiveTab] = useState<string>("tab1");
  const { pid } = useParams();
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const { data, isLoading } = useGetPDetail(pid || "");

  const {
    productDetail: product,
    similarProducts: similarProduct,
  }: { productDetail: PDetail; similarProducts: SimilarProduct[] } =
    data || Object.create(null);

  const [capacity, setCapacity] = useState<string>("");

  useEffect(() => {
    setQuantity(1);
    isFavorite.current = false;
    setActiveTab("tab1");

    setCapacity(product?.priceScale.sort((a, b) => a.price - b.price)[0]._id);
    setInStock(
      product?.priceScale.sort((a, b) => a.price - b.price)[0].inStock,
    );
    window.scrollTo(0, 0);
    if (descriptionRef.current) {
      setIsShowMore(descriptionRef.current?.clientHeight > 800);
    }
  }, [pid, data, product?.priceScale]);

  const mutate = useAddToCart({ _id: product?._id, capacity, quantity });

  const navs = [
    { id: "tab1", title: <p className="p-3">Sent</p>, activeTab, setActiveTab },
    {
      id: "tab2",
      title: <p className="p-3">Feature</p>,
      activeTab,
      setActiveTab,
    },
    {
      id: "tab3",
      title: <p className="p-3">Suggest</p>,
      activeTab,
      setActiveTab,
    },
  ];

  const contents = [
    {
      id: "tab1",
      activeTab,
      children: (
        <div className="grid grid-cols-4">
          <p className="font-semibold">Main</p>
          <div className="col-span-3 mb-4 tracking-wider">
            {product?.productScent.mainScent.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </div>

          <p className="font-semibold">First</p>
          <div className="col-span-3 mb-4 tracking-wider">
            {product?.productScent.firstNotes.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </div>

          <p className="font-semibold">Middle</p>
          <div className="col-span-3 mb-4 tracking-wider">
            {product?.productScent.middleNotes.join(", ")}
            <hr className="h-[1.5px] bg-[#333]" />
          </div>

          <p className="font-semibold">Final</p>
          <div className="col-span-3 mb-4 tracking-wider">
            {product?.productScent.finalNotes.join(", ")}
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
          <p className="col-span-3">{product?.productFeatures.release}</p>
          <p className="mb-4 font-semibold">Gender</p>
          <p className="col-span-3">{product?.productGender}</p>
          <p className="mb-4 font-semibold">Age</p>
          <p className="col-span-3">{product?.productFeatures.suitableAge}</p>
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
                  product?.productFeatures.savingTime
                    ? +product?.productFeatures.savingTime * 10
                    : 0
                }%`,
                textAlign: "right",

                backgroundColor: "#3a92da",
              }}
            >
              <span className="absolute top-[-20px]">
                {product?.productFeatures.savingTime}
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

  const [inStock, setInStock] = useState<number | 0>(0);

  const handleCapacityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    product?.priceScale.forEach((item) => {
      if (item.capacity === event.target.value) {
        setCapacity(item._id);
        setPriceByCapacity(item.price);
        setInStock(item.inStock);
      }
    });
  };

  let displayGender: JSX.Element = <></>;
  displayGender =
    product?.productGender === "Male" ? (
      <span className="flex gap-2">
        <BsGenderMale />
        {product?.productGender}
      </span>
    ) : product?.productGender === "Female" ? (
      <span className="flex gap-2">
        <BsGenderFemale />
        {product?.productGender}
      </span>
    ) : (
      <span className="flex gap-2">
        <BsGenderMale />
        <BsGenderFemale />
        {product?.productGender}
      </span>
    );

  const heartIconRef = useRef<HTMLDivElement>(null);
  const isWishListHover = useHover(heartIconRef);

  const wishListRef = useRef<HTMLDivElement>(null);

  const isFavorite = useRef<boolean>(false);
  useEffect(() => {
    heartIconRef.current?.classList.remove("animate-rightOutL");
    wishListRef.current?.classList.remove("animate-fadeOut");
  }, []);

  const queryClient = useQueryClient();
  const curList = localStorage.getItem("wishlist_items");

  const addToWishList = async () => {
    const res = await requestAPI(
      "/user/wishlist",
      { PID: product._id },
      "post",
    );
    const data = await res.data;
    if (data.status === 200) {
      if (curList) {
        const listParsed = JSON.parse(curList);
        localStorage.setItem(
          "wishlist_items",
          JSON.stringify([...listParsed, product]),
        );
        localStorage.setItem(
          "wishlistCount",
          JSON.stringify(listParsed.length + 1),
        );
        window.dispatchEvent(new Event("storage"));
      } else localStorage.setItem("wishlist_items", JSON.stringify([product]));
    }

    return data;
  };

  const removeFromWishList = async () => {
    const res = await requestAPI(
      "/user/wishlist",
      { PID: product._id },
      "delete",
    );
    const data = await res.data;
    if (data.status === 200) {
      if (curList) {
        const listParsed = JSON.parse(curList);
        localStorage.setItem(
          "wishlist_items",
          JSON.stringify(
            listParsed.filter((item: Product) => item._id !== product._id),
          ),
        );
        localStorage.setItem(
          "wishlistCount",
          JSON.stringify(listParsed.length - 1),
        );
        window.dispatchEvent(new Event("storage"));
      }
    }
    return data;
  };

  const { mutate: favoriteMutate } = useMutation({
    mutationFn: async () => {
      try {
        if (curList) {
          const listParsed = JSON.parse(curList);
          const index = listParsed.findIndex(
            (item: Product) => item._id === product._id,
          );
          if (index !== -1) {
            await removeFromWishList();
            toast.success("Removed from wishlist");
          } else {
            await addToWishList();
            toast.success("Added to wishlist");
          }
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });

      isFavorite.current = !isFavorite.current;
    },
  });

  const wishlists = localStorage.getItem("wishlist_items");
  if (wishlists) {
    const listParsed = JSON.parse(wishlists);
    const index = listParsed.findIndex(
      (item: Product) => item?._id === product?._id,
    );
    if (index !== -1) isFavorite.current = true;
  }

  if (isLoading)
    return (
      <Overlay bg="bg-[#f6f3f360]" isShow={isLoading}>
        <ScaleLoader
          color="#f8b500"
          height={80}
          margin={4}
          speedMultiplier={1}
          width={10}
          cssOverride={{
            top: "50%",
            transform: "translateX(100%)",
            position: "absolute",
          }}
        />
      </Overlay>
    );
  return (
    <>
      <div className="mx-auto my-10 w-[94%] xl:w-[90%]">
        <div className="mx-auto flex w-full flex-col sm:flex-row">
          <div className="mx-auto w-[100%] sm:w-[50%]">
            <img
              className="mx-auto h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]"
              src={product?.productThumbnail}
              alt="product picture"
            />
          </div>

          <div className="w-full sm:w-[50%]">
            <p className="mb-4">{product?.productBrand}</p>
            <p className="mb-4 text-3xl text-[#000]">{product?.productName}</p>
            <p className="mb-4">{displayGender}</p>
            <p className="mb-4 text-2xl text-[#000]">
              {priceByCapacity
                ? priceByCapacity.toLocaleString("en-su", {
                    style: "currency",
                    currency: "USD",
                  })
                : product?.priceScale
                    .sort((a, b) => a.price - b.price)[0]
                    .price.toLocaleString("en-su", {
                      style: "currency",
                      currency: "USD",
                    })}
            </p>
            <p className="mb-4  text-[#000]">
              In Stock:{" "}
              {inStock
                ? inStock
                : product?.priceScale.sort((a, b) => a.price - b.price)[0]
                    .inStock}
            </p>
            <div className="flex gap-4">
              <p className="mb-2 w-[50%] sm:w-[200px]">Capacity</p>
              <p className="w-[50%] sm:w-[200px]">Quantity</p>
            </div>

            <div className="flex gap-4">
              <select
                onChange={handleCapacityChange}
                className="mb-10 w-[200px] p-2 outline outline-1 outline-[#888585]"
              >
                {product?.priceScale
                  .sort((a, b) => a.price - b.price)
                  .map((item) => (
                    <option value={item?.capacity} key={item?._id}>
                      {item?.capacity}
                    </option>
                  ))}
              </select>

              <div className="flex h-[36px] items-center justify-center text-xl">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((prev) => prev - 1)}
                  className="cursor-pointer px-4 py-2 outline outline-1 outline-[#888585]"
                >
                  <AiOutlineMinus />
                </button>
                <span className="px-6 py-1 font-medium outline outline-1 outline-[#888585]">
                  {quantity}
                </span>
                <button
                  disabled={quantity >= 10}
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="cursor-pointer px-4 py-2 outline outline-1 outline-[#888585]"
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                disabled={inStock === 0}
                onClick={() => mutate()}
                className={`w-[40%] bg-[#333] px-2 py-3 text-lg font-medium tracking-wide text-[#fff] lg:uppercase xl:px-6 ${
                  inStock === 0 && "cursor-not-allowed bg-[#8d8c8c]"
                }`}
              >
                Add to cart
              </button>

              <div className="relative">
                <div
                  onClick={() => favoriteMutate()}
                  className={`peer cursor-pointer  border border-[#8d8c8c] p-[1rem] font-bold shadow-lg hover:bg-[#f50963] hover:text-[#fff] hover:transition-all hover:duration-500  ${
                    isFavorite.current ? "bg-[#f50963] text-white" : "bg-[#fff]"
                  }`}
                  ref={heartIconRef}
                >
                  <BsHeart className="text-xl" />
                </div>

                <div
                  ref={wishListRef}
                  className={`absolute right-[90px] top-[8px] z-[-10] flex w-[118px] items-center justify-center opacity-0 peer-hover:z-10 peer-hover:transition-all ${
                    isWishListHover
                      ? "animate-rightIn peer-hover:animate-fadeIn"
                      : "animate-rightOut"
                  }`}
                >
                  <span className="bg-[#000] px-[4px] py-[2px] text-sm text-[#fff]">
                    Add To Wishlist
                  </span>
                  <span className="h-0 w-0 border-b-[8px] border-l-[8px] border-t-[8px] border-b-transparent border-l-[#000] border-t-transparent"></span>
                </div>
              </div>
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
                {product?.productDescription.slice(
                  0,
                  isShowMore ? product.productDescription.length : 800,
                )}
              </p>
            </div>
            {!isShowMore &&
              product?.productDescription.length &&
              product?.productDescription.length > 800 && (
                <p
                  onClick={() => setIsShowMore(true)}
                  className={`block cursor-pointer bg-[#ffffff29] text-center font-semibold text-[#93932a]`}
                >
                  Show more
                </p>
              )}
            {isShowMore &&
              product?.productDescription.length &&
              product?.productDescription.length > 800 && (
                <p
                  onClick={() => setIsShowMore(false)}
                  className={`block cursor-pointer bg-[#ffffff29] text-center font-semibold text-[#93932a]`}
                >
                  Show less
                </p>
              )}
          </div>
          <div className="mt-10 w-full sm:mt-0 sm:w-[50%]">
            <Tabs type="col" navs={navs} contents={contents} />
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
            <div className="mb-8 sm:mb-4" key={product._id}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
