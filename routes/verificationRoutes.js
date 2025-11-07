import express from "express";
import {
  verifyGst,
  verifyPan,
  verifyBankAccount,
} from "../controllers/verificationController.js";

const router = express.Router();

router.post("/gst", verifyGst);
router.post("/pan", verifyPan);
router.post("/bank", verifyBankAccount);

export default router;
