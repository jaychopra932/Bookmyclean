import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { addUser } from "../services/authService";

const AddProfessional = () => {
  const navigate = useNavigate();
  const [professional, setProfessional] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    window.dispatchEvent(new Event("userUpdated"));
    navigate("/");

    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.password
    ) {
      alert("Please fill all fields!");
      return;
    }

    setProfessional([...professional, formData]);
    let { name, email, number, password } = formData;
    addUser({ name, email, number, password, role: "professional" })
      .then((res) => {
        window.alert("Account Created !!");
        window.dispatchEvent(new Event("userUpdated"));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setFormData({ name: "", email: "", number: "", password: "" });
    alert("Professional added successfully!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a Professional</h2>

      {/* --- Form --- */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            name="number"
            className="form-control"
            placeholder="Enter phone number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn checkout-btn w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProfessional;
