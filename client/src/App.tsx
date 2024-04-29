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
import ProductDetail from "./components/Products/ProductDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login state after successful login
  };

  function ProtectedRoute({ children }: { children: ReactNode }) {
    const isLoggedIn = localStorage.getItem("accessToken"); // Or sessionStorage.getItem('token')

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }
  return (
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
            <Route path="signup" element={<SignUp />} />
            <Route
              path="login"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
