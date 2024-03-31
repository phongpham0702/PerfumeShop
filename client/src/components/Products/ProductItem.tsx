import { Product } from "../../types/Product";

type propsType = {
  product: Product;
};

const ProductItem = ({ product }: propsType) => {
  return (
    <div
      className="flex h-[320px] w-[220px] flex-col items-center rounded-md
     border border-[#959191] p-4"
    >
      <img src={product.Pictures} className="w-[200px]" alt="" />
      <p>{product.Product_brand}</p>
      <p>{product.Product_name}</p>
      <p>${product.display_price}</p>
    </div>
  );
};

export default ProductItem;
