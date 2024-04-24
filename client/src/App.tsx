import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Brands from "./pages/Brands";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import AppLayOut from "./ui/AppLayOut";
import UserAccount from "./pages/UserAccount";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProductList from "./components/Products/ProductList";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductDetail from "./components/Products/ProductDetail";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayOut />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="brands" element={<Brands />} />
          <Route path="shop" element={<Navigate to="1" replace />} />
          <Route element={<Shop />}>
            <Route path="/shop/:page" element={<ProductList />} />
          </Route>
          <Route path="product/detail/:pid" element={<ProductDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
