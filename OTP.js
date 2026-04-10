const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
    },
    otp: {
      type: String,
      required: [true, 'OTP is required'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5, // Max 5 attempts
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // Expires in 10 minutes
      index: { expireAfterSeconds: 600 }, // Auto-delete after 10 minutes
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OTP', otpSchema);
