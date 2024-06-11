import toast from "react-hot-toast";
import requestAPI from "../../helpers/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddToCartProps = {
  _id: string;
  capacity: string;
  quantity: number;
};

const useAddToCart = ({ _id, capacity, quantity }: AddToCartProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      await requestAPI(
        "/user/cart",
        {
          productData: {
            productId: _id,
            modelId: capacity,
          },
          quantity: quantity,
        },
        "post",
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Success add to cart");
      localStorage.setItem(
        "cartCount",
        quantity + JSON.parse(localStorage.getItem("cartCount") || "0"),
      );
      window.dispatchEvent(new Event("storage"));
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to add to cart");
    },
  });
  return mutate;
};

export default useAddToCart;
