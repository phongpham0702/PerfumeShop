import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import FilterBar from "../components/Filter/FilterBar";
import { useEffect, useRef, useState } from "react";
import FilterInfo from "../components/Filter/FilterInfo";
import { categories } from "../dummy_data/categoryData";
import { FilterCategory } from "../interfaces/Category";
import OffCanvasMenu from "../components/OffCanvas/OffCanvasMenu";
interface SelectedFilters {
  [paramName: string]: string[];
}
const Shop = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState<string>("");
  const [productNum, setProductNum] = useState<number | 0>(0);
  const [categoryState, setCategoryState] = useState(
    JSON.parse(JSON.stringify(categories)),
  );
  const handleChange = (productNum: number) => {
    setProductNum(productNum);
  };
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    menuRef.current?.classList.remove("animate-[leftOut_.3s_ease-out_both]");
  }, []);

  useEffect(() => {
    const selectedFilters: SelectedFilters = {};
    const searchParamsArray = Array.from(searchParams.entries());
    for (const [paramName, paramValues] of searchParamsArray) {
      selectedFilters[paramName] = Array.isArray(paramValues)
        ? paramValues
        : [paramValues];
    }
    console.log(selectedFilters);
    setCategoryState((prevStates: FilterCategory[]) =>
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (event.target.checked) {
      newSearchParams.set(event.target.name, event.target.value);
    } else {
      newSearchParams.delete(event.target.name);
    }
    setSearchParams(newSearchParams);
    navigate(`/shop/1?${newSearchParams.toString()}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchVal = event.target.value.toLowerCase();
    setSearchVal(newSearchVal);

    const updatedCategories = categories.map((category) => {
      if (category.id === "brand") {
        return {
          ...category,
          items: newSearchVal
            ? category.items.filter((item) =>
                item.name.toLowerCase().includes(newSearchVal),
              )
            : category.items.map((item) => ({ ...item, isChecked: false })),
        };
      }
      return category;
    });

    setCategoryState(updatedCategories);
  };

  const [windowWidth, setWindowWidth] = useState(0);
  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <div className=" mx-auto max-w-[1440px]">
      <h1 className="mb-6 mt-16 text-center font-heading text-4xl">
        Luxe Shop
      </h1>
      <div className="flex bg-[#d7d7d720] p-4 font-light">
        <NavLink to="/">Home page / </NavLink>
        <NavLink
          className="ml-1  aria-[current=page]:text-[#f8b500]"
          to="/shop"
        >
          {" "}
          Shop
        </NavLink>
      </div>
      <FilterInfo productNum={productNum} />

      <div className="relative flex justify-between">
        <div>
          {windowWidth < 1024 ? (
            <OffCanvasMenu id="filter">
              <FilterBar
                category={categoryState}
                handleCheckboxChange={handleCheckboxChange}
                handleInputChange={handleInputChange}
                searchVal={searchVal}
              />
            </OffCanvasMenu>
          ) : (
            <FilterBar
              category={categoryState}
              handleCheckboxChange={handleCheckboxChange}
              handleInputChange={handleInputChange}
              searchVal={searchVal}
            />
          )}
        </div>

        <Outlet context={{ handleProductNumChange: handleChange }} />
      </div>
    </div>
  );
};

export default Shop;
