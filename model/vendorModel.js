const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const vendorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        reqiured: [true, 'Please type your name'] 
    },
    email: {
        type: String,
        required: [ true, 'Please provide your email' ],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 8,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please provide your confirm password'],
        minlength: 8,
        select: false,
    },
    location: {
        type: String,
        reqiured: [true, 'Please type your location'] 
    },
    role: {
        type: String,
        // enum: ['admin','user'],
    }

})

vendorSchema.methods.correctUserPassword = async function (
    candidatePassword,
    userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


vendorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor