type propsType = {
  id: string;
  title: JSX.Element;
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabNavItem = ({ id, title, activeTab, setActiveTab }: propsType) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex w-[30%] cursor-pointer flex-nowrap p-2 ${
        activeTab === id ? "font-bold" : ""
      } `}
    >
      {title}
    </div>
  );
};

export default TabNavItem;
