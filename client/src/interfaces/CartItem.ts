export interface ICartItem {
  productId: string;
  modelId: string;
  productName: string;
  productBrand: string;
  productThumbnail: string;
  productCapacity: string;
  unitPrice: number;
  quantity: number;
  priceScale: {
    capacity: string;
    price: number;
    _id: string;
  }[];
}
