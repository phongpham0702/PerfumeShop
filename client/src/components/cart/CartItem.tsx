import { AiOutlineMinus } from "react-icons/ai";
import { ICartItem } from "../../interfaces/CartItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import requestAPI from "../../helpers/api";
import { useState } from "react";
import EditCartModal from "./EditCartModal";

const CartItem = ({ item }: { item: ICartItem }) => {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        await requestAPI(
          `/user/cart`,
          {
            productId: item.productId,
            modelId: item.modelId,
          },
          "delete",
        );
        toast.success("Item removed from cart successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return (
    <div className="mx-auto flex w-[100%] items-center justify-between rounded-md p-2">
      <EditCartModal
        item={item}
        modalIsOpen={isModalOpen}
        closeModal={handleCloseModal}
      />

      <div className="flex gap-6">
        <div className="w-[150px] bg-[#f8f8f8] p-4">
          <img width={150} src={item.productThumbnail} alt="item thumbnail" />
        </div>
        <div className="">
          <p>{item.productBrand}</p>
          <div className="flex items-center gap-2 text-lg font-medium">
            <span>{item.productName}</span> <AiOutlineMinus />{" "}
            <span>{item.productCapacity}</span>
          </div>
          <p>Quantity: {item.quantity}</p>
          <p className="mt-2">
            Unit price:{" "}
            {item.unitPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="mt-4 text-lg font-medium">
            Total:{" "}
            {(item.unitPrice * item.quantity).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-sm border border-[#c1c1c1] px-8 py-1 hover:text-[#ac8f45]"
        >
          Edit
        </button>
        <button
          onClick={() => mutate()}
          className="rounded-sm border border-[#c1c1c1] px-8 py-1 hover:text-[#ac8f45]"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;

{
  /* <div className="flex h-[36px] items-center justify-start text-xl">
<button
  disabled={item.quantity <= 1}
  // onClick={() => setQuantity((prev) => prev - 1)}
  className="cursor-pointer px-4 py-2 outline outline-1 outline-[#888585]"
>
  <AiOutlineMinus />
</button>
<input
  type="number"
  min={1}
  onChange={(e) => setQuantity(e.target.value)}
  className="w-10 py-1 text-center font-medium outline outline-1 outline-[#888585]"
  value={quantity.toString()}
/>
<button
  disabled={item.quantity >= 10}
  // onClick={() => setQuantity((prev) => prev + 1)}
  className="cursor-pointer px-4 py-2 outline outline-1 outline-[#888585]"
>
  <AiOutlinePlus />
</button>
</div> */
}
