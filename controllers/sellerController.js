import Seller from "../models/Seller.js";

// Dummy OTP store
const otpStore = {}; // { phone: otp }

export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    otpStore[phone] = otp;

    console.log(`📱 OTP for ${phone}: ${otp} (dummy)`);

    res.status(200).json({ message: "OTP sent successfully (dummy)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (otpStore[phone] && otpStore[phone] == otp) {
      let seller = await Seller.findOne({ phone });
      if (!seller) seller = new Seller({ phone, otpVerified: true });
      else seller.otpVerified = true;

      await seller.save();
      delete otpStore[phone];

      return res.status(200).json({ message: "OTP verified successfully" });
    }

    res.status(400).json({ message: "Invalid OTP" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const registerSeller = async (req, res) => {
  try {
    const { phone,email, businessName, gstNumber, panNumber, bankAccountNumber, ifscCode, address } =
      req.body;

    const seller = await Seller.findOne({ phone });
    if (!seller || !seller.otpVerified)
      return res.status(400).json({ message: "Please verify phone first" });

    // 🧠 Dummy Razorpay verification (always returns true)
    const razorpayVerification = true;

    seller.businessName = businessName;
    seller.gstNumber = gstNumber;
    seller.panNumber = panNumber;
    seller.bankAccountNumber = bankAccountNumber;
    seller.ifscCode = ifscCode;
    seller.address = address;
    seller.verifiedByRazorpay = razorpayVerification;
    seller.email = email;

    await seller.save();

    res.status(200).json({
      message: "Seller registered successfully (dummy Razorpay verified)",
      data: seller,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
