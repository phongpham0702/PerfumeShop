import { useQuery } from "@tanstack/react-query";
import requestAPI from "../helpers/api";
import { useEffect, useState } from "react";
import { IAddress } from "../interfaces/User";
import { ICartItem } from "../interfaces/CartItem";
import { GoArrowLeft } from "react-icons/go";
import { ICheckResult, IVoucherInfo } from "../interfaces/Voucher";

const CheckOut = () => {
  const { data } = useQuery({
    queryKey: ["checkout"],
    queryFn: () => requestAPI("/checkout", {}, "GET"),
  });

  const totalPrice = data?.data?.metadata.totalPrice;
  const userInfo = data?.data?.metadata.userInfo;
  const cartData = data?.data?.metadata.cartData;
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverPhone, setReceiverPhone] = useState<string>("");
  const [nation, setNation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [checkDiscountResult, setCheckDiscountResult] = useState<{
    checkResult: ICheckResult;
    voucherInfo: IVoucherInfo;
  }>();

  const voucherVal = checkDiscountResult?.voucherInfo.voucherValue || 0;
  const discountVal =
    Math.round(totalPrice * voucherVal) >
    (checkDiscountResult?.voucherInfo?.maxDiscountPrice || 0)
      ? checkDiscountResult?.voucherInfo.maxDiscountPrice
      : Math.round(totalPrice * voucherVal) || 0;
  //   console.log(val);

  const addressObj = userInfo?.addressList;

  const defaultAddress = addressObj?.find((item: IAddress) => {
    return item._id === userInfo?.defaultAddress;
  });

  useEffect(() => {
    setReceiverName(defaultAddress?.receiverName || "");
    setReceiverPhone(defaultAddress?.receiverPhoneNumber || "");
    setNation(defaultAddress?.Nation || "");
    setCity(defaultAddress?.City || "");
    setDistrict(defaultAddress?.District || "");
    setWard(defaultAddress?.Ward || "");
    setDetail(defaultAddress?.addressDetail || "");
  }, [defaultAddress]);

  const checkVoucher = async () => {
    const data = await requestAPI("/voucher/check", {}, "GET", {
      orderTotal: totalPrice,
      voucherCode: discountCode,
    });
    setCheckDiscountResult(data?.data?.metadata);
  };

  return (
    <div className="grid grid-cols-10 px-16">
      <div className="col-span-5">
        <p className="mt-4 pl-6 text-start text-2xl font-bold">
          Delivery Information
        </p>
        <div className="flex w-[650px] select-none flex-col items-center gap-6">
          <div className="flex w-[650px] justify-center">
            <form className="mx-auto mt-10 flex flex-wrap items-center gap-4 rounded-sm font-space">
              <div className="mx-auto flex w-[97%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
                <input
                  className="w-full outline-none"
                  type="text"
                  name="receiverName"
                  placeholder="Enter your name"
                  onChange={(e) => setReceiverName(e.target.value)}
                  value={receiverName}
                />
              </div>
              <div className="mx-auto flex w-[97%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
                <input
                  className="w-full outline-none"
                  type="text"
                  name="receiverPhone"
                  placeholder="Phone"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                />
              </div>
              <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="National"
                  name="nation"
                  value={nation}
                  onChange={(e) => setNation(e.target.value)}
                />
              </div>
              <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="District"
                  name="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Ward"
                  name="ward"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                />
              </div>

              <div className="mx-auto flex w-[97%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Detail"
                  name="detail"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <p className="mt-4 pl-6 text-start text-2xl font-bold">
            Payment methods
          </p>
          <div className="pl-6">
            <div className="mt-4 flex items-center gap-4 ">
              <input
                type="radio"
                name="orderPayment"
                value="cod-payment"
                id="cod-payment"
              />
              <label
                htmlFor="cod-payment"
                className="flex cursor-pointer items-center gap-2"
              >
                <img
                  src="./images/cod_icon.svg"
                  width={40}
                  height={40}
                  alt="cod-image"
                />
                <p>Cash on delivery</p>
              </label>
            </div>
            <div className="mt-4 flex  items-center gap-4">
              <input
                type="radio"
                name="orderPayment"
                value="online-payment"
                id="online-payment"
              />
              <label
                htmlFor="online-payment"
                className="flex cursor-pointer items-center gap-2"
              >
                <img src="./images/atm.svg" width={40} alt="cod-image" />
                <p>Credit card</p>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-5 bg-[#f8f8f8]">
        <p className="mt-4 pl-6 text-start text-2xl font-bold">Order Summary</p>
        <div className="mt-6 flex flex-col gap-4">
          {cartData?.map((item: ICartItem) => (
            <div className="flex gap-6  pr-6">
              <div className="flex w-[100px] items-center  py-4">
                <img
                  className="min-h-[100px] w-full min-w-[100px]"
                  src={item.productThumbnail}
                  alt="item thumbnail"
                />
              </div>
              <div className="w-full">
                <div className="flex items-center gap-2 text-lg font-medium">
                  <span className="">{item.productName}</span>
                </div>

                <div className="mt-2 flex flex-col gap-1">
                  <span>Capacity: {item.productCapacity}</span>

                  <p>
                    Unit price:{" "}
                    {item.unitPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>

                <div className="flex w-full justify-between font-medium">
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Total:{" "}
                    {(item.unitPrice * item.quantity).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4">
          <p className="my-2 font-medium">Voucher</p>
          <div className="grid grid-cols-6 border border-[#a3a3a3]">
            <input
              value={discountCode || ""}
              onChange={(e) => setDiscountCode(e.target.value)}
              type="text"
              placeholder="Enter voucher code"
              className="col-span-5 px-4 py-2 outline-none"
            />
            <button
              onClick={checkVoucher}
              className="col-span-1 bg-black p-2 text-white"
            >
              Apply
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p>Subtotal</p>{" "}
            <span>
              {totalPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
          <div className="mb-4 mt-2 flex items-center justify-between">
            <p>Transport fee</p>
            <span>Free</span>
          </div>
          <div className="mb-4 mt-2 flex items-center justify-between">
            <p>Discount</p>
            <span>
              {discountVal
                ? discountVal?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "---"}
            </span>
          </div>

          <hr className=" h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="mb-4 mt-2 flex items-center justify-between font-semibold">
            <p>Total</p>
            <span>
              {(totalPrice - (discountVal || 0))?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
        </div>
      </div>

      {/*  Btn */}
      <div className="fixed bottom-0 left-0 right-0 flex h-[100px] items-center justify-center gap-4 bg-[#ddd]">
        <button className="flex h-fit items-center gap-2 border border-[#333] px-8 py-3">
          <GoArrowLeft />
          <span>BACK TO CART</span>
        </button>
        <button className="h-fit border border-[#000] bg-[#000] px-8 py-3 text-white">
          COMPLETE ORDER
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
