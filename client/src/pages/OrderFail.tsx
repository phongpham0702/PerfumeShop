import React, { useEffect } from "react";
import requestAPI from "../helpers/api";

const OrderFail = () => {
  useEffect(() => {
    requestAPI("/checkout/fail", {}, "GET", {
      token: window.location.search
        ? window.location.search?.split("&")[0].split("=")[1]
        : "",
      vid: window.location.search
        ? window.location.search?.split("&")[1].split("=")[1]
        : "",
    });
    window.location.replace("/checkout");
  }, []);
  return <div>OrderFail ❌</div>;
};

export default OrderFail;
