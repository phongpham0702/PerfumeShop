import { useQuery } from "@tanstack/react-query";
import productAPI from "../../services/productAPI";

const useGetPDetail = (pid: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["/products/detail", pid],
    queryFn: () => productAPI.getProductDetail(pid),
  });

  return { data, isLoading };
};

export default useGetPDetail;
