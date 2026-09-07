import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function ConsumerLayout() {
  return (
    <>
      <Navbar role="consumer" />

      <div className="container-fluid mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default ConsumerLayout;