import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import requestAPI from "../helpers/api";
import ProductItem from "./Products/ProductItem";

const WishLists = () => {
  const [wishList, setWishList] = useState<Product[]>();

  useEffect(() => {
    requestAPI("/user/wishlist", {}, "get").then((res) => {
      if (Array.isArray(res.data.metadata.wishListData.items)) {
        setWishList(res.data.metadata.wishListData.items);
        if (res.data.status === 200) {
          localStorage.setItem(
            "wishlist_items",
            JSON.stringify(res.data.metadata.wishListData.items),
          );
        }
      }
    });
  }, []);
  return (
    <div className="grid grid-cols-4 p-10">
      {wishList && wishList?.map((item) => <ProductItem product={item} />)}
    </div>
  );
};

export default WishLists;
