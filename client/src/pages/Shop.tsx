import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import FilterBar from "../components/Filter/FilterBar";
import { categories } from "../dummy_data/categoryData";
import { useState } from "react";
import FilterInfo from "../components/Filter/FilterInfo";
import OffCanvasMenu from "../components/OffCanvas/OffCanvasMenu";

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productNum, setProductNum] = useState<number | 0>(0);

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

  const handleChange = (productNum: number) => {
    setProductNum(productNum);
  };

  return (
    <div className="mx-auto max-w-[1440px]">
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
      <div className="flex justify-between">
        <div className="hidden xl:block">
          <FilterBar
            onFilterChange={handleCheckboxChange}
            categories={categories}
          />
        </div>
        <Outlet context={{ handleProductNumChange: handleChange }} />
      </div>
      <OffCanvasMenu id="filter">
        <div className="flex justify-center">
          <FilterBar
            onFilterChange={handleCheckboxChange}
            categories={categories}
          />
        </div>
      </OffCanvasMenu>
    </div>
  );
};

export default Shop;
