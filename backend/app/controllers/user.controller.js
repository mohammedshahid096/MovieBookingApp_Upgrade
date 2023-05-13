const btoa = require("b2a");
const Users = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
const TokenGenerator = require("uuid-token-generator");

// function for signup
module.exports.signUp = async (req, res) => {
  try {
    const { first_name, last_name, email_address, mobile_number, password } =
      req.body;
    const user_exits = await Users.findOne({ email: email_address });
    // condition  if a user already exist then need not to create new account
    if (user_exits) {
      return res
        .status(406)
        .json({ message: "user already exists with user name" });
    }
    const user = new Users({
      first_name,
      last_name,
      email: email_address,
      contact: mobile_number,
      username: first_name + last_name,
      password,
    });
    await user.save();
    res.status(200).json({ message: "user successfully created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function for login
module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // if any data is missing
    if (!username || !password) {
      return res.status(406).json({ message: "enter username or password" });
    }

    const user = await Users.findOne({ username });
    // if the user is not found then it  means username is incorrect
    if (!user) {
      return res
        .status(406)
        .json({ message: "username or password is incorrect" });
    }
    // if the password is not match
    if (user.password != password) {
      return res.status(406).json({
        message: "username or password is incorrect",
      });
    }
    // getting a headers authorization token
    const authtoken = req.headers.authorization;
    const check_auth = authtoken.split(" ");
    // decrepting the token
    check_auth[1] = btoa.atob(check_auth[1]);
    if (check_auth[1] !== `${username}:${password}`) {
      return res.status(406).json({
        message: "authentication is not match",
      });
    }
    const tokgen = new TokenGenerator();
    const token = await tokgen.generate();
    user.uuid = uuidv4();
    user.accesstoken = token;
    user.isLoggedIn = true;
    await user.save();
    res.set("access-token", null);
    res.status(200).json({
      message: "successfully login",
      id: user.uuid,
      "access-token": user.accesstoken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// functin for logut
module.exports.logout = async (req, res) => {
  try {
    const { uuid } = req.body;
    const user = await Users.findOne({ uuid });
    if (!user) {
      return res.status(406).json({ message: "user does not exist" });
    }
    user.accesstoken = "";
    user.uuid = "";
    user.isLoggedIn = false;
    await user.save();
    res.status(200).json({ message: "Logged Out successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getting a coupon code
module.exports.getCouponCode = async (req, res) => {
  try {
    const { code } = req.query;
    const authtoken = req.headers.authorization;
    const check_auth = authtoken.split(" ");
    console.log(check_auth[1]);
    const user = await Users.findOne({ accesstoken: check_auth[1] });

    if (!user) {
      return res.status(406).json({
        message: "no user with this authentication",
      });
    }

    const discount = user.coupens.filter((item) => {
      if (item.id === parseInt(code)) {
        return item;
      }
    });

    if (discount.length === 0) {
      res.status(200).json({ discountValue: 0 });
    } else {
      res.status(200).json({ discountValue: discount[0].discountValue });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function for booking
module.exports.bookings = async (req, res) => {
  const { customerUuid, bookingRequest } = req.body;
  function Generate_reference() {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  let reference_number = Generate_reference();
  const user = await Users.findOne({ uuid: customerUuid });
  if (!user) {
    return res.status(406).json({ message: "user not found" });
  }

  bookingRequest.reference_number = reference_number;
  let tickts = bookingRequest.tickets[0].split(",");
  console.log(tickts);
  bookingRequest.tickets = tickts.map((item) => parseInt(item));
  user.bookingRequests.push(bookingRequest);
  await user.save();
  res.status(200).json({ reference_number });
};
