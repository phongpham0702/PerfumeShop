import React, { useEffect, useState } from "react";
import { FilterCategory } from "../../types/Category";
import { useSearchParams } from "react-router-dom";

type FilterSideBarProps = {
  categories: FilterCategory[];
  onFilterChange: (
    selectedFilters: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};
const FilterBar = ({ categories, onFilterChange }: FilterSideBarProps) => {
  const [searchParams] = useSearchParams();
  const [categoryState, setCategoryState] = useState(
    categories.map((category) => ({ ...category, showMore: false })),
  );
  interface SelectedFilters {
    [paramName: string]: string[];
  }

  useEffect(() => {
    const selectedFilters: SelectedFilters = {};
    for (const [paramName, paramValues] of searchParams.entries()) {
      selectedFilters[paramName] = Array.isArray(paramValues)
        ? paramValues
        : [paramValues];
    }

    setCategoryState((prevStates) =>
      prevStates.map((category) => {
        const matchingFilters = selectedFilters[category.id] || [];
        return {
          ...category,
          items: category.items.map((item) => ({
            ...item,
            isChecked: matchingFilters.includes(item.name),
          })),
        };
      }),
    );
  }, [searchParams]);

  // const handleToggleShowMore = (cateId: string): void => {
  //   setCategoryState((prevState) =>
  //     prevState.map((state) =>
  //       state.id === cateId ? { ...state, showMore: !state.showMore } : state,
  //     ),
  //   );
  // };

  return (
    <div className="w-[15%]">
      {categoryState.map((category) => (
        <div key={category.id}>
          <h3 className="mb-3 font-semibold capitalize">{category.name}</h3>
          <div
            className={
              category.items.length > 5
                ? "h-[210px] overflow-y-scroll pt-1"
                : "h-fit"
            }
          >
            {category.items
              // .slice(0, category.showMore ? category.items.length : 5) // expand function
              .slice(0, category.items.length)
              .map((item) => (
                <label
                  key={item.name}
                  className="mb-2 flex cursor-pointer justify-between  px-4"
                >
                  <div className="relative block cursor-pointer">
                    <input
                      checked={item.isChecked}
                      onChange={onFilterChange}
                      value={item.name}
                      name={category.name}
                      className="peer absolute h-0 w-0 cursor-pointer opacity-0"
                      type="radio"
                    />
                    <span className="after:content-checked absolute left-0 top-0 h-[23px] w-[23px] rounded-sm bg-[#eee] outline outline-[0.9px] after:absolute after:left-[4px] after:top-[4px] after:hidden peer-checked:bg-[#0b0d0f] after:peer-checked:block "></span>
                  </div>
                  <p className="w-[80%] text-left capitalize">{item.name}</p>
                </label>
              ))}
          </div>
          {/* <button
            onClick={() => handleToggleShowMore(category.id)}
            className="cursor-pointer font-medium text-[#9f9126]"
          >
            {category.items.length > 5 &&
              (category.showMore ? "Show More" : "Show Less")}
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default FilterBar;

{
  /* <label className="mb-2 flex cursor-pointer justify-between  px-4">
            <div className="relative block cursor-pointer">
              <input
                id={item}
                className="peer absolute h-0 w-0 cursor-pointer opacity-0"
                type="checkbox"
              />
              <span className="after:content-checked absolute left-0 top-0 h-[23px] w-[23px] rounded-sm bg-[#eee] outline outline-[0.9px] after:absolute after:left-[4px] after:top-[4px] after:hidden peer-checked:bg-[#0b0d0f] after:peer-checked:block "></span>
            </div>
            <p className="w-[80%] text-left capitalize">{item}</p>
          </label> */
}
