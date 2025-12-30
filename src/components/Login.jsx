import React, { Component, use } from "react";
import "./style.css";
import { loginUser } from "../services/authService";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    loginUser({ email, password })
      .then((res) => {
        let { user, token } = res.data;
        this.setState({ error: "" });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("userUpdated"));
        this.props.navigate?.("/") || window.location.replace("/");
      })
      .catch((err) => {
        this.setState({ error: "Invalid Email or Password" });
        console.log("login failed", err);
      });
  };

  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{
            width: "350px",
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "25px", color: "#6e42e5" }}>Login</h3>

          <form onSubmit={this.handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className=" text-start">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <p className="text-center text-danger mt-1">
                {this.state.error == "" ? "" : this.state.error}
              </p>
            </div>
            <button
              type="submit"
              className="btn"
              style={{
                width: "100%",
                backgroundColor: "#6e42e5",
                color: "white",
                fontWeight: "600",
                marginTop: "10px",
              }}
            >
              Login
            </button>
          </form>

          <p style={{ marginTop: "12px", fontSize: "14px" }}>
            Don’t have an account?{" "}
            <a
              href="/signup"
              style={{ color: "#6e42e5", textDecoration: "none" }}
            >
              Sign Up
            </a>
          </p>

          <hr />

          <button
            className="btn btn-light border w-100"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontWeight: "500",
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              width="20"
              height="20"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
}
