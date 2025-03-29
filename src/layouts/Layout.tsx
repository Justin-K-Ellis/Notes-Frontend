import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <main className="w-full flex flex-col items-center">
          <Outlet />
        </main>
      </div>
    </>
  );
}
