import Modal from "react-modal";
import { ICartItem } from "../../interfaces/CartItem";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requestAPI from "../../helpers/api";
import toast from "react-hot-toast";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "800px",
    height: "400px",
    top: "10%",
    transition: "all 2s",
    animation: "rightIn .5s both",
  },
};
type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  item: ICartItem;
};

const EditCartModal = ({ modalIsOpen, item, closeModal }: ModalProps) => {
  const [quantity, setQuantity] = useState<number>(item?.quantity);
  const [capacity, setCapacity] = useState<string>(item?.modelId);
  console.log(item);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        await requestAPI(
          `/user/cart`,
          {
            productId: item.productId,
            modelId: capacity,
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
    <Modal
      overlayClassName={"fixed inset-0 bg-black bg-opacity-50"}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="relative flex">
        <div className="w-[300px]">
          <img src={item?.productThumbnail} alt="image" />
        </div>
        <div className="flex w-[50%] select-none flex-col gap-6">
          <p className="text-xl font-medium">{item?.productName}</p>
          <div className="flex select-none gap-4">
            {item?.priceScale.map((priceScale) => (
              <div
                onClick={() => setCapacity(priceScale._id)}
                className={`w-[80px] cursor-pointer rounded-md border border-[#333] py-1 text-center hover:bg-gray-300 ${
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
          <div className="absolute bottom-0 flex gap-4">
            <button
              onClick={closeModal}
              className="select-none border border-[#333] px-6 py-2"
            >
              Cancel
            </button>
            <button
              onClick={() => mutate()}
              className="select-none bg-[#333] px-6 py-2 text-white"
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
