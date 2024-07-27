import { ProductDetail, SimilarProduct } from "./../interfaces/Product";

const productAPI = {
  getProductDetail: async ({
    pid,
    similar = true,
  }: {
    pid: string;
    similar: boolean;
  }): Promise<
    | {
        productDetail: ProductDetail;
        similarProducts: SimilarProduct[];
      }
    | object
  > => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/products/detail/${pid}?similar=${similar}`,
    );
    const data = await res.json();
    return data.metadata;
  },
};

export default productAPI;
