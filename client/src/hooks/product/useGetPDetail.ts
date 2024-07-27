import { useQuery } from "@tanstack/react-query";
import productAPI from "../../services/productAPI";

const useGetPDetail = ({ pid, similar }: { pid: string; similar: boolean }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["/products/detail", pid],
    queryFn: () => productAPI.getProductDetail({ pid, similar }),
  });

  return { data, isLoading };
};

export default useGetPDetail;
