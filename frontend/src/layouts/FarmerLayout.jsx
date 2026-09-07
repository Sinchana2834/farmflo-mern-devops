import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function FarmerLayout() {
  return (
    <>
      <Navbar role="farmer" />

      <div className="container-fluid mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default FarmerLayout;