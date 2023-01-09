import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const context = useContext(AuthContext);

  return (
    context?.isUserLoggedIn && (
      <nav
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          backgroundColor: "#444444",

          // minWidth: "300px",
        }}
      >
        <div>
          <h1 style={{ color: "white" }}>TUTORIALS</h1>
        </div>
        <div>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              listStyleType: "none",
            }}
          >
            <li style={{ marginInline: "1.2rem" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "20px",
                }}
                to="/"
              >
                Home
              </Link>
            </li>
            <li style={{ marginInline: "1.2rem" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "20px",
                }}
                to="/addTutorials"
              >
                Add Tutorials
              </Link>
            </li>
            <li style={{ marginInline: "1.2rem" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "20px",
                }}
                onClick={context?.handleLogout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  );
};
export default Header;
