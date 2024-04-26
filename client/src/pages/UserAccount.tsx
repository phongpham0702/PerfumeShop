import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import Tabs from "../ui/Tabs/Tabs";

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const navs = [
    {
      id: "tab1",
      title: (
        <>
          <AiOutlineUser />
          <p>Profile</p>
        </>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab2",
      title: (
        <>
          <AiOutlineUser />
          <p>My Orders</p>
        </>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab3",
      title: (
        <>
          <AiOutlineUser />
          <p>Information</p>
        </>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab4",
      title: (
        <>
          <AiOutlineUser />
          <p>Change Password</p>
        </>
      ),
      activeTab,
      setActiveTab,
    },
    {
      id: "tab5",
      title: (
        <>
          <AiOutlineUser />
          <p>Logout</p>
        </>
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
        <>
          <p>Profile</p>
        </>
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
        <>
          <p>Logout</p>
        </>
      ),
    },
  ];
  return (
    <div className="mx-auto flex w-[90%] gap-4">
      <Tabs type="row" navs={navs} contents={contents} />
    </div>
  );
};

export default UserAccount;
