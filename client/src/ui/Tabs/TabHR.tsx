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
    <div className="mt-10 flex w-full flex-wrap justify-between font-inter">
      <div className="mb-2 flex w-full justify-between bg-[#fbfbea]  xl:block xl:w-[22%]">
        {navs.map((nav) => (
          <div key={nav.id}>
            <TabNavItem nav={nav} />
          </div>
        ))}
      </div>
      <hr className="border-1 border-dashed border-[#333]" />

      <div className="w-full bg-[#ffffff] xl:w-[75%]">
        {contents.map((content) => (
          <div key={content.id}>
            <TabContent key={content.id} content={content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabHR;
