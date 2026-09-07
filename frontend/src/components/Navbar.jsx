import { NavLink, useNavigate } from "react-router-dom";
import {
  BsCartFill,
  BsFillPlusSquareFill,
  BsPersonFill,
  BsGridFill,
  BsHouseDoorFill,
  BsReceiptCutoff,
  BsSpeedometer2,
  BsShopWindow,
  BsStack,
  BsBarChartFill,
  BsPeopleFill,
  BsFileEarmarkTextFill,
} from "react-icons/bs";

const navConfig = {
  consumer: [
    { label: "Home", to: "/consumer/dashboard", icon: <BsHouseDoorFill /> },
    { label: "Products", to: "/consumer/products", icon: <BsGridFill /> },
    { label: "Cart", to: "/consumer/cart", icon: <BsCartFill /> },
    { label: "My Orders", to: "/consumer/orders", icon: <BsReceiptCutoff /> },
    { label: "Profile", to: "/consumer/profile", icon: <BsPersonFill /> },
  ],
  farmer: [
    { label: "Dashboard", to: "/farmer/dashboard", icon: <BsSpeedometer2 /> },
    { label: "Add Product", to: "/farmer/add-product", icon: <BsFillPlusSquareFill /> },
    { label: "My Products", to: "/farmer/products", icon: <BsStack /> },
    { label: "Orders", to: "/farmer/orders", icon: <BsReceiptCutoff /> },
    { label: "Inventory", to: "/farmer/inventory", icon: <BsShopWindow /> },
    { label: "Sales", to: "/farmer/sales", icon: <BsBarChartFill /> },
    { label: "Profile", to: "/farmer/profile", icon: <BsPersonFill /> },
  ],
  admin: [
    { label: "Dashboard", to: "/admin/dashboard", icon: <BsSpeedometer2 /> },
    { label: "Manage Farmers", to: "/admin/farmers", icon: <BsPeopleFill /> },
    { label: "Manage Consumers", to: "/admin/consumers", icon: <BsPeopleFill /> },
    { label: "Products", to: "/admin/products", icon: <BsGridFill /> },
    { label: "Orders", to: "/admin/orders", icon: <BsReceiptCutoff /> },
    { label: "Reports", to: "/admin/reports", icon: <BsFileEarmarkTextFill /> },
  ],
};

function Navbar({ role: roleOverride }) {
  const navigate = useNavigate();

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const role = roleOverride || storedUser?.role || "guest";
  const menuItems = navConfig[role] || [];
  const brandLink =
    role === "consumer"
      ? "/consumer/dashboard"
      : role === "farmer"
      ? "/farmer/dashboard"
      : role === "admin"
      ? "/admin/dashboard"
      : "/login";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold d-flex align-items-center" to={brandLink}>
          <span className="fs-4 me-2">🌾</span>
          <span>Farm2Consumer</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-white d-flex align-items-center"
                      : "nav-link text-white d-flex align-items-center"
                  }
                >
                  <span className="me-1">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}

            {role === "guest" ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "nav-link active text-white" : "nav-link text-white"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "nav-link active text-white" : "nav-link text-white"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-lg-3" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
