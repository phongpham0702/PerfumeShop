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

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

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
          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="border border-[#1a1306] px-6 py-2"
            >
              Add new address
            </button>
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
        <div onClick={() => {}}>
          <p>Logout</p>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto flex w-[90%] gap-4 font-inter">
      <TabHR navs={navs} contents={contents} />
      <AddAddressModal modalIsOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default UserAccount;
