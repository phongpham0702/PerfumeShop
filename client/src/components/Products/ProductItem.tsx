import { Product } from "../../types/Product";

type propsType = {
  product: Product;
};

const ProductItem = ({ product }: propsType) => {
  return (
    <>
      <div
        className="relative top-0 mt-8 flex h-[340px] w-[220px] flex-col items-center
     rounded-md border border-[#959191] p-4"
      >
        <img src={product.Pictures} className="h-[200px] w-[200px]" alt="" />
        <p className="my-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-lg text-[#856a20]">
          {product.Brand_Name}
        </p>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
          {product.Product_name}
        </p>
        <p className="absolute bottom-[14px]">${product.display_price}</p>
      </div>
      <p className="h-10"></p>
    </>
  );
};

export default ProductItem;
