import { ICartItem } from "../interfaces/CartItem";
import CartItem from "../components/cart/CartItem";
import ListSkeleton from "../ui/ListSkeleton";
import useGetCart from "../hooks/Cart/useGetCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { data, isLoading } = useGetCart();
  localStorage.setItem("cartCount", JSON.stringify(data?.cartCountProduct));

  const totalPrice = Array.isArray(data?.cartData)
    ? data.cartData
        .reduce(
          (acc: number, item: ICartItem) =>
            acc + (item?.unitPrice || 0) * (item.quantity || 0),
          0,
        )
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
    : "";

  return (
    <div>
      <div className="mx-auto my-10 grid w-full grid-cols-10 items-start px-2 sm:px-6 xl:gap-10 xl:px-20">
        <div className="col-span-10 lg:col-span-7 lg:col-end-7">
          <hr />
          {isLoading && <ListSkeleton cards={3} />}
          {Array.isArray(data?.cartData) &&
            data?.cartData.map((item: ICartItem) => (
              <div key={item.productId}>
                <CartItem item={item} />
              </div>
            ))}
          <hr />
        </div>

        <div className="col-span-10 mb-2 mt-6 rounded-sm border border-[#9c9c9c] p-3 sm:col-span-6 sm:col-start-3 lg:col-span-3 lg:col-end-11">
          <h2 className="mb-4 text-center text-xl font-medium uppercase tracking-wide">
            Order Information
          </h2>
          <div className="flex items-center justify-between">
            <p>Subtotal</p> <span>{totalPrice}</span>
          </div>
          <div className="mb-4 mt-2 flex items-center justify-between">
            <p>Transport fee</p>
            <span>Free</span>
          </div>

          <hr className=" h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="mb-4 mt-2 flex items-center justify-between font-semibold">
            <p>Total</p>
            <span>{totalPrice}</span>
          </div>

          <Link to="/checkout">
            <button className="duration-750 w-full rounded-sm bg-black p-3 tracking-wider text-white transition-colors hover:bg-[#f50963]">
              CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
