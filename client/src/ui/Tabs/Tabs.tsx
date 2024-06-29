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
      <div className="flex justify-start text-center text-xl text-[#000]">
        {navs.map((nav) => (
          <div
            key={nav.id}
            className="flex w-full justify-around bg-[#fbfbea] xl:block"
          >
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
