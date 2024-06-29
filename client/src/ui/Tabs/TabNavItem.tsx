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
      className={`w-full cursor-pointer ${
        activeTab === id ? "bg-[#f8b500]" : ""
      }`}
    >
      {title}
    </div>
  );
};

export default TabNavItem;
