import { Modal } from "react-responsive-modal";
import requestAPI from "../../helpers/api";
import toast from "react-hot-toast";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const EditAddressModal = ({ modalIsOpen, closeModal }: ModalProps) => {
  const handleAddNewAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

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
      <p className="mt-4 text-center text-3xl font-bold">Add new address</p>
      <div className="flex w-[600px] select-none flex-col items-center gap-6">
        <div className="flex w-[500px] justify-center">
          <form
            className="mx-auto mt-10 flex flex-wrap items-center gap-4 rounded-sm font-space"
            onSubmit={handleAddNewAddress}
          >
            <div className="mx-auto flex w-[97%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                name="receiverName"
                placeholder="Enter your name"
              />
            </div>
            <div className="mx-auto flex w-[97%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                name="receiverPhone"
                placeholder="Phone"
              />
            </div>
            <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="National"
                name="nation"
              />
            </div>
            <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="City"
                name="city"
              />
            </div>
            <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="District"
                name="district"
              />
            </div>
            <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Ward"
                name="ward"
              />
            </div>

            <div className="mx-auto flex w-[97%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Detail"
                name="detail"
              />
            </div>
            <div className="mx-auto my-4 flex w-[97%] justify-end gap-4">
              <button
                onClick={closeModal}
                className="w-[150px] select-none border border-[#333] px-6 py-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[150px] select-none bg-[#333] px-6 py-2 text-white"
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

export default EditAddressModal;
