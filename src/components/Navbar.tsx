import { NavLink, Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <Link to={"/"}>Notes</Link>
      </h1>
      <li className="nav-list">
        <ul>
          <NavLink to={"/"}>Home</NavLink>
        </ul>
        <ul>
          <NavLink to={"/about"}>About</NavLink>
        </ul>
      </li>
    </nav>
  );
}
