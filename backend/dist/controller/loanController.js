import { Application } from "../models/ApplicationModel.js";
import { Loan } from "../models/LoanMode.js";
import { calculateLoan } from "../utils/bre.js";
// POST /api/loans/apply  (borrower)
export const applyLoan = async (req, res) => {
    try {
        const { principalAmount, tenureDays } = req.body;
        const amount = Number(principalAmount);
        const tenure = Number(tenureDays);
        if (!amount || !tenure) {
            res.status(400).json({ success: false, message: "Principal amount and tenure are required" });
            return;
        }
        if (amount < 50000 || amount > 500000) {
            res.status(400).json({ success: false, message: "Loan amount must be between ₹50,000 and ₹5,00,000" });
            return;
        }
        if (tenure < 30 || tenure > 365) {
            res.status(400).json({ success: false, message: "Tenure must be between 30 and 365 days" });
            return;
        }
        const application = await Application.findOne({ userId: req.user.id });
        if (!application) {
            res.status(404).json({ success: false, message: "Complete personal details first" });
            return;
        }
        if (application.breStatus === "failed") {
            res.status(403).json({ success: false, message: "BRE check failed — not eligible to apply" });
            return;
        }
        if (!application.salarySlipUrl) {
            res.status(400).json({ success: false, message: "Upload salary slip before applying" });
            return;
        }
        // Prevent duplicate active applications
        const existing = await Loan.findOne({
            userId: req.user.id,
            status: { $in: ["applied", "sanctioned", "disbursed"] },
        });
        if (existing) {
            res.status(409).json({ success: false, message: "You already have an active loan application" });
            return;
        }
        const { simpleInterest, totalRepayment } = calculateLoan(amount, tenure);
        const loan = await Loan.create({
            userId: req.user.id,
            applicationId: application._id,
            principalAmount: amount,
            tenureDays: tenure,
            simpleInterest,
            totalRepayment,
            status: "applied",
        });
        res.status(201).json({ success: true, message: "Loan application submitted", loan });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
// GET /api/loans/my  (borrower - see their own loans)
export const getMyLoans = async (req, res) => {
    try {
        const loans = await Loan.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, loans });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
//  SALES MODULE 
// GET /api/loans/dashboard/sales  (sales role | admin)
// Shows users who registered but haven't applied yet (lead tracking)
export const getSalesLeads = async (req, res) => {
    try {
        // Users who have an application (submitted personal details) but no loan
        const appliedUserIds = await Loan.distinct("userId");
        const applications = await Application.find({
            userId: { $nin: appliedUserIds },
        }).populate("userId", "firstName lastName email createdAt");
        res.status(200).json({ success: true, leads: applications });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
// SANCTION MODULE 
// GET /api/loans/dashboard/sanction  (sanction role | admin)
export const getPendingLoans = async (req, res) => {
    try {
        const loans = await Loan.find({ status: "applied" })
            .populate("userId", "firstName lastName email")
            .populate("applicationId")
            .sort({ createdAt: 1 }); // oldest first
        res.status(200).json({ success: true, loans });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
// PATCH /api/loans/:id/sanction  (sanction role | admin)
export const sanctionLoan = async (req, res) => {
    try {
        const { action, rejectionReason } = req.body; // action: "approve" | "reject"
        if (!["approve", "reject"].includes(action)) {
            res.status(400).json({ success: false, message: "action must be 'approve' or 'reject'" });
            return;
        }
        if (action === "reject" && !rejectionReason) {
            res.status(400).json({ success: false, message: "Rejection reason is required" });
            return;
        }
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            res.status(404).json({ success: false, message: "Loan not found" });
            return;
        }
        if (loan.status !== "applied") {
            res.status(409).json({ success: false, message: `Cannot sanction a loan with status '${loan.status}'` });
            return;
        }
        if (action === "approve") {
            loan.status = "sanctioned";
            loan.sanctionedBy = req.user.id;
            loan.sanctionedAt = new Date();
        }
        else {
            loan.status = "rejected";
            loan.rejectedBy = req.user.id;
            loan.rejectedAt = new Date();
            loan.rejectionReason = rejectionReason;
        }
        await loan.save();
        res.status(200).json({ success: true, message: `Loan ${action}d`, loan });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
//  DISBURSEMENT MODULE 
// GET /api/loans/dashboard/disbursement  (disbursement role | admin)
export const getSanctionedLoans = async (req, res) => {
    try {
        const loans = await Loan.find({ status: "sanctioned" })
            .populate("userId", "firstName lastName email")
            .populate("applicationId")
            .sort({ sanctionedAt: 1 });
        res.status(200).json({ success: true, loans });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
// PATCH /api/loans/:id/disburse  (disbursement role | admin)
export const disburseLoan = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            res.status(404).json({ success: false, message: "Loan not found" });
            return;
        }
        if (loan.status !== "sanctioned") {
            res.status(409).json({ success: false, message: `Cannot disburse a loan with status '${loan.status}'` });
            return;
        }
        loan.status = "disbursed";
        loan.disbursedBy = req.user.id;
        loan.disbursedAt = new Date();
        await loan.save();
        res.status(200).json({ success: true, message: "Loan disbursed", loan });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
// GET /api/loans/dashboard/collection  (collection role | admin)
export const getDisbursedLoans = async (req, res) => {
    try {
        const loans = await Loan.find({ status: "disbursed" })
            .populate("userId", "firstName lastName email")
            .sort({ disbursedAt: 1 });
        res.status(200).json({ success: true, loans });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
// POST /api/loans/:id/payment  (collection role | admin)
export const recordPayment = async (req, res) => {
    try {
        const { utrNumber, amount, paymentDate } = req.body;
        if (!utrNumber || !amount) {
            res.status(400).json({ success: false, message: "UTR number and amount are required" });
            return;
        }
        const payAmt = Number(amount);
        if (payAmt <= 0) {
            res.status(400).json({ success: false, message: "Payment amount must be positive" });
            return;
        }
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            res.status(404).json({ success: false, message: "Loan not found" });
            return;
        }
        if (loan.status !== "disbursed") {
            res.status(409).json({ success: false, message: `Cannot record payment for loan with status '${loan.status}'` });
            return;
        }
        // UTR must be globally unique across ALL loans
        const utrExists = await Loan.findOne({ "payments.utrNumber": utrNumber });
        if (utrExists) {
            res.status(409).json({ success: false, message: "UTR number already used in another payment" });
            return;
        }
        const outstanding = loan.totalRepayment - loan.totalPaid;
        if (payAmt > outstanding) {
            res.status(400).json({
                success: false,
                message: `Payment of ₹${payAmt} exceeds outstanding balance of ₹${outstanding.toFixed(2)}`,
            });
            return;
        }
        loan.payments.push({
            utrNumber,
            amount: payAmt,
            paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
            recordedBy: req.user.id,
        });
        loan.totalPaid = loan.totalPaid + payAmt;
        // Auto-close when fully paid
        if (Math.abs(loan.totalPaid - loan.totalRepayment) < 0.01) {
            loan.status = "closed";
            loan.closedAt = new Date();
        }
        await loan.save();
        res.status(200).json({
            success: true,
            message: loan.status === "closed" ? "Payment recorded. Loan is now CLOSED." : "Payment recorded",
            loan,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
// GET /api/loans/:id  (admin or relevant executive)
export const getLoanById = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id)
            .populate("userId", "firstName lastName email")
            .populate("applicationId")
            .populate("sanctionedBy", "firstName lastName")
            .populate("disbursedBy", "firstName lastName");
        if (!loan) {
            res.status(404).json({ success: false, message: "Loan not found" });
            return;
        }
        res.status(200).json({ success: true, loan });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
//# sourceMappingURL=loanController.js.map