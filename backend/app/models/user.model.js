const mongoose = require("mongoose");
// const btoa = require("b2a");

const user_schema = mongoose.Schema({
  userid: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    toLowerCase: true,
  },
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  contact: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  uuid: {
    type: String,
  },
  accesstoken: {
    type: String,
  },
  coupens: {
    type: Array,
  },
  bookingRequests: [
    {
      reference_number: {
        type: Number,
      },
      coupon_code: {
        type: Number,
      },
      show_id: {
        type: Number,
      },
      tickets: [],
    },
  ],
});

// user_schema.pre("save", async function () {
//   try {
//     if (this.isModified("password")) {
//       this.password = await btoa.btoa(this.password);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// });

const Users = mongoose.model("users", user_schema);

module.exports = Users;
