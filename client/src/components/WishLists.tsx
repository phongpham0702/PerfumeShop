import { Product } from "../interfaces/Product";
import requestAPI from "../helpers/api";
import ProductItem from "./Products/ProductItem";
import { useQuery } from "@tanstack/react-query";
import SkeletonCard from "../ui/CardSkeleton";

const WishLists = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await requestAPI("/user/wishlist", {}, "get");
      const items = res.data.metadata.wishListData.items;
      if (Array.isArray(items)) {
        localStorage.setItem("wishlist_items", JSON.stringify(items));
      }
      return items;
    },
  });

  return (
    <div className="grid grid-cols-4 p-10">
      {isLoading && <SkeletonCard cards={4} />}
      {data &&
        Array.isArray(data) &&
        data.map((item: Product) => <ProductItem product={item} />)}
    </div>
  );
};

export default WishLists;
