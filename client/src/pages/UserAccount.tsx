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

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const navigate = useNavigate();

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
      id: "tab3",
      title: (
        <div className="flex items-center gap-2 p-3 text-lg">
          <span className="text-xl">
            <AiOutlineInfoCircle />
          </span>
          <p>Information</p>
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
          onClick={() => {
            // delete_cookie("accessToken", "/", "localhost");
            localStorage.removeItem("accessToken");
            navigate("/login");
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
      id: "tab3",
      activeTab,
      children: (
        <>
          <p>Information</p>
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

  // function get_cookie(name: string) {
  //   return document.cookie.split(";").some((c) => {
  //     return c.trim().startsWith(name + "=");
  //   });
  // }

  // function delete_cookie(name: string, path: string, domain: string) {
  //   if (get_cookie(name)) {
  //     document.cookie =
  //       name +
  //       "=" +
  //       (path ? ";path=" + path : "") +
  //       (domain ? ";domain=" + domain : "") +
  //       ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  //   }
  // }

  return (
    <div className="mx-auto flex w-[90%] gap-4 font-inter">
      <TabHR navs={navs} contents={contents} />
    </div>
  );
};

export default UserAccount;
