import { Modal } from "react-responsive-modal";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  onOk: () => void;
};

const ConfirmModal = ({ modalIsOpen, closeModal, onOk }: ModalProps) => {
  return (
    <Modal open={modalIsOpen} onClose={closeModal} center>
      <p className="mt-4 text-center text-3xl font-bold">Confirm Modal</p>
      <div className="flex w-[500px] select-none flex-col items-center gap-6">
        <div className="mt-4 flex w-[500px] flex-col items-center justify-center gap-4">
          <p className="text-xl">
            Are you sure you want to proceed with this action?
          </p>
          <div className="mx-auto my-4 flex gap-4">
            <button
              onClick={closeModal}
              className="w-[150px] select-none border border-[#333] px-6 py-3"
            >
              Cancel
            </button>
            <button
              onClick={() => onOk()}
              type="submit"
              className="w-[150px] select-none bg-[#333] px-6 py-2 text-white"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
