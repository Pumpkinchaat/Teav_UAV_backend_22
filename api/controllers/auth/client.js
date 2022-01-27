const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Client = require("../../../models/client");
const { catchAsync } = require("../../../utils/catchAsync");
const expressError = require("../../../utils/expressError");

module.exports.clientLogin = catchAsync(async (req, res, next) => {
  try {
    const { regno, email, password } = req.body;

    if (!regno || !email || !password) {
      next(new expressError("Regno or Email or Password field empty", 400));
    }

    const client = await Client.findOne({ regno: regno });

    if (!client) next(new expressError("User not found", 404));

    const checkPassword = await bcrypt.compare(password, client.password);

    if (!checkPassword)
      next(new expressError("The Password is incorrect", 403));

    //email verification will be implemented later

    const token = jwt.sign({ _id: client._id }, process.env.JWT_KEY);
    res.header("auth-token", token).json({
      Token: token,
      message: "You have been successfully logged in",
      client: { id: client._id, name: client.name, email: client.email },
    });

    //expiry and refresh token will be implemented later
  } catch (err) {
    next(new expressError(err.message , err.statusCode));
  }
});
