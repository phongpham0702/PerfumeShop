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
      className={activeTab === id ? "font-bold" : "cursor-pointer"}
    >
      {title}
    </li>
  );
};

export default TabNavItem;
