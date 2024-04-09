import { AiTwotoneFilter } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import Dropdown from "../../ui/Dropdown";

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
    <div className="mx-auto flex w-[1440px] items-center justify-between">
      <div className="my-6 flex items-center gap-4">
        <div className="flex h-[50px] w-fit cursor-pointer items-center rounded-sm border border-[#333] px-4 py-4 font-semibold">
          <i className="mr-2">
            <AiTwotoneFilter />
          </i>
          <span>
            Filter{" "}
            {searchParams.size !== 0 ? "(" + searchParams.size + ")" : ""}{" "}
          </span>
        </div>
        <Dropdown items={dropDownList} headTitle="" />
        <button
          onClick={() => {
            setSearchParams("");
          }}
          className="cursor-pointer text-xl font-semibold text-[#9b9b3c]"
        >
          Clear Filter
        </button>
      </div>
      <p className="pr-8 font-bold text-[#565555]">{productNum} results</p>
    </div>
  );
};

export default FilterInfo;
