import { NavLink } from "react-router-dom";
import ProductList from "../components/Products/ProductList";

const Shop = () => {
  return (
    <div className="mx-auto max-w-[1280px]">
      <h1 className="mb-6 mt-16 text-center text-4xl">Luke Shop</h1>
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
      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default Shop;
