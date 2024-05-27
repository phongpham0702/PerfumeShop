import toast from "react-hot-toast";
import requestAPI from "../../helpers/api";
import { useMutation } from "@tanstack/react-query";

type AddToCartProps = {
  _id: string;
  capacity: string;
  quantity: number;
};

const useAddToCart = ({ _id, capacity, quantity }: AddToCartProps) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
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
        toast.success("Success add to cart");
      } catch (error) {
        toast.error("Failed to add to cart");
      }
    },
  });
  return mutate;
};

export default useAddToCart;
