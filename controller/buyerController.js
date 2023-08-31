const User = require("../model/userModel");
const catchAsync = require('../utils/catchAsync')

exports.registerBuyer = catchAsync( async (req, res) => {
  try {
    const buyers = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: "buyer",
    });
    res.status(201).json({
      status: "success",
      data: {
        buyers,
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

exports.loginBuyer = catchAsync( async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    //Check if phoneNumber and password exist
    if (!phoneNumber || !password) {
      return next(new AppError("Please provide phoneNumber and password", 400));
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ phoneNumber }).select("+password");

    if (!user || !(await user.correctUserPassword(password, user.password))) {
      return next(new AppError("Incorrect phoneNumber or password", 401));
    }
    //   const token = signToken(user._id);
    res.status(201).json({
      status: "success",
      // token,
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});
