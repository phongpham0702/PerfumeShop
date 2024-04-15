type propsType = {
  id: string;
  activeTab: string;
  children: React.ReactNode;
};

const TabContent = ({ children, id, activeTab }: propsType) => {
  return id === activeTab ? <div>{children}</div> : <></>;
};

export default TabContent;
