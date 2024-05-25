import { useQuery } from "@tanstack/react-query";
import cartAPI from "../../services/cartAPI";

const useGetCart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: cartAPI.getCart,
  });

  return { data, isLoading };
};

export default useGetCart;
