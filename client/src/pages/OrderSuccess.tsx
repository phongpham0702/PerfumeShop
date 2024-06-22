import React from "react";
import { useLocation } from "react-router-dom";
import Invoice from "../components/Invoice";

const OrderSuccess = () => {
  const { state } = useLocation();

  return (
    <div className="mx-auto w-[80%] font-space">
      <div className="mx-auto my-10 flex w-fit flex-col items-center gap-4">
        <img src="./images/success.png" alt="success-image" width={80} />
        <h1 className="text-4xl">Thank you for your order</h1>
      </div>
      <div>
        <Invoice invoice={state.invoice} />
      </div>
    </div>
  );
};

export default OrderSuccess;
