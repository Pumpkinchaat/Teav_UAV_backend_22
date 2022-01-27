const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The Client must have a name"],
    trim: true,
  },
  regno: {
    type: String,
    required: [true, "The Client must have a registration number"],
    unique: [true, "The Registration number must be unique"],
    validate: [
      function (v) {
        if (v.length !== 9 || v.slice(0, 2) !== "21") return false;
        for (let i = 2; i < 5; i++)
          if (v[i].toUpperCase() < "A" && v[i].toUpperCase() > "Z")
            return false;
        if (isNaN(v.slice(5, 4))) return false;
        else return true;
      },
      "Either the Reg No is not valid or the student is not of first year",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "The password must be of atleast 8 digits long"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "The Email Must be unique"],
    validate: [
      function (v) {
        var re = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@vitstudent([\.])ac.in/g;
        return re.test(v);
      },
      "Please enter a valid VIT Email ID",
    ],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    validate: [
      function (v) {
        var re = /^[6-9]\d{9}$/;
        return re.test(v);
      },
      "Please enter a valid Mobile Number",
    ],
    required: [true, "Phone Number is required!"],
    unique: [true, "Phone Number already exists!"],
  },
  githubLink: {
    type: String,
    validate: [
      function (v) {
        var re = /^https?:\/\/github.com\/[^\/]*\/?$/;
        return re.test(v);
      },
      "Please enter a valid GitHub Link",
    ],
  },
  linkedInLink: {
    type: String,
    validate: [
      function (v) {
        var re = /^https?:\/\/linkedin.com\/[^\/]*\/?$/;
        return re.test(v);
      },
      "Please enter a valid GitHub Link",
    ],
  },
});

module.exports = mongoose.model("Client", clientSchema);
