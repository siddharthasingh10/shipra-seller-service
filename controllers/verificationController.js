// controllers/verificationController.js
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// Razorpay config
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const RAZORPAY_BASE_URL = "https://api.razorpay.com/v1";

// Basic Auth header helper
const getAuthHeader = () => {
  const token = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
  return { Authorization: `Basic ${token}` };
};

/**
 * Verify bank account details using Razorpay Account Validation API
 * Docs: https://razorpay.com/docs/api/x/account-validation/ :contentReference[oaicite:1]{index=1}
 */
export const verifyBankAccount = async (req, res) => {
  try {
    const { accountNumber, ifscCode } = req.body;
    if (!accountNumber || !ifscCode) {
      return res.status(400).json({ message: "Bank account number and IFSC code required" });
    }

    // Create a fund account for verification (example) – this is a simplified demo
    // In real use you must first create contact -> fund account -> validate
    const url = `${RAZORPAY_BASE_URL}/fund_accounts/validate`;  // NOTE: endpoint may vary
    const payload = {
      account_number: accountNumber,
      ifsc: ifscCode
    };

    const response = await axios.post(url, payload, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "application/json"
      }
    });

    // Assuming response.data.status === 'valid' means verified
    const verified = response.data.status === "valid";

    return res.status(200).json({
      success: true,
      accountNumber,
      ifscCode,
      verified,
      message: verified ? "Bank account verified successfully" : "Bank account verification failed"
    });
  } catch (err) {
    console.error("Bank verification error:", err.response?.data || err.message);
    return res.status(500).json({ message: "Internal server error during bank verification", error: err.response?.data || err.message });
  }
};

/**
 * Dummy GST verification placeholder — Razorpay tool exists but API details may not be public
 * Using dummy for now
 */
export const verifyGst = async (req, res) => {
  const { gstNumber } = req.body;
  if (!gstNumber) return res.status(400).json({ message: "GST number required" });

  // For now, we pretend we send to Razorpay or another API and get a result
  // In future replace with real endpoint when you have access
  const verified = true;

  return res.status(200).json({
    success: true,
    gstNumber,
    verified,
    message: "GST verified successfully (placeholder)"
  });
};

/**
 * Dummy PAN verification placeholder
 */
export const verifyPan = async (req, res) => {
  const { panNumber } = req.body;
  if (!panNumber) return res.status(400).json({ message: "PAN number required" });

  // Dummy step for now
  const verified = true;

  return res.status(200).json({
    success: true,
    panNumber,
    verified,
    message: "PAN verified successfully (placeholder)"
  });
};
