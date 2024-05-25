import Modal from "react-modal";
import { ICartItem } from "../../interfaces/CartItem";
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
type EditCartModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  item: ICartItem;
};

const EditCartModal = ({
  modalIsOpen,
  item,
  closeModal,
}: EditCartModalProps) => {
  return (
    <Modal
      overlayClassName={"fixed inset-0 bg-black bg-opacity-50"}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="flex">
        <div className="w-[300px]">
          <img src={item?.productThumbnail} alt="image" />
        </div>
        <div>
          <p>{item?.productName}</p>
          <p>{item?.productBrand}</p>
          <p>{}</p>
          <div></div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCartModal;
