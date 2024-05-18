type propsType = {
  content: { id: string; activeTab: string; children: React.ReactNode };
};

const TabContent = ({ content }: propsType) => {
  const { children, id, activeTab } = content;
  return id === activeTab ? <div>{children}</div> : null;
};

export default TabContent;
