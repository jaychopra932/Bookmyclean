import React, { Component } from "react";
import { addUser } from "../services/authService";
import "./style.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "user",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword, role } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    addUser({ name, email, number: phone, password, role })
      .then((res) => {
        window.alert("Account Created !!");
      })
      .catch((error) => {
        console.log(error);
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
            width: "380px",
            background: "white",
            padding: "35px",
            borderRadius: "12px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "25px", color: "#6e42e5" }}>
            Create Account
          </h3>

          <form onSubmit={this.handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>

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

            <div className="mb-3 text-start">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={this.state.phone}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Re-enter password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                required
              />
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
              Sign Up
            </button>
          </form>

          <p style={{ marginTop: "12px", fontSize: "14px" }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#6e42e5", textDecoration: "none" }}
            >
              Login
            </a>
          </p>

          <hr />
        </div>
      </div>
    );
  }
}
