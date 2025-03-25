import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
