type propsType = {
  nav: {
    id: string;
    title: JSX.Element;
    activeTab: string;
    setActiveTab: (id: string) => void;
  };
};

const TabNavItem = ({ nav }: propsType) => {
  const { id, title, activeTab, setActiveTab } = nav;
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer hover:bg-[#f2f2f2] ${
        activeTab === id ? "bg-[#f7cfcf] text-[#df5c5c] hover:bg-[#f7cfcf]" : ""
      }`}
    >
      {title}
    </div>
  );
};

export default TabNavItem;
