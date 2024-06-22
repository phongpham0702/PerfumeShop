import { ICartItem } from "../../interfaces/CartItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import requestAPI from "../../helpers/api";
import { useState } from "react";
import EditCartModal from "./EditCartModal";
import ConfirmModal from "../ConfirmModal";

const CartItem = ({ item }: { item: ICartItem }) => {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

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
        setIsOpenConfirm(false);
        toast.success("Item removed from cart successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      localStorage.setItem(
        "cartCount",
        JSON.stringify(
          JSON.parse(localStorage.getItem("cartCount") || "0") - item.quantity,
        ),
      );
      window.dispatchEvent(new Event("storage"));
    },
  });

  return (
    <>
      <div className="mx-auto flex w-[100%] flex-wrap items-center justify-between rounded-md p-2 sm:flex-nowrap">
        <EditCartModal
          item={item}
          modalIsOpen={isModalOpen}
          closeModal={handleCloseModal}
        />

        <div className="flex gap-6">
          <div className="flex w-[150px] items-center bg-[#f8f8f8] py-4">
            <img
              className="min-h-[150px] w-full min-w-[150px]"
              src={item.productThumbnail}
              alt="item thumbnail"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <span className="">{item.productName}</span>
            </div>

            <div className="mt-2 flex flex-col gap-1">
              <span>Capacity: {item.productCapacity}</span>
              <p>Quantity: {item.quantity}</p>
              <p>
                Unit price:{" "}
                {item.unitPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>

            <p className="mt-4 text-lg font-medium">
              Total:{" "}
              {(item.unitPrice * item.quantity).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>

        <div className="mr-4 mt-4 flex w-full justify-end gap-2 sm:w-auto sm:flex-col">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-sm border border-[#c1c1c1] px-8 py-1 hover:text-[#ac8f45]"
          >
            Edit
          </button>
          <button
            onClick={() => setIsOpenConfirm(true)}
            className="rounded-sm border border-[#c1c1c1] px-8 py-1 hover:text-[#ac8f45]"
          >
            Delete
          </button>
        </div>
      </div>
      <ConfirmModal
        closeModal={() => setIsOpenConfirm(false)}
        modalIsOpen={isOpenConfirm}
        onOk={mutate}
      />
    </>
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
