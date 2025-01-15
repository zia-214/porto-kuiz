import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import LoginPageV2 from "./pages/LoginPageV2";
import ProductDetail from "./pages/ProductDetail";
import ProductaManagementPage from "./pages/admin/ProductaManagementPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import CounterPage from "./pages/CounterPage";
import RegisterPage from "./pages/RegisterPage";
import { useHydration } from "./components/hooks/useHydration";
import HystoryPage from "./pages/HystoryPage";
import HystoryDetailPage from "./pages/HystoryDetailPage";

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <MainLayout />
  </BrowserRouter>
);

const MainLayout = () => {
  const location = useLocation();

  const { isHydrated } = useHydration()
  if (!isHydrated) {
    return <div>Loaduingggg..</div>
  }


  return (
    <>
      {!location.pathname.startsWith("/admin") && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPageV2 />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/hystory" element={<HystoryPage />} />
        <Route path="/hystory/:transactionId" element={<HystoryDetailPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/admin/products" element={<ProductaManagementPage />} />
        <Route path="/admin/products/create" element={<CreateProductPage />} />
        <Route path="/admin/products/edit/:productId" element={<EditProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
