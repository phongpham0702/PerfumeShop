import TabContent from "./TabContent";
import TabNavItem from "./TabNavItem";

type NavItem = {
  id: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
  title: string;
};

type ContentItem = {
  id: string;
  activeTab: string;
  children: React.ReactNode;
};

type propsType = {
  navs: NavItem[];
  contents: ContentItem[];
};

const Tabs = ({ navs, contents }: propsType) => {
  return (
    <>
      <ul className="flex justify-start text-xl text-[#656565]">
        {navs.map(({ id, title, activeTab, setActiveTab }) => (
          <TabNavItem
            key={id}
            id={id}
            title={title}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </ul>

      <hr className="mb-4" />

      <div>
        {contents.map(({ id, activeTab, children }) => (
          <TabContent
            key={id}
            id={id}
            activeTab={activeTab}
            children={children}
          />
        ))}
      </div>
    </>
  );
};

export default Tabs;
