import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SupplierList from "./pages/suppliers/SupplierList";
import SupplierForm from "./pages/suppliers/SupplierForm";
import Products from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import InventoryList from "./pages/inventory/InventoryList";
import InventoryForm from "./pages/inventory/InventoryForm";
import Layout from "./components/Layout";
import { setAuthToken } from "./services/api";
import CategoryList from "./pages/categories/CategoryList";
import CategoryForm from "./pages/categories/CategoryForm";
import OrderList from "./pages/orders/OrderList";
import OrderForm from "./pages/orders/OrderForm";

function PrivateRoute({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const tokenFromStorage = localStorage.getItem("token");
  const userNameFromStorage = localStorage.getItem("userName");

  const [token, setToken] = useState(tokenFromStorage);
  const [userName, setUserName] = useState(userNameFromStorage);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const handleLogin = (token, userName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    setToken(token);
    setUserName(userName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName(null);
    setAuthToken(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes wrapped with Layout */}
        <Route
          path="/*"
          element={
            <PrivateRoute token={token}>
              <Layout userName={userName} onLogout={handleLogout} />
            </PrivateRoute>
          }
        >
          {/* Nested routes rendered inside Layout */}
          <Route index element={<Home />} />

          <Route path="suppliers">
            <Route index element={<SupplierList />} />
            <Route path="new" element={<SupplierForm />} />
            <Route path="edit/:id" element={<SupplierForm />} />
          </Route>

          <Route path="categories">
            <Route index element={<CategoryList />} />
            <Route path="new" element={<CategoryForm />} />
            <Route path="edit/:id" element={<CategoryForm />} />
          </Route>

          <Route path="products">
            <Route index element={<Products />} />
            <Route path="new" element={<ProductForm />} />
            <Route path="edit/:id" element={<ProductForm />} />
          </Route>

          <Route path="inventory">
            <Route index element={<InventoryList />} />
            <Route path="new" element={<InventoryForm />} />
            <Route path="edit/:id" element={<InventoryForm />} />
          </Route>

          <Route path="orders">
            <Route index element={<OrderList />} />
            <Route path="new" element={<OrderForm />} />
            <Route path="edit/:id" element={<OrderForm />} />
          </Route>

          {/* TODO: Add routes for orders, order items, etc. */}
        </Route>

        {/* Redirect unmatched routes */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
