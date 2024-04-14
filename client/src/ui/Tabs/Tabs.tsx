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
    <div className="mt-10">
      <ul className="flex justify-between gap-4 text-xl text-[#656565]">
        {navs.map((nav) => (
          <TabNavItem
            id={nav.id}
            title={nav.title}
            activeTab={nav.activeTab}
            setActiveTab={nav.setActiveTab}
          />
        ))}
      </ul>
      <hr className="mb-4" />
      <div className="">
        {contents.map((content) => (
          <TabContent
            id={content.id}
            activeTab={content.activeTab}
            children={content.children}
          />
        ))}
      </div>
    </div>
  );
};

export default Tabs;
