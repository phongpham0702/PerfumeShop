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

const Tabs = ({ navs, contents, type }: propsType) => {
  return (
    <div className={`flex flex-${type}`}>
      <div
        className={`flex justify-start text-xl text-[#656565] ${
          type === "row" ? "flex-col" : ""
        }`}
      >
        {navs.map(({ id, title, activeTab, setActiveTab }) => (
          <TabNavItem
            key={id}
            id={id}
            title={title}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>

      <hr className="mb-4" />

      <div>
        {contents.map(({ id, activeTab, children }) => (
          <TabContent key={id} id={id} activeTab={activeTab}>
            {children}
          </TabContent>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
