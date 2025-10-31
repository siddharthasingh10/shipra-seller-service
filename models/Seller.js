import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    otpVerified: { type: Boolean, default: false },
    email: { type: String, unique: true, sparse: true },
   
   
    // Business details
    businessName: String,
    gstNumber: String,
    panNumber: String,
    bankAccountNumber: String,
    ifscCode: String,
    address: String,

    verifiedByRazorpay: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Seller", sellerSchema);
