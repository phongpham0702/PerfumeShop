import { Modal } from "react-responsive-modal";
import requestAPI from "../../helpers/api";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  addressId: string;
};

const EditAddressModal = ({
  modalIsOpen,
  closeModal,
  addressId,
}: ModalProps) => {
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverPhone, setReceiverPhone] = useState<string>("");
  const [nation, setNation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [detail, setDetail] = useState<string>("");

  const { data: address } = useQuery<{
    data: {
      metadata: {
        userAddress: {
          City: string;
          District: string;
          Nation: string;
          Ward: string;
          addressDetail: string;
          receiverName: string;
          receiverPhoneNumber: string;
          _id: string;
        };
      };
    };
  }>({
    queryKey: ["address", addressId],
    queryFn: async () =>
      await requestAPI(`/user/address`, {}, "GET", { addressID: addressId }),
    enabled: modalIsOpen,
  });
  const addressObj = address?.data.metadata.userAddress;
  useEffect(() => {
    setReceiverName(addressObj?.receiverName || "");
    setReceiverPhone(addressObj?.receiverPhoneNumber || "");
    setNation(addressObj?.Nation || "");
    setCity(addressObj?.City || "");
    setDistrict(addressObj?.District || "");
    setWard(addressObj?.Ward || "");
    setDetail(addressObj?.addressDetail || "");
  }, [addressObj]);

  const queryClient = useQueryClient();
  const { mutate: mutateUpdateAddress } = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await requestAPI(
        `/user/address`,
        {
          addressID: addressId,
          receiverName,
          receiverPhone,
          nation,
          city,
          district,
          ward,
          detail,
        },
        "PUT",
      );
    },
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["user profile"] });
      toast.success("Add new address successfully");
    },
    onError: (err) => {
      console.log(err);

      toast.error("Add new address failed");
    },
  });

  return (
    <Modal open={modalIsOpen} onClose={closeModal} center>
      <p className="mt-4 text-center text-3xl font-bold">Add new address</p>
      <div className="flex w-[600px] select-none flex-col items-center gap-6">
        <div className="flex w-[500px] justify-center">
          <form
            className="mx-auto mt-10 flex flex-wrap items-center gap-4 rounded-sm font-space"
            onSubmit={(e) => mutateUpdateAddress(e)}
          >
            <div className="mx-auto flex w-[97%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                name="receiverName"
                placeholder="Enter your name"
                onChange={(e) => setReceiverName(e.target.value)}
                value={receiverName}
              />
            </div>
            <div className="mx-auto flex w-[97%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                name="receiverPhone"
                placeholder="Phone"
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
              />
            </div>
            <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="National"
                name="nation"
                value={nation}
                onChange={(e) => setNation(e.target.value)}
              />
            </div>
            <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="District"
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div className="mx-auto flex w-[45%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Ward"
                name="ward"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />
            </div>

            <div className="mx-auto flex w-[97%] items-center gap-2 rounded-sm border border-[#d5cfcf] p-2 px-4 text-lg">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Detail"
                name="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
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
