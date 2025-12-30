import React, { useEffect, useState } from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const NavigationBar = () => {
  const navigate = useNavigate();
  const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai"];

  const [userRole, setUserRole] = useState("guest");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const updateUserInfo = () => {
      const userStr = localStorage.getItem("user");

      if (!userStr) {
        setUserRole("guest");
        setUserName("");
        return;
      }

      try {
        const user = JSON.parse(userStr);
        if (user?.role) {
          setUserRole(user.role);
          setUserName(user.name || "User");
        } else {
          setUserRole("guest");
          setUserName("");
        }
      } catch (error) {
        console.error("Invalid user JSON:", userStr);
        localStorage.removeItem("user");
        setUserRole("guest");
        setUserName("");
      }
    };

    updateUserInfo();

    window.addEventListener("storage", updateUserInfo);
    window.addEventListener("userUpdated", updateUserInfo);

    return () => {
      window.removeEventListener("storage", updateUserInfo);
      window.removeEventListener("userUpdated", updateUserInfo);
    };
  }, []);

  const handleAuthClick = () => {
    if (userRole === "guest") {
      navigate("/login");
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("userUpdated"));
      setUserRole("guest");
      setUserName("");
      navigate("/");
    }
  };

  const renderDropdown = () => {
    if (userRole === "user") {
      return (
        <NavDropdown
          className="fw-semibold text-primary"
          title={userName}
          id="user-dropdown"
          align="end"
        >
          <NavDropdown.Item onClick={() => navigate("/my-orders")}>
            My Orders
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => navigate("/my-account")}>
            My Account
          </NavDropdown.Item>
        </NavDropdown>
      );
    }

    if (userRole === "professional") {
      return (
        <NavDropdown
          className="fw-semibold text-primary"
          title={userName}
          id="pro-dropdown"
          align="end"
        >
          <NavDropdown.Item onClick={() => navigate("/all-orders")}>
            All Orders
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => navigate("/my-account")}>
            My Account
          </NavDropdown.Item>
        </NavDropdown>
      );
    }

    if (userRole === "admin") {
      return (
        <NavDropdown
          className="fw-semibold text-primary"
          title={userName}
          id="admin-dropdown"
          align="end"
        >
          <NavDropdown.Item onClick={() => navigate("/all-orders")}>
            All Orders
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => navigate("/all-professionals")}>
            All Professionals
          </NavDropdown.Item>
        </NavDropdown>
      );
    }

    // For guest (no dropdown)
    return (
      <div className="fw-semibold text-primary">{userName || "Guest"}</div>
    );
  };

  return (
    <nav className="navbar nav-fix border-bottom navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <Navbar.Brand onClick={() => navigate("/")}>
          <img
            alt="logo"
            src={logo}
            width="35"
            height="35"
            className="d-inline-block align-top rounded-circle"
          />{" "}
          BookMyClean
        </Navbar.Brand>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse m-2"
          id="navbarSupportedContent"
        >
          {/* Location Dropdown */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <select className="form-select ms-2" aria-label="Select location">
                <option value="" disabled selected>
                  Select Location
                </option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </li>
          </ul>

          {/* User Role/Name Dropdown */}
          <div className="me-3">{renderDropdown()}</div>

          {/* Login / Logout Button */}
          <button
            className="btn checkout-btn"
            style={{ width: "100px" }}
            onClick={handleAuthClick}
          >
            {userRole === "guest" ? "Login" : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
