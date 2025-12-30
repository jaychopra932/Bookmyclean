import React, { Component } from "react";
import { withRouter } from "./withRouter";
import "./style.css";
import { addBooking } from "../services/authService";

class Checkout extends Component {
  constructor(props) {
    super(props);
    let data = JSON.parse(localStorage.getItem("cartItems")) || [];
    let user = JSON.parse(localStorage.getItem("user")) || [];
    this.state = {
      cart: data,
      userId: user["_id"] || "",
      name: user.name || "",
      email: user.email || "",
      number: user.number || "",
      address: "",
      date: "",
    };
    this.addToCart = this.addToCart.bind(this);
    this.removetocart = this.removetocart.bind(this);
    this.buttonFn = this.buttonFn.bind(this);
  }

  componentDidMount() {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.setState({ cart: savedCart });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cart));
    }
  }

  addToCart(title, price) {
    this.setState((prevState) => {
      const cart = [...prevState.cart];
      const index = cart.findIndex((i) => i.title === title);
      if (index >= 0) {
        cart[index].quantity += 1;
      } else {
        cart.push({ title, quantity: 1, price });
      }
      return { cart };
    });
  }

  removetocart(title) {
    this.setState((prevState) => {
      const cart = [...prevState.cart];
      const index = cart.findIndex((i) => i.title === title);
      if (index >= 0) {
        if (cart[index].quantity <= 1) cart.splice(index, 1);
        else cart[index].quantity -= 1;
      }
      return { cart };
    });
  }

  buttonFn(title, price) {
    const { cart } = this.state;
    const index = cart.findIndex((i) => i.title === title);

    if (index >= 0) {
      const quantity = cart[index].quantity;
      return (
        <div className="quantity-container">
          <button className="qty-btn" onClick={() => this.removetocart(title)}>
            –
          </button>
          <span className="quantity-text">{quantity}</span>
          <button
            className="qty-btn"
            onClick={() => this.addToCart(title, price)}
          >
            +
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="overlap-btn"
          onClick={() => this.addToCart(title, price)}
        >
          Add
        </button>
      );
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, number, address, date, userId, cart } = this.state;
    const total = cart.reduce((b, c) => b + c.price * c.quantity, 0);
    let bookingId =
      "BOOK-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    console.log({
      userName: name,
      userId,
      cart,
      total,
      address,
      bookingDateTime: date,
      status: "pending",
      email,
      number,
      bookingId,
      professionalName: "",
      professionalId: "",
    });
    addBooking({
      userName: name,
      userId,
      cart,
      total,
      address,
      bookingDateTime: date,
      status: "pending",
      email,
      number,
      bookingId,
      professionalName: "",
      professionalId: "",
    })
      .then((res) => {
        alert(`Booking placed. ID: `);
        localStorage.removeItem("cartItems");
        this.props.navigate("/success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { cart, name, number, email, address, date } = this.state;

    return (
      <div className="container row mt-4">
        <div className="col-8 ">
          {
            <form
              onSubmit={this.handleSubmit}
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
                  value={name}
                  onChange={this.handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  name="number"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={number}
                  onChange={this.handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Enter full address"
                  value={address}
                  onChange={this.handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn checkout-btn w-100">
                Submit
              </button>
            </form>
          }
        </div>
        <div className="col-4 p-3 border">
          <div className="container ">
            <h5>Cart</h5>

            {cart.length === 0 ? (
              <div>
                <p>Your cart is empty.</p>
                <button
                  className="btn checkout-btn"
                  onClick={() => this.props.navigate("/")}
                >
                  Home
                </button>
              </div>
            ) : (
              cart.map((a, index) => (
                <div className="row" key={index}>
                  <div className="col-7" style={{ fontSize: "14px" }}>
                    {a.title}
                  </div>
                  <div className="col-2">
                    <button className="merged-btn">
                      <span onClick={() => this.removetocart(a.title)}>–</span>
                      <span className="quantity-text">{a.quantity}</span>
                      <span onClick={() => this.addToCart(a.title, a.price)}>
                        +
                      </span>
                    </button>
                  </div>
                  <div className="col-3" style={{ fontSize: "14px" }}>
                    ₹{a.price * a.quantity}
                  </div>
                  <br />
                  <br />
                </div>
              ))
            )}

            <hr />

            {cart.length > 0 && (
              <>
                <div className="row">
                  <div className="col-7 text-center">
                    <b>Total</b>
                  </div>
                  <div className="col-2"></div>
                  <div className="col-3">
                    <b>₹{cart.reduce((b, c) => b + c.price * c.quantity, 0)}</b>
                  </div>
                </div>

                <div className="text-center mt-2">
                  <button
                    className="btn checkout-btn text-center"
                    onClick={() => this.props.navigate("/payment")}
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Checkout);
