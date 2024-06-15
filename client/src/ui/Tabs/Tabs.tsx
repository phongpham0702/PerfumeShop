import TabContent from "./TabContent";
import TabNavItem from "./TabNavItem";

type NavItem = {
  id: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
  title: JSX.Element;
};

type ContentItem = {
  id: string;
  activeTab: string;
  children: React.ReactNode;
};

type propsType = {
  navs: NavItem[];
  contents: ContentItem[];
  type: string;
};

const Tabs = ({ navs, contents }: propsType) => {
  return (
    <div>
      <div className="mb-4 flex justify-start gap-[60px] text-xl text-[#656565]">
        {navs.map((nav) => (
          <div key={nav.id}>
            <TabNavItem nav={nav} />
          </div>
        ))}
      </div>

      <hr className="mb-4" />

      <div>
        {contents.map((content) => (
          <div key={content.id}>
            <TabContent content={content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
