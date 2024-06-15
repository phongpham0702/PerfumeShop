import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import FilterBar from "../components/Filter/FilterBar";
import FilterInfo from "../components/Filter/FilterInfo";
import { categories } from "../dummy_data/categoryData";

const Search = () => {
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
    navigate(`/search/${newSearchParams.toString()}`);
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
          to="/search"
        >
          {" "}
          Search
        </NavLink>
      </div>
      <FilterInfo productNum={productNum} />
      <div className="flex justify-between">
        <FilterBar
          handleCheckboxChange={handleCheckboxChange}
          category={categories}
        />
        <Outlet context={{ handleProductNumChange: handleChange }} />
      </div>
    </div>
  );
};

export default Search;
