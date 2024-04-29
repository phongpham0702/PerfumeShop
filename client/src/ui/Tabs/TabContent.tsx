type propsType = {
  key: string;
  content: { id: string; activeTab: string; children: React.ReactNode };
};

const TabContent = ({ content, key }: propsType) => {
  const { children, id, activeTab } = content;
  return id === activeTab ? <div key={key}>{children}</div> : <></>;
};

export default TabContent;
