import React from "react";
import { useLocation } from "react-router-dom";
import Invoice from "../components/Invoice";
import requestAPI from "../helpers/api";
import { useQuery } from "@tanstack/react-query";

const OrderSuccess = () => {
  const { state } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: invoiceData }: any = useQuery({
    queryKey: ["invoice"],
    queryFn: () =>
      requestAPI("/checkout/success", {}, "GET", {
        token: window.location.search
          ? window.location.search?.split("&")[0].split("=")[1]
          : "",
        vid: window.location.search
          ? window.location.search?.split("&")[1].split("=")[1]
          : "",
      }),
    enabled: window.location.search ? true : false,
  });
  return (
    <div className="mx-auto w-[80%] font-space">
      <div className="mx-auto my-10 flex w-fit flex-col items-center gap-4">
        <img
          src="https://storage.googleapis.com/luxeperfume/images/success_icon.png"
          alt="success-image"
          width={80}
        />
        <h1 className="text-4xl">Thank you for your order</h1>
      </div>
      <div>
        <Invoice
          invoice={
            window.location.search
              ? invoiceData?.data?.metadata
              : state?.invoice
          }
        />
      </div>
    </div>
  );
};

export default OrderSuccess;
