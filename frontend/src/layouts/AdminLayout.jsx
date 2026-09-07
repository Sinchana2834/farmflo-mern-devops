import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminLayout() {
  return (
    <>
      <Navbar />
      <main className="container-fluid py-4">
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;
