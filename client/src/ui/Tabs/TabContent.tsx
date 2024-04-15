import React from "react";

type propsType = {
  id: string;
  activeTab: string;
  children: React.ReactNode;
};

const TabContent = ({ children, id, activeTab }: propsType) => {
  return id === activeTab ? <>{children}</> : null;
};

export default TabContent;
