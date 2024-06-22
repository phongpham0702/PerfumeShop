import { AiTwotoneFilter } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import Dropdown from "../../ui/Dropdown";
import { useContext } from "react";
import MenuContext from "../../contexts/MenuContext";

type propsType = {
  productNum: number | 0;
};

type dropdownItemType = {
  location: string;
  title: string;
  isSelected: boolean;
  value: string;
};

const FilterInfo = ({ productNum }: propsType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const menuContext = useContext(MenuContext);
  const dropDownList: dropdownItemType[] = [
    {
      location: "sort",
      title: "Price low to high",
      isSelected: false,
      value: "price",
    },
    {
      location: "sort",
      title: "Price high to low",
      isSelected: false,
      value: "price_desc",
    },
    { location: "sort", title: "Name A - Z", isSelected: false, value: "az" },
    { location: "sort", title: "Name Z - A", isSelected: false, value: "za" },
  ];

  return (
    <div className="flex w-full items-center justify-between">
      <div className="mx-2 my-6 flex w-full items-center  gap-4 2xl:mx-0">
        <div className="hidden h-[60px] w-[35%] cursor-pointer items-center justify-center rounded-sm border border-[#333] px-2 py-4 font-semibold sm:w-[unset] sm:px-4 xl:flex ">
          <span className="mr-1">
            <AiTwotoneFilter />
          </span>
          <span>
            Filter{" "}
            {searchParams.size !== 0 ? "(" + searchParams.size + ")" : ""}{" "}
          </span>
        </div>
        <div
          onClick={() => menuContext.handleOpen("filter")}
          className="flex h-[60px] w-[35%] cursor-pointer items-center justify-center rounded-sm border border-[#333] px-2 py-4 font-semibold sm:w-[unset] sm:px-4 xl:hidden"
        >
          <span className="mr-1">
            <AiTwotoneFilter />
          </span>
          <span>
            Filter{" "}
            {searchParams.size !== 0 ? "(" + searchParams.size + ")" : ""}{" "}
          </span>
        </div>
        <div className="relative w-[65%] sm:w-[unset]">
          <Dropdown items={dropDownList} />
        </div>
        <button
          onClick={() => setSearchParams("")}
          className="hidden cursor-pointer text-xl font-semibold text-[#9b9b3c] md:block"
        >
          Clear Filter
        </button>
      </div>
      <p className="hidden pr-8 font-bold text-[#565555] xl:flex xl:items-center">
        {productNum} <span className="ml-1">results</span>
      </p>
    </div>
  );
};

export default FilterInfo;
