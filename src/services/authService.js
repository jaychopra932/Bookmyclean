import API from "../api/axios";

export const loginUser = (loginData) => {
  return API.post("/api/users/login", loginData);
};

export const addUser = (loginData) => {
  return API.post("/api/users/register", loginData);
};

export const addBooking = (bookingData) => {
  return API.post("/api/bookings/addBooking", bookingData);
};
