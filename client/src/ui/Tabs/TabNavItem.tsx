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
      className={`cursor-pointer ${activeTab === id ? "font-bold" : ""}`}
    >
      {title}
    </div>
  );
};

export default TabNavItem;
