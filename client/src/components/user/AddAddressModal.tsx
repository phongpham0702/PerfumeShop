import Modal from "react-modal";
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
};

const AddAddressModal = ({ modalIsOpen, closeModal }: ModalProps) => {
  return (
    <Modal
      overlayClassName={"fixed inset-0 bg-black bg-opacity-50"}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="relative flex">
        <div className="w-[300px]"></div>
        <div className="flex w-[50%] select-none flex-col gap-6">
          <div className="flex select-none gap-4"></div>

          <div className="absolute bottom-0 flex gap-4">
            <button
              onClick={closeModal}
              className="select-none border border-[#333] px-6 py-2"
            >
              Cancel
            </button>
            <button className="select-none bg-[#333] px-6 py-2 text-white">
              Update
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAddressModal;
