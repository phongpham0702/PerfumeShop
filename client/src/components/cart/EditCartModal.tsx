import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ICartItem } from "../../interfaces/CartItem";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requestAPI from "../../helpers/api";
import toast from "react-hot-toast";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  item: ICartItem;
};

const EditCartModal = ({ modalIsOpen, item, closeModal }: ModalProps) => {
  const [quantity, setQuantity] = useState<number>(item?.quantity);
  const [capacity, setCapacity] = useState<string>(item?.modelId);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        await requestAPI(
          `/user/cart`,
          {
            productId: item.productId,
            modelId: item.modelId,
            new_modelId: capacity !== item.modelId ? capacity : "",
            quantity: quantity,
          },
          "put",
        );
        toast.success("Item updated successfully");
        closeModal();
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <Modal open={modalIsOpen} onClose={closeModal} center>
      <div className="relative flex gap-4 py-6 pb-4 sm:px-20 sm:pl-6">
        <div
          className={`w-[150px] sm:h-[250px] sm:w-[300px]`}
          style={{
            backgroundImage: `url(${item?.productThumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex min-w-[50%] select-none flex-col gap-6 pr-10">
          <p className="text-xl font-medium">{item?.productName}</p>
          <div className="flex select-none gap-4">
            {item?.priceScale.map((priceScale) => (
              <div
                key={priceScale._id}
                onClick={() => setCapacity(priceScale._id)}
                className={`w-[80px] cursor-pointer rounded-sm border border-[#333] py-1 text-center hover:bg-gray-300 ${
                  capacity === priceScale._id &&
                  "bg-[#333] text-white hover:bg-[#444]"
                }`}
              >
                {priceScale.capacity}
              </div>
            ))}
          </div>

          <div className="flex w-full cursor-pointer items-center justify-between border border-[#777] px-4 py-2">
            <FaMinus onClick={() => setQuantity((prev) => prev - 1)} />
            <span className="select-none">{quantity}</span>
            <FaPlus onClick={() => setQuantity((prev) => prev + 1)} />
          </div>

          <div className="mt-6 flex gap-4 sm:mb-6">
            <button
              onClick={closeModal}
              className="select-none border border-[#333] px-6 py-2"
            >
              Cancel
            </button>
            <button
              onClick={() => mutate()}
              className=" transform select-none bg-[#333] px-6 py-2 text-white"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCartModal;