import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import AppLayOut from "./ui/AppLayOut";
import UserAccount from "./pages/UserAccount";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProductList from "./components/Products/ProductList";
import ProductDetail from "./components/Products/ProductDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useEffect, useState } from "react";
import Brands from "./pages/Brands";
import WishList from "./pages/WishList";
import { SkeletonTheme } from "react-loading-skeleton";
import CheckOut from "./pages/CheckOut";
import OrderSuccess from "./pages/OrderSuccess";
import requestAPI from "./helpers/api";
import OrderFail from "./pages/OrderFail";
import AdminLogin from "./pages/AdminLogin";
import LuxeAdmin from "./pages/LuxeAdmin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken"),
  );
  const handleLoginSuccess = async () => {
    setIsLoggedIn(true);
    const res = await requestAPI("/user/wishlist", {}, "get");
    const items = res.data.metadata.wishListData.items;

    localStorage.setItem(
      "wishlist_items",
      JSON.stringify(Object.keys(items).length === 0 ? [] : [...items]),
    );
    localStorage.setItem(
      "wishlistCount",
      JSON.stringify(Object.keys(items).length),
    );
    window.dispatchEvent(new Event("storage"));
  };

  const handleAdminLoginSuccess = async () => {
    setIsAdminLoggedIn(true);
  };

  function ProtectedRoute({ children }: { children: ReactNode }) {
    useEffect(() => {
      const storeToken = localStorage.getItem("accessToken");
      setIsAdminLoggedIn(!!storeToken);
    }, []);
    if (!isAdminLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }
  function ProtectedAdminRoute({ children }: { children: ReactNode }) {
    useEffect(() => {
      const storeToken = localStorage.getItem("accessToken");
      setIsLoggedIn(!!storeToken);
    }, []);
    if (!isLoggedIn) {
      return <Navigate to="/luxe-admin-login" replace />;
    }

    return children;
  }

  return (
    <SkeletonTheme baseColor="#ccc" highlightColor="#aaa">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
              <Route path="checkout" element={<CheckOut />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="order-fail" element={<OrderFail />} />
              <Route path="product/detail/:pid" element={<ProductDetail />} />
              <Route path="blog" element={<Blog />} />
              <Route
                path="account"
                element={
                  <ProtectedRoute>
                    <UserAccount />
                  </ProtectedRoute>
                }
              />

              <Route
                path="cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="wishlist"
                element={
                  <ProtectedRoute>
                    <WishList />
                  </ProtectedRoute>
                }
              />
              <Route path="signup" element={<SignUp />} />

              <Route
                path="login"
                element={<Login onLoginSuccess={handleLoginSuccess} />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route
              index
              path="luxe-admin"
              element={
                <ProtectedAdminRoute>
                  <LuxeAdmin />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="luxe-admin-login"
              element={<AdminLogin onLoginSuccess={handleAdminLoginSuccess} />}
            />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#333",
              color: "#fff",
            },
          }}
        />
      </QueryClientProvider>
    </SkeletonTheme>
  );
}

export default App;
