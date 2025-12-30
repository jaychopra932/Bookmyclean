import React, { Component } from "react";
import "./style.css";
import { withRouter } from "./withRouter";

import apartment from "../images/apartment.jpeg";
import bangalow from "../images/banglow.jpeg";
import homeimage from "../images/room.jpeg";
import miniservices from "../images/miniservice.jpeg";
import homecleaning from "../images/home_cleaning.jpg";

let tick = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "20px" }}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.75 15.836l9.793-9.793 1.414 1.415-10.5 10.5a1 1 0 01-1.414 0l-5.25-5.25 1.414-1.415 4.543 4.543z"
      fill="#0F0F0F"
    ></path>
  </svg>
);

let services = [
  {
    heading: "Apartment",
    types: [
      {
        title: "Furnished apartment",
        price: 3499,
        time: "3 hrs 45 mins",
        details: [
          "Cleaining and stain removal from rooms, kitchen, bathroom & balcony",
          "Machine floor scrubbing & dusting of walls & ceiling",
        ],
      },
      {
        title: "Unfurnished apartment",
        price: 3199,
        time: "3 hrs",
        details: [
          "Cleaining and stain removal from rooms, kitchen, bathroom & balcony",
          "Machine floor scrubbing & dusting of walls & ceiling",
        ],
      },
    ],
  },
  {
    heading: "Bungalow/duplex",
    types: [
      {
        title: "Furnished bungalow",
        price: 4399,
        time: "5 hrs 30 mins",
        details: [
          "Cleaining and stain removal from rooms, kitchen, bathroom, kitchen, balcony, porch & terrace",
          "Machine floor scrubbing & dusting of walls & ceiling",
        ],
      },
      {
        title: "Unfurnished bungalow",
        price: 3999,
        time: "5 hrs",
        details: [
          "Cleaining and stain removal from rooms, kitchen, bathroom, kitchen, balcony, porch & terrace",
          "Machine floor scrubbing & dusting of walls & ceiling",
        ],
      },
    ],
  },
  {
    heading: "Book by room",
    types: [
      {
        title: "Bedroom cleaning",
        price: 799,
        time: "1 hr ",
        details: [
          "Cleaining of one bedroom & dresser cabinets",
          "Excludes attached bathroom, balcony, emptying of cabinets",
        ],
      },
      {
        title: "Living room cleaning",
        price: 899,
        time: "1 hr ",
        details: [
          "Cleaining of one living room  & dresser cabinets",
          "Excludes attached bathroom, balcony, emptying of cabinets",
        ],
      },
      {
        title: "Bedroom cleaning",
        price: 899,
        time: "1 hr ",
        details: [
          "Cleaining of one bedroom & dresser cabinets",
          "Excludes attached bathroom, balcony, emptying of cabinets",
        ],
      },
      {
        title: "Kitchen cleaning",
        price: 1249,
        time: "1 hr 30 mins",
        details: [
          "Through cleaning of objects, surfaces & appliances",
          "Excludes cleaning using scrubbing machine",
        ],
      },
      {
        title: "Bathroom cleaning",
        price: 549,
        time: "1 hr ",
        details: [],
      },
      {
        title: "Balcony cleaning",
        price: 499,
        time: "1 hr ",
        details: [],
      },
    ],
  },
  {
    heading: "Mini services",
    types: [
      {
        title: "Kitchen appliances cleaning",
        price: 99,
        time: "30 mins ",
        details: ["Deep cleaning of chimney, fridge, microwave,or stove"],
      },
      {
        title: "Sofa & upholstery wet shampooing",
        price: 199,
        time: "30 mins ",
        details: ["Includes wet vaccuming with shampoo"],
      },
      {
        title: "Bedroom cleaning",
        price: 899,
        time: "1 hr ",
        details: [
          "Cleaining of one bedroom & dresser cabinets",
          "Excludes attached bathroom, balcony, emptying of cabinets",
        ],
      },
      {
        title: "Kitchen cleaning",
        price: 1249,
        time: "1 hr 30 mins",
        details: [
          "Through cleaning of objects, surfaces & appliances",
          "Excludes cleaning using scrubbing machine",
        ],
      },
      {
        title: "Furniture wet wiping",
        price: 449,
        time: "1 hr 30 mins",
        details: ["Includes wet wiping of upto 2 tables, 5 chairs & 1 bed"],
      },
      {
        title: "Ceiling dusting & cobweb cleaning",
        price: 199,
        time: "30 mins",
        details: [
          "Includes cobweb removal & dry dusting of ceiling for 1 room",
          "Excludes wet wiping & paint removal",
        ],
      },
    ],
  },
];

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };

    this.addToCart = this.addToCart.bind(this);
    this.removetocart = this.removetocart.bind(this);
    this.buttonFn = this.buttonFn.bind(this);
  }
  componentDidMount() {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      this.setState({ cart: JSON.parse(savedCart) });
    }
  }

  // ✅ Save cart to localStorage when it changes
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

  scrollToSection(heading) {
    const section = document.getElementById(heading);
    if (section) {
      const yOffset = -100; // scroll a bit higher so heading is visible
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  render() {
    const { cart } = this.state;
    return (
      <div className="three-column-layout">
        <div className="side left">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p className="text-secondary">Select a service</p>
            <hr
              style={{
                flex: 1,
                border: "none",
                borderTop: "1px solid black",
                position: "relative",
                top: "-6px",
              }}
            />
          </div>
          <div className="container">
            <div className="row ">
              <div className="col-md-4 col-12 mb-3">
                <div
                  className="service-box text-center"
                  onClick={() => this.scrollToSection("Apartment")}
                >
                  <img
                    className="service-logo"
                    src={apartment}
                    alt="Apartment"
                  />
                  <p className="hover-underline mt-2">Apartment</p>
                </div>
              </div>

              <div className="col-md-4 col-12 mb-3">
                <div
                  className="service-box text-center"
                  onClick={() => this.scrollToSection("Bungalow/duplex")}
                >
                  <img className="service-logo" src={bangalow} alt="Bungalow" />
                  <p className="hover-underline mt-2">
                    Bungalow/
                    <br />
                    Duplex
                  </p>
                </div>
              </div>

              <div className="col-md-4 col-12 mb-3">
                <div
                  className="service-box text-center"
                  onClick={() => this.scrollToSection("Book by room")}
                >
                  <img
                    className="service-logo"
                    src={homeimage}
                    alt="Book by Room"
                  />
                  <p className="hover-underline mt-2">Book by room</p>
                </div>
              </div>

              <div className="col-md-4 col-12 mb-3">
                <div
                  className="service-box text-center"
                  onClick={() => this.scrollToSection("Mini services")}
                >
                  <img
                    className="service-logo"
                    src={miniservices}
                    alt="Mini Services"
                  />
                  <p className="hover-underline mt-2">Mini services</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content p-4">
          {services.map((a) => (
            <div key={a.heading} id={a.heading} className=" p-2">
              <h3>{a.heading}</h3>
              {a.types.map((b) => (
                <div className="row mt-3">
                  <div className="col-8">
                    <h5>{b.title}</h5>
                    <p>
                      <b>Starts at ₹{b.price} </b> &bull; {b.time}{" "}
                    </p>
                    <ul>
                      {b.details.map((i) => (
                        <li>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-4">
                    <div className="image-wrapper">
                      <img src={apartment} className="img-fluid" />
                      {this.buttonFn(b.title, b.price)}
                    </div>
                  </div>
                  <br />
                  <hr className="mt-3" />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="side right">
          <div className="border " style={{ borderRadius: "10px" }}>
            {cart.length > 0 ? (
              <div className="container p-2">
                <h5>Cart</h5>
                {cart.map((a) => (
                  <div className="row ">
                    <div className="col-7" style={{ fontSize: "14px" }}>
                      {a.title}
                    </div>
                    <div className="col-2">
                      <button className="merged-btn">
                        <span onClick={() => this.removetocart(a.title)}>
                          –
                        </span>
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
                ))}
                <hr />
                <div className="row">
                  <div className="col-7 text-center">
                    <b>Total</b>
                  </div>
                  <div className="col-2"></div>
                  <div className="col-3">
                    <b>{cart.reduce((b, c) => b + c.price * c.quantity, 0)}</b>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button
                    className=" btn checkout-btn text-center"
                    onClick={() => this.props.navigate("/checkout")}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <br />
                <svg
                  width="40%"
                  height="40%"
                  viewBox="0 0 128 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  alignItems="center"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M77.5 34a.5.5 0 01-.5.5h-2.5V30a.5.5 0 011 0v3.5H77a.5.5 0 01.5.5z"
                    fill="#FFD47F"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M79.5 34a.5.5 0 01-.5.5h-2.5V30a.5.5 0 011 0v3.5H79a.5.5 0 01.5.5z"
                    fill="#FFD47F"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M73 69a1 1 0 011 1v1H61a1 1 0 00-1 1v7h-2v-7a3 3 0 013-3h12zm3 2h9a1 1 0 011 1v7h2v-7a3 3 0 00-3-3h-9.17c.11.313.17.65.17 1v1z"
                    fill="#E2E2E2"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M60 60v10h-2V60h2z"
                    fill="#E2E2E2"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M72 72a1 1 0 00-1-1H47a1 1 0 00-1 1v7h-2v-7a3 3 0 013-3h24a3 3 0 013 3v7h-2v-7z"
                    fill="#E2E2E2"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M74 70v9h-2v-9h2z"
                    fill="#E2E2E2"
                  ></path>
                  <path
                    d="M50 79a5 5 0 11-10 0 5 5 0 0110 0zM64 79a5 5 0 11-10 0 5 5 0 0110 0zM78 79a5 5 0 11-10 0 5 5 0 0110 0zM92 79a5 5 0 11-10 0 5 5 0 0110 0z"
                    fill="#757575"
                  ></path>
                  <path
                    d="M48 79a3 3 0 11-6 0 3 3 0 016 0zM62 79a3 3 0 11-6 0 3 3 0 016 0zM76 79a3 3 0 11-6 0 3 3 0 016 0zM90 79a3 3 0 11-6 0 3 3 0 016 0z"
                    fill="#EEE"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M74 60v10h-2V60h2z"
                    fill="#E2E2E2"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30.832 25.445l8 12-1.664 1.11-8-12 1.664-1.11zm16 0l8 12-1.664 1.11-8-12 1.664-1.11z"
                    fill="#CBCBCB"
                  ></path>
                  <path
                    d="M44 34h52l-5.694 30.369A2 2 0 0188.34 66H53.32a4 4 0 01-3.932-3.263L44 34z"
                    fill="#CBCBCB"
                  ></path>
                  <path
                    d="M34 34h48l-6 32H41.66a2 2 0 01-1.966-1.631L34 34z"
                    fill="#E2E2E2"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M46 40h-2v7.059h2V40zm0 12.941h-2V60h2v-7.059zM50 40h2v7.059h-2V40zm2 12.941h-2V60h2v-7.059zM56 40h2v7.059h-2V40zm2 12.941h-2V60h2v-7.059zM62 40h2v7.059h-2V40zm2 12.941h-2V60h2v-7.059zM68 40h2v7.059h-2V40zm2 12.941h-2V60h2v-7.059z"
                    fill="#fff"
                  ></path>
                  <path d="M24 24h28v4H24v-4z" fill="#97674E"></path>
                  <path
                    d="M78 20h6v4a6 6 0 01-6 6V20zM78 15a3 3 0 116 0v5h-6v-5zM78 30V18L66 30h12z"
                    fill="#997BED"
                  ></path>
                  <path d="M88 16l-4-1v2l4-1z" fill="#FFD47F"></path>
                  <path
                    d="M81 15a1 1 0 112 0 1 1 0 01-2 0z"
                    fill="#0F0F0F"
                  ></path>
                  <path
                    d="M72 30h-6l12-12v6a6 6 0 01-6 6z"
                    fill="#6E42E5"
                  ></path>
                </svg>
                <p className="text-secondary" style={{ fontSize: "14px" }}>
                  No items in the cart
                </p>
                <br />
              </div>
            )}
          </div>
          <br />
          <div className="side right p-4">
            <div className="row">
              <div className="col-8">
                <h5>UC Promise</h5>
                <p style={{ fontSize: "14px", marginTop: "10px" }}>
                  {tick} Verified Professionals
                </p>
                <p style={{ fontSize: "14px" }}>{tick} Safe Chemicals</p>
                <p style={{ fontSize: "14px" }}>
                  {tick} Superior Stain Removal
                </p>
              </div>
              <div className="col-4 ">
                <img className="mt-4" src={homecleaning} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ServiceList);
