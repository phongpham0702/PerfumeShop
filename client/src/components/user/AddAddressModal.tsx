// import { useState } from "react";
import { Modal } from "react-responsive-modal";
// import { IAddress } from "../../interfaces/User";
import requestAPI from "../../helpers/api";
import toast from "react-hot-toast";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const AddAddressModal = ({ modalIsOpen, closeModal }: ModalProps) => {
  // const [address, setAddress] = useState<IAddress | object>({});
  const handleAddNewAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // setAddress(data);
    try {
      await requestAPI(`/user/address`, data, "POST");
      closeModal();
      toast.success("Add new address successfully");
    } catch (error) {
      console.log(error);

      toast.error("Add new address failed");
    }
  };

  return (
    <Modal open={modalIsOpen} onClose={closeModal} center>
      <div className="flex w-[600px] select-none flex-col items-center gap-6 py-10">
        <div className="flex w-[500px] justify-center">
          <form
            action=""
            className="flex flex-wrap gap-4"
            onSubmit={handleAddNewAddress}
          >
            <input
              className="rounded-sm border border-[#333] p-2"
              type="text"
              name="receiverName"
              placeholder="Name"
              id=""
            />
            <input
              className="rounded-sm border border-[#333] p-2"
              type="text"
              name="receiverPhone"
              placeholder="Phone"
            />
            <input
              className="rounded-sm border border-[#333] p-2"
              type="text"
              placeholder="City"
              name="city"
              id=""
            />
            <input
              className="rounded-sm border border-[#333] p-2"
              type="text"
              placeholder="District"
              name="district"
              id=""
            />
            <input
              className="rounded-sm border border-[#333] p-2"
              type="text"
              placeholder="Ward"
              name="ward"
              id=""
            />
            <input
              className="rounded-sm border border-[#333] p-2"
              type="text"
              placeholder="National"
              name="nation"
              id=""
            />
            <input
              className="rounded-sm border border-[#333] p-2"
              type="text"
              placeholder="Detail"
              name="detail"
              id=""
            />
            <div className="flex w-full gap-4">
              <button
                onClick={closeModal}
                className="select-none border border-[#333] px-6 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="select-none bg-[#333] px-6 py-2 text-white"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddAddressModal;
