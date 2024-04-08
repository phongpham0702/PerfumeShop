import { Link } from "react-router-dom";
import { Product } from "../../types/Product";

type propsType = {
  product: Product;
};

const ProductItem = ({ product }: propsType) => {
  return (
    <Link
      to={"/product/detail/" + product.PID}
      className="relative top-0 mt-8 flex h-[330px] w-[210px] flex-col items-center
     rounded-md border border-[#959191] p-3"
    >
      <img src={product.Pictures} className="h-[200px] w-[200px]" alt="" />
      <p className="my-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-lg text-[#856a20]">
        {product.Brand_Name}
      </p>
      <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
        {product.Product_name}
      </p>
      <p className="absolute bottom-[14px]">${product.display_price}</p>
    </Link>
  );
};

export default ProductItem;
