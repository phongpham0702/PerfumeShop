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
};

const TabHR = ({ navs, contents }: propsType) => {
  return (
    <div className="mt-10 flex w-full justify-between font-inter">
      <div className="w-[20%] bg-[#ffffff] shadow-xl">
        {navs.map((nav) => (
          <TabNavItem nav={nav} />
        ))}
      </div>

      <div className="w-[75%] bg-[#ffffff] shadow-xl">
        {contents.map((content) => (
          <TabContent key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
};

export default TabHR;
