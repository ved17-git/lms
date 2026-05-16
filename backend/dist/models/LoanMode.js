import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    utrNumber: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [1, "Payment amount must be positive"],
    },
    paymentDate: { type: Date, required: true, default: Date.now },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { _id: true });
const loanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    // Step 4 — Loan Configuration
    principalAmount: {
        type: Number,
        required: true,
        min: [50000, "Minimum loan amount is ₹50,000"],
        max: [500000, "Maximum loan amount is ₹5,00,000"],
    },
    tenureDays: {
        type: Number,
        required: true,
        min: [30, "Minimum tenure is 30 days"],
        max: [365, "Maximum tenure is 365 days"],
    },
    interestRate: {
        type: Number,
        default: 12, // fixed at 12% p.a.
    },
    // Calculated at creation and stored — avoids re-computing
    simpleInterest: { type: Number, required: true },
    totalRepayment: { type: Number, required: true },
    // Lifecycle
    status: {
        type: String,
        enum: ["applied", "sanctioned", "rejected", "disbursed", "closed"],
        default: "applied",
    },
    // Sanction fields
    sanctionedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    sanctionedAt: { type: Date, default: null },
    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    rejectedAt: { type: Date, default: null },
    rejectionReason: { type: String, default: null },
    // Disbursement fields
    disbursedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    disbursedAt: { type: Date, default: null },
    // Collection — embedded payments
    payments: { type: [paymentSchema], default: [] },
    totalPaid: { type: Number, default: 0 },
    closedAt: { type: Date, default: null },
}, { timestamps: true });
// Index for fast dashboard queries per status
loanSchema.index({ status: 1 });
loanSchema.index({ userId: 1 });
// UTR uniqueness enforced in the application layer (controller checks before push)
// because MongoDB can't enforce uniqueness on an array subdocument field globally.
export const Loan = mongoose.model("Loan", loanSchema);
//# sourceMappingURL=LoanMode.js.map