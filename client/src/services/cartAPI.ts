import requestAPI from "../helpers/api";
import { ICartItem } from "../interfaces/CartItem";

const cartAPI = {
  getCart: async (): Promise<{
    cartCountProduct: number;
    cartData: ICartItem;
    cartId: string;
  }> => {
    const res = await requestAPI(`/user/cart`, {}, "GET");
    const data = res.data.metadata;
    return data;
  },
};

export default cartAPI;
