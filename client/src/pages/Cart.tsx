import { ICartItem } from "../interfaces/CartItem";
import CartItem from "../components/cart/CartItem";
import ListSkeleton from "../ui/ListSkeleton";
import useGetCart from "../hooks/Cart/useGetCart";

const Cart = () => {
  const { data, isLoading } = useGetCart();

  const totalPrice = data?.cartData
    ?.reduce(
      (acc: number, item: ICartItem) => acc + item.unitPrice * item.quantity,
      0,
    )
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <div>
      <div className="mx-auto my-10 flex w-[80%] items-start gap-10 ">
        <div className="w-[75%]">
          <hr />
          {isLoading && <ListSkeleton cards={3} />}
          {data?.cartData?.map((item: ICartItem) => (
            <div key={item.productId}>
              <CartItem item={item} />
            </div>
          ))}
          <hr />
        </div>

        <div className="mb-2 w-[25%] rounded-sm border border-[#9c9c9c] p-3">
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

          <button className="duration-750 w-full rounded-sm bg-black p-3 tracking-wider text-white transition-colors hover:bg-[#f50963]">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
