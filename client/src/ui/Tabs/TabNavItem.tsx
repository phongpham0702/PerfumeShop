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
          ? "w-[33%] cursor-pointer bg-[#a47c0b] p-4 font-bold text-white transition-colors"
          : "w-[33%] cursor-pointer p-4 "
      }
    >
      {title}
    </li>
  );
};

export default TabNavItem;
