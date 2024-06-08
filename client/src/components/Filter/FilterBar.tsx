import { FilterCategory } from "../../interfaces/Category";

type FilterBarProps = {
  category: FilterCategory[];
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchVal: string;
};

const FilterBar = ({
  category,
  handleCheckboxChange,
  handleInputChange,
  searchVal,
}: FilterBarProps) => {
  return (
    <div className="ml-2 xl:ml-0">
      {category.map((category) => (
        <div className="mb-4" key={category.id}>
          <h3 className="mb-3 font-semibold capitalize">{category.id}</h3>
          {category.id === "brand" ? (
            <input
              value={searchVal}
              onChange={handleInputChange}
              className="mb-2 w-full p-2 outline outline-1"
              type="text"
              name="brand"
              placeholder="Quick search"
            />
          ) : null}

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
                  className="mb-2 flex cursor-pointer justify-between px-4"
                >
                  <div className="relative block cursor-pointer">
                    <input
                      checked={item.isChecked}
                      onChange={handleCheckboxChange}
                      value={item.name.replaceAll("&", "%26")}
                      name={category.name}
                      className="peer absolute h-0 w-0 cursor-pointer opacity-0"
                      type="radio"
                    />
                    <span className="absolute left-0 top-0 h-[23px] w-[23px] rounded-sm bg-[#eee] outline outline-[0.9px] after:absolute after:left-[4px] after:top-[4px] after:hidden after:content-checked peer-checked:bg-[#0b0d0f] after:peer-checked:block "></span>
                  </div>
                  <p className="w-[80%] text-left capitalize">
                    {category.id === "price"
                      ? item.name === "500-999999"
                        ? "> $ 500"
                        : "$ " + item.name
                      : item.name}
                  </p>
                </label>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
