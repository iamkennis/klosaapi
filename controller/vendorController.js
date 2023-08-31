const Vendor = require("../model/userModel");
const catchAsync = require('../utils/catchAsync')

exports.registerVendor = catchAsync( async (req, res) => {
  try {
    const vendor = await Vendor.create({
      fullName: req.body.fullName,
      email: req.body.email,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: "vendor",
    });
    res.status(201).json({
      status: "success",
      data: {
        user: vendor,
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

exports.loginVendor = catchAsync( async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    //Check if phoneNumber and password exist
    if (!phoneNumber || !password) {
      return next(new AppError("Please provide phone number and password", 400));
    }

    // Check if user exists && password is correct
    const user = await Vendor.findOne({ phoneNumber }).select("+password");

    if (!user || !(await user.correctUserPassword(password, user.password))) {
      return next(new AppError("Incorrect phone number or password", 401));
    }
   
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});
