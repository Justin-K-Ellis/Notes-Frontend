import { NavLink, Link } from "react-router";

export default function Navbar() {
  const activeStyle = "btn btn-outline btn-accent";

  return (
    <nav className="navbar">
      <h1 className="navbar-start text-3xl font-bold">
        <Link to={"/"}>Notes</Link>
      </h1>
      <li className="navbar-end gap-2">
        <ul>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Home
          </NavLink>
        </ul>
        <ul>
          <NavLink
            to={"/about"}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            About
          </NavLink>
        </ul>
        <ul>
          <button className="btn btn-primary">
            <NavLink to={"/new"}>New Note</NavLink>
          </button>
        </ul>
      </li>
    </nav>
  );
}
