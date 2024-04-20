type propsType = {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabNavItem = ({ id, title, activeTab, setActiveTab }: propsType) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li
      onClick={handleClick}
      className={
        activeTab === id
          ? "w-[30%] cursor-pointer p-2 font-bold transition-colors"
          : "w-[30%] cursor-pointer p-2 "
      }
    >
      {title}
    </li>
  );
};

export default TabNavItem;
