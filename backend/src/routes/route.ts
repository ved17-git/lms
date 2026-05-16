import { Router } from "express";
import multer from "multer";
import path from "path";
import { signup, login, getMe } from "../controller/userController.js";
import {
  submitPersonalDetails,
  uploadSalarySlip,
  getMyApplication,
} from "../controller/applicationContoller.js";
import {
  applyLoan,
  getMyLoans,
  getSalesLeads,
  getPendingLoans,
  sanctionLoan,
  getSanctionedLoans,
  disburseLoan,
  getDisbursedLoans,
  recordPayment,
  getLoanById,
} from "../controller/loanController.js";
import { authenticate, authorize } from "../utils/middleware.js";

export const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only PDF, JPG, or PNG files are allowed"));
  },
});

//auth
router.post("/auth/signup", signup);
router.post("/auth/login",  login);
router.get("/auth/me",      authenticate, getMe);

//borrower
router.post(
  "/application/personal-details",
  authenticate, authorize("borrower"),
  submitPersonalDetails
);
router.post(
  "/application/upload-salary-slip",
  authenticate, authorize("borrower"),
  upload.single("salarySlip"),
  uploadSalarySlip
);
router.get(
  "/application/me",
  authenticate, authorize("borrower"),
  getMyApplication
);


//loan
router.post("/loans/apply",  authenticate, authorize("borrower"), applyLoan);
router.get("/loans/my",      authenticate, authorize("borrower"), getMyLoans);

//  Sales 
router.get(
  "/loans/dashboard/sales",
  authenticate, authorize("admin", "sales"),
  getSalesLeads
);

//  Sanction 
router.get(
  "/loans/dashboard/sanction",
  authenticate, authorize("admin", "sanction"),
  getPendingLoans
);
router.patch(
  "/loans/:id/sanction",
  authenticate, authorize("admin", "sanction"),
  sanctionLoan
);

//  Disbursement 
router.get(
  "/loans/dashboard/disbursement",
  authenticate, authorize("admin", "disbursement"),
  getSanctionedLoans
);
router.patch(
  "/loans/:id/disburse",
  authenticate, authorize("admin", "disbursement"),
  disburseLoan
);

//  Collection 
router.get(
  "/loans/dashboard/collection",
  authenticate, authorize("admin", "collection"),
  getDisbursedLoans
);
router.post(
  "/loans/:id/payment",
  authenticate, authorize("admin", "collection"),
  recordPayment
);

//  Loan detail 
router.get(
  "/loans/:id",
  authenticate,
  authorize("admin", "sales", "sanction", "disbursement", "collection"),
  getLoanById
);

export default router;