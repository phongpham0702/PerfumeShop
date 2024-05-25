import requestAPI from "../helpers/api";
import { ICartItem } from "../interfaces/CartItem";

const cartAPI = {
  getCart: async (): Promise<ICartItem> => {
    const res = await requestAPI(`/user/cart`, {}, "GET");
    const data = res.data.metadata;
    return data;
  },
};

export default cartAPI;
