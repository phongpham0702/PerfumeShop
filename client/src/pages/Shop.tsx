import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import FilterBar from "../components/Filter/FilterBar";
import { categories } from "../dummy_data/categoryData";
import { useEffect, useState } from "react";
import FilterInfo from "../components/Filter/FilterInfo";

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
  };

  const handleChange = (productNum: number) => {
    setProductNum(productNum);
  };

  useEffect(() => {
    const filteredParams = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      if (value) filteredParams.set(key, value);
    }
    navigate(`?${filteredParams.toString()}`);
  }, [searchParams, navigate]);

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
        <FilterBar
          onFilterChange={handleCheckboxChange}
          categories={categories}
        />
        <Outlet context={{ handleProductNumChange: handleChange }} />
      </div>
    </div>
  );
};

export default Shop;
