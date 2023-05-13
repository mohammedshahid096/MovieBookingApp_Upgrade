const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/user.controller");

userRoutes.post("/signup", userController.signUp);
userRoutes.post("/login", userController.login);
userRoutes.post("/logout", userController.logout);
userRoutes.post("/bookings", userController.bookings);
userRoutes.get("/coupons", userController.getCouponCode);

module.exports = userRoutes;
