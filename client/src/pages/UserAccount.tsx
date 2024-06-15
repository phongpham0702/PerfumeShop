import { useState } from "react";
import {
  AiOutlineBook,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import TabHR from "../ui/Tabs/TabHR";
import { BiLockAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddAddressModal from "../components/user/AddAddressModal";
import requestAPI from "../helpers/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IAddress } from "../interfaces/User";
import EditAddressModal from "../components/user/EditAddressModal";
import ConfirmModal from "../components/ConfirmModal";

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [editState, setEditState] = useState({ isOpen: false, id: "" });
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<string>("");
  const { data } = useQuery({
    queryKey: ["user profile"],
    queryFn: () => requestAPI(`/user/profile`, {}, "GET"),
  });

  const userProfile = data?.data.metadata.userProfile;

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeEditModal = () => {
    setEditState((prev) => ({ ...prev, isOpen: false }));
  };

  const queryClient = useQueryClient();
  const { mutate: mutateDelete } = useMutation({
    mutationFn: () =>
      requestAPI("/user/address/", { deleteID: deleteID }, "DELETE"),
    onSuccess: () => {
      setIsOpenConfirm(false);
      queryClient.invalidateQueries({ queryKey: ["user profile"] });
      toast.success("Delete address successfully");
    },
  });

  const navs = [
    {
      id: "tab1",
      title: (
        <div className="flex items-center gap-2 p-3 text-lg">
          <span className="text-xl">
            <AiOutlineUser />
          </span>
          <p>Profile</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab2",
      title: (
        <div className="flex items-center gap-2 p-3 text-lg">
          <span className="text-xl">
            <AiOutlineBook />
          </span>
          <p>My Orders</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "address",
      title: (
        <div className="flex items-center gap-2 p-3 text-lg">
          <span className="text-xl">
            <AiOutlineInfoCircle />
          </span>
          <p>Address</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab4",
      title: (
        <div className="flex items-center gap-2 p-3 text-lg">
          <span className="text-xl">
            <BiLockAlt />
          </span>
          <p>Change Password</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab5",
      title: (
        <div
          onClick={async () => {
            await requestAPI("/user/logout", {}, "GET");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("cartCount");
            localStorage.removeItem("wishlistCount");
            window.dispatchEvent(new Event("storage"));
            navigate("/login");
            toast.success("Logout successfully");
          }}
          className="flex items-center gap-2 p-3 text-lg"
        >
          <span className="text-xl">
            <AiOutlineLogout />
          </span>
          <p>Logout</p>
        </div>
      ),
      activeTab,
      setActiveTab,
    },
  ];
  const contents = [
    {
      id: "tab1",
      activeTab,
      children: (
        <div className="p-4">
          <p className="mb-10 text-2xl font-bold">Welcome "Username"</p>
          <div className="flex justify-center gap-6">
            <div className="flex w-[20%] flex-col items-center justify-center border border-[#ccc4c4] px-6 py-4">
              <img src="./images/total-order.png" className="w-[60px]" alt="" />
              <p>Total Order</p>
            </div>
            <div className="flex w-[20%] flex-col items-center justify-center border border-[#ccc4c4] px-6 py-4">
              <img
                src="./images/pending-order.png"
                className="w-[60px]"
                alt=""
              />
              <p>Pending Order</p>
            </div>
            <div className="flex w-[20%] flex-col items-center justify-center border border-[#ccc4c4] px-6 py-4">
              <img
                src="./images/processing-order.png"
                className="w-[60px]"
                alt=""
              />
              <p>Processing Order</p>
            </div>
            <div className="flex w-[20%] flex-col items-center justify-center border border-[#ccc4c4] px-6 py-4">
              <img
                src="./images/complete-order.png"
                className="w-[60px]"
                alt=""
              />
              <p>Complete Order</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tab2",
      activeTab,
      children: (
        <>
          <p>My Orders</p>
        </>
      ),
    },
    {
      id: "address",
      activeTab,
      children: (
        <>
          <div className="">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-sm border  bg-[#f8b500] px-6 py-2"
              >
                + Add new address
              </button>
            </div>

            <div>
              {userProfile?.Addresses.map((item: IAddress) => (
                <div key={item._id} className="flex justify-between p-4">
                  <div>
                    <div className="flex gap-4">
                      <p className="font-semibold">{item.receiverName}</p> |
                      <p>{item.receiverPhoneNumber}</p> |
                      <p>Nation: {item.Nation}</p>
                    </div>
                    <p>City/Province: {item.City}</p>
                    <p>District: {item.District}</p>
                    <p>Ward/Commune: {item.Ward}</p>
                    <p>Detail: {item.addressDetail}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      className="border border-[#1a1306] px-6 py-1"
                      onClick={() =>
                        setEditState({ isOpen: true, id: item._id || "" })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="border border-[#1a1306] px-6 py-1"
                      onClick={() => {
                        setIsOpenConfirm(true);
                        setDeleteID(item._id || "");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      id: "tab4",
      activeTab,
      children: (
        <>
          <p>Change Password</p>
        </>
      ),
    },
    {
      id: "tab5",
      activeTab,
      children: (
        <div>
          <p>Logout</p>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto flex w-[90%] gap-4 font-inter">
      <TabHR navs={navs} contents={contents} />
      <AddAddressModal modalIsOpen={isOpen} closeModal={closeModal} />
      <EditAddressModal
        modalIsOpen={editState.isOpen}
        closeModal={closeEditModal}
        addressId={editState.id}
      />
      <ConfirmModal
        modalIsOpen={isOpenConfirm}
        closeModal={() => setIsOpenConfirm(false)}
        onOk={mutateDelete}
      />
    </div>
  );
};

export default UserAccount;
