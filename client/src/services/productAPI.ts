import { ProductDetail, SimilarProduct } from "./../interfaces/Product";

const productAPI = {
  getProductDetail: async (
    pid: string,
  ): Promise<{ product: ProductDetail; similarProduct: SimilarProduct }> => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/products/detail/${pid}`,
    );
    const data = await res.json();
    return data.metadata;
  },
};

export default productAPI;
