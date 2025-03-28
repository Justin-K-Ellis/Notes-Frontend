import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
}
