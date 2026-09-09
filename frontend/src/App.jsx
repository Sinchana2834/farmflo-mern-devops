import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import ConsumerLayout from "./layouts/ConsumerLayout";
import FarmerLayout from "./layouts/FarmerLayout";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";

// Farmer Pages
import FarmerDashboard from "./pages/FarmerDashboard";
import AddProduct from "./pages/Farmer/AddProduct";
import MyProducts from "./pages/Farmer/MyProducts";
import Orders from "./pages/Farmer/Orders";
import Inventory from "./pages/Farmer/Inventory";
import Sales from "./pages/Farmer/Sales";
import FarmerProfile from "./pages/Farmer/Profile";

// Admin Pages
import AdminManageFarmers from "./pages/admin/AdminManageFarmers";
import AdminManageConsumers from "./pages/admin/AdminManageConsumers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminReports from "./pages/admin/AdminReports";

function App() {
  return (
    <>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Consumer Layout Routes */}
        <Route element={<ConsumerLayout />}>
          <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
          <Route path="/consumer/products" element={<Products />} />
          <Route path="/consumer/cart" element={<Cart />} />
          <Route path="/consumer/checkout" element={<Checkout />} />
          <Route path="/consumer/orders" element={<MyOrders />} />
          <Route path="/consumer/profile" element={<Profile />} />
        </Route>

        {/* Farmer Layout Routes */}
        <Route element={<FarmerLayout />}>
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/add-product" element={<AddProduct />} />
          <Route path="/farmer/products" element={<MyProducts />} />
          <Route path="/farmer/orders" element={<Orders />} />
          <Route path="/farmer/inventory" element={<Inventory />} />
          <Route path="/farmer/sales" element={<Sales />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
        </Route>

        {/* Admin Layout Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/farmers" element={<AdminManageFarmers />} />
          <Route path="/admin/consumers" element={<AdminManageConsumers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>

        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;